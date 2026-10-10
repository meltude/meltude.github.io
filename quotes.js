(function () {
  var quotes = [
    {
      text: "Talk is cheap. Show me the code.",
      author: "Linus Torvalds",
    },
    {
      text: "You only have one shot.",
      author: "Niko, OneShot",
    },
    {
      text: "See, in the future, everything dies... for the most part. ",
      author: "The End is Nigh",
    },
    {
      text: "Science isn’t about WHY, it’s about WHY NOT!",
      author: "Cave Johnson, Portal 2",
    },
    {
      text: "This block of quotes still under development...",
      author: "Meltude",
    },
    {
      text: "DAMNED IS MAN FOR FAILING TO FOLLOW MY RULE, MY WORD, MY LAW",
      author: "Terminals, Ultrakill",
    },
    {
      text: "Disgrace. Humiliation.",
      author: "Cutscene, Ultrakill",
    },
    {
      text: "Presumptions are more terrifying than anything else. Especially when you are under the impression that your strengths and abilities are impressive.",
      author:
        "Kira  Yoshikage, JoJo's Bizzare Adventure: Diamond is Unbreakable ",
    },
    {
      text: "Even if the only things you say are yes or no I'll see blue sky...",
      author: "lyrics from Skies Forever Blue (TobyFox & Itoki Hana)",
    },
    {
      text: "Leaving this world isnt as scary as it seems...",
      author: "Richard, Hotline Miami 2: Wrong Number",
    },
    {
      text: "c-style синтакс афигенный!!!",
      author:
        "Inuhepott (at least i stole this quote from his site, im such a bastard muehehehe))))",
    },
    {
      text: "GNU fanaticism is bad",
      author:
        "i could say that every fanaticism is bad, i could write a big statement there but im lazy",
    },
    {
      text: "I got gitignored...",
      author: "Random dude from Sharplow discord server",
    },
    {
      text: "Я Интел юзаюю потому что меня батя пиздил об комп с амд.",
      author: "ArtemZeonov",
    },
    {
      text: "новый проект Redhat Systemd Вирус Эксплоит GCC кибероружие Redhat угроза",
      author: "https://github.com/redhatgccsystemd",
    },
    {
      text: "Be proud of your Death Count! The more you die, the more you're learning.",
      author: "Celeste",
    },
    {
      text: "WHY WOULD CARDBOARD... BLEED?",
      author: "Paperhead",
    },
    {
      text: "And please don’t cut your fingers in the process!",
      author: "Paperhead",
    },
  ];

  function init() {
    var pane = document.getElementById("quote-pane");
    var textEl = document.getElementById("quote-text");
    var authorEl = document.getElementById("quote-author");
    if (!pane || !textEl || !authorEl) return;

    var lastIndex = -1;

    function showRandom() {
      var i = Math.floor(Math.random() * quotes.length);
      if (quotes.length > 1) {
        while (i === lastIndex) {
          i = Math.floor(Math.random() * quotes.length);
        }
      }
      lastIndex = i;
      textEl.textContent = quotes[i].text;
      authorEl.textContent = quotes[i].author;
    }

    pane.addEventListener("click", showRandom);
    pane.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        showRandom();
      }
    });

    showRandom();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
