const app = document.querySelector("#app");
const video = document.querySelector("video");
const audio = document.querySelector("audio");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");

const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll("#time-select button");

let duration = 600; // default 10 minutes

// Play / Pause
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        video.play();
        playBtn.textContent = "Pause";
    } else {
        audio.pause();
        video.pause();
        playBtn.textContent = "Play";
    }
});

// Sound Switching
soundButtons.forEach(button => {
    button.addEventListener("click", function () {
        audio.src = this.dataset.sound;
        video.src = this.dataset.video;
        audio.play();
        video.play();
        playBtn.textContent = "Pause";
    });
});

// Time Selection
timeButtons.forEach(button => {
    button.addEventListener("click", function () {
        duration = this.dataset.time;
        updateTime(duration);
    });
});

// Update Time Display
function updateTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timeDisplay.textContent = `${minutes}:${seconds}`;
}

// Countdown Logic
audio.ontimeupdate = () => {
    let remaining = duration - audio.currentTime;
    if (remaining <= 0) {
        audio.pause();
        video.pause();
        audio.currentTime = 0;
        playBtn.textContent = "Play";
    }
    updateTime(Math.floor(remaining));
};

