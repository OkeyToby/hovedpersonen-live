(function () {
  const template = {
    event: {
      occasion: 'Guldbryllup',
      coupleA: 'Kirsten',
      coupleB: 'Poul',
      date: 'Næste weekend',
      tone: 'Varm og familievenlig',
      teamMode: 'bordhold',
      coupleRole: 'reveal-jury',
    },
    teams: [
      { id: 'bord-1', name: 'Bord 1', score: 0 },
      { id: 'bord-2', name: 'Bord 2', score: 0 },
      { id: 'bord-3', name: 'Bord 3', score: 0 },
    ],
    cases: [
      {
        id: 'case-1',
        title: 'Den forsvundne cykelnøgle',
        activeTeamId: 'bord-1',
        storyOwner: 'Lone',
        clues: ['En gammel cykellygte', 'Et nøglebundt', 'Et billede fra sommerhuset'],
        prompt:
          'Kald Lone op. Hun fortæller historien om turen, hvor alle ledte efter nøglen, mens den lå et helt andet sted.',
        question: 'Hvor lå cykelnøglen til sidst?',
        answer: 'I Pouls jakkelomme',
        revealNote: 'Kirsten plejer at sige, at Poul altid leder efter det, han allerede har på sig.',
      },
      {
        id: 'case-2',
        title: 'Sangen der startede dansen',
        activeTeamId: 'bord-2',
        storyOwner: 'Mette',
        clues: ['En gammel singleplade', 'En serviet med tekst', 'Et foto fra et forsamlingshus'],
        prompt:
          'Mette kommer op og bruger de tre ting til at fortælle om en aften, hvor dansegulvet blev åbnet lidt for tidligt.',
        question: 'Hvilken sang fik Kirsten og Poul på dansegulvet?',
        answer: 'Den første gang jeg så dig',
        revealNote: 'Hvis æresparret protesterer, må de synge den rigtige linje som bevis.',
      },
      {
        id: 'case-3',
        title: 'Kagen der ikke kom frem',
        activeTeamId: 'bord-3',
        storyOwner: 'Henrik',
        clues: ['En kagespade', 'Et supermarkedskvittering', 'Et tomt kagefad'],
        prompt:
          'Henrik fortæller en kort historie om en fest, hvor desserten var klar, men ingen kunne finde den.',
        question: 'Hvor var kagen gemt?',
        answer: 'I bagagerummet',
        revealNote: 'Point for alle der også har glemt noget vigtigt i bilen.',
      },
      {
        id: 'case-4',
        title: 'Ferien med den forkerte afkørsel',
        activeTeamId: 'bord-1',
        storyOwner: 'Anne',
        clues: ['Et vejkort', 'En termokop', 'Et postkort fra Tyskland'],
        prompt:
          'Anne kommer op og fortæller, hvordan en lille afkørsel blev til en hel ekstra oplevelse på ferien.',
        question: 'Hvad fandt de, da de kørte forkert?',
        answer: 'En lille kro med den bedste frokost',
        revealNote: 'Det er klassisk Kirsten og Poul: hvis planen glipper, bliver det bare en bedre historie.',
      },
    ],
  };

  window.HLContent = { template };
})();
