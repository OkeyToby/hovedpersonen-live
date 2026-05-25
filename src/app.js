(function () {
  const modeLabels = {
    bordhold: 'Bordhold',
    brudgom: 'Brud mod Gom',
    frit: 'Frit antal hold',
  };

  const roleLabels = {
    'reveal-jury': 'Reveal og jury',
    helpers: 'Hjælper på hold',
    'own-team': 'Eget hold',
  };

  let store = window.HLGame.createStore(window.HLContent.template);

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
    return Math.max(
      0,
      store.data.cases.findIndex((item) => item.id === store.state.activeCaseId)
    );
  }

  function phaseText() {
    const labels = {
      setup: 'Setup',
      active_team: 'Aktivt hold',
      steal: 'Stjæl point',
      reveal: 'Reveal',
      finished: 'Scoreboard',
    };
    return labels[store.state.phase] || 'Setup';
  }

  function render() {
    const isSetup = store.state.phase === 'setup';
    document.querySelector('#root').innerHTML = `
      <main class="app-shell phase-${escapeHtml(store.state.phase)}">
        ${topBar()}
        ${isSetup ? setupFlow() : showStage()}
        ${printSheets()}
      </main>
    `;
    bindEvents();
  }

  function setupFlow() {
    return `
      ${setupHero()}
      <section class="setup-flow" aria-label="Guidet forberedelse">
        ${setupSteps()}
        <div class="guided-workspace">
          ${setupPanel()}
          ${caseEditor()}
          ${runPanel()}
        </div>
      </section>
    `;
  }

  function setupHero() {
    const event = store.data.event;
    const readyItems = [
      ['Format', 'Tre ting, en historie'],
      ['Kort', `${store.data.cases.length} klar`],
      ['Hold', `${store.data.teams.length} bordhold`],
      ['Backup', 'Printark klar'],
    ];

    return `
      <section class="setup-hero" aria-label="Forberedelsesstatus">
        <div class="setup-hero-copy">
          <span class="anniversary-seal" aria-hidden="true">50</span>
          <span class="label">Klar til guldbryllup</span>
          <h1>Tre trin fra idé til færdigt indslag</h1>
          <p>Udfyld festen, lav historiekortene og print en backup. Showfladen er klar, når rummet er klar.</p>
        </div>
        <div class="ready-board" aria-label="Fest klar status">
          ${readyItems
            .map(
              ([label, value]) => `
                <div>
                  <span>${escapeHtml(label)}</span>
                  <strong>${escapeHtml(value)}</strong>
                </div>`
            )
            .join('')}
        </div>
      </section>
    `;
  }

  function setupSteps() {
    const steps = [
      ['1', 'Festen', `${store.data.event.coupleA} & ${store.data.event.coupleB}`],
      ['2', 'Historiekort', `${currentIndex() + 1}/${store.data.cases.length} valgt`],
      ['3', 'Kør og print', 'Start show eller print'],
    ];

    return `
      <ol class="setup-steps" aria-label="Forberedelsestrin">
        ${steps
          .map(
            ([number, title, detail]) => `
              <li>
                <span>${escapeHtml(number)}</span>
                <div>
                  <strong>${escapeHtml(title)}</strong>
                  <em>${escapeHtml(detail)}</em>
                </div>
              </li>`
          )
          .join('')}
      </ol>
    `;
  }

  function topBar() {
    const event = store.data.event;
    const startLabel = store.state.phase === 'setup' ? 'Start show' : 'Genstart show';
    return `
      <header class="top-bar">
        <div class="brand">
          <span class="brand-mark" aria-hidden="true">50</span>
          <div>
            <strong>Hovedpersonen Live</strong>
            <span>Guldbryllups-game show</span>
          </div>
        </div>
        <div class="event-summary">
          <span>${escapeHtml(event.occasion)}</span>
          <strong>${escapeHtml(event.coupleA)} & ${escapeHtml(event.coupleB)}</strong>
          <span>${escapeHtml(event.date)}</span>
        </div>
        <div class="top-actions">
          <button class="secondary" data-action="print">Print ark</button>
          <button class="primary" data-action="start">${escapeHtml(startLabel)}</button>
        </div>
      </header>
    `;
  }

  function showStage() {
    if (store.state.phase === 'finished') return finishedStage();

    const item = window.HLGame.activeCase(store);
    const team = window.HLGame.activeTeam(store);
    const isSetup = store.state.phase === 'setup';
    const isSteal = store.state.phase === 'steal';
    const isReveal = store.state.phase === 'reveal';
    const progress = `${currentIndex() + 1}/${store.data.cases.length}`;

    return `
      <section class="show-stage" aria-label="Storskærm">
        <div class="stage-rail">
          <span>${escapeHtml(phaseText())}</span>
          <span>Case ${escapeHtml(progress)}</span>
          <span>${escapeHtml(modeLabels[store.data.event.teamMode])}</span>
        </div>
        <div class="stage-grid">
          <div class="team-card">
            <span class="label">Aktivt hold</span>
            <h1>${escapeHtml(isSetup ? 'Klar til guldbryllup' : team?.name)}</h1>
            <p>${escapeHtml(isSetup ? 'Udfyld hold og historier. Start show når rummet er klar.' : item.title)}</p>
            <div class="score-line">${scoreLine()}</div>
          </div>
          <div class="story-card">
            <span class="label">${isReveal ? 'Korrekt svar' : 'Tre ting, en historie'}</span>
            <h2>${escapeHtml(isReveal ? item.answer : item.question)}</h2>
            <div class="clue-grid">
              ${item.clues.map((clue, index) => `<div><span>${index + 1}</span><strong>${escapeHtml(clue)}</strong></div>`).join('')}
            </div>
            <p class="story-prompt">${escapeHtml(isReveal ? item.revealNote : item.prompt)}</p>
          </div>
        </div>
        ${isSteal ? stealPanel() : ''}
        <div class="host-controls">
          ${isSetup ? '<button class="primary" data-action="start">Start show</button>' : ''}
          ${!isSetup && !isReveal && !isSteal ? '<button class="success" data-action="correct">Korrekt (+2)</button><button class="danger" data-action="wrong">Forkert</button>' : ''}
          ${!isSetup && !isReveal ? '<button class="secondary" data-action="reveal">Reveal uden point</button>' : ''}
          ${isReveal ? '<button class="primary" data-action="next">Næste</button>' : ''}
          ${!isSetup ? '<button class="secondary" data-action="finish">Afslut</button>' : ''}
        </div>
      </section>
    `;
  }

  function scoreLine() {
    if (store.state.lastScoreEvent) return escapeHtml(store.state.lastScoreEvent);
    const team = window.HLGame.activeTeam(store);
    if (!team) return 'Ingen hold endnu';
    return `${escapeHtml(team.name)} har ${escapeHtml(team.score)} point`;
  }

  function stealPanel() {
    const activeId = store.state.activeTeamId;
    const teams = store.data.teams.filter((team) => team.id !== activeId);
    return `
      <div class="steal-panel" aria-label="Stjæl point">
        <div>
          <span class="label">Stjæl point</span>
          <p>Vælg et andet hold, hvis de kan svare rigtigt.</p>
        </div>
        <div class="steal-actions">
          ${teams.map((team) => `<button data-action="steal" data-team="${escapeHtml(team.id)}">${escapeHtml(team.name)} (+1)</button>`).join('')}
        </div>
      </div>
    `;
  }

  function finishedStage() {
    const winner = [...store.data.teams].sort((a, b) => b.score - a.score)[0];
    return `
      <section class="show-stage finished-stage" aria-label="Afsluttet show">
        <div class="stage-rail">
          <span>Finale</span>
          <span>${escapeHtml(store.data.cases.length)} cases spillet</span>
          <span>${escapeHtml(roleLabels[store.data.event.coupleRole])}</span>
        </div>
        <div class="winner">
          <span class="label">Vinder</span>
          <h1>${escapeHtml(winner?.name || 'Tak for spillet')}</h1>
          <p>${escapeHtml(winner ? `${winner.score} point - og en god undskyldning for at fortælle en historie mere.` : 'Opret hold for at vise scoreboard.')}</p>
        </div>
        <div class="host-controls">
          <button class="secondary" data-action="start">Start forfra</button>
          <button class="secondary" data-action="print">Print ark</button>
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
            <span class="label">Trin 1</span>
            <h2>Festen</h2>
          </div>
          <button class="ghost" data-action="reset">Nulstil demo</button>
        </div>
        <div class="form-grid">
          ${inputField('event', 'coupleA', 'Navn 1', event.coupleA)}
          ${inputField('event', 'coupleB', 'Navn 2', event.coupleB)}
          ${inputField('event', 'date', 'Dato / note', event.date)}
          <label>
            <span>Tone</span>
            <input data-kind="event" data-field="tone" value="${escapeHtml(event.tone)}" />
          </label>
        </div>
        <details class="advanced-settings">
          <summary>Indstillinger for hold og ærespar</summary>
          <div class="form-grid">
            <label>
              <span>Holdmodel</span>
              <select data-kind="event" data-field="teamMode">
                ${selectOptions(modeLabels, event.teamMode)}
              </select>
            </label>
            <label>
              <span>Æresparrets rolle</span>
              <select data-kind="event" data-field="coupleRole">
                ${selectOptions(roleLabels, event.coupleRole)}
              </select>
            </label>
          </div>
          <div class="team-editor">
            <div class="section-title"><h3>Hold og point</h3><button data-action="add-team">Tilføj hold</button></div>
            ${store.data.teams.map(teamRow).join('')}
          </div>
        </details>
      </section>
    `;
  }

  function inputField(kind, field, label, value) {
    return `
      <label>
        <span>${escapeHtml(label)}</span>
        <input data-kind="${escapeHtml(kind)}" data-field="${escapeHtml(field)}" value="${escapeHtml(value)}" />
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

  function caseEditor() {
    const active = window.HLGame.activeCase(store);
    const activeIndex = Math.max(0, store.data.cases.findIndex((item) => item.id === active?.id));
    return `
      <section class="panel cases-panel">
        <div class="panel-heading">
          <div>
            <span class="label">Trin 2</span>
            <h2>Historiekort</h2>
          </div>
          <button data-action="add-case">Tilføj kort</button>
        </div>
        ${caseTabs()}
        ${active ? activeCaseCard(active, activeIndex) : ''}
        <div class="host-card-preview" aria-label="Værtkort preview">
          <span class="label">Værtkort preview</span>
          <h3>${escapeHtml(active?.title || 'Ny historie')}</h3>
          <p>${escapeHtml(active?.prompt || 'Tilføj en historie for at se preview.')}</p>
          <div>${(active?.clues || []).map((clue) => `<span>${escapeHtml(clue)}</span>`).join('')}</div>
        </div>
      </section>
    `;
  }

  function caseTabs() {
    return `
      <div class="case-tabs" aria-label="Historiekort">
        ${store.data.cases
          .map(
            (item, index) => `
              <button class="${item.id === store.state.activeCaseId ? 'active' : ''}" data-action="select-case" data-case="${escapeHtml(item.id)}">
                Kort ${index + 1}
              </button>`
          )
          .join('')}
      </div>
    `;
  }

  function activeCaseCard(item, index) {
    return `
      <article class="case-card active story-editor-card">
        <div class="case-head">
          <strong>Kort ${index + 1}</strong>
          <select data-kind="case" data-index="${index}" data-field="activeTeamId" aria-label="Aktivt hold">
            ${store.data.teams.map((team) => `<option value="${escapeHtml(team.id)}" ${team.id === item.activeTeamId ? 'selected' : ''}>${escapeHtml(team.name)}</option>`).join('')}
          </select>
          <button class="ghost" data-action="remove-case" data-index="${index}">Fjern</button>
        </div>
        ${caseInput(index, 'title', 'Titel', item.title)}
        ${caseInput(index, 'storyOwner', 'Gæst der fortæller', item.storyOwner)}
        <div class="clue-editor">
          ${item.clues.map((clue, clueIndex) => `
            <label>
              <span>Ting ${clueIndex + 1}</span>
              <input data-kind="clue" data-index="${index}" data-clue="${clueIndex}" value="${escapeHtml(clue)}" />
            </label>
          `).join('')}
        </div>
        <label>
          <span>Oplæsningsnote</span>
          <textarea data-kind="case" data-index="${index}" data-field="prompt">${escapeHtml(item.prompt)}</textarea>
        </label>
        ${caseInput(index, 'question', 'Spørgsmål til aktivt hold', item.question)}
        ${caseInput(index, 'answer', 'Korrekt svar', item.answer)}
        <label>
          <span>Reveal-kommentar</span>
          <textarea data-kind="case" data-index="${index}" data-field="revealNote">${escapeHtml(item.revealNote)}</textarea>
        </label>
      </article>
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

  function scoreboard() {
    const sorted = [...store.data.teams].sort((a, b) => b.score - a.score);
    return `
      <section class="scoreboard" aria-label="Scoreboard">
        <div class="section-title">
          <h2>Scoreboard</h2>
          <span>${escapeHtml(store.state.completedCaseIds.length)} af ${escapeHtml(store.data.cases.length}} cases afsluttet</span>
        </div>
        <div class="score-strip">
          ${sorted.map((team, index) => `<div class="score-chip"><span>${index + 1}</span><strong>${escapeHtml(team.name)}</strong><em>${escapeHtml(team.score)}</em></div>`).join('')}
        </div>
      </section>
    `;
  }

  function runPanel() {
    return `
      <section class="panel run-panel">
        <div class="panel-heading">
          <div>
            <span class="label">Trin 3</span>
            <h2>Kør og print</h2>
          </div>
        </div>
        ${readinessChecklist()}
        <div class="run-actions">
          <button class="primary" data-action="start">Start show</button>
          <button class="secondary" data-action="print">Print ark</button>
        </div>
        <p class="run-note">Point: aktivt hold +2. Stjålet svar +1. Æresparret er reveal og jury som standard.</p>
      </section>
    `;
  }

  function readinessChecklist() {
    const filledStories = store.data.cases.filter((item) => item.storyOwner && item.question && item.answer).length;
    const hasClues = store.data.cases.filter((item) => item.clues.every(Boolean)).length;
    const items = [
      [`${filledStories}/${store.data.cases.length}`, 'historier har gæst, spørgsmål og svar'],
      [`${hasClues}/${store.data.cases.length}`, 'kort har tre ting eller billeder'],
      [`${store.data.teams.length}`, 'hold er klar'],
      ['Print', 'værtsark og bordark er backup'],
    ];

    return `
      <div class="readiness-list" aria-label="Klar til festen">
        <h3>Klar til festen</h3>
        ${items
          .map(
            ([count, text]) => `
              <div>
                <span>${escapeHtml(count)}</span>
                <p>${escapeHtml(text)}</p>
              </div>`
          )
          .join('')}
      </div>
    `;
  }

  function printSheets() {
    return `
      <section class="print-sheets" aria-label="Printark">
        <article class="print-host">
          <h2>Værtark: ${escapeHtml(store.data.event.coupleA)} & ${escapeHtml(store.data.event.coupleB)}</h2>
          <p>Point: aktivt hold +2. Stjålet svar +1. Æresparrets rolle: ${escapeHtml(roleLabels[store.data.event.coupleRole])}.</p>
          ${store.data.cases.map((item, index) => `
            <section>
              <h3>${index + 1}. ${escapeHtml(item.title)}</h3>
              <p><strong>Aktivt hold:</strong> ${escapeHtml(teamName(item.activeTeamId))}</p>
              <p><strong>Fortæller:</strong> ${escapeHtml(item.storyOwner)}</p>
              <p><strong>Ting:</strong> ${item.clues.map(escapeHtml).join(' / ')}</p>
              <p><strong>Spørgsmål:</strong> ${escapeHtml(item.question)}</p>
              <p><strong>Svar:</strong> ${escapeHtml(item.answer)}</p>
              <p><strong>Reveal:</strong> ${escapeHtml(item.revealNote)}</p>
            </section>
          `).join('')}
        </article>
        <article class="print-table">
          <h2>Bordark</h2>
          ${store.data.teams.map((team) => `
            <section>
              <h3>${escapeHtml(team.name)}</h3>
              ${store.data.cases.map((item, index) => `<p>${index + 1}. ${escapeHtml(item.title)}: _______________________________</p>`).join('')}
              <p>Point: ________</p>
            </section>
          `).join('')}
        </article>
      </section>
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

    if (kind === 'event') {
      store.data.event[field] = el.value;
    }

    if (kind === 'team') {
      const team = store.data.teams[Number(el.dataset.index)];
      if (field === 'score') team.score = Number(el.value) || 0;
      else team[field] = el.value;
    }

    if (kind === 'case') {
      store.data.cases[Number(el.dataset.index)][field] = el.value;
      if (field === 'activeTeamId' && store.data.cases[Number(el.dataset.index)].id === store.state.activeCaseId) {
        store.state.activeTeamId = el.value;
      }
    }

    if (kind === 'clue') {
      store.data.cases[Number(el.dataset.index)].clues[Number(el.dataset.clue)] = el.value;
    }

    saveAndRender();
  }

  function handleAction(event) {
    const action = event.currentTarget.dataset.action;
    const index = Number(event.currentTarget.dataset.index);

    if (action === 'start') {
      store.data.teams.forEach((team) => {
        team.score = 0;
      });
      window.HLGame.startShow(store);
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
        if (store.state.phase !== 'setup') {
          store.state.phase = 'active_team';
        }
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
        title: 'Ny historie',
        activeTeamId: team.id,
        storyOwner: '',
        clues: ['Ting 1', 'Ting 2', 'Ting 3'],
        prompt: 'Kald gæsten op og lad dem fortælle historien på 60-90 sekunder.',
        question: 'Hvad skete der?',
        answer: '',
        revealNote: '',
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
    }

    saveAndRender();
  }

  render();
})();
