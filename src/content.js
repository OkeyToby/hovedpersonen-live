(function () {
  const template = {
    event: {
      year: '2002',
      title: 'Hvilket år spiller vi?',
      note: '',
    },
    teams: [
      { id: 'hold-1', name: 'Hold 1', score: 0 },
      { id: 'hold-2', name: 'Hold 2', score: 0 },
      { id: 'hold-3', name: 'Hold 3', score: 0 },
    ],
    categories: [
      {
        id: 'cat-1',
        name: 'Musik',
        question: 'Hvem udgav albummet "The Eminem Show" i 2002?',
        answer: 'Eminem',
        explanation: 'The Eminem Show udkom i maj 2002 og blev årets bedst sælgende album på verdensplan.',
        used: false,
      },
      {
        id: 'cat-2',
        name: 'Sport',
        question: 'Hvem vandt VM i fodbold i 2002?',
        answer: 'Brasilien',
        explanation: 'Brasilien vandt finalen mod Tyskland 2-0 i Yokohama. Ronaldo scorede begge mål.',
        used: false,
      },
      {
        id: 'cat-3',
        name: 'Film',
        question: 'Hvilken film fra 2002 handlede om Frodos videre rejse mod Mordor?',
        answer: 'Ringenes Herre: De to tårne',
        explanation: 'Den anden film i Tolkien-trilogien. Peter Jackson instruerede alle tre film i træk.',
        used: false,
      },
      {
        id: 'cat-4',
        name: 'Nyheder',
        question: 'Hvilken ny mønt kom i fysisk omløb den 1. januar 2002 i 12 EU-lande?',
        answer: 'Euroen',
        explanation: 'Danmark valgte at beholde kronen efter folkeafstemningen i 2000.',
        used: false,
      },
      {
        id: 'cat-5',
        name: 'Top 3',
        question: 'Nævn tre film fra 2002 — én fra hvert hold. Hold der nævner den samme film taber point.',
        answer: 'Spiderman, Harry Potter, Chicago, Gangs of New York, Minority Report...',
        explanation: 'Spørgsmålet er åbent — vært bedømmer svarene. Brug din egen liste.',
        used: false,
      },
      {
        id: 'cat-6',
        name: 'Rundt i hjemmet',
        question: 'Hvad kaldtes den lille enhed, der i 2002 gjorde det muligt at lytte til musik fra en computer i ørerne?',
        answer: 'iPod (eller MP3-afspiller)',
        explanation: 'Apple lancerede iPod i oktober 2001. I 2002 var MP3-afspillere for alvor ved at erstatte CD-afspilleren.',
        used: false,
      },
      {
        id: 'cat-7',
        name: 'Årets nyheder',
        question: 'Hvad skete der med det store selskab Enron i starten af 2002?',
        answer: 'Det gik konkurs / kollapset blev afsløret',
        explanation: 'Enrons regnskabsskandaler bragte virksomheden til fald. Det var verdens største konkurs på daværende tidspunkt.',
        used: false,
      },
    ],
    finale: {
      question: 'Hvilket år er vi i? Få så mange rigtige detaljer som muligt: land, begivenhed, navn. Hold der er tættest på vinder finalen.',
      answer: '2002',
      explanation: 'Brug de fem hints fra showet. Hvert hold siger et årstal — tættest på vinder.',
    },
  };

  window.HLContent = { template: template };
})();
