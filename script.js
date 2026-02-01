const app = document.getElementById("app");
const song = document.querySelector(".song");
const video = document.querySelector("video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeSelect = document.querySelectorAll("#time-select button");
const soundPicker = document.querySelectorAll(".sound-picker button");

let fakeDuration = 600; // default 10 min

// Play / Pause
playBtn.addEventListener("click", () => {
    if (song.paused) {
        song.play();
        video.play();
        playBtn.textContent = "⏸";
    } else {
        song.pause();
        video.pause();
        playBtn.textContent = "▶";
    }
});

// Change Sound & Video
soundPicker.forEach(button => {
    button.addEventListener("click", function () {
        song.src = this.getAttribute("data-sound");
        video.src = this.getAttribute("data-video");
        song.play();
        video.play();
        playBtn.textContent = "⏸";
    });
});

// Change Time
timeSelect.forEach(button => {
    button.addEventListener("click", function () {
        fakeDuration = this.getAttribute("data-time");
        updateTime(fakeDuration);
    });
});

// Update Time Display
const updateTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;
};

// Countdown
song.ontimeupdate = () => {
    let remainingTime = fakeDuration - song.currentTime;

    let minutes = Math.floor(remainingTime / 60);
    let seconds = Math.floor(remainingTime % 60);

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (song.currentTime >= fakeDuration) {
        song.pause();
        video.pause();
        song.currentTime = 0;
        playBtn.textContent = "▶";
    }
};
