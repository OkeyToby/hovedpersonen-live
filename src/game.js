(function () {
  const STORAGE_KEY = 'hl-arstalsquiz-v1';

  function clone(v) {
    return JSON.parse(JSON.stringify(v));
  }

  function isObj(v) {
    return v && typeof v === 'object' && !Array.isArray(v);
  }

  function normalizeData(data, seed) {
    // Old Tre-ting format has 'cases' but no 'categories' — migrate to seed
    if (!isObj(data) || (!Array.isArray(data.categories) && data.cases)) {
      console.log('[HL] Gammel format fundet — bruger seed-data');
      const base = clone(seed);
      if (Array.isArray(data?.teams) && data.teams.length) {
        base.teams = data.teams.map(function (t, i) {
          return { id: t.id || ('team-' + (i + 1)), name: t.name || ('Hold ' + (i + 1)), score: Number(t.score) || 0 };
        });
      }
      return base;
    }

    const next = clone(data);
    const base = clone(seed);

    next.event = Object.assign({}, base.event, isObj(next.event) ? next.event : {});
    next.event.year = String(next.event.year || base.event.year || '2002');
    next.event.title = String(next.event.title || base.event.title || '');
    next.event.note = String(next.event.note || '');

    const rawTeams = Array.isArray(next.teams) && next.teams.length ? next.teams : base.teams;
    next.teams = rawTeams.filter(isObj).map(function (t, i) {
      return { id: t.id || ('team-' + (i + 1)), name: t.name || ('Hold ' + (i + 1)), score: Number(t.score) || 0 };
    });
    if (!next.teams.length) next.teams = clone(base.teams);

    const rawCats = Array.isArray(next.categories) && next.categories.length ? next.categories : base.categories;
    next.categories = rawCats.filter(isObj).slice(0, 7).map(function (c, i) {
      return {
        id: c.id || ('cat-' + (i + 1)),
        name: String(c.name || ('Kategori ' + (i + 1))),
        question: String(c.question || ''),
        answer: String(c.answer || ''),
        explanation: String(c.explanation || ''),
        used: Boolean(c.used),
      };
    });
    if (!next.categories.length) next.categories = clone(base.categories);

    const fin = isObj(next.finale) ? next.finale : {};
    const finBase = isObj(base.finale) ? base.finale : {};
    next.finale = {
      question: String(fin.question || finBase.question || ''),
      answer: String(fin.answer || finBase.answer || ''),
      explanation: String(fin.explanation || finBase.explanation || ''),
    };

    return next;
  }

  function makeInitialState() {
    return {
      phase: 'intro',
      activeTeamIndex: 0,
      activeCategoryId: '',
      lastScoreEvent: '',
    };
  }

  function normalizeState(state, data) {
    const phases = ['intro', 'category_board', 'question', 'reveal', 'finale', 'finished'];
    const base = makeInitialState();
    const next = isObj(state) ? Object.assign({}, base, state) : base;
    if (!phases.includes(next.phase)) next.phase = 'intro';
    next.activeTeamIndex = Math.max(0, Math.min(data.teams.length - 1, Number(next.activeTeamIndex) || 0));
    if (!data.categories.some(function (c) { return c.id === next.activeCategoryId; })) {
      next.activeCategoryId = '';
    }
    next.lastScoreEvent = String(next.lastScoreEvent || '');
    return next;
  }

  function load() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function createStore(seed) {
    const saved = load();
    const isOldFormat = saved && saved.data && !Array.isArray(saved.data.categories);
    const rawData = (!isOldFormat && isObj(saved && saved.data)) ? saved.data : null;
    const data = normalizeData(rawData, seed);
    const state = normalizeState(saved && saved.state, data);
    return { data: data, state: state };
  }

  function save(store) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
      // Storage unavailable — session still works.
    }
  }

  function reset(seed) {
    const data = normalizeData(clone(seed), seed);
    return { data: data, state: makeInitialState() };
  }

  function activeTeam(store) {
    return store.data.teams[store.state.activeTeamIndex] || store.data.teams[0];
  }

  function teamById(store, id) {
    return store.data.teams.find(function (t) { return t.id === id; });
  }

  function activeCategory(store) {
    return store.data.categories.find(function (c) { return c.id === store.state.activeCategoryId; }) || null;
  }

  function availableCategories(store) {
    return store.data.categories.filter(function (c) { return !c.used; });
  }

  function startShow(store) {
    store.data.teams.forEach(function (t) { t.score = 0; });
    store.data.categories.forEach(function (c) { c.used = false; });
    store.state.phase = 'intro';
    store.state.activeTeamIndex = 0;
    store.state.activeCategoryId = '';
    store.state.lastScoreEvent = '';
    return store;
  }

  function startCategories(store) {
    store.state.phase = 'category_board';
    return store;
  }

  function selectCategory(store, id) {
    const cat = store.data.categories.find(function (c) { return c.id === id && !c.used; });
    if (!cat) return store;
    store.state.activeCategoryId = id;
    store.state.phase = 'question';
    store.state.lastScoreEvent = '';
    return store;
  }

  function markCorrect(store) {
    const team = activeTeam(store);
    if (team) {
      team.score += 2;
      store.state.lastScoreEvent = team.name + ' +2';
    }
    const cat = activeCategory(store);
    if (cat) cat.used = true;
    store.state.phase = 'reveal';
    return store;
  }

  function markWrong(store) {
    const cat = activeCategory(store);
    if (cat) cat.used = true;
    store.state.lastScoreEvent = 'Forkert';
    store.state.phase = 'reveal';
    return store;
  }

  function awardBonus(store, teamId) {
    const team = teamById(store, teamId);
    if (team) {
      team.score += 1;
      store.state.lastScoreEvent = team.name + ' bonus +1';
    }
    return store;
  }

  function nextTurn(store) {
    const available = availableCategories(store);
    store.state.activeCategoryId = '';
    store.state.lastScoreEvent = '';
    if (!available.length) {
      store.state.phase = 'finale';
      return store;
    }
    store.state.activeTeamIndex = (store.state.activeTeamIndex + 1) % store.data.teams.length;
    store.state.phase = 'category_board';
    return store;
  }

  function markFinaleCorrect(store, teamId) {
    const team = teamById(store, teamId);
    if (team) {
      team.score += 3;
      store.state.lastScoreEvent = team.name + ' finale +3';
    }
    store.state.phase = 'finished';
    return store;
  }

  function finishGame(store) {
    store.state.phase = 'finished';
    return store;
  }

  window.HLGame = {
    STORAGE_KEY: STORAGE_KEY,
    createStore: createStore,
    save: save,
    reset: reset,
    activeTeam: activeTeam,
    teamById: teamById,
    activeCategory: activeCategory,
    availableCategories: availableCategories,
    startShow: startShow,
    startCategories: startCategories,
    selectCategory: selectCategory,
    markCorrect: markCorrect,
    markWrong: markWrong,
    awardBonus: awardBonus,
    nextTurn: nextTurn,
    markFinaleCorrect: markFinaleCorrect,
    finishGame: finishGame,
  };
})();
