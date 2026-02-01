const song = document.querySelector(".song");
const video = document.querySelector("video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");
const progressCircle = document.querySelector(".progress circle");

const outlineLength = 879;
progressCircle.style.strokeDasharray = outlineLength;
progressCircle.style.strokeDashoffset = outlineLength;

let fakeDuration = 600;

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

// Change sound & video
soundButtons.forEach(button => {
    button.addEventListener("click", function () {
        song.src = this.dataset.sound;
        video.src = this.dataset.video;
        song.play();
        video.play();
        playBtn.textContent = "⏸";
    });
});

// Change time
timeButtons.forEach(button => {
    button.addEventListener("click", function () {
        fakeDuration = this.dataset.time;
        updateTime(fakeDuration);
    });
});

// Update countdown
song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let remaining = fakeDuration - currentTime;

    let minutes = Math.floor(remaining / 60);
    let seconds = Math.floor(remaining % 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    progressCircle.style.strokeDashoffset = progress;

    if (currentTime >= fakeDuration) {
        song.pause();
        video.pause();
        song.currentTime = 0;
        playBtn.textContent = "▶";
    }
};

// Initial time
function updateTime(time) {
    let minutes = Math.floor(time / 60);
    timeDisplay.textContent = `${minutes}:0`;
}
