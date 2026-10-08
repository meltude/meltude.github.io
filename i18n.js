/* Meltude.me language switcher: EN <-> RU.
   Static dictionary approach for GitHub Pages (no backend).
   Usage: elements with data-i18n="key" get innerHTML swapped,
   data-i18n-alt="key" swaps alt, data-i18n-aria-label swaps aria-label,
   meta[data-i18n-content] swaps content. <title data-i18n> works too.
   The topbar holds a single small toggle button (#lang-toggle) showing
   the *other* language: RU while the site is English, EN while Russian. */
(function () {
  "use strict";

  var STORAGE_KEY = "meltude-lang";
  var LANGS = ["en", "ru"];

  var TRANSLATIONS = {
    en: {
      "nav.label": "Main navigation",
      "nav.overview": "Overview",
      "nav.projects": "Projects",
      "nav.notes": "Notes",
      "nav.contact": "Contact",
      "nav.credits": "Credits",
      "footer.source": "Source code",
      "footer.font": "Font",
      "lang.label": "Language",
      "lang.toggle": "Switch to Russian",

      "index.meta.title": "MeltudeAbout()",
      "index.meta.description":
        "unpacking 'https://flakehub.com/f/DeterminateSystems/nixpkgs-weekly/0.1' into the Git cache...",
      "index.profile.aria": "Profile",
      "index.sections.aria": "Site sections",
      "index.welcome.title": "Welcome to Meltude.me!",
      "index.welcome.p1":
        "This site exists just to answer questions like \u201cwho are you\u201d, \u201chow old are you\u201d, etc.",
      "index.welcome.p2":
        "So yeah, basically it\u2019s a biography site. Have a nice day!",
      "index.profile.alt": "Meltude's profile picture",
      "index.profile.name_dt": "Name",
      "index.profile.name_dd": "Meltude",
      "index.profile.age_dt": "Age",
      "index.profile.age_dd": "16 y.o.",
      "index.profile.birthday_dt": "Birthday",
      "index.profile.about_dt": "About",
      "index.profile.about_dd":
        "Just a NixOS user and owner of TeamSlag, studying to be a network engineer.",
      "index.cards.projects_title": "Projects:",
      "index.cards.projects_text": "i have no explanation",
      "index.cards.projects_link": "Read it",
      "index.cards.about_title": "About:",
      "index.cards.about_text": "my detailed description.",
      "index.cards.about_link": "Read it",
      "index.cards.contacts_title": "Contacts:",
      "index.cards.contacts_text": "<i>*ahem*</i> its just my contacts?",
      "index.cards.contacts_link": "Read it",
      "index.cards.credits_title": "Credits:",
      "index.cards.credits_text": "<i>*ahem*</i> its just friends?",
      "index.cards.credits_link": "Read it",

      "projects.meta.title": "MeltudeProjects()",
      "projects.meta.description": "Projects by TeamSlag and Meltude.",
      "projects.aria": "Projects",
      "projects.hidden_h1": "Projects",
      "projects.teamslag_title": "TeamSlag projects:",
      "projects.fetch_desc":
        "A utility which \u201cfetches\u201d your system info.",
      "projects.slagger_desc": "Fake hacking tool, written just for trolling.",
      "projects.goutils_desc": "Attempt to make GNU Coreutils in Golang.",
      "projects.nckernel_desc": "raw kernel",
      "projects.view_repo": "View repository",
      "projects.mine_title": "My own projects:",
      "projects.mine_text": "Currently I don\u2019t have any.",

      "notes.meta.title": "MeltudeNotes()",
      "notes.meta.description":
        "More about Meltude: interests, setup and favorite games.",
      "notes.aria": "Biography",
      "notes.title": "Notes:",
      "notes.about_title": "About me",
      "notes.pronouns_dt": "Pronouns",
      "notes.pronouns_dd": "Jerk / Bum / Bumie",
      "notes.political_dt": "Political view",
      "notes.political_dd": "Left-wing liberalism",
      "notes.orientation_dt": "Orientation",
      "notes.orientation_dd": "Bisexual, not looking for a relationship.",
      "notes.languages_dt": "Languages",
      "notes.languages_dd": "English and Russian; currently learning Slovak.",
      "notes.likes_title": "Things I like",
      "notes.likes_p1":
        "Learning Go and helping developers with niche projects on GitHub.",
      "notes.likes_p2": "Also interested in network engineering.",
      "notes.setup_title": "Setup",
      "notes.setup_text":
        "NixOS 26.11 (unstable channel) with SwayFX, an amazing window compositor fork of SwayWM.",
      "notes.games_title": "Favorite games",

      "contact.meta.title": "MeltudeContacts()",
      "contact.meta.description": "How to contact Meltude.",
      "contact.aria": "Contact links",
      "contact.title": "Contacts:",
      "contact.teamslag_link": "My organization",

      "credits.meta.title": "JustCredits()",
      "credits.meta.description":
        "Credits and thanks to people who helped with meltude.me",
      "credits.aria": "Credits to:",
      "credits.title": "Credits to:"
    },
    ru: {
      "nav.label": "\u0413\u043b\u0430\u0432\u043d\u0430\u044f \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f",
      "nav.overview": "\u041e\u0431\u0437\u043e\u0440",
      "nav.projects": "\u041f\u0440\u043e\u0435\u043a\u0442\u044b",
      "nav.notes": "\u0417\u0430\u043c\u0435\u0442\u043a\u0438",
      "nav.contact": "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b",
      "nav.credits": "\u0411\u043b\u0430\u0433\u043e\u0434\u0430\u0440\u043d\u043e\u0441\u0442\u0438",
      "footer.source": "\u0418\u0441\u0445\u043e\u0434\u043d\u044b\u0439 \u043a\u043e\u0434",
      "footer.font": "\u0428\u0440\u0438\u0444\u0442",
      "lang.label": "\u042f\u0437\u044b\u043a",
      "lang.toggle": "\u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u043d\u0430 \u0430\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0438\u0439",

      "index.meta.title": "MeltudeAbout()",
      "index.meta.description":
        "unpacking 'https://flakehub.com/f/DeterminateSystems/nixpkgs-weekly/0.1' into the Git cache...",
      "index.profile.aria": "\u041f\u0440\u043e\u0444\u0438\u043b\u044c",
      "index.sections.aria": "\u0420\u0430\u0437\u0434\u0435\u043b\u044b \u0441\u0430\u0439\u0442\u0430",
      "index.welcome.title": "\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u043d\u0430 Meltude.me!",
      "index.welcome.p1":
        "\u042d\u0442\u043e\u0442 \u0441\u0430\u0439\u0442 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u043f\u0440\u043e\u0441\u0442\u043e \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u0432\u0435\u0442\u0438\u0442\u044c \u043d\u0430 \u0432\u043e\u043f\u0440\u043e\u0441\u044b \u0432\u0440\u043e\u0434\u0435 \u00ab\u043a\u0442\u043e \u0442\u044b\u00bb, \u00ab\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0442\u0435\u0431\u0435 \u043b\u0435\u0442\u00bb \u0438 \u0442.\u0434.",
      "index.welcome.p2":
        "\u0422\u0430\u043a \u0447\u0442\u043e \u0434\u0430, \u044d\u0442\u043e \u043f\u043e \u0441\u0443\u0442\u0438 \u0441\u0430\u0439\u0442-\u0431\u0438\u043e\u0433\u0440\u0430\u0444\u0438\u044f. \u0425\u043e\u0440\u043e\u0448\u0435\u0433\u043e \u0434\u043d\u044f!",
      "index.profile.alt": "\u0424\u043e\u0442\u043e \u043f\u0440\u043e\u0444\u0438\u043b\u044f Meltude",
      "index.profile.name_dt": "\u0418\u043c\u044f",
      "index.profile.name_dd": "Meltude",
      "index.profile.age_dt": "\u0412\u043e\u0437\u0440\u0430\u0441\u0442",
      "index.profile.age_dd": "16 \u043b\u0435\u0442",
      "index.profile.birthday_dt": "\u0414\u0435\u043d\u044c \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f",
      "index.profile.about_dt": "\u041e \u0441\u0435\u0431\u0435",
      "index.profile.about_dd":
        "\u041f\u0440\u043e\u0441\u0442\u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c NixOS \u0438 \u0432\u043b\u0430\u0434\u0435\u043b\u0435\u0446 TeamSlag, \u0443\u0447\u0443\u0441\u044c \u043d\u0430 \u0441\u0435\u0442\u0435\u0432\u043e\u0433\u043e \u0438\u043d\u0436\u0435\u043d\u0435\u0440\u0430.",
      "index.cards.projects_title": "\u041f\u0440\u043e\u0435\u043a\u0442\u044b:",
      "index.cards.projects_text": "\u0431\u0435\u0437 \u043e\u0431\u044a\u044f\u0441\u043d\u0435\u043d\u0438\u0439",
      "index.cards.projects_link": "\u0427\u0438\u0442\u0430\u0442\u044c",
      "index.cards.about_title": "\u041e\u0431\u043e \u043c\u043d\u0435:",
      "index.cards.about_text": "\u043c\u043e\u0451 \u043f\u043e\u0434\u0440\u043e\u0431\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435.",
      "index.cards.about_link": "\u0427\u0438\u0442\u0430\u0442\u044c",
      "index.cards.contacts_title": "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b:",
      "index.cards.contacts_text":
        "<i>*\u043a\u0445\u043c*</i> \u044d\u0442\u043e \u043f\u0440\u043e\u0441\u0442\u043e \u043c\u043e\u0438 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u044b?",
      "index.cards.contacts_link": "\u0427\u0438\u0442\u0430\u0442\u044c",
      "index.cards.credits_title": "\u0411\u043b\u0430\u0433\u043e\u0434\u0430\u0440\u043d\u043e\u0441\u0442\u0438:",
      "index.cards.credits_text":
        "<i>*\u043a\u0445\u043c*</i> \u044d\u0442\u043e \u043f\u0440\u043e\u0441\u0442\u043e \u0434\u0440\u0443\u0437\u044c\u044f?",
      "index.cards.credits_link": "\u0427\u0438\u0442\u0430\u0442\u044c",

      "projects.meta.title": "MeltudeProjects()",
      "projects.meta.description": "\u041f\u0440\u043e\u0435\u043a\u0442\u044b TeamSlag \u0438 Meltude.",
      "projects.aria": "\u041f\u0440\u043e\u0435\u043a\u0442\u044b",
      "projects.hidden_h1": "\u041f\u0440\u043e\u0435\u043a\u0442\u044b",
      "projects.teamslag_title": "\u041f\u0440\u043e\u0435\u043a\u0442\u044b TeamSlag:",
      "projects.fetch_desc":
        "\u0423\u0442\u0438\u043b\u0438\u0442\u0430, \u043a\u043e\u0442\u043e\u0440\u0430\u044f \u00ab\u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0435\u0442\u00bb \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044e \u043e \u0441\u0438\u0441\u0442\u0435\u043c\u0435.",
      "projects.slagger_desc":
        "\u0424\u0435\u0439\u043a\u043e\u0432\u044b\u0439 \u0445\u0430\u043a\u0435\u0440\u0441\u043a\u0438\u0439 \u0438\u043d\u0441\u0442\u0440\u0443\u043c\u0435\u043d\u0442, \u043d\u0430\u043f\u0438\u0441\u0430\u043d\u043d\u044b\u0439 \u043f\u0440\u043e\u0441\u0442\u043e \u0440\u0430\u0434\u0438 \u0442\u0440\u043e\u043b\u043b\u0438\u043d\u0433\u0430.",
      "projects.goutils_desc":
        "\u041f\u043e\u043f\u044b\u0442\u043a\u0430 \u0441\u0434\u0435\u043b\u0430\u0442\u044c GNU Coreutils \u043d\u0430 Golang.",
      "projects.nckernel_desc": "\u0433\u043e\u043b\u043e\u0435 \u044f\u0434\u0440\u043e",
      "projects.view_repo": "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0440\u0435\u043f\u043e\u0437\u0438\u0442\u043e\u0440\u0438\u0439",
      "projects.mine_title": "\u041c\u043e\u0438 \u0441\u043e\u0431\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u044b:",
      "projects.mine_text": "\u041f\u043e\u043a\u0430 \u0443 \u043c\u0435\u043d\u044f \u0438\u0445 \u043d\u0435\u0442.",

      "notes.meta.title": "MeltudeNotes()",
      "notes.meta.description":
        "\u0411\u043e\u043b\u044c\u0448\u0435 \u043e Meltude: \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u044b, \u0441\u0435\u0442\u0430\u043f \u0438 \u043b\u044e\u0431\u0438\u043c\u044b\u0435 \u0438\u0433\u0440\u044b.",
      "notes.aria": "\u0411\u0438\u043e\u0433\u0440\u0430\u0444\u0438\u044f",
      "notes.title": "\u0417\u0430\u043c\u0435\u0442\u043a\u0438:",
      "notes.about_title": "\u041e\u0431\u043e \u043c\u043d\u0435",
      "notes.pronouns_dt": "\u041c\u0435\u0441\u0442\u043e\u0438\u043c\u0435\u043d\u0438\u044f",
      "notes.pronouns_dd": "Jerk / Bum / Bumie",
      "notes.political_dt": "\u041f\u043e\u043b\u0438\u0442. \u0432\u0437\u0433\u043b\u044f\u0434\u044b",
      "notes.political_dd": "\u041b\u0435\u0432\u044b\u0439 \u043b\u0438\u0431\u0435\u0440\u0430\u043b\u0438\u0437\u043c",
      "notes.orientation_dt": "\u041e\u0440\u0438\u0435\u043d\u0442\u0430\u0446\u0438\u044f",
      "notes.orientation_dd": "\u0411\u0438\u0441\u0435\u043a\u0441\u0443\u0430\u043b, \u043d\u0435 \u0438\u0449\u0443 \u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u0439.",
      "notes.languages_dt": "\u042f\u0437\u044b\u043a\u0438",
      "notes.languages_dd":
        "\u0410\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0438\u0439 \u0438 \u0440\u0443\u0441\u0441\u043a\u0438\u0439; \u0441\u0435\u0439\u0447\u0430\u0441 \u0443\u0447\u0443 \u0441\u043b\u043e\u0432\u0430\u0446\u043a\u0438\u0439.",
      "notes.likes_title": "\u0427\u0442\u043e \u043c\u043d\u0435 \u043d\u0440\u0430\u0432\u0438\u0442\u0441\u044f",
      "notes.likes_p1":
        "\u0418\u0437\u0443\u0447\u0430\u044e Go \u0438 \u043f\u043e\u043c\u043e\u0433\u0430\u044e \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u0447\u0438\u043a\u0430\u043c \u0441 \u043d\u0438\u0448\u0435\u0432\u044b\u043c\u0438 \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u043c\u0438 \u043d\u0430 GitHub.",
      "notes.likes_p2": "\u0422\u0430\u043a\u0436\u0435 \u0438\u043d\u0442\u0435\u0440\u0435\u0441\u0443\u044e\u0441\u044c \u0441\u0435\u0442\u0435\u0432\u043e\u0439 \u0438\u043d\u0436\u0435\u043d\u0435\u0440\u0438\u0435\u0439.",
      "notes.setup_title": "\u0421\u0435\u0442\u0430\u043f",
      "notes.setup_text":
        "NixOS 26.11 (unstable-\u043a\u0430\u043d\u0430\u043b) \u0441\u043e SwayFX, \u043f\u043e\u0442\u0440\u044f\u0441\u0430\u044e\u0449\u0438\u043c \u0444\u043e\u0440\u043a\u043e\u043c \u043e\u043a\u043e\u043d\u043d\u043e\u0433\u043e \u043a\u043e\u043c\u043f\u043e\u043d\u043e\u0432\u0449\u0438\u043a\u0430 SwayWM.",
      "notes.games_title": "\u041b\u044e\u0431\u0438\u043c\u044b\u0435 \u0438\u0433\u0440\u044b",

      "contact.meta.title": "MeltudeContacts()",
      "contact.meta.description": "\u041a\u0430\u043a \u0441\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f \u0441 Meltude.",
      "contact.aria": "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u044b\u0435 \u0441\u0441\u044b\u043b\u043a\u0438",
      "contact.title": "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b:",
      "contact.teamslag_link": "\u041c\u043e\u044f \u043e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f",

      "credits.meta.title": "JustCredits()",
      "credits.meta.description":
        "\u0411\u043b\u0430\u0433\u043e\u0434\u0430\u0440\u043d\u043e\u0441\u0442\u0438 \u0438 \u0441\u043f\u0430\u0441\u0438\u0431\u043e \u0432\u0441\u0435\u043c, \u043a\u0442\u043e \u043f\u043e\u043c\u043e\u0433 \u0441 meltude.me",
      "credits.aria": "\u0411\u043b\u0430\u0433\u043e\u0434\u0430\u0440\u043d\u043e\u0441\u0442\u0438:",
      "credits.title": "\u0411\u043b\u0430\u0433\u043e\u0434\u0430\u0440\u043d\u043e\u0441\u0442\u0438:"
    }
  };

  function normalize(lang) {
    if (!lang) return null;
    lang = String(lang).toLowerCase();
    if (lang.indexOf("ru") === 0) return "ru";
    if (lang.indexOf("uk") === 0 || lang.indexOf("be") === 0) return "ru";
    if (lang.indexOf("en") === 0) return "en";
    if (LANGS.indexOf(lang) !== -1) return lang;
    return null;
  }

  function getInitialLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (normalize(saved)) return normalize(saved);
    } catch (e) {}
    var nav = navigator.language || navigator.userLanguage;
    return normalize(nav) || "en";
  }

  function t(lang, key) {
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] != null)
      return TRANSLATIONS[lang][key];
    if (TRANSLATIONS.en[key] != null) return TRANSLATIONS.en[key];
    return null;
  }

  function applyLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = t(lang, key);
      if (val != null) el.innerHTML = val;
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var val = t(lang, el.getAttribute("data-i18n-alt"));
      if (val != null) el.setAttribute("alt", val);
    });

    document
      .querySelectorAll("[data-i18n-aria-label]")
      .forEach(function (el) {
        var val = t(lang, el.getAttribute("data-i18n-aria-label"));
        if (val != null) el.setAttribute("aria-label", val);
      });

    document.querySelectorAll("[data-i18n-content]").forEach(function (el) {
      var val = t(lang, el.getAttribute("data-i18n-content"));
      if (val != null) el.setAttribute("content", val);
    });

    document.documentElement.lang = lang;

    // Single toggle button: show the *other* language.
    var toggle = document.getElementById("lang-toggle");
    if (toggle) {
      var other = lang === "en" ? "ru" : "en";
      toggle.textContent = other.toUpperCase();
      var hint = t(lang, "lang.toggle");
      if (hint != null) toggle.setAttribute("aria-label", hint);
      toggle.setAttribute("title", hint != null ? hint : toggle.textContent);
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function init() {
    var current = getInitialLang();
    applyLang(current);
    var toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var next =
          document.documentElement.lang === "en" ? "ru" : "en";
        applyLang(next);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
