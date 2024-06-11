// scoreboard info
const titleGame = document.querySelector(".scoreboard-title--game");
let initialPrize = 11;
let totalPrize = 125;

// count prizes
const countPrize = (value, timer) => {
  let balanceBoard = document.querySelector(".scoreboard-balance__count");
  let balance = +balanceBoard.textContent;

  let counter = setInterval(() => {
    if (value >= 1000) balance += 10;
    if (value <= 1000) balance += 1;
    if (balance === value) clearInterval(counter);
    balanceBoard.textContent = balance;
  }, timer);

  if (balance === value) clearInterval(counter);
};

// game cards
const handleCard = () => {
  const cards = document.querySelectorAll(".game-cards__item");
  let count = [];

  cards.forEach((item, ind) => {
    item.addEventListener("click", (e) => {
      if (count.length >= 2 || count.includes(ind)) return;
      count.push(ind);

      // to add GIF or WEBP animation for card
      const bgFlag = item.querySelector(".game-cards__item-flag").children;
      bgFlag[0].setAttribute("srcset", `img/webp/flag-animation-${ind}.webp`);
      bgFlag[1].setAttribute("srcset", `img/webp/flag-animation-${ind}.webp`);
      bgFlag[2].setAttribute("srcs", `img/webp/flag-animation-${ind}.webp`);

      // count card prize
      countPrize(initialPrize, 100);

      if (count.length === 2) {
        // add bonus free spins
        const bonuses = item.querySelector(".game-cards__item-prize").children;
        bonuses[0].setAttribute("srcset", "img/webp/fs.webp");
        bonuses[1].setAttribute("srcset", "img/fs.png");
        bonuses[2].setAttribute("src", "img/fs.png");

        // open last popup
        setTimeout((e) => {
          document.getElementById("popup-first").classList.add("active");
          
        }, 1400);
      }
    });
  });
};

handleCard();

// popup
const popupBtns = document.querySelectorAll(".btn");
popupBtns.forEach((item) => {
  item.addEventListener("click", (e) => {
    document.querySelector(".game-cards").classList.add("game-hidden");
    document.querySelector(".game-wheel").classList.add("game-wheel--active");

    document.getElementById("popup-first").classList.remove("active");
    document.getElementById("popup-first").classList.add("disabled");
    titleGame.classList.remove("visible");
  });
});

// lazy loading
const images = document.querySelectorAll("[data-src]");
const imgOptions = {
  threshold: 0,
  rootMargin: "0px 0px 300px 0px",
};

function preloadImage(img) {
  const src = img.getAttribute("data-src");

  if (!src) return;

  img.src = src;
}

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, imgOptions);

images.forEach((image) => {
  imgObserver.observe(image);
});
