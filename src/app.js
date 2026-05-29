(function () {
  let store = window.HLGame.createStore(window.HLContent.template);
  let view = 'producer';
  let editorCatId = store.data.categories[0] ? store.data.categories[0].id : '';

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function saveAndRender() {
    window.HLGame.save(store);
    render();
  }

  // ─── TOP BAR ─────────────────────────────────────────────────────────────

  function topBar() {
    const year = store.data.event.year || '????';
    return '<header class="top-bar">' +
      '<div class="brand">' +
        '<span class="brand-mark" aria-hidden="true">HL</span>' +
        '<div><strong>Hovedpersonen Live</strong><span>' + esc(year) + '</span></div>' +
      '</div>' +
      '<nav class="view-tabs" aria-label="Arbejdsflader">' +
        ['producer', 'show', 'print'].map(function (v) {
          const labels = { producer: 'Producer', show: 'Show', print: 'Print' };
          return '<button class="' + (view === v ? 'active' : '') + '" data-action="view" data-view="' + v + '">' + labels[v] + '</button>';
        }).join('') +
      '</nav>' +
      '<div class="event-summary"><strong>' + esc(store.data.event.title || 'Årstalsquiz') + '</strong></div>' +
    '</header>';
  }

  // ─── PRODUCER ────────────────────────────────────────────────────────────

  function producerView() {
    return '<section class="producer-grid" aria-label="Producer">' +
      setupPanel() +
      categoriesPanel() +
      categoryEditor() +
    '</section>';
  }

  function setupPanel() {
    const ev = store.data.event;
    const cats = store.data.categories;
    const ready = cats.filter(function (c) { return c.question && c.answer; }).length;
    return '<aside class="side-stack">' +
      '<section class="panel">' +
        '<div class="panel-heading">' +
          '<div><span class="label">Event</span><h2>Årstalsquiz</h2></div>' +
          '<button class="ghost" data-action="reset">Nulstil demo</button>' +
        '</div>' +
        '<div class="form-grid">' +
          inputField('event', 'year', 'Årstal', ev.year) +
          inputField('event', 'title', 'Titel', ev.title) +
        '</div>' +
        '<label style="margin-top:10px">' +
          '<span>Værtsnote</span>' +
          '<textarea data-kind="event" data-field="note">' + esc(ev.note) + '</textarea>' +
        '</label>' +
        '<details class="advanced-settings">' +
          '<summary>Hold</summary>' +
          '<div class="team-editor" style="margin-top:12px">' +
            store.data.teams.map(teamRow).join('') +
            '<button data-action="add-team" style="margin-top:8px;width:100%">Tilføj hold</button>' +
          '</div>' +
        '</details>' +
      '</section>' +
      '<section class="panel run-panel">' +
        '<div class="panel-heading"><div><span class="label">Test</span><h2>Kørsel</h2></div></div>' +
        '<div class="readiness-list">' +
          '<h3>Klar</h3>' +
          readinessRow(String(store.data.teams.length), 'hold') +
          readinessRow(String(cats.length) + '/7', 'kategorier oprettet') +
          readinessRow(String(ready) + '/' + String(cats.length), 'kategorier med spørgsmål og svar') +
        '</div>' +
        '<div class="run-actions">' +
          '<button class="primary" data-action="start">Start show</button>' +
          '<button class="secondary" data-action="view" data-view="print">Print</button>' +
        '</div>' +
        '<p class="run-note">Rigtigt +2 · Bonus +1 · Finale +3</p>' +
      '</section>' +
    '</aside>';
  }

  function readinessRow(count, text) {
    return '<div><span>' + esc(count) + '</span><p>' + esc(text) + '</p></div>';
  }

  function categoriesPanel() {
    const cats = store.data.categories;
    return '<section class="panel categories-panel">' +
      '<div class="panel-heading">' +
        '<div><span class="label">Kategorier</span><h2>' + esc(store.data.event.year || '????') + '</h2></div>' +
        (cats.length < 7 ? '<button data-action="add-cat">Tilføj kategori</button>' : '<span class="label">Maks. 7</span>') +
      '</div>' +
      '<div class="cat-editor-list">' +
        cats.map(function (cat, index) {
          const active = cat.id === editorCatId;
          return '<button class="cat-editor-row ' + (active ? 'active' : '') + '" data-action="select-cat-editor" data-cat-id="' + esc(cat.id) + '">' +
            '<span class="cat-index">' + String(index + 1).padStart(2, '0') + '</span>' +
            '<strong>' + (cat.name ? esc(cat.name) : '<em style="opacity:.5">Navn mangler</em>') + '</strong>' +
            '<span class="cat-status">' + (cat.question && cat.answer ? '✓' : '–') + '</span>' +
          '</button>';
        }).join('') +
      '</div>' +
      '<section class="panel finale-mini">' +
        '<div class="panel-heading"><div><span class="label">Finale</span><h2>Finalespørgsmål</h2></div></div>' +
        '<div class="form-grid">' +
          finaleInput('question', 'Spørgsmål', store.data.finale.question) +
          finaleInput('answer', 'Svar', store.data.finale.answer) +
        '</div>' +
        '<label style="margin-top:10px">' +
          '<span>Forklaring</span>' +
          '<textarea data-kind="finale" data-field="explanation">' + esc(store.data.finale.explanation) + '</textarea>' +
        '</label>' +
      '</section>' +
    '</section>';
  }

  function categoryEditor() {
    const cat = store.data.categories.find(function (c) { return c.id === editorCatId; });
    const index = store.data.categories.findIndex(function (c) { return c.id === editorCatId; });
    if (!cat) {
      return '<section class="panel cat-workbench"><div class="panel-heading"><div><span class="label">Kategori</span><h2>Vælg en kategori</h2></div></div></section>';
    }
    return '<section class="panel cat-workbench">' +
      '<div class="panel-heading">' +
        '<div><span class="label">Kategori ' + String(index + 1).padStart(2, '0') + '</span><h2>' + (cat.name ? esc(cat.name) : 'Uden navn') + '</h2></div>' +
        (store.data.categories.length > 3 ? '<button class="ghost" data-action="remove-cat" data-cat-id="' + esc(cat.id) + '">Fjern</button>' : '') +
      '</div>' +
      '<article class="case-card active">' +
        catInput(index, 'name', 'Navn', cat.name) +
        catInput(index, 'question', 'Spørgsmål', cat.question) +
        catInput(index, 'answer', 'Svar', cat.answer) +
        '<label>' +
          '<span>Forklaring (valgfri)</span>' +
          '<textarea data-kind="cat" data-index="' + index + '" data-field="explanation">' + esc(cat.explanation) + '</textarea>' +
        '</label>' +
      '</article>' +
    '</section>';
  }

  function teamRow(team, index) {
    return '<div class="team-row">' +
      '<input data-kind="team" data-index="' + index + '" data-field="name" value="' + esc(team.name) + '" aria-label="Holdnavn" />' +
      '<input data-kind="team" data-index="' + index + '" data-field="score" type="number" value="' + esc(team.score) + '" aria-label="Point" />' +
      (store.data.teams.length > 1 ? '<button class="ghost" data-action="remove-team" data-index="' + index + '">Fjern</button>' : '') +
    '</div>';
  }

  function inputField(kind, field, label, value) {
    return '<label><span>' + esc(label) + '</span>' +
      '<input data-kind="' + esc(kind) + '" data-field="' + esc(field) + '" value="' + esc(value) + '" /></label>';
  }

  function catInput(index, field, label, value) {
    return '<label><span>' + esc(label) + '</span>' +
      '<input data-kind="cat" data-index="' + index + '" data-field="' + esc(field) + '" value="' + esc(value) + '" /></label>';
  }

  function finaleInput(field, label, value) {
    return '<label><span>' + esc(label) + '</span>' +
      '<input data-kind="finale" data-field="' + esc(field) + '" value="' + esc(value) + '" /></label>';
  }

  // ─── SHOW ────────────────────────────────────────────────────────────────

  function showStage() {
    const phase = store.state.phase;
    if (phase === 'intro') return introStage();
    if (phase === 'category_board') return categoryBoardStage();
    if (phase === 'question') return questionStage();
    if (phase === 'reveal') return revealStage();
    if (phase === 'finale') return finaleStage();
    return finishedStage();
  }

  function liveScore() {
    const sorted = store.data.teams.slice().sort(function (a, b) { return b.score - a.score; });
    const leaderScore = sorted.length ? sorted[0].score : 0;
    return '<aside class="live-score" aria-label="Live score">' +
      '<div class="live-score-list">' +
        sorted.map(function (team, i) {
          const isActive = team.id === (window.HLGame.activeTeam(store) || {}).id;
          const isLeader = team.score === leaderScore && i === 0;
          return '<div class="live-score-row' + (isActive ? ' is-active' : '') + (isLeader ? ' is-leader' : '') + '">' +
            '<span>' + (i + 1) + '</span>' +
            '<strong>' + esc(team.name) + '</strong>' +
            '<em>' + esc(team.score) + '</em>' +
          '</div>';
        }).join('') +
      '</div>' +
      '<div class="bonus-actions" aria-label="Bonus +1">' +
        '<span>Bonus +1</span>' +
        store.data.teams.map(function (t) {
          return '<button class="bonus-button" data-action="bonus" data-team-id="' + esc(t.id) + '">' + esc(t.name) + '</button>';
        }).join('') +
      '</div>' +
    '</aside>';
  }

  function introStage() {
    return '<section class="show-stage intro-stage" aria-label="Intro">' +
      '<div class="intro-year">' +
        '<span class="label" style="color:var(--stage-muted)">Årstalsquiz</span>' +
        '<h1>' + esc(store.data.event.year || '????') + '</h1>' +
        (store.data.event.title ? '<p>' + esc(store.data.event.title) + '</p>' : '') +
      '</div>' +
      '<div class="host-controls">' +
        '<button class="primary" data-action="start-cats">Vis kategori-board</button>' +
      '</div>' +
    '</section>';
  }

  function categoryBoardStage() {
    const team = window.HLGame.activeTeam(store);
    const cats = store.data.categories;
    const countClass = 'cat-board-count-' + cats.length;
    return '<section class="show-stage" aria-label="Kategori-board">' +
      '<div class="stage-rail">' +
        '<span>' + esc(store.data.event.year || '????') + '</span>' +
        '<span>' + esc(team ? team.name + ' vælger' : '') + '</span>' +
        '<span>' + esc(window.HLGame.availableCategories(store).length) + ' tilbage</span>' +
      '</div>' +
      liveScore() +
      '<div class="category-board ' + countClass + '">' +
        cats.map(function (cat) {
          const used = cat.used;
          return '<button class="cat-tile' + (used ? ' used' : '') + '" ' +
            (used ? 'disabled aria-disabled="true"' : 'data-action="select-cat-show" data-cat-id="' + esc(cat.id) + '"') + '>' +
            esc(cat.name) +
          '</button>';
        }).join('') +
      '</div>' +
      '<div class="host-controls">' +
        '<button class="secondary" data-action="finish">Afslut</button>' +
      '</div>' +
    '</section>';
  }

  function questionStage() {
    const team = window.HLGame.activeTeam(store);
    const cat = window.HLGame.activeCategory(store);
    if (!cat) return categoryBoardStage();
    return '<section class="show-stage" aria-label="Spørgsmål">' +
      '<div class="stage-rail">' +
        '<span>' + esc(cat.name) + '</span>' +
        '<span>' + esc(team ? team.name : '') + '</span>' +
        '<span>Spørgsmål</span>' +
      '</div>' +
      liveScore() +
      '<div class="stage-grid">' +
        '<div class="team-card">' +
          '<span class="label">Aktivt hold</span>' +
          '<h1>' + esc(team ? team.name : '') + '</h1>' +
          '<p>' + esc(cat.name) + '</p>' +
        '</div>' +
        '<div class="story-card">' +
          '<span class="label">Spørgsmål</span>' +
          '<h2>' + esc(cat.question) + '</h2>' +
        '</div>' +
      '</div>' +
      '<div class="host-controls">' +
        '<button class="success" data-action="correct">Rigtigt +2</button>' +
        '<button class="danger" data-action="wrong">Forkert</button>' +
        '<button class="secondary" data-action="finish">Afslut</button>' +
      '</div>' +
    '</section>';
  }

  function revealStage() {
    const cat = window.HLGame.activeCategory(store);
    const scoreEvent = store.state.lastScoreEvent;
    const isCorrect = scoreEvent && scoreEvent.indexOf('+2') !== -1;
    return '<section class="show-stage is-reveal" aria-label="Svar">' +
      '<div class="stage-rail">' +
        '<span>' + (cat ? esc(cat.name) : '') + '</span>' +
        '<span>' + esc(scoreEvent) + '</span>' +
        '<span>Reveal</span>' +
      '</div>' +
      liveScore() +
      '<div class="stage-grid">' +
        '<div class="team-card">' +
          '<span class="label">Svar</span>' +
          '<h1>' + (cat ? esc(cat.answer) : '') + '</h1>' +
          (scoreEvent ? '<div class="score-line">' + esc(scoreEvent) + '</div>' : '') +
        '</div>' +
        '<div class="story-card">' +
          '<span class="label">' + (isCorrect ? 'Korrekt' : 'Forkert') + '</span>' +
          '<h2>' + (cat ? esc(cat.question) : '') + '</h2>' +
          (cat && cat.explanation ? '<p class="story-prompt">' + esc(cat.explanation) + '</p>' : '') +
        '</div>' +
      '</div>' +
      '<div class="host-controls">' +
        '<button class="primary" data-action="next">Næste</button>' +
        '<button class="secondary" data-action="finish">Afslut</button>' +
      '</div>' +
    '</section>';
  }

  function finaleStage() {
    const fin = store.data.finale;
    return '<section class="show-stage finale-stage" aria-label="Finale">' +
      '<div class="stage-rail">' +
        '<span>FINALE</span>' +
        '<span>' + esc(store.data.event.year || '????') + '</span>' +
        '<span>Afgørende runde</span>' +
      '</div>' +
      liveScore() +
      '<div class="stage-grid">' +
        '<div class="team-card finale-left">' +
          '<span class="label">Vinder</span>' +
          '<h1>Finale +3</h1>' +
          '<p>Vælg vinderholdet herunder.</p>' +
          '<div class="finale-team-buttons">' +
            store.data.teams.map(function (t) {
              return '<button class="finale-team-btn" data-action="finale-correct" data-team-id="' + esc(t.id) + '">' + esc(t.name) + '</button>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<div class="story-card">' +
          '<span class="label">Finalespørgsmål</span>' +
          '<h2>' + esc(fin.question) + '</h2>' +
          (fin.explanation ? '<p class="story-prompt">' + esc(fin.explanation) + '</p>' : '') +
        '</div>' +
      '</div>' +
      '<div class="host-controls">' +
        '<button class="secondary" data-action="finish">Afslut uden finalevinder</button>' +
      '</div>' +
    '</section>';
  }

  function finishedStage() {
    const sorted = store.data.teams.slice().sort(function (a, b) { return b.score - a.score; });
    const winner = sorted[0];
    return '<section class="show-stage finished-stage" aria-label="Scoreboard">' +
      '<div class="stage-rail">' +
        '<span>Scoreboard</span>' +
        '<span>' + esc(store.data.event.year || '????') + '</span>' +
        '<span>' + store.data.categories.length + ' kategorier</span>' +
      '</div>' +
      '<div class="winner">' +
        '<span class="label">Vinder</span>' +
        '<h1>' + esc(winner ? winner.name : 'Ingen') + '</h1>' +
        '<div class="final-scores">' +
          sorted.map(function (team, i) {
            return '<div>' +
              '<span>' + (i + 1) + '</span>' +
              '<strong>' + esc(team.name) + '</strong>' +
              '<em>' + esc(team.score) + ' point</em>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="host-controls">' +
        '<button class="secondary" data-action="start">Start forfra</button>' +
        '<button class="secondary" data-action="view" data-view="print">Print</button>' +
      '</div>' +
    '</section>';
  }

  // ─── PRINT ───────────────────────────────────────────────────────────────

  function printPreview() {
    return '<section class="print-preview" aria-label="Print">' +
      '<div class="print-toolbar"><div><span class="label">Print</span><h2>Ark</h2></div>' +
        '<button class="primary" data-action="print">Åbn print</button>' +
      '</div>' +
      '<div class="print-grid">' + hostSheet() + teamSheets() + '</div>' +
    '</section>';
  }

  function printSheets() {
    return '<section class="print-sheets" aria-label="Printark">' + hostSheet() + teamSheets() + '</section>';
  }

  function hostSheet() {
    const ev = store.data.event;
    return '<article class="print-sheet print-host">' +
      '<h2>Værtark — ' + esc(ev.year) + ': ' + esc(ev.title) + '</h2>' +
      '<p><strong>Point:</strong> Rigtigt +2 · Bonus +1 · Finale +3. Kategorier låses globalt ved brug.</p>' +
      store.data.categories.map(function (cat, i) {
        return '<section>' +
          '<h3>' + (i + 1) + '. ' + esc(cat.name) + '</h3>' +
          '<p><strong>Spørgsmål:</strong> ' + esc(cat.question) + '</p>' +
          '<p><strong>Svar:</strong> ' + esc(cat.answer) + '</p>' +
          (cat.explanation ? '<p><strong>Forklaring:</strong> ' + esc(cat.explanation) + '</p>' : '') +
        '</section>';
      }).join('') +
      '<section>' +
        '<h3>Finale</h3>' +
        '<p><strong>Spørgsmål:</strong> ' + esc(store.data.finale.question) + '</p>' +
        '<p><strong>Svar:</strong> ' + esc(store.data.finale.answer) + '</p>' +
        (store.data.finale.explanation ? '<p><strong>Forklaring:</strong> ' + esc(store.data.finale.explanation) + '</p>' : '') +
      '</section>' +
    '</article>';
  }

  function teamSheets() {
    return '<article class="print-sheet">' +
      '<h2>Holdark — ' + esc(store.data.event.year) + '</h2>' +
      store.data.teams.map(function (team) {
        return '<section>' +
          '<h3>' + esc(team.name) + '</h3>' +
          store.data.categories.map(function (cat, i) {
            return '<p>' + (i + 1) + '. ' + esc(cat.name) + ': _______________________________</p>';
          }).join('') +
          '<p>Finale: _______________________________</p>' +
          '<p>Point: ________</p>' +
        '</section>';
      }).join('') +
    '</article>';
  }

  // ─── RENDER ──────────────────────────────────────────────────────────────

  function render() {
    document.querySelector('#root').innerHTML =
      '<main class="app-shell view-' + esc(view) + ' phase-' + esc(store.state.phase) + '">' +
        topBar() +
        (view === 'producer' ? producerView() : '') +
        (view === 'show' ? showStage() : '') +
        (view === 'print' ? printPreview() : '') +
        printSheets() +
      '</main>';
    bindEvents();
  }

  // ─── EVENTS ──────────────────────────────────────────────────────────────

  function bindEvents() {
    document.querySelectorAll('input, textarea, select').forEach(function (el) {
      el.addEventListener('change', updateField);
    });
    document.querySelectorAll('[data-action]').forEach(function (el) {
      el.addEventListener('click', handleAction);
    });
  }

  function updateField(event) {
    const el = event.target;
    const kind = el.dataset.kind;
    const field = el.dataset.field;

    if (kind === 'event') {
      store.data.event[field] = el.value;
    }
    if (kind === 'team') {
      const team = store.data.teams[Number(el.dataset.index)];
      if (team) {
        if (field === 'score') team.score = Number(el.value) || 0;
        else team[field] = el.value;
      }
    }
    if (kind === 'cat') {
      const cat = store.data.categories[Number(el.dataset.index)];
      if (cat) cat[field] = el.value;
    }
    if (kind === 'finale') {
      store.data.finale[field] = el.value;
    }

    saveAndRender();
  }

  function handleAction(event) {
    const el = event.currentTarget;
    const action = el.dataset.action;

    if (action === 'view') {
      view = el.dataset.view || 'producer';
    }

    if (action === 'start') {
      window.HLGame.startShow(store);
      view = 'show';
    }

    if (action === 'start-cats') {
      window.HLGame.startCategories(store);
    }

    if (action === 'select-cat-editor') {
      editorCatId = el.dataset.catId || '';
    }

    if (action === 'select-cat-show') {
      window.HLGame.selectCategory(store, el.dataset.catId || '');
    }

    if (action === 'correct') {
      window.HLGame.markCorrect(store);
    }

    if (action === 'wrong') {
      window.HLGame.markWrong(store);
    }

    if (action === 'bonus') {
      window.HLGame.awardBonus(store, el.dataset.teamId || '');
    }

    if (action === 'next') {
      window.HLGame.nextTurn(store);
    }

    if (action === 'finale-correct') {
      window.HLGame.markFinaleCorrect(store, el.dataset.teamId || '');
    }

    if (action === 'finish') {
      window.HLGame.finishGame(store);
    }

    if (action === 'print') {
      window.print();
    }

    if (action === 'add-team') {
      const id = 'team-' + Date.now();
      store.data.teams.push({ id: id, name: 'Hold ' + (store.data.teams.length + 1), score: 0 });
    }

    if (action === 'remove-team') {
      const idx = Number(el.dataset.index);
      if (store.data.teams.length > 1) store.data.teams.splice(idx, 1);
      store.state.activeTeamIndex = Math.min(store.state.activeTeamIndex, store.data.teams.length - 1);
    }

    if (action === 'add-cat' && store.data.categories.length < 7) {
      const newCat = {
        id: 'cat-' + Date.now(),
        name: '',
        question: '',
        answer: '',
        explanation: '',
        used: false,
      };
      store.data.categories.push(newCat);
      editorCatId = newCat.id;
    }

    if (action === 'remove-cat') {
      const catId = el.dataset.catId || '';
      if (store.data.categories.length > 3) {
        store.data.categories = store.data.categories.filter(function (c) { return c.id !== catId; });
        if (editorCatId === catId) {
          editorCatId = store.data.categories[0] ? store.data.categories[0].id : '';
        }
      }
    }

    if (action === 'reset') {
      store = window.HLGame.reset(window.HLContent.template);
      editorCatId = store.data.categories[0] ? store.data.categories[0].id : '';
      view = 'producer';
    }

    saveAndRender();
  }

  render();
})();
