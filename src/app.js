(function () {
  const modeLabels = {
    bordhold: 'Bordhold',
    brudgom: 'Brud mod gom',
    frit: 'Frit antal hold',
  };

  const roleLabels = {
    'reveal-jury': 'Reveal og jury',
    helpers: 'Hjælper på hold',
    'own-team': 'Eget hold',
  };

  const formatLabels = {
    one_story: 'Tre ting, én historie',
    three_stories: 'Tre ting, tre historier',
  };

  let store = window.HLGame.createStore(window.HLContent.template);
  let view = store.state.phase === 'setup' ? 'producer' : 'show';

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function saveAndRender() {
    window.HLGame.save(store);
    render();
  }

  function currentIndex() {
    return Math.max(0, store.data.cases.findIndex((item) => item.id === store.state.activeCaseId));
  }

  function activeCaseIndex() {
    return Math.max(0, store.data.cases.findIndex((item) => item.id === window.HLGame.activeCase(store)?.id));
  }

  function formatLabel(format) {
    return formatLabels[format] || formatLabels.one_story;
  }

  function phaseText() {
    const labels = {
      setup: 'Setup',
      active_team: 'Aktivt hold',
      steal: 'Steal',
      reveal: 'Reveal',
      finished: 'Scoreboard',
    };
    return labels[store.state.phase] || 'Setup';
  }

  function render() {
    document.querySelector('#root').innerHTML = `
      <main class="app-shell view-${escapeHtml(view)} phase-${escapeHtml(store.state.phase)}">
        ${topBar()}
        ${view === 'producer' ? producerView() : ''}
        ${view === 'show' ? showStage() : ''}
        ${view === 'print' ? printPreview() : ''}
        ${printSheets()}
      </main>
    `;
    bindEvents();
  }

  function topBar() {
    const event = store.data.event;
    return `
      <header class="top-bar">
        <div class="brand">
          <span class="brand-mark" aria-hidden="true">HL</span>
          <div>
            <strong>Hovedpersonen Live</strong>
            <span>${escapeHtml(event.occasion)}</span>
          </div>
        </div>
        <nav class="view-tabs" aria-label="Arbejdsflader">
          ${['producer', 'show', 'print'].map((item) => `
            <button class="${view === item ? 'active' : ''}" data-action="view" data-view="${item}">
              ${escapeHtml(item === 'producer' ? 'Producer' : item === 'show' ? 'Show' : 'Print')}
            </button>
          `).join('')}
        </nav>
        <div class="event-summary">
          <strong>${escapeHtml(event.coupleA)} & ${escapeHtml(event.coupleB)}</strong>
          <span>${escapeHtml(event.date)}</span>
        </div>
      </header>
    `;
  }

  function producerView() {
    return `
      <section class="producer-grid" aria-label="Producer">
        ${rundownPanel()}
        ${caseEditor()}
        <aside class="side-stack">
          ${setupPanel()}
          ${runPanel()}
          ${scoreboard()}
        </aside>
      </section>
    `;
  }

  function rundownPanel() {
    return `
      <section class="panel rundown-panel">
        <div class="panel-heading">
          <div>
            <span class="label">Producer</span>
            <h2>Rundown</h2>
          </div>
          <button data-action="add-case">Tilføj case</button>
        </div>
        <div class="rundown-list">
          ${store.data.cases.map((item, index) => `
            <button class="rundown-row ${item.id === store.state.activeCaseId ? 'active' : ''}" data-action="select-case" data-case="${escapeHtml(item.id)}">
              <span>${String(index + 1).padStart(2, '0')}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <em>${escapeHtml(formatLabel(item.format))}</em>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  function setupPanel() {
    const event = store.data.event;
    return `
      <section class="panel setup-panel">
        <div class="panel-heading">
          <div>
            <span class="label">Event</span>
            <h2>Ærespar</h2>
          </div>
          <button class="ghost" data-action="reset">Nulstil demo</button>
        </div>
        <div class="form-grid">
          ${inputField('event', 'coupleA', 'Navn 1', event.coupleA)}
          ${inputField('event', 'coupleB', 'Navn 2', event.coupleB)}
          ${inputField('event', 'date', 'Dato / note', event.date)}
          ${inputField('event', 'tone', 'Tone', event.tone)}
        </div>
        <details class="advanced-settings">
          <summary>Hold og rolle</summary>
          <div class="form-grid">
            <label>
              <span>Holdmodel</span>
              <select data-kind="event" data-field="teamMode">${selectOptions(modeLabels, event.teamMode)}</select>
            </label>
            <label>
              <span>Æresparrets rolle</span>
              <select data-kind="event" data-field="coupleRole">${selectOptions(roleLabels, event.coupleRole)}</select>
            </label>
          </div>
          <div class="team-editor">
            <div class="section-title">
              <h3>Hold</h3>
              <button data-action="add-team">Tilføj hold</button>
            </div>
            ${store.data.teams.map(teamRow).join('')}
          </div>
        </details>
      </section>
    `;
  }

  function caseEditor() {
    const active = window.HLGame.activeCase(store);
    const index = activeCaseIndex();
    if (!active) return '';
    return `
      <section class="panel case-workbench">
        <div class="panel-heading">
          <div>
            <span class="label">Case ${String(index + 1).padStart(2, '0')}</span>
            <h2>${escapeHtml(active.title)}</h2>
          </div>
          <button class="ghost" data-action="remove-case" data-index="${index}">Fjern</button>
        </div>
        <article class="case-card active">
          <div class="case-head">
            <label>
              <span>Format</span>
              <select data-kind="case" data-index="${index}" data-field="format">
                ${selectOptions(formatLabels, active.format)}
              </select>
            </label>
            <label>
              <span>Aktivt hold</span>
              <select data-kind="case" data-index="${index}" data-field="activeTeamId">
                ${store.data.teams.map((team) => `<option value="${escapeHtml(team.id)}" ${team.id === active.activeTeamId ? 'selected' : ''}>${escapeHtml(team.name)}</option>`).join('')}
              </select>
            </label>
          </div>
          ${caseInput(index, 'title', 'Titel', active.title)}
          ${caseInput(index, 'storyOwner', 'Fortæller', active.storyOwner)}
          ${active.format === 'three_stories' ? optionsEditor(active, index) : cluesEditor(active, index)}
          <label>
            <span>Værtsnote</span>
            <textarea data-kind="case" data-index="${index}" data-field="prompt">${escapeHtml(active.prompt)}</textarea>
          </label>
          ${caseInput(index, 'question', 'Spørgsmål', active.question)}
          ${caseInput(index, 'answer', 'Korrekt svar', active.answer)}
          <label>
            <span>Reveal-note</span>
            <textarea data-kind="case" data-index="${index}" data-field="revealNote">${escapeHtml(active.revealNote)}</textarea>
          </label>
        </article>
      </section>
    `;
  }

  function cluesEditor(item, index) {
    return `
      <div class="clue-editor">
        ${item.clues.map((clue, clueIndex) => `
          <label>
            <span>Ting ${clueIndex + 1}</span>
            <input data-kind="clue" data-index="${index}" data-clue="${clueIndex}" value="${escapeHtml(clue)}" />
          </label>
        `).join('')}
      </div>
    `;
  }

  function optionsEditor(item, index) {
    return `
      <div class="option-editor">
        ${item.options.map((option, optionIndex) => `
          <fieldset>
            <legend>${String.fromCharCode(65 + optionIndex)}</legend>
            <label>
              <span>Ting</span>
              <input data-kind="option" data-index="${index}" data-option="${optionIndex}" data-field="clue" value="${escapeHtml(option.clue)}" />
            </label>
            <label>
              <span>Historie</span>
              <textarea data-kind="option" data-index="${index}" data-option="${optionIndex}" data-field="story">${escapeHtml(option.story)}</textarea>
            </label>
            <label class="check-row">
              <input type="radio" name="correct-option-${escapeHtml(item.id)}" data-kind="option" data-index="${index}" data-option="${optionIndex}" data-field="isCorrect" ${option.isCorrect ? 'checked' : ''} />
              <span>Korrekt</span>
            </label>
          </fieldset>
        `).join('')}
      </div>
    `;
  }

  function runPanel() {
    return `
      <section class="panel run-panel">
        <div class="panel-heading">
          <div>
            <span class="label">Test</span>
            <h2>Kørsel</h2>
          </div>
        </div>
        ${readinessChecklist()}
        <div class="run-actions">
          <button class="primary" data-action="start">Start show</button>
          <button class="secondary" data-action="view" data-view="print">Print</button>
        </div>
        <p class="run-note">Aktivt hold +2. Steal +1.</p>
      </section>
    `;
  }

  function readinessChecklist() {
    const filled = store.data.cases.filter((item) => item.storyOwner && item.question && item.answer).length;
    const clueReady = store.data.cases.filter((item) => item.format === 'three_stories' ? item.options.every((option) => option.clue && option.story) : item.clues.every(Boolean)).length;
    const items = [
      [`${filled}/${store.data.cases.length}`, 'cases med fortæller, spørgsmål og svar'],
      [`${clueReady}/${store.data.cases.length}`, 'cases med tre ting'],
      [`${store.data.teams.length}`, 'hold'],
      ['4', 'printark'],
    ];

    return `
      <div class="readiness-list" aria-label="Klar til test">
        <h3>Klar til test</h3>
        ${items.map(([count, text]) => `
          <div>
            <span>${escapeHtml(count)}</span>
            <p>${escapeHtml(text)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  function showStage() {
    if (store.state.finished || store.state.phase === 'finished') return finishedStage();
    const item = window.HLGame.activeCase(store);
    const team = window.HLGame.activeTeam(store);
    if (!item) return emptyStage();
    const isSteal = store.state.phase === 'steal';
    const isReveal = store.state.phase === 'reveal';
    const progress = `${currentIndex() + 1}/${store.data.cases.length}`;

    return `
      <section class="show-stage ${isReveal ? 'is-reveal' : ''}" aria-label="Show">
        <div class="stage-rail">
          <span>${escapeHtml(phaseText())}</span>
          <span>Case ${escapeHtml(progress)}</span>
          <span>${escapeHtml(formatLabel(item.format))}</span>
        </div>
        <div class="stage-grid">
          <div class="team-card">
            <span class="label">Aktivt hold</span>
            <h1>${escapeHtml(team?.name || 'Hold')}</h1>
            <p>${escapeHtml(item.title)}</p>
            <div class="score-line">${scoreLine()}</div>
          </div>
          <div class="story-card">
            <span class="label">${isReveal ? 'Korrekt svar' : item.storyOwner || 'Fortæller'}</span>
            <h2>${escapeHtml(isReveal ? item.answer : item.question)}</h2>
            ${item.format === 'three_stories' ? optionStage(item, isReveal) : clueStage(item)}
            <p class="story-prompt">${escapeHtml(isReveal ? item.revealNote : item.prompt)}</p>
          </div>
        </div>
        ${isSteal ? stealPanel() : ''}
        <div class="host-controls">
          ${store.state.phase === 'setup' ? '<button class="primary" data-action="start">Start show</button>' : ''}
          ${store.state.phase !== 'setup' && !isReveal && !isSteal ? '<button class="success" data-action="correct">Rigtigt +2</button><button class="danger" data-action="wrong">Forkert</button>' : ''}
          ${store.state.phase !== 'setup' && !isReveal ? '<button class="secondary" data-action="reveal">Reveal</button>' : ''}
          ${isReveal ? '<button class="primary" data-action="next">Næste</button>' : ''}
          ${store.state.phase !== 'setup' ? '<button class="secondary" data-action="finish">Afslut</button>' : ''}
        </div>
      </section>
    `;
  }

  function clueStage(item) {
    return `
      <div class="clue-grid">
        ${item.clues.map((clue, index) => `<div><span>${index + 1}</span><strong>${escapeHtml(clue)}</strong></div>`).join('')}
      </div>
    `;
  }

  function optionStage(item, isReveal) {
    return `
      <div class="choice-grid">
        ${item.options.map((option, index) => `
          <div class="${isReveal && option.isCorrect ? 'correct' : ''}">
            <span>${String.fromCharCode(65 + index)}</span>
            <strong>${escapeHtml(option.clue)}</strong>
            <p>${escapeHtml(option.story)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  function stealPanel() {
    const activeId = store.state.activeTeamId;
    const teams = store.data.teams.filter((team) => team.id !== activeId);
    return `
      <div class="steal-panel" aria-label="Steal">
        <div>
          <span class="label">Stjæl +1</span>
          <p>Vælg holdet der svarer rigtigt.</p>
        </div>
        <div class="steal-actions">
          ${teams.map((team) => `<button data-action="steal" data-team="${escapeHtml(team.id)}">${escapeHtml(team.name)} +1</button>`).join('')}
        </div>
      </div>
    `;
  }

  function finishedStage() {
    const sorted = [...store.data.teams].sort((a, b) => b.score - a.score);
    const winner = sorted[0];
    return `
      <section class="show-stage finished-stage" aria-label="Scoreboard">
        <div class="stage-rail">
          <span>Finale</span>
          <span>${escapeHtml(store.data.cases.length)} cases</span>
          <span>${escapeHtml(roleLabels[store.data.event.coupleRole])}</span>
        </div>
        <div class="winner">
          <span class="label">Scoreboard</span>
          <h1>${escapeHtml(winner?.name || 'Score')}</h1>
          <div class="final-scores">
            ${sorted.map((team, index) => `<div><span>${index + 1}</span><strong>${escapeHtml(team.name)}</strong><em>${escapeHtml(team.score)} point</em></div>`).join('')}
          </div>
        </div>
        <div class="host-controls">
          <button class="secondary" data-action="start">Start forfra</button>
          <button class="secondary" data-action="view" data-view="print">Print</button>
        </div>
      </section>
    `;
  }

  function emptyStage() {
    return '<section class="show-stage"><div class="winner"><h1>Ingen cases</h1></div></section>';
  }

  function printPreview() {
    return `
      <section class="print-preview" aria-label="Print">
        <div class="print-toolbar">
          <div>
            <span class="label">Print</span>
            <h2>Ark</h2>
          </div>
          <button class="primary" data-action="print">Åbn print</button>
        </div>
        <div class="print-grid">
          ${hostSheet()}
          ${caseCards()}
          ${propCards()}
          ${teamSheets()}
        </div>
      </section>
    `;
  }

  function printSheets() {
    return `<section class="print-sheets" aria-label="Printark">${hostSheet()}${caseCards()}${propCards()}${teamSheets()}</section>`;
  }

  function hostSheet() {
    return `
      <article class="print-sheet print-host">
        <h2>Værtark: ${escapeHtml(store.data.event.coupleA)} & ${escapeHtml(store.data.event.coupleB)}</h2>
        <p><strong>Point:</strong> aktivt hold +2. Steal +1. Rolle: ${escapeHtml(roleLabels[store.data.event.coupleRole])}.</p>
        ${store.data.cases.map((item, index) => `
          <section>
            <h3>${index + 1}. ${escapeHtml(item.title)}</h3>
            <p><strong>Format:</strong> ${escapeHtml(formatLabel(item.format))}</p>
            <p><strong>Hold:</strong> ${escapeHtml(teamName(item.activeTeamId))}</p>
            <p><strong>Fortæller:</strong> ${escapeHtml(item.storyOwner)}</p>
            <p><strong>Ting:</strong> ${printClues(item)}</p>
            <p><strong>Spørgsmål:</strong> ${escapeHtml(item.question)}</p>
            <p><strong>Svar:</strong> ${escapeHtml(item.answer)}</p>
            <p><strong>Reveal:</strong> ${escapeHtml(item.revealNote)}</p>
          </section>
        `).join('')}
      </article>
    `;
  }

  function caseCards() {
    return `
      <article class="print-sheet">
        <h2>Casekort</h2>
        ${store.data.cases.map((item, index) => `
          <section>
            <h3>${index + 1}. ${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.prompt)}</p>
            <p><strong>${escapeHtml(item.question)}</strong></p>
          </section>
        `).join('')}
      </article>
    `;
  }

  function propCards() {
    return `
      <article class="print-sheet">
        <h2>Rekvisitkort</h2>
        ${store.data.cases.map((item, index) => `
          <section>
            <h3>${index + 1}. ${escapeHtml(item.title)}</h3>
            <p>${printClues(item)}</p>
          </section>
        `).join('')}
      </article>
    `;
  }

  function teamSheets() {
    return `
      <article class="print-sheet">
        <h2>Holdark</h2>
        ${store.data.teams.map((team) => `
          <section>
            <h3>${escapeHtml(team.name)}</h3>
            ${store.data.cases.map((item, index) => `<p>${index + 1}. ${escapeHtml(item.title)}: _______________________________</p>`).join('')}
            <p>Point: ________</p>
          </section>
        `).join('')}
      </article>
    `;
  }

  function printClues(item) {
    const clues = item.format === 'three_stories' ? item.options.map((option) => option.clue) : item.clues;
    return clues.map(escapeHtml).join(' / ');
  }

  function scoreboard() {
    const sorted = [...store.data.teams].sort((a, b) => b.score - a.score);
    return `
      <section class="panel scoreboard" aria-label="Scoreboard">
        <div class="section-title">
          <h2>Score</h2>
          <span>${escapeHtml(store.state.completedCaseIds.length)} / ${escapeHtml(store.data.cases.length)}</span>
        </div>
        <div class="score-strip">
          ${sorted.map((team, index) => `<div class="score-chip"><span>${index + 1}</span><strong>${escapeHtml(team.name)}</strong><em>${escapeHtml(team.score)}</em></div>`).join('')}
        </div>
      </section>
    `;
  }

  function scoreLine() {
    if (store.state.lastScoreEvent) return escapeHtml(store.state.lastScoreEvent);
    const team = window.HLGame.activeTeam(store);
    if (!team) return 'Ingen hold';
    return `${escapeHtml(team.name)} · ${escapeHtml(team.score)} point`;
  }

  function inputField(kind, field, label, value) {
    return `
      <label>
        <span>${escapeHtml(label)}</span>
        <input data-kind="${escapeHtml(kind)}" data-field="${escapeHtml(field)}" value="${escapeHtml(value)}" />
      </label>
    `;
  }

  function caseInput(index, field, label, value) {
    return `
      <label>
        <span>${escapeHtml(label)}</span>
        <input data-kind="case" data-index="${index}" data-field="${escapeHtml(field)}" value="${escapeHtml(value)}" />
      </label>
    `;
  }

  function selectOptions(labels, selected) {
    return Object.entries(labels)
      .map(([value, label]) => `<option value="${escapeHtml(value)}" ${value === selected ? 'selected' : ''}>${escapeHtml(label)}</option>`)
      .join('');
  }

  function teamRow(team, index) {
    return `
      <div class="team-row">
        <input data-kind="team" data-index="${index}" data-field="name" value="${escapeHtml(team.name)}" aria-label="Holdnavn" />
        <input data-kind="team" data-index="${index}" data-field="score" type="number" value="${escapeHtml(team.score)}" aria-label="Point" />
        <button class="ghost" data-action="remove-team" data-index="${index}">Fjern</button>
      </div>
    `;
  }

  function teamName(teamId) {
    return store.data.teams.find((team) => team.id === teamId)?.name || 'Vælg hold';
  }

  function bindEvents() {
    document.querySelectorAll('input, textarea, select').forEach((field) => {
      field.addEventListener('change', updateField);
    });
    document.querySelectorAll('[data-action]').forEach((button) => {
      button.addEventListener('click', handleAction);
    });
  }

  function updateField(event) {
    const el = event.target;
    const kind = el.dataset.kind;
    const field = el.dataset.field;

    if (kind === 'event') store.data.event[field] = el.value;

    if (kind === 'team') {
      const team = store.data.teams[Number(el.dataset.index)];
      if (field === 'score') team.score = Number(el.value) || 0;
      else team[field] = el.value;
    }

    if (kind === 'case') {
      const item = store.data.cases[Number(el.dataset.index)];
      item[field] = el.value;
      if (field === 'activeTeamId' && item.id === store.state.activeCaseId) store.state.activeTeamId = el.value;
      if (field === 'format' && item.format === 'three_stories' && (!Array.isArray(item.options) || item.options.length < 3)) {
        item.options = item.clues.map((clue, index) => ({ clue, story: index === 0 ? item.answer : '', isCorrect: index === 0 }));
      }
    }

    if (kind === 'clue') {
      store.data.cases[Number(el.dataset.index)].clues[Number(el.dataset.clue)] = el.value;
    }

    if (kind === 'option') {
      const item = store.data.cases[Number(el.dataset.index)];
      const option = item.options[Number(el.dataset.option)];
      if (field === 'isCorrect') {
        if (!el.checked) return;
        item.options.forEach((candidate) => {
          candidate.isCorrect = false;
        });
        option.isCorrect = el.checked;
      } else {
        option[field] = el.value;
      }
    }

    saveAndRender();
  }

  function handleAction(event) {
    const action = event.currentTarget.dataset.action;
    const index = Number(event.currentTarget.dataset.index);

    if (action === 'view') view = event.currentTarget.dataset.view || 'producer';
    if (action === 'start') {
      store.data.teams.forEach((team) => {
        team.score = 0;
      });
      window.HLGame.startShow(store);
      view = 'show';
    }
    if (action === 'correct') window.HLGame.markCorrect(store);
    if (action === 'wrong') window.HLGame.markWrong(store);
    if (action === 'reveal') window.HLGame.reveal(store);
    if (action === 'next') window.HLGame.nextTurn(store);
    if (action === 'finish') window.HLGame.finish(store);
    if (action === 'print') window.print();
    if (action === 'steal') window.HLGame.awardSteal(store, event.currentTarget.dataset.team);
    if (action === 'select-case') {
      const item = store.data.cases.find((candidate) => candidate.id === event.currentTarget.dataset.case);
      if (item) {
        store.state.activeCaseId = item.id;
        store.state.activeTeamId = item.activeTeamId;
        if (store.state.phase !== 'setup') store.state.phase = 'active_team';
      }
    }
    if (action === 'add-team') {
      const id = `team-${Date.now()}`;
      store.data.teams.push({ id, name: `Hold ${store.data.teams.length + 1}`, score: 0 });
    }
    if (action === 'remove-team' && store.data.teams.length > 1) {
      const removed = store.data.teams.splice(index, 1)[0];
      store.data.cases.forEach((item, caseIndex) => {
        if (item.activeTeamId === removed.id) item.activeTeamId = store.data.teams[caseIndex % store.data.teams.length].id;
      });
    }
    if (action === 'add-case') {
      const team = store.data.teams[store.data.cases.length % store.data.teams.length];
      const item = {
        id: `case-${Date.now()}`,
        format: 'one_story',
        title: 'Ny case',
        activeTeamId: team.id,
        storyOwner: '',
        clues: ['Ting 1', 'Ting 2', 'Ting 3'],
        prompt: 'Fortæller tager de tre ting en efter en.',
        question: 'Hvad skete der?',
        answer: '',
        revealNote: '',
        options: [
          { clue: 'Ting 1', story: '', isCorrect: true },
          { clue: 'Ting 2', story: '', isCorrect: false },
          { clue: 'Ting 3', story: '', isCorrect: false },
        ],
      };
      store.data.cases.push(item);
      store.state.activeCaseId = item.id;
      store.state.activeTeamId = item.activeTeamId;
    }
    if (action === 'remove-case' && store.data.cases.length > 1) {
      store.data.cases.splice(index, 1);
      if (!store.data.cases.some((item) => item.id === store.state.activeCaseId)) {
        store.state.activeCaseId = store.data.cases[0].id;
        store.state.activeTeamId = store.data.cases[0].activeTeamId;
      }
    }
    if (action === 'reset') {
      store = window.HLGame.reset(window.HLContent.template);
      view = 'producer';
    }

    saveAndRender();
  }

  render();
})();
