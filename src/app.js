(function () {
  let store = window.HLGame.createStore(window.HLContent.template);
  let view = loadView();
  let presenting = loadPresenting();
  let editorCatId = store.data.categories[0] ? store.data.categories[0].id : '';

  // Presentation mode = a clean, full-screen audience display. It hides the
  // view-tabs and host controls (the iPad drives the game), so the projector
  // shows only the stage + scoreboard. Local-only; never synced to the server.
  function loadPresenting() {
    try {
      return window.localStorage.getItem('hl-presenting') === '1';
    } catch (e) {
      return false;
    }
  }

  function setPresenting(on) {
    presenting = on;
    try {
      window.localStorage.setItem('hl-presenting', on ? '1' : '0');
    } catch (e) {}
    try {
      if (on && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(function () {});
      } else if (!on && document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(function () {});
      }
    } catch (e) {}
    render();
  }

  // Restore the active surface across reloads so an accidental refresh
  // mid-show doesn't drop the host onto the Producer view (which would
  // expose every question and answer on a projected screen).
  function loadView() {
    try {
      const raw = window.localStorage.getItem(window.HLGame.STORAGE_KEY);
      const saved = raw ? JSON.parse(raw) : null;
      const v = saved && saved.view;
      return (v === 'producer' || v === 'show' || v === 'print') ? v : 'producer';
    } catch (e) {
      return 'producer';
    }
  }

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function saveAndRender() {
    store.view = view;
    store._ts = Date.now();
    window.HLGame.save(store);
    syncToServer(store);
    render();
  }

  function syncToServer(s) {
    fetch('/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(s),
    }).catch(function () {});
  }

  var _lastRemoteTs = null;
  function pollServer() {
    fetch('/state')
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res.ok && res.state && res.state._ts && res.state._ts !== _lastRemoteTs) {
          var incoming = res.state;
          if (!store._ts || incoming._ts > store._ts) {
            _lastRemoteTs = incoming._ts;
            store.data = incoming.data;
            store.state = incoming.state;
            store._ts = incoming._ts;
            if (incoming.view && incoming.view !== view) {
              view = incoming.view;
            }
            window.HLGame.save(store);
            render();
          }
        }
      })
      .catch(function () {})
      .finally(function () { setTimeout(pollServer, 800); });
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
      '<div class="event-summary"><strong>' + esc(store.data.event.title || 'Årstalsquiz') + '</strong>' +
        (view === 'show' ? '<button class="present-btn" data-action="present" title="Fuldskærms-præsentation til publikum">▶ Præsentér</button>' : '') +
      '</div>' +
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
    let totalQ = 0;
    let readyQ = 0;
    cats.forEach(function (c) {
      c.questions.forEach(function (q) {
        totalQ += 1;
        if (q.question && q.answer) readyQ += 1;
      });
    });
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
          '<h3>' + (readyQ === totalQ ? 'Klar' : 'Mangler svar') + '</h3>' +
          readinessRow(String(store.data.teams.length), 'hold') +
          readinessRow(String(cats.length) + '/7', 'kategorier oprettet') +
          readinessRow(String(readyQ) + '/' + String(totalQ), 'spørgsmål med svar') +
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
          const qCount = cat.questions.length;
          return '<button class="cat-editor-row ' + (active ? 'active' : '') + '" data-action="select-cat-editor" data-cat-id="' + esc(cat.id) + '">' +
            '<span class="cat-index">' + String(index + 1).padStart(2, '0') + '</span>' +
            '<strong>' + (cat.name ? esc(cat.name) : '<em style="opacity:.5">Navn mangler</em>') + '</strong>' +
            '<span class="cat-status">' + qCount + ' spm</span>' +
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
      '<label><span>Kategorinavn</span>' +
        '<input data-kind="cat-name" data-cat-id="' + esc(cat.id) + '" value="' + esc(cat.name) + '" /></label>' +
      '<div class="question-list" style="margin-top:14px;display:flex;flex-direction:column;gap:12px">' +
        cat.questions.map(function (q, qi) {
          return '<article class="case-card active">' +
            '<div class="panel-heading" style="margin-bottom:8px">' +
              '<span class="label">Spørgsmål ' + (qi + 1) + '</span>' +
              (cat.questions.length > 1 ? '<button class="ghost" data-action="remove-question" data-cat-id="' + esc(cat.id) + '" data-q-index="' + qi + '">Fjern</button>' : '') +
            '</div>' +
            questionInput(cat.id, qi, 'question', 'Spørgsmål', q.question) +
            questionInput(cat.id, qi, 'answer', 'Svar', q.answer) +
            '<label>' +
              '<span>Forklaring (valgfri)</span>' +
              '<textarea data-kind="question" data-cat-id="' + esc(cat.id) + '" data-q-index="' + qi + '" data-field="explanation">' + esc(q.explanation) + '</textarea>' +
            '</label>' +
          '</article>';
        }).join('') +
        '<button data-action="add-question" data-cat-id="' + esc(cat.id) + '">Tilføj spørgsmål</button>' +
      '</div>' +
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

  function questionInput(catId, qIndex, field, label, value) {
    return '<label><span>' + esc(label) + '</span>' +
      '<input data-kind="question" data-cat-id="' + esc(catId) + '" data-q-index="' + qIndex + '" data-field="' + esc(field) + '" value="' + esc(value) + '" /></label>';
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
        '<span>' + esc(window.HLGame.totalRemaining(store)) + ' spørgsmål tilbage</span>' +
      '</div>' +
      liveScore() +
      '<div class="category-board ' + countClass + '">' +
        cats.map(function (cat) {
          const remaining = window.HLGame.remainingInCategory(cat);
          const used = remaining === 0;
          return '<button class="cat-tile' + (used ? ' used' : '') + '" ' +
            (used ? 'disabled aria-disabled="true"' : 'data-action="select-cat-show" data-cat-id="' + esc(cat.id) + '"') + '>' +
            esc(cat.name) +
            '<span class="cat-tile-count">' + remaining + ' tilbage</span>' +
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
    const q = window.HLGame.activeQuestion(store);
    if (!cat || !q) return categoryBoardStage();
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
          '<h2>' + esc(q.question) + '</h2>' +
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
    const q = window.HLGame.activeQuestion(store);
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
          '<h1>' + (q ? esc(q.answer) : '') + '</h1>' +
          (scoreEvent ? '<div class="score-line">' + esc(scoreEvent) + '</div>' : '') +
        '</div>' +
        '<div class="story-card">' +
          '<span class="label">' + (isCorrect ? 'Korrekt' : 'Forkert') + '</span>' +
          '<h2>' + (q ? esc(q.question) : '') + '</h2>' +
          (q && q.explanation ? '<p class="story-prompt">' + esc(q.explanation) + '</p>' : '') +
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
          cat.questions.map(function (q, qi) {
            return '<div style="margin-bottom:8px">' +
              '<p><strong>Spørgsmål ' + (qi + 1) + ':</strong> ' + esc(q.question) + '</p>' +
              '<p><strong>Svar:</strong> ' + esc(q.answer) + '</p>' +
              (q.explanation ? '<p><strong>Forklaring:</strong> ' + esc(q.explanation) + '</p>' : '') +
            '</div>';
          }).join('') +
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
    if (presenting) {
      document.querySelector('#root').innerHTML =
        '<main class="app-shell present-mode phase-' + esc(store.state.phase) + '">' +
          showStage() +
          '<button class="present-exit" data-action="exit-present">Afslut præsentation</button>' +
        '</main>';
      bindEvents();
      return;
    }
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
    if (kind === 'cat-name') {
      const cat = store.data.categories.find(function (c) { return c.id === el.dataset.catId; });
      if (cat) cat.name = el.value;
    }
    if (kind === 'question') {
      const cat = store.data.categories.find(function (c) { return c.id === el.dataset.catId; });
      const q = cat && cat.questions[Number(el.dataset.qIndex)];
      if (q) q[field] = el.value;
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

    if (action === 'present') {
      setPresenting(true);
      return;
    }

    if (action === 'exit-present') {
      setPresenting(false);
      return;
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
        questions: [{ question: '', answer: '', explanation: '', used: false }],
      };
      store.data.categories.push(newCat);
      editorCatId = newCat.id;
    }

    if (action === 'add-question') {
      const cat = store.data.categories.find(function (c) { return c.id === el.dataset.catId; });
      if (cat) cat.questions.push({ question: '', answer: '', explanation: '', used: false });
    }

    if (action === 'remove-question') {
      const cat = store.data.categories.find(function (c) { return c.id === el.dataset.catId; });
      const qi = Number(el.dataset.qIndex);
      if (cat && cat.questions.length > 1) cat.questions.splice(qi, 1);
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
      if (!window.confirm('Nulstil til demo-data? Al forberedelse slettes.')) return;
      store = window.HLGame.reset(window.HLContent.template);
      editorCatId = store.data.categories[0] ? store.data.categories[0].id : '';
      view = 'producer';
    }

    saveAndRender();
  }

  // Leaving fullscreen (e.g. pressing Esc) drops out of presentation mode too,
  // so the host lands back on the normal Show view with the tabs.
  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement && presenting) {
      presenting = false;
      try { window.localStorage.setItem('hl-presenting', '0'); } catch (e) {}
      render();
    }
  });

  render();
  pollServer();
})();
