// form for adding games
const addGameForm = document.querySelector(".add-items");

// Container for list of games
const gameList = document.querySelector(".list");

// List of saved games
const games = JSON.parse(localStorage.getItem("games")) || [];

// Grab CheckAll UncheckAll and Clear Buttons
const checkAllBtn = document.querySelector(".check-all");
const uncheckAllBtn = document.querySelector(".uncheck-all");
const clearBtn = document.querySelector(".clear-btn");

addGameForm.addEventListener("submit", addGame);
gameList.addEventListener("click", toggleGameComplete);
checkAllBtn.addEventListener("click", e => toggleGameCheck(true));
uncheckAllBtn.addEventListener("click", e => toggleGameCheck(false));
clearBtn.addEventListener("click", e => clearGamesList(games, gameList));

function addGame(e) {
  e.preventDefault();
  const newGame = {
    name: this.querySelector("[name=game]").value,
    complete: false
  };
  games.push(newGame);
  this.reset();
  populateList(games, gameList);
  setLocalStorage("games", games);
}

function populateList(games = [], gameList) {
  gameList.innerHTML = games
    .map((game, i) => {
      return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${
        game.complete ? "checked" : ""
      }>
                <label for="item${i}">${game.name}</label>
            </li>
            `;
    })
    .join("");
}

function toggleGameComplete(e) {
  if (e.target.matches("input")) {
    games[e.target.dataset.index].complete = !games[e.target.dataset.index]
      .complete;
    setLocalStorage("games", games);
  }
}

function toggleGameCheck(check) {
  const checkBoxes = gameList.querySelectorAll("input");
  checkBoxes.forEach(checkBox => {
    check
      ? checkBox.setAttribute("checked", true)
      : checkBox.removeAttribute("checked");
    games[checkBox.dataset.index].complete = check;
    setLocalStorage("games", games);
  });
}

function clearGamesList(collection, list) {
  collection.splice(0, collection.length);
  list.innerHTML = `
    <li>No games here, enter something :)</li>
  `;
  clearLocalStorage();
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function clearLocalStorage() {
  localStorage.clear();
}

window.onload = () => {
  populateList(games, gameList);
};
