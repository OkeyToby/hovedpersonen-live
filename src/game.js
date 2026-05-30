(function () {
  const STORAGE_KEY = 'hl-arstalsquiz-v6';

  function clone(v) {
    return JSON.parse(JSON.stringify(v));
  }

  function isObj(v) {
    return v && typeof v === 'object' && !Array.isArray(v);
  }

  function normalizeQuestion(q) {
    if (!isObj(q)) q = {};
    return {
      question: String(q.question || ''),
      answer: String(q.answer || ''),
      explanation: String(q.explanation || ''),
      used: Boolean(q.used),
    };
  }

  // Accepts both the new format (category.questions[]) and the old
  // single-question format (category.question/answer/explanation) and
  // migrates the latter into a one-element questions array.
  function normalizeCategory(c, i) {
    if (!isObj(c)) c = {};
    let questions;
    if (Array.isArray(c.questions) && c.questions.length) {
      questions = c.questions.map(normalizeQuestion);
    } else if (c.question || c.answer) {
      questions = [normalizeQuestion(c)];
    } else {
      questions = [normalizeQuestion({})];
    }
    return {
      id: c.id || ('cat-' + (i + 1)),
      name: String(c.name || ('Kategori ' + (i + 1))),
      questions: questions,
    };
  }

  function normalizeData(data, seed) {
    const base = clone(seed);

    // Old "Tre-ting" format with no categories at all — fall back to seed.
    if (!isObj(data) || (!Array.isArray(data.categories) && data.cases)) {
      console.log('[HL] Gammel format fundet — bruger seed-data');
      if (Array.isArray(data && data.teams) && data.teams.length) {
        base.teams = data.teams.map(function (t, i) {
          return { id: t.id || ('team-' + (i + 1)), name: t.name || ('Hold ' + (i + 1)), score: Number(t.score) || 0 };
        });
      }
      return base;
    }

    const next = clone(data);

    next.event = Object.assign({}, base.event, isObj(next.event) ? next.event : {});
    next.event.year = String(next.event.year || base.event.year || '2001');
    next.event.title = String(next.event.title || base.event.title || '');
    next.event.note = String(next.event.note || '');

    const rawTeams = Array.isArray(next.teams) && next.teams.length ? next.teams : base.teams;
    next.teams = rawTeams.filter(isObj).map(function (t, i) {
      return { id: t.id || ('team-' + (i + 1)), name: t.name || ('Hold ' + (i + 1)), score: Number(t.score) || 0 };
    });
    if (!next.teams.length) next.teams = clone(base.teams);

    const rawCats = Array.isArray(next.categories) && next.categories.length ? next.categories : base.categories;
    next.categories = rawCats.filter(isObj).slice(0, 7).map(normalizeCategory);
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
      activeQuestionIndex: -1,
      lastScoreEvent: '',
    };
  }

  function normalizeState(state, data) {
    const phases = ['intro', 'category_board', 'question', 'reveal', 'finale', 'finished'];
    const base = makeInitialState();
    const next = isObj(state) ? Object.assign({}, base, state) : base;
    if (!phases.includes(next.phase)) next.phase = 'intro';
    next.activeTeamIndex = Math.max(0, Math.min(data.teams.length - 1, Number(next.activeTeamIndex) || 0));
    const cat = data.categories.find(function (c) { return c.id === next.activeCategoryId; });
    if (!cat) {
      next.activeCategoryId = '';
      next.activeQuestionIndex = -1;
    } else {
      next.activeQuestionIndex = Number(next.activeQuestionIndex);
      if (!(next.activeQuestionIndex >= 0 && next.activeQuestionIndex < cat.questions.length)) {
        next.activeQuestionIndex = -1;
      }
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
    // If the bundled content is newer than what was saved, discard the saved
    // copy entirely so the fresh seed questions/answers load. This avoids
    // stale questions sticking around in localStorage after a content update.
    const seedVersion = seed && seed.seedVersion;
    const savedFresh = saved && (!seedVersion || saved.seedVersion === seedVersion) ? saved : null;
    const rawData = isObj(savedFresh && savedFresh.data) ? savedFresh.data : null;
    const data = normalizeData(rawData, seed);
    const state = normalizeState(savedFresh && savedFresh.state, data);
    return { data: data, state: state, seedVersion: seedVersion };
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
    return { data: data, state: makeInitialState(), seedVersion: seed && seed.seedVersion };
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

  function activeQuestion(store) {
    const cat = activeCategory(store);
    if (!cat) return null;
    return cat.questions[store.state.activeQuestionIndex] || null;
  }

  function remainingInCategory(cat) {
    if (!cat || !Array.isArray(cat.questions)) return 0;
    return cat.questions.filter(function (q) { return !q.used; }).length;
  }

  function availableCategories(store) {
    return store.data.categories.filter(function (c) { return remainingInCategory(c) > 0; });
  }

  function totalRemaining(store) {
    return store.data.categories.reduce(function (sum, c) { return sum + remainingInCategory(c); }, 0);
  }

  function startShow(store) {
    store.data.teams.forEach(function (t) { t.score = 0; });
    store.data.categories.forEach(function (c) {
      c.questions.forEach(function (q) { q.used = false; });
    });
    store.state.phase = 'intro';
    store.state.activeTeamIndex = 0;
    store.state.activeCategoryId = '';
    store.state.activeQuestionIndex = -1;
    store.state.lastScoreEvent = '';
    return store;
  }

  function startCategories(store) {
    store.state.phase = 'category_board';
    return store;
  }

  function selectCategory(store, id) {
    const cat = store.data.categories.find(function (c) { return c.id === id; });
    if (!cat) return store;
    const qIndex = cat.questions.findIndex(function (q) { return !q.used; });
    if (qIndex === -1) return store;
    store.state.activeCategoryId = id;
    store.state.activeQuestionIndex = qIndex;
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
    const q = activeQuestion(store);
    if (q) q.used = true;
    store.state.phase = 'reveal';
    return store;
  }

  function markWrong(store) {
    const q = activeQuestion(store);
    if (q) q.used = true;
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
    store.state.activeCategoryId = '';
    store.state.activeQuestionIndex = -1;
    store.state.lastScoreEvent = '';
    if (totalRemaining(store) <= 0) {
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
    activeQuestion: activeQuestion,
    remainingInCategory: remainingInCategory,
    availableCategories: availableCategories,
    totalRemaining: totalRemaining,
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
