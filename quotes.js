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
