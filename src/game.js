(function () {
  const STORAGE_KEY = 'hovedpersonen-live-guldbryllup-v2';
  const FORMATS = ['one_story', 'three_stories'];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function isObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  function makeInitialState(data) {
    const firstCase = data.cases[0];
    return {
      phase: 'setup',
      activeCaseId: firstCase ? firstCase.id : '',
      activeTeamId: firstCase ? firstCase.activeTeamId : '',
      stealTeamId: '',
      completedCaseIds: [],
      lastScoreEvent: '',
    };
  }

  function normalizeOptions(item) {
    const source = Array.isArray(item.options) && item.options.length ? item.options : [];
    const fromClues = [0, 1, 2].map((index) => ({
      clue: item.clues?.[index] || `Ting ${index + 1}`,
      story: index === 0 ? item.answer || '' : '',
      isCorrect: index === 0,
    }));
    return (source.length ? source : fromClues).slice(0, 3).map((option, index) => ({
      clue: option.clue || item.clues?.[index] || `Ting ${index + 1}`,
      story: option.story || '',
      isCorrect: Boolean(option.isCorrect),
    }));
  }

  function normalizeData(data, fallback) {
    const base = clone(fallback || data || {});
    const next = isObject(data) ? clone(data) : base;
    const candidateTeams = Array.isArray(next.teams) && next.teams.length ? next.teams : base.teams || [];
    const candidateCases = Array.isArray(next.cases) && next.cases.length ? next.cases : base.cases || [];
    const sourceTeams = candidateTeams.filter(isObject).length ? candidateTeams.filter(isObject) : base.teams || [];
    const sourceCases = candidateCases.filter(isObject).length ? candidateCases.filter(isObject) : base.cases || [];

    next.event = {
      ...(isObject(base.event) ? base.event : {}),
      ...(isObject(next.event) ? next.event : {}),
    };
    next.teams = sourceTeams.map((team, index) => ({
      id: team.id || `team-${index + 1}`,
      name: team.name || `Hold ${index + 1}`,
      score: Number(team.score) || 0,
    }));
    next.cases = sourceCases.map((item, index) => {
      const fallbackTeamId = next.teams[index % next.teams.length]?.id || '';
      const activeTeamId = next.teams.some((team) => team.id === item.activeTeamId) ? item.activeTeamId : fallbackTeamId;
      const normalized = {
        id: item.id || `case-${index + 1}`,
        format: FORMATS.includes(item.format) ? item.format : 'one_story',
        title: item.title || `Case ${index + 1}`,
        activeTeamId,
        storyOwner: item.storyOwner || '',
        clues: [0, 1, 2].map((clueIndex) => item.clues?.[clueIndex] || ''),
        prompt: item.prompt || '',
        question: item.question || '',
        answer: item.answer || '',
        revealNote: item.revealNote || '',
      };
      normalized.options = normalizeOptions({ ...item, ...normalized });
      if (!normalized.options.some((option) => option.isCorrect)) {
        normalized.options[0].isCorrect = true;
      }
      return normalized;
    });
    return next;
  }

  function load() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function createStore(seed) {
    const saved = load();
    const data = normalizeData(saved?.data, seed);
    const state = normalizeState(saved?.state, data);
    return { data, state };
  }

  function normalizeState(state, data) {
    const allowedPhases = ['setup', 'active_team', 'steal', 'reveal', 'finished'];
    const next = isObject(state) ? { ...makeInitialState(data), ...state } : makeInitialState(data);
    if (!allowedPhases.includes(next.phase)) next.phase = 'setup';
    if (!data.cases.some((item) => item.id === next.activeCaseId)) {
      next.activeCaseId = data.cases[0]?.id || '';
    }
    const activeCase = data.cases.find((item) => item.id === next.activeCaseId);
    if (!data.teams.some((team) => team.id === next.activeTeamId)) {
      next.activeTeamId = activeCase?.activeTeamId || data.teams[0]?.id || '';
    }
    if (!data.teams.some((team) => team.id === next.stealTeamId)) next.stealTeamId = '';
    if (!Array.isArray(next.completedCaseIds)) next.completedCaseIds = [];
    next.completedCaseIds = next.completedCaseIds.filter((id) => data.cases.some((item) => item.id === id));
    next.lastScoreEvent = next.lastScoreEvent || '';
    if (next.phase === 'steal' && !data.teams.some((team) => team.id !== next.activeTeamId)) {
      next.phase = 'reveal';
      next.lastScoreEvent = next.lastScoreEvent || 'Ingen andre hold kan stjæle point.';
    }
    return next;
  }

  function save(store) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (error) {
      // The app still works for one session if storage is unavailable.
    }
  }

  function reset(seed) {
    const data = normalizeData(seed, seed);
    return { data, state: makeInitialState(data) };
  }

  function activeCase(store) {
    return store.data.cases.find((item) => item.id === store.state.activeCaseId) || store.data.cases[0];
  }

  function activeTeam(store) {
    return store.data.teams.find((team) => team.id === store.state.activeTeamId) || store.data.teams[0];
  }

  function teamById(store, id) {
    return store.data.teams.find((team) => team.id === id);
  }

  function startShow(store) {
    const first = store.data.cases[0];
    if (!first) return store;
    store.state.phase = 'active_team';
    store.state.activeCaseId = first.id;
    store.state.activeTeamId = first.activeTeamId;
    store.state.stealTeamId = '';
    store.state.completedCaseIds = [];
    store.state.lastScoreEvent = '';
    return store;
  }

  function markCorrect(store) {
    const team = activeTeam(store);
    if (team) {
      team.score += 2;
      store.state.lastScoreEvent = `${team.name} +2`;
    }
    store.state.phase = 'reveal';
    store.state.stealTeamId = '';
    markCompleted(store);
    return store;
  }

  function markWrong(store) {
    const hasStealTeam = store.data.teams.some((team) => team.id !== store.state.activeTeamId);
    if (!hasStealTeam) {
      store.state.phase = 'reveal';
      store.state.stealTeamId = '';
      store.state.lastScoreEvent = 'Forkert. Ingen steal mulig.';
      markCompleted(store);
      return store;
    }
    store.state.phase = 'steal';
    store.state.lastScoreEvent = 'Forkert. Steal åbent.';
    return store;
  }

  function awardSteal(store, teamId) {
    const team = teamById(store, teamId);
    if (team) {
      team.score += 1;
      store.state.stealTeamId = teamId;
      store.state.lastScoreEvent = `${team.name} +1`;
    }
    store.state.phase = 'reveal';
    markCompleted(store);
    return store;
  }

  function reveal(store) {
    store.state.phase = 'reveal';
    markCompleted(store);
    return store;
  }

  function nextTurn(store) {
    const currentIndex = store.data.cases.findIndex((item) => item.id === store.state.activeCaseId);
    const next = store.data.cases[currentIndex + 1];
    if (!next) {
      store.state.phase = 'finished';
      store.state.stealTeamId = '';
      return store;
    }
    store.state.phase = 'active_team';
    store.state.activeCaseId = next.id;
    store.state.activeTeamId = next.activeTeamId;
    store.state.stealTeamId = '';
    store.state.lastScoreEvent = '';
    return store;
  }

  function finish(store) {
    store.state.phase = 'finished';
    store.state.stealTeamId = '';
    return store;
  }

  function markCompleted(store) {
    const id = store.state.activeCaseId;
    if (id && !store.state.completedCaseIds.includes(id)) {
      store.state.completedCaseIds.push(id);
    }
  }

  window.HLGame = {
    STORAGE_KEY,
    FORMATS,
    createStore,
    save,
    reset,
    makeInitialState,
    activeCase,
    activeTeam,
    startShow,
    markCorrect,
    markWrong,
    awardSteal,
    reveal,
    nextTurn,
    finish,
  };
})();
