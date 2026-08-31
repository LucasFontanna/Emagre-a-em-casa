(function () {
  "use strict";

  // ----------------------------------------------------------------------
  // ANALYTICS / FUNIL — funções organizadas para plugar uma plataforma
  // de analytics depois (GA4, Meta Pixel, etc). Por enquanto só logam.
  // ----------------------------------------------------------------------
  function track(eventName, payload) {
    // Exemplo de uso futuro:
    // if (typeof fbq === 'function') fbq('trackCustom', eventName, payload);
    // if (typeof gtag === 'function') gtag('event', eventName, payload);
    console.log('[funil]', eventName, payload || {});
  }

  // ----------------------------------------------------------------------
  // PERGUNTAS
  // Cada opção tem um atributo "profile" (a | b | c) usado para calcular
  // o perfil final. Isso NÃO é um diagnóstico — é só uma categorização
  // simples de hábitos baseada nas respostas.
  // a = Rotina em Construção · b = Buscando Consistência · c = Pronto para uma Nova Rotina
  // ----------------------------------------------------------------------
  const QUESTIONS = [
    {
      eyebrow: "SUA ROTINA",
      title: "Como você descreveria sua rotina atualmente?",
      options: [
        { text: "Bem corrida, quase sem tempo livre", profile: "a" },
        { text: "Tenho uma rotina, mas ela muda bastante", profile: "b" },
        { text: "Já tenho uma base, só falta organizar melhor", profile: "c" },
        { text: "Não sei bem por onde começar", profile: "a" },
      ],
    },
    {
      eyebrow: "ATIVIDADE FÍSICA",
      title: "Com que frequência você pratica alguma atividade física hoje?",
      options: [
        { text: "Quase nunca", profile: "a" },
        { text: "De vez em quando, sem regularidade", profile: "b" },
        { text: "1 a 2 vezes por semana", profile: "b" },
        { text: "3 vezes por semana ou mais", profile: "c" },
      ],
    },
    {
      eyebrow: "ALIMENTAÇÃO",
      title: "Como está sua alimentação no dia a dia?",
      options: [
        { text: "Como o que dá tempo, sem muito planejamento", profile: "a" },
        { text: "Tento comer bem, mas nem sempre consigo", profile: "b" },
        { text: "Já como relativamente bem, quero manter", profile: "c" },
        { text: "Varia muito de um dia para o outro", profile: "b" },
      ],
    },
    {
      eyebrow: "DESAFIOS",
      title: "O que mais dificulta você manter uma rotina saudável?",
      options: [
        { text: "Falta de tempo", profile: "a" },
        { text: "Falta de consistência — começo e não continuo", profile: "b" },
        { text: "Não saber por onde começar", profile: "a" },
        { text: "Falta de um plano organizado", profile: "c" },
      ],
    },
    {
      eyebrow: "DISPONIBILIDADE",
      title: "Quanto tempo livre você tem por dia para se dedicar a hábitos saudáveis?",
      options: [
        { text: "Menos de 15 minutos", profile: "a" },
        { text: "Entre 15 e 30 minutos", profile: "b" },
        { text: "Entre 30 minutos e 1 hora", profile: "c" },
        { text: "Mais de 1 hora", profile: "c" },
      ],
    },
    {
      eyebrow: "AMBIENTE",
      title: "Onde você prefere se exercitar?",
      options: [
        { text: "Em casa, com o mínimo de equipamento possível", profile: "b" },
        { text: "Ao ar livre, caminhando ou pedalando", profile: "c" },
        { text: "Ainda não tenho preferência definida", profile: "a" },
        { text: "Academia, mas hoje não está no meu momento", profile: "b" },
      ],
    },
    {
      eyebrow: "ORGANIZAÇÃO",
      title: "Como você se organiza para as refeições da semana?",
      options: [
        { text: "Não me organizo, decido na hora", profile: "a" },
        { text: "Tenho uma ideia geral, mas nada escrito", profile: "b" },
        { text: "Planejo com antecedência quando consigo", profile: "c" },
        { text: "Gostaria de ter uma lista pronta para seguir", profile: "b" },
      ],
    },
    {
      eyebrow: "CONSISTÊNCIA",
      title: "Quando você começa algo novo, o que geralmente acontece?",
      options: [
        { text: "Empolgo no início e paro depois de alguns dias", profile: "b" },
        { text: "Levo um tempo para pegar o ritmo, mas sigo", profile: "c" },
        { text: "Tenho dificuldade até de começar", profile: "a" },
        { text: "Consigo manter quando tenho um plano claro", profile: "c" },
      ],
    },
    {
      eyebrow: "MOTIVAÇÃO",
      title: "O que mais te motivaria a seguir um plano de 30 dias?",
      options: [
        { text: "Um passo a passo simples de seguir", profile: "a" },
        { text: "Poder acompanhar meu progresso dia a dia", profile: "b" },
        { text: "Ter tudo organizado: receitas, lista e treino", profile: "c" },
        { text: "Não depender de academia ou equipamentos", profile: "a" },
      ],
    },
    {
      eyebrow: "OBJETIVO",
      title: "Qual é o seu principal objetivo agora?",
      options: [
        { text: "Criar o hábito de me exercitar", profile: "a" },
        { text: "Organizar melhor minha alimentação", profile: "b" },
        { text: "Ter mais consistência no que já faço", profile: "c" },
        { text: "Começar do zero, com um caminho simples", profile: "a" },
      ],
    },
  ];

  const PROFILES = {
    a: {
      title: "Rotina em Construção",
      lead: "Com base nas suas respostas, o momento agora é dar os primeiros passos com um caminho simples — sem tentar mudar tudo de uma vez.",
      points: [
        "Você está no início da construção de uma rotina saudável",
        "Passos pequenos e claros tendem a funcionar melhor pra você agora",
        "Um plano estruturado pode facilitar o começo",
      ],
    },
    b: {
      title: "Buscando Consistência",
      lead: "Com base nas suas respostas, organização e consistência podem ser pontos importantes para sua rotina.",
      points: [
        "Você já tenta manter bons hábitos, mas a consistência ainda oscila",
        "Ter uma estrutura simples de acompanhar pode ajudar bastante",
        "Um plano com etapas claras tende a facilitar a continuidade",
      ],
    },
    c: {
      title: "Pronto para uma Nova Rotina",
      lead: "Com base nas suas respostas, você já tem uma base — o próximo passo é organizar tudo em um plano estruturado.",
      points: [
        "Você já tem certa regularidade em hábitos saudáveis",
        "Organização e planejamento podem elevar seus resultados",
        "Um método estruturado pode ajudar a manter o que você já construiu",
      ],
    },
  };

  // ----------------------------------------------------------------------
  // ESTADO
  // ----------------------------------------------------------------------
  let current = 0;
  const answers = new Array(QUESTIONS.length).fill(null);

  // ----------------------------------------------------------------------
  // ELEMENTOS
  // ----------------------------------------------------------------------
  const screenIntro = document.getElementById('screenIntro');
  const screenQuestion = document.getElementById('screenQuestion');
  const screenProcessing = document.getElementById('screenProcessing');
  const screenResult = document.getElementById('screenResult');

  const quizHeader = document.getElementById('quizHeader');
  const progressLabel = document.getElementById('progressLabel');
  const progressFill = document.getElementById('progressFill');
  const btnBack = document.getElementById('btnBack');
  const btnStart = document.getElementById('btnStart');

  const qEyebrow = document.getElementById('qEyebrow');
  const qTitle = document.getElementById('qTitle');
  const qOptions = document.getElementById('qOptions');

  const processingText = document.getElementById('processingText');
  const procBarFill = document.getElementById('procBarFill');

  const resultTitle = document.getElementById('resultTitle');
  const resultLead = document.getElementById('resultLead');
  const resultPoints = document.getElementById('resultPoints');
  const btnResult = document.getElementById('btnResult');

  function showScreen(el) {
    [screenIntro, screenQuestion, screenProcessing, screenResult].forEach(s => {
      s.hidden = (s !== el);
    });
  }

  // ----------------------------------------------------------------------
  // INTRO -> PERGUNTAS
  // ----------------------------------------------------------------------
  btnStart.addEventListener('click', () => {
    track('quiz_started');
    quizHeader.hidden = false;
    renderQuestion(0);
    showScreen(screenQuestion);
  });

  // ----------------------------------------------------------------------
  // RENDERIZA UMA PERGUNTA
  // ----------------------------------------------------------------------
  function renderQuestion(index) {
    current = index;
    const q = QUESTIONS[index];

    progressLabel.textContent = `Pergunta ${index + 1} de ${QUESTIONS.length}`;
    progressFill.style.width = `${((index) / QUESTIONS.length) * 100}%`;
    btnBack.disabled = (index === 0);

    qEyebrow.textContent = q.eyebrow;
    qTitle.textContent = q.title;
    qOptions.innerHTML = '';

    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option';
      if (answers[index] === opt.profile) btn.classList.add('selected');
      btn.innerHTML = `<span class="bullet"></span><span>${opt.text}</span>`;
      btn.addEventListener('click', () => selectOption(index, opt.profile, btn));
      qOptions.appendChild(btn);
    });

    screenQuestion.classList.remove('fade-enter-active');
    screenQuestion.classList.add('fade-enter');
    requestAnimationFrame(() => {
      screenQuestion.classList.add('fade-enter-active');
      screenQuestion.classList.remove('fade-enter');
    });
  }

  function selectOption(index, profile, clickedBtn) {
    answers[index] = profile;
    track('question_answered', { question: index + 1, profile });

    // feedback visual imediato na opção clicada, antes de avançar
    Array.from(qOptions.children).forEach(el => el.classList.remove('selected'));
    clickedBtn.classList.add('selected');

    setTimeout(() => {
      if (index < QUESTIONS.length - 1) {
        renderQuestion(index + 1);
      } else {
        progressFill.style.width = '100%';
        finishQuiz();
      }
    }, 380);
  }

  btnBack.addEventListener('click', () => {
    if (current > 0) renderQuestion(current - 1);
  });

  // ----------------------------------------------------------------------
  // PROCESSAMENTO (5–7s)
  // ----------------------------------------------------------------------
  function finishQuiz() {
    track('quiz_completed', { answers });
    quizHeader.hidden = true;
    showScreen(screenProcessing);

    const messages = [
      "Analisando suas respostas...",
      "Identificando seus principais desafios...",
      "Preparando sua recomendação...",
    ];
    const totalDuration = 6200; // ~6.2s
    const step = totalDuration / messages.length;

    let barStart = Date.now();
    procBarFill.style.width = '0%';
    const barTimer = setInterval(() => {
      const pct = Math.min(100, ((Date.now() - barStart) / totalDuration) * 100);
      procBarFill.style.width = pct + '%';
      if (pct >= 100) clearInterval(barTimer);
    }, 80);

    messages.forEach((msg, i) => {
      setTimeout(() => {
        processingText.style.opacity = '0';
        setTimeout(() => {
          processingText.textContent = msg;
          processingText.style.opacity = '1';
        }, 200);
      }, i * step);
    });

    setTimeout(() => {
      renderResult();
      showScreen(screenResult);
      track('result_viewed', { profile: computeProfile() });
    }, totalDuration + 300);
  }

  // ----------------------------------------------------------------------
  // CÁLCULO DO PERFIL
  // ----------------------------------------------------------------------
  function computeProfile() {
    const tally = { a: 0, b: 0, c: 0 };
    answers.forEach(p => { if (p) tally[p]++; });
    let winner = 'b';
    let max = -1;
    ['a', 'b', 'c'].forEach(key => {
      if (tally[key] > max) { max = tally[key]; winner = key; }
    });
    return winner;
  }

  function renderResult() {
    const key = computeProfile();
    const profile = PROFILES[key];

    resultTitle.textContent = profile.title;
    resultLead.textContent = profile.lead;
    resultPoints.innerHTML = '';
    profile.points.forEach(point => {
      const div = document.createElement('div');
      div.className = 'result-point';
      div.innerHTML = `<span class="ck">✓</span><span>${point}</span>`;
      resultPoints.appendChild(div);
    });

    // guarda o perfil para a landing poder personalizar sutilmente
    try { sessionStorage.setItem('quiz_profile', key); } catch (e) { }
    btnResult.dataset.profile = key;
  }

  btnResult.addEventListener('click', () => {
    const profile = btnResult.dataset.profile || computeProfile();
    track('cta_clicked', { from: 'quiz_result', profile });
    window.location.href = `./landing.html?profile=${profile}`;
  });

  track('landing_viewed_quiz'); // placeholder inicial de carregamento do quiz
})();