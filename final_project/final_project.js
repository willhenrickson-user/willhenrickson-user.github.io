const acceptButton = document.getElementById("accept-btn");
const acceptedVolumeDisplay = document.getElementById("accepted-volume");

const button = document.getElementById("bet-btn");
const volumeInput = document.getElementById("volume");
const circles = document.querySelectorAll(".circle");

const startingBetDisplay = document.getElementById("starting-bet");
const currentTotalDisplay = document.getElementById("current-total");
const flipResultDisplay = document.getElementById("flip-result");

let timeouts = [];

button.addEventListener("click", () => {
  let bet = Number(volumeInput.value);

  if (isNaN(bet) || bet < 0 || bet > 50) {
    flipResultDisplay.textContent = "Please enter a number from 0 to 50.";
    return;
  }

  timeouts.forEach(timeout => clearTimeout(timeout));
  timeouts = [];

  circles.forEach(circle => circle.classList.remove("active"));

  let currentTotal = bet;
  startingBetDisplay.textContent = bet;
  currentTotalDisplay.textContent = currentTotal;
  flipResultDisplay.textContent = "Bet placed...";

  circles.forEach((circle, index) => {
    const timeout = setTimeout(() => {
      circle.classList.add("active");

      const isHeads = Math.random() < 0.5;

      if (isHeads) {
        currentTotal = currentTotal * 2;
        flipResultDisplay.textContent = `Coin Flip ${index + 1}: Heads! Total doubled.`;
      } else {
        currentTotal = currentTotal / 2;
        flipResultDisplay.textContent = `Coin Flip ${index + 1}: Tails! Total halved.`;
      }

      currentTotalDisplay.textContent = currentTotal;
    }, index * 2000);

    timeouts.push(timeout);
  });
});

acceptButton.addEventListener("click", () => {
  const value = Number(currentTotalDisplay.textContent);
  const cappedValue = Math.min(value, 100);

  acceptedVolumeDisplay.textContent = `Accepted: ${cappedValue}`;
});