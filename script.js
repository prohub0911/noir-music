const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTimeText =
  document.getElementById("currentTime");

const durationText =
  document.getElementById("duration");

const playerTitle =
  document.getElementById("playerTitle");

const playerArtist =
  document.getElementById("playerArtist");

const playerCover =
  document.getElementById("playerCover");

const searchInput =
  document.getElementById("searchInput");


let currentIndex = 0;

const songs = [
  {
    title: "After Dark",
    artist: "Mr. Kitty",
    src: "music/song1.mp3",
    cover: "images/cover1.jpg"
  },

  {
    title: "Midnight City",
    artist: "M83",
    src: "music/song2.mp3",
    cover: "images/cover2.jpg"
  },

  {
    title: "The Night We Met",
    artist: "Lord Huron",
    src: "music/song3.mp3",
    cover: "images/cover3.jpg"
  },

  {
    title: "Space Song",
    artist: "Beach House",
    src: "music/song4.mp3",
    cover: "images/cover4.jpg"
  }
];


// Load song

function loadSong(index) {

  currentIndex = index;

  const song = songs[currentIndex];

  audio.src = song.src;

  playerTitle.textContent = song.title;
  playerArtist.textContent = song.artist;

  playerCover.src = song.cover;

  progress.value = 0;
}


// Play

function playCurrent() {

  if (!audio.src) {
    loadSong(currentIndex);
  }

  audio.play();

  playBtn.textContent = "❚❚";
}


// Pause / Play

function togglePlay() {

  if (audio.paused) {

    if (!audio.src) {
      loadSong(currentIndex);
    }

    audio.play();

    playBtn.textContent = "❚❚";

  } else {

    audio.pause();

    playBtn.textContent = "▶";
  }
}


// Next

function nextSong() {

  currentIndex++;

  if (currentIndex >= songs.length) {
    currentIndex = 0;
  }

  loadSong(currentIndex);

  audio.play();

  playBtn.textContent = "❚❚";
}


// Previous

function previousSong() {

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = songs.length - 1;
  }

  loadSong(currentIndex);

  audio.play();

  playBtn.textContent = "❚❚";
}


// Song card

function playSongFromCard(button) {

  const card = button.closest(".song-card");

  const title = card.dataset.title;

  const index = songs.findIndex(
    song => song.title === title
  );

  if (index !== -1) {

    loadSong(index);

    audio.play();

    playBtn.textContent = "❚❚";
  }
}


// Progress update

audio.addEventListener("timeupdate", () => {

  if (!audio.duration) return;

  const percent =
    (audio.currentTime / audio.duration) * 100;

  progress.value = percent;

  currentTimeText.textContent =
    formatTime(audio.currentTime);
});


// Duration

audio.addEventListener("loadedmetadata", () => {

  durationText.textContent =
    formatTime(audio.duration);
});


// Seek

progress.addEventListener("input", () => {

  if (!audio.duration) return;

  audio.currentTime =
    (progress.value / 100) * audio.duration;
});


// Volume

volume.addEventListener("input", () => {

  audio.volume = volume.value;
});

audio.volume = 0.8;


// Automatically next song

audio.addEventListener("ended", () => {
  nextSong();
});


// Search

searchInput.addEventListener("input", () => {

  const query =
    searchInput.value.toLowerCase().trim();

  const cards =
    document.querySelectorAll(".song-card");

  cards.forEach(card => {

    const title =
      card.dataset.title.toLowerCase();

    const artist =
      card.dataset.artist.toLowerCase();

    if (
      title.includes(query) ||
      artist.includes(query)
    ) {

      card.style.display = "";

    } else {

      card.style.display = "none";
    }
  });
});


// Like button

document
  .getElementById("likeBtn")
  .addEventListener("click", function () {

    if (this.textContent === "♡") {
      this.textContent = "♥";
    } else {
      this.textContent = "♡";
    }

  });


// Time format

function formatTime(seconds) {

  if (isNaN(seconds)) {
    return "0:00";
  }

  const minutes =
    Math.floor(seconds / 60);

  const secs =
    Math.floor(seconds % 60);

  return (
    minutes +
    ":" +
    String(secs).padStart(2, "0")
  );
}


// Initial song

loadSong(0);
