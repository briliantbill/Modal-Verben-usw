/* ============================================================
   LOGIKA UMUM
   File ini mengatur navigasi tab antar topik.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initQuizzes();
});

function initTabs() {
  const buttons = document.querySelectorAll(".tab-btn");
  const topics = document.querySelectorAll(".topic");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.tab;

      buttons.forEach((item) => item.classList.remove("active"));
      topics.forEach((topic) => topic.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(targetId).classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}
