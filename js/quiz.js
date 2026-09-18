/* ============================================================
   ENGINE LATIHAN
   File ini mengatur tampilan soal, feedback, skor, dan tombol ulangi.
   Biasanya Anda hanya perlu mengubah data soal di js/data.js.
   ============================================================ */

function initQuizzes() {
  document.querySelectorAll("[data-quiz]").forEach((quizEl) => {
    const quizId = quizEl.dataset.quiz;
    const quiz = QUIZ_DATA[quizId];

    if (!quiz) {
      quizEl.innerHTML = "<p>Data latihan belum tersedia.</p>";
      return;
    }

    renderQuiz(quizEl, quiz);
  });
}

function renderQuiz(quizEl, quiz) {
  const state = {
    answered: new Array(quiz.questions.length).fill(false),
    correct: new Array(quiz.questions.length).fill(false)
  };

  quizEl.innerHTML = `
    <div class="quiz-head">
      <h4>${escapeHtml(quiz.title)}</h4>
      <div class="quiz-score" aria-live="polite">Skor: <span data-score>0</span>/${quiz.questions.length}</div>
    </div>
    <p class="quiz-hint">${escapeHtml(quiz.hint || "")}</p>
    <div class="progress-bar" aria-hidden="true"><i data-progress></i></div>
    <div class="q-list"></div>
    <div class="quiz-actions">
      <button class="btn ghost" type="button" data-reset>Ulangi latihan</button>
    </div>
    <div class="result" data-result hidden></div>
  `;

  const list = quizEl.querySelector(".q-list");

  quiz.questions.forEach((question, index) => {
    const item = document.createElement("article");
    item.className = "q-item";
    item.dataset.index = String(index);
    item.innerHTML = `
      <p class="q-text">
        <span class="q-num">${index + 1}</span>
        <span>${renderPrompt(question.prompt)}</span>
      </p>
      ${renderQuestionControls(question, index)}
      <div class="fb" hidden></div>
    `;
    list.appendChild(item);
  });

  list.addEventListener("click", (event) => {
    const option = event.target.closest("[data-answer]");
    const checkButton = event.target.closest("[data-check]");
    const wordButton = event.target.closest("[data-word]");
    const placedWord = event.target.closest("[data-placed]");
    const clearButton = event.target.closest("[data-clear-order]");
    if (!option && !checkButton && !wordButton && !placedWord && !clearButton) return;

    const item = (option || checkButton || wordButton || placedWord || clearButton).closest(".q-item");
    const index = Number(item.dataset.index);
    const question = quiz.questions[index];

    if (state.answered[index]) return;

    if (wordButton) {
      addOrderWord(item, wordButton);
      return;
    }

    if (placedWord) {
      returnOrderWord(item, placedWord);
      return;
    }

    if (clearButton) {
      clearOrder(item);
      return;
    }

    if (option) {
      checkChoice(item, question, option.dataset.answer, index, state, quizEl, quiz);
      return;
    }

    if (question.type === "order") {
      checkOrder(item, question, index, state, quizEl, quiz);
      return;
    }

    checkFill(item, question, index, state, quizEl, quiz);
  });

  list.addEventListener("dragstart", (event) => {
    const wordButton = event.target.closest("[data-word]");
    if (!wordButton || wordButton.hidden) return;
    event.dataTransfer.setData("text/plain", wordButton.dataset.tokenId);
  });

  list.addEventListener("dragover", (event) => {
    const zone = event.target.closest("[data-order-drop]");
    if (!zone) return;
    event.preventDefault();
    zone.classList.add("is-over");
  });

  list.addEventListener("dragleave", (event) => {
    const zone = event.target.closest("[data-order-drop]");
    if (!zone) return;
    zone.classList.remove("is-over");
  });

  list.addEventListener("drop", (event) => {
    const zone = event.target.closest("[data-order-drop]");
    if (!zone) return;
    event.preventDefault();
    zone.classList.remove("is-over");

    const item = zone.closest(".q-item");
    const index = Number(item.dataset.index);
    if (state.answered[index]) return;

    const tokenId = event.dataTransfer.getData("text/plain");
    const wordButton = item.querySelector(`[data-word][data-token-id="${cssEscape(tokenId)}"]`);
    if (wordButton && !wordButton.hidden) addOrderWord(item, wordButton);
  });

  list.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const input = event.target.closest("[data-fill]");
    if (!input) return;

    const item = input.closest(".q-item");
    const index = Number(item.dataset.index);
    const question = quiz.questions[index];

    if (state.answered[index]) return;
    checkFill(item, question, index, state, quizEl, quiz);
  });

  quizEl.querySelector("[data-reset]").addEventListener("click", () => {
    renderQuiz(quizEl, quiz);
  });
}

function renderQuestionControls(question) {
  if (question.type === "choice") {
    return `
      <div class="opts">
        ${question.options.map((option) => `
          <button class="opt" type="button" data-answer="${escapeAttr(option)}">${escapeHtml(option)}</button>
        `).join("")}
      </div>
    `;
  }

  if (question.type === "fill") {
    return `
      <div class="fill-row">
        <input class="fill-input" type="text" data-fill autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="Jawaban soal">
        <button class="btn" type="button" data-check>Cek</button>
      </div>
    `;
  }

  if (question.type === "order") {
    return `
      <div class="order-box">
        <div class="word-bank" data-bank aria-label="Kata acak">
          ${question.words.map((word, wordIndex) => `
            <button class="word-chip" type="button" draggable="true" data-word data-token-id="${wordIndex}">${escapeHtml(word)}</button>
          `).join("")}
        </div>
        <div class="answer-zone" data-order-drop aria-label="Area jawaban">
          <span class="answer-placeholder">Taruh kata di sini.</span>
        </div>
        <div class="order-actions">
          <button class="btn ghost" type="button" data-clear-order>Hapus susunan</button>
          <button class="btn" type="button" data-check>Cek</button>
        </div>
      </div>
    `;
  }

  return "<p>Jenis soal belum didukung.</p>";
}

function checkChoice(item, question, answer, index, state, quizEl, quiz) {
  const isCorrect = isAnswerCorrect(question, answer);
  const buttons = item.querySelectorAll("[data-answer]");
  const feedback = item.querySelector(".fb");

  state.answered[index] = true;
  state.correct[index] = isCorrect;

  item.classList.add(isCorrect ? "is-ok" : "is-no");

  buttons.forEach((button) => {
    button.disabled = true;
    if (isAnswerCorrect(question, button.dataset.answer)) {
      button.classList.add("reveal");
    }
    if (button.dataset.answer === answer) {
      button.classList.add(isCorrect ? "picked-ok" : "picked-no");
    }
  });

  feedback.hidden = false;
  feedback.className = `fb ${isCorrect ? "ok" : "no"}`;
  feedback.innerHTML = isCorrect
    ? `<b>Benar.</b><span class="sol">${escapeHtml(question.explanation)}</span>`
    : `<b>Belum tepat.</b><span class="sol">Jawaban benar: <strong>${escapeHtml(question.answer)}</strong>. ${escapeHtml(question.explanation)}</span>`;

  updateScore(quizEl, quiz, state);
}

function checkFill(item, question, index, state, quizEl, quiz) {
  const input = item.querySelector("[data-fill]");
  const button = item.querySelector("[data-check]");
  const feedback = item.querySelector(".fb");
  const userAnswer = input.value;
  const acceptedAnswers = Array.isArray(question.answer) ? question.answer : [question.answer];
  const isCorrect = acceptedAnswers.some((answer) => compareAnswer(answer, userAnswer, question.caseSensitive));
  const displayAnswer = acceptedAnswers[0];

  state.answered[index] = true;
  state.correct[index] = isCorrect;

  item.classList.add(isCorrect ? "is-ok" : "is-no");
  input.classList.add(isCorrect ? "is-ok" : "is-no");
  input.disabled = true;
  button.disabled = true;

  feedback.hidden = false;
  feedback.className = `fb ${isCorrect ? "ok" : "no"}`;
  feedback.innerHTML = isCorrect
    ? `<b>Benar.</b><span class="sol">${escapeHtml(question.explanation)}</span>`
    : `<b>Belum tepat.</b><span class="sol">Jawaban benar: <strong>${escapeHtml(displayAnswer)}</strong>. ${escapeHtml(question.explanation)}</span>`;

  updateScore(quizEl, quiz, state);
}

function addOrderWord(item, wordButton) {
  const zone = item.querySelector("[data-order-drop]");
  const placeholder = zone.querySelector(".answer-placeholder");
  const placed = document.createElement("button");

  placed.className = "word-chip placed";
  placed.type = "button";
  placed.dataset.placed = "";
  placed.dataset.tokenId = wordButton.dataset.tokenId;
  placed.textContent = wordButton.textContent;

  if (placeholder) placeholder.hidden = true;
  wordButton.hidden = true;
  zone.appendChild(placed);
}

function returnOrderWord(item, placedWord) {
  const tokenId = placedWord.dataset.tokenId;
  const bankWord = item.querySelector(`[data-word][data-token-id="${cssEscape(tokenId)}"]`);
  const zone = item.querySelector("[data-order-drop]");

  if (bankWord) bankWord.hidden = false;
  placedWord.remove();
  updateOrderPlaceholder(zone);
}

function clearOrder(item) {
  item.querySelectorAll("[data-placed]").forEach((placedWord) => {
    returnOrderWord(item, placedWord);
  });
}

function checkOrder(item, question, index, state, quizEl, quiz) {
  const zone = item.querySelector("[data-order-drop]");
  const feedback = item.querySelector(".fb");
  const userAnswer = getOrderWords(item);
  const expectedAnswer = question.answer;
  const isCorrect = normalizeSentence(userAnswer) === normalizeSentence(expectedAnswer);

  state.answered[index] = true;
  state.correct[index] = isCorrect;

  item.classList.add(isCorrect ? "is-ok" : "is-no");
  zone.classList.add(isCorrect ? "is-ok" : "is-no");

  item.querySelectorAll("[data-word], [data-placed], [data-check], [data-clear-order]").forEach((control) => {
    control.disabled = true;
    control.draggable = false;
  });

  feedback.hidden = false;
  feedback.className = `fb ${isCorrect ? "ok" : "no"}`;
  feedback.innerHTML = isCorrect
    ? `<b>Benar.</b><span class="sol">${escapeHtml(question.explanation)}</span>${renderKlammerFeedback(expectedAnswer, question.modalIndex)}`
    : `<b>Belum tepat.</b><span class="sol">Jawaban benar: <strong>${escapeHtml(expectedAnswer.join(" "))}</strong>. ${escapeHtml(question.explanation)}</span>${renderKlammerFeedback(expectedAnswer, question.modalIndex)}`;

  updateScore(quizEl, quiz, state);
}

function getOrderWords(item) {
  return Array.from(item.querySelectorAll("[data-placed]")).map((word) => word.textContent.trim());
}

function updateOrderPlaceholder(zone) {
  const placeholder = zone.querySelector(".answer-placeholder");
  if (placeholder) placeholder.hidden = zone.querySelectorAll("[data-placed]").length > 0;
}

function normalizeSentence(words) {
  return words.map((word) => normalize(word)).join(" ");
}

function renderKlammerFeedback(words, modalIndex) {
  if (!words || words.length < 2) return "";

  const modalPosition = Number.isInteger(modalIndex) ? modalIndex : 1;
  const parts = words.map((word, index) => {
    const className = index === modalPosition || index === words.length - 1 ? "klammer-word" : "";
    return `<span class="${className}">${escapeHtml(word)}</span>`;
  }).join("");

  return `<div class="mini-klammer">${parts}</div>`;
}

function updateScore(quizEl, quiz, state) {
  const score = state.correct.filter(Boolean).length;
  const answered = state.answered.filter(Boolean).length;
  const progress = Math.round((answered / quiz.questions.length) * 100);

  quizEl.querySelector("[data-score]").textContent = String(score);
  quizEl.querySelector("[data-progress]").style.width = `${progress}%`;

  if (answered === quiz.questions.length) {
    const result = quizEl.querySelector("[data-result]");
    result.hidden = false;
    result.innerHTML = `
      <p class="big">${score}/${quiz.questions.length}</p>
      <p>${score === quiz.questions.length ? "Sempurna. Polanya sudah aman untuk topik ini." : "Bagus. Ulangi soal yang merah sampai polanya terasa otomatis."}</p>
    `;
  }
}

function renderPrompt(prompt) {
  return escapeHtml(prompt).replace(/___/g, '<span class="blank">...</span>');
}

function normalize(value) {
  return String(value).trim().toLowerCase();
}

function compareAnswer(expected, actual, caseSensitive) {
  if (caseSensitive) {
    return String(expected).trim() === String(actual).trim();
  }
  return normalize(expected) === normalize(actual);
}

function isAnswerCorrect(question, actual) {
  const acceptedAnswers = Array.isArray(question.answer) ? question.answer : [question.answer];
  return acceptedAnswers.some((answer) => compareAnswer(answer, actual, question.caseSensitive));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function cssEscape(value) {
  if (window.CSS && window.CSS.escape) return window.CSS.escape(value);
  return String(value).replace(/"/g, '\\"');
}
