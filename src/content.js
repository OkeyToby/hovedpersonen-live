(function () {
  const template = {
    event: {
      year: '2001',
      title: 'Hvad skete der i Danmark i 2001?',
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
        name: 'Nyheder og Danmark',
        questions: [
          {
            question: 'Hvilken stor international sangkonkurrence blev holdt i Parken i København i 2001?',
            answer: 'Eurovision Song Contest',
            explanation: 'Det internationale Melodi Grand Prix kom til Danmark.',
            used: false,
          },
          {
            question: 'Hvorfor var det Danmark, der skulle afholde Eurovision i 2001?',
            answer: 'Fordi Olsen Brothers vandt året før',
            explanation: 'De vandt i 2000 med "Fly on the Wings of Love".',
            used: false,
          },
          {
            question: 'Hvilket stort stadion i København blev brugt til Eurovision 2001?',
            answer: 'Parken',
            explanation: 'Første gang konkurrencen blev holdt på et fodboldstadion.',
            used: false,
          },
          {
            question: 'Hvilken dansk tv-kanal stod bag Dansk Melodi Grand Prix i 2001?',
            answer: 'DR',
            explanation: 'Showet blev sendt på DR1.',
            used: false,
          },
          {
            question: 'Hvilken bro gjorde det lettere at tage en hurtig tur fra Danmark til Sverige?',
            answer: 'Øresundsbroen',
            explanation: 'Broen mellem København og Malmø åbnede i sommeren 2000.',
            used: false,
          },
          {
            question: 'Hvem blev statsminister efter folketingsvalget i 2001?',
            answer: 'Anders Fogh Rasmussen',
            explanation: 'Han var statsminister fra 2001 til 2009.',
            used: false,
          },
          {
            question: 'Hvilket quizprogram fik sin første danske millionvinder i 2001?',
            answer: 'Hvem vil være millionær?',
            explanation: 'Søren Brøndum Laursen blev den første danske solovinder af millionen.',
            used: false,
          },
          {
            question: 'Hvilket program sendte danskere på ø-eventyr i Malaysia i 2001?',
            answer: 'Robinson Ekspeditionen',
            explanation: 'TV3-programmet sendte deltagerne på øer i Malaysia.',
            used: false,
          },
        ],
      },
      {
        id: 'cat-2',
        name: 'Melodi Grand Prix',
        questions: [
          {
            question: 'Hvem vandt Dansk Melodi Grand Prix i 2001?',
            answer: 'Rollo & King',
            explanation: 'De fik lov at repræsentere Danmark ved Eurovision.',
            used: false,
          },
          {
            question: 'Hvad hed Rollo & Kings sang på dansk?',
            answer: 'Der står et billede af dig på mit bord',
            explanation: 'Den danske version af vindersangen.',
            used: false,
          },
          {
            question: 'Hvad hed sangen, da den blev sunget på engelsk til Eurovision?',
            answer: 'Never Ever Let You Go',
            explanation: 'Den engelske titel brugt internationalt.',
            used: false,
          },
          {
            question: 'Hvilken placering fik Danmark ved Eurovision 2001?',
            answer: '2. plads',
            explanation: 'Et flot resultat på hjemmebane i Parken.',
            used: false,
          },
          {
            question: 'Hvem var vært ved Dansk Melodi Grand Prix 2001?',
            answer: 'Keld Heick',
            explanation: 'Han stod for showet på DR.',
            used: false,
          },
          {
            question: 'I hvilken dansk by blev Dansk Melodi Grand Prix 2001 holdt?',
            answer: 'Herning',
            explanation: 'Det foregik i Messecenter Herning.',
            used: false,
          },
        ],
      },
      {
        id: 'cat-3',
        name: 'Sport',
        questions: [
          {
            question: 'Hvilken dansk målmandslegende sagde farvel til landsholdet i 2001?',
            answer: 'Peter Schmeichel',
            explanation: 'En af verdens bedste målmænd gennem tiderne.',
            used: false,
          },
          {
            question: 'Hvor mange landskampe endte Peter Schmeichel cirka med at spille for Danmark?',
            answer: 'Cirka 129',
            explanation: 'Et imponerende antal landskampe.',
            used: false,
          },
          {
            question: 'Hvilken klub blev dansk mester i fodbold i sæsonen 2000-2001?',
            answer: 'F.C. København',
            explanation: 'FCK tog mesterskabet det år.',
            used: false,
          },
          {
            question: 'Hvilken klub vandt Superligaen i sæsonen 2001-2002?',
            answer: 'Brøndby IF',
            explanation: 'Brøndby blev mestre sæsonen efter.',
            used: false,
          },
        ],
      },
      {
        id: 'cat-4',
        name: 'Film',
        questions: [
          {
            question: 'Hvilken dansk familiefilm fra 2001 handler om en onkel, der skal passe fem livlige børn?',
            answer: 'Min søsters børn',
            explanation: 'En dansk familiefilm med ballade, børn og humor.',
            used: false,
          },
          {
            question: 'Hvad hedder onklen i "Min søsters børn"?',
            answer: 'Onkel Erik',
            explanation: 'Den stakkels onkel, der må passe børnene.',
            used: false,
          },
          {
            question: 'Hvilken kendt dansk skuespiller spiller Onkel Erik i "Min søsters børn"?',
            answer: 'Peter Gantzler',
            explanation: 'Han spiller den plagede onkel.',
            used: false,
          },
          {
            question: 'Hvor mange børn skal Onkel Erik passe i "Min søsters børn"?',
            answer: 'Fem',
            explanation: 'Fem livlige søskendebørn på én gang.',
            used: false,
          },
          {
            question: 'Hvilken dansk film fra 2001 havde Mads Mikkelsen, Troels Lyby og Charlotte Munck på rollelisten?',
            answer: 'En kort en lang',
            explanation: 'Komedie-drama instrueret af Hella Joof.',
            used: false,
          },
          {
            question: 'Hvilken dansk film fra 2001 havde Anders W. Berthelsen, Anette Støvelbæk og Peter Gantzler på rollelisten?',
            answer: 'Italiensk for begyndere',
            explanation: 'Dogme-film af Lone Scherfig, der vandt en stor pris i Berlin.',
            used: false,
          },
          {
            question: 'Hvilken dansk film fra 2001 havde Robert Hansen og Sofie Lassen-Kahlke i hovedrollerne?',
            answer: 'Anja & Viktor',
            explanation: 'Ungdomsromantik instrueret af Charlotte Sachs Bostrup.',
            used: false,
          },
        ],
      },
      {
        id: 'cat-5',
        name: 'Pop og musik',
        questions: [
          {
            question: 'Hvilken dansk duo fik kæmpe succes med "Played-A-Live (The Bongo Song)" omkring 2001?',
            answer: 'Safri Duo',
            explanation: 'De blandede klassiske trommer med energiske dancebeats.',
            used: false,
          },
          {
            question: 'Hvad var Safri Duo kendt for at blande?',
            answer: 'Trommer/percussion og elektronisk dansemusik',
            explanation: 'Akustiske trommer mødte energiske dancebeats.',
            used: false,
          },
          {
            question: 'Hvilken dansk duo sang "Der står et billede af dig på mit bord"?',
            answer: 'Rollo & King',
            explanation: 'Vindersangen fra Dansk Melodi Grand Prix 2001.',
            used: false,
          },
          {
            question: 'Hvilken kvindelig sangerinde sang med hos Rollo & King?',
            answer: 'Signe Svendsen',
            explanation: 'Hun var med på vindersangen i 2001.',
            used: false,
          },
        ],
      },
    ],
    finale: {
      question: 'Hvilket år handler quizzen om? Brug sporene: Eurovision i Parken, Rollo & King vandt Melodi Grand Prix, og Peter Schmeichel sagde farvel til landsholdet. Holdet, der gætter tættest på, vinder.',
      answer: '2001',
      explanation: 'Året med Eurovision i København, Rollo & King og Schmeichels farvel.',
    },
  };

  window.HLContent = { template: template };
})();
