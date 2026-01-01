document.addEventListener("DOMContentLoaded", () => {

  const welcomeScreen = document.getElementById("welcome-screen");
  const appScreen = document.getElementById("app-screen");
  const languageButtons = document.querySelectorAll(".lang-btn");

  // Vérifier si utilisateur déjà configuré
  const savedName = localStorage.getItem("username");
  const savedLang = localStorage.getItem("language");

  if (savedName && savedLang) {
    showApp(savedName);
    return;
  }

  // Gérer clic sur langue
  languageButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      localStorage.setItem("language", lang);

      const name = prompt(
        lang === "fr"
          ? "Quel est votre prénom ?"
          : "What is your name?"
      );

      if (!name) return;

      localStorage.setItem("username", name);
      showApp(name);
    });
  });

  function showApp(name) {
    welcomeScreen.style.display = "none";
    appScreen.style.display = "block";

    const greeting = document.getElementById("greeting");
    const hour = new Date().getHours();
    const hello =
      hour < 18 ? "Bonjour" : "Bonsoir";

    greeting.textContent = ${hello} ${name};
  }

});
