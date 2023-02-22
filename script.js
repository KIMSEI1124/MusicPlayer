let now_playing = document.querySelector(".now-playing");
let music_pic = document.querySelector(".music-pic");
let music_wrapper = document.querySelector(".pic-wrapper");
let music_name = document.querySelector(".music-name");
let music_artist = document.querySelector(".artist");

let playStop_btn = document.querySelector(".playStop-music");
let pre_btn = document.querySelector(".pre-music");
let next_btn = document.querySelector(".next-music");

let music_slider = document.querySelector(".music-slider");
let volume_slider = document.querySelector(".volume-slider");
let current_time = document.querySelector(".current-time");
let total_time = document.querySelector(".total-time");
let this_music = document.createElement("audio");
let wave = document.getElementById("wave");

let music_index = 0;
let isPlaying = false;
let updateTimer;

const music_list = [
  {
    img: "On&On.jpg",
    name: "On & On (feat. Daniel Levi)",
    artist: "Cartoon",
    music: "music/Cartoon - On & On (feat. Daniel Levi).mp3",
  },
  {
    img: "MyHeart.jpg",
    name: "My Heart",
    artist: "Different Heaven & EH!DE",
    music: "music/Different Heaven & EH!DE - My Heart.mp3",
  },
  {
    img: "Superhero.jpg",
    name: "Superhero (feat. Chris Linton)",
    artist: "Unknown Brain",
    music: "music/Unknown Brain - Superhero (feat. Chris Linton).mp3",
  },
];

loadMusic(music_index);

function loadMusic(music_index) {
  clearInterval(updateTimer);
  reset();

  this_music.src = music_list[music_index].music;
  this_music.load();

  music_pic.style.backgroundImage =
    "url(./pic/" + music_list[music_index].img + ")";
  music_name.textContent = music_list[music_index].name;
  music_artist.textContent = music_list[music_index].artist;
  now_playing.textContent =
    "Playing music " + (music_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(setUpdate, 1000);

  this_music.addEventListener("ended", nextMusic);
  wave.classList.add("loader");
  random_bg_color();
}

function reset() {
  current_time.textContent = "00:00";
  total_time.textContent = "00:00";
  music_slider.value = 0;
}

function playStopMusic() {
  if (isPlaying == true) {
    stopMusic();
  } else {
    playMusic();
  }
}

// TODO: Stop일 경우 사진크기 0.7 Play를 누르면 0.7 -> 1.05 -> 1.0

// TODO: Play일 경우 사진크기 1.0 Stop를 누르면 1.0 -> 0.7

function playMusic() {
  this_music.play();
  isPlaying = true;
  playStop_btn.innerHTML = '<i class="fa fa-pause fa-3x"></i>';
}

function stopMusic() {
  this_music.pause();
  isPlaying = false;
  playStop_btn.innerHTML = '<i class="fa fa-play fa-3x"></i>';
}

function nextMusic() {
  if (music_index < music_list.length - 1) {
    music_index += 1;
  } else {
    music_index = 0;
  }
  loadMusic(music_index);
  playMusic();
}

function preMusic() {
  if (music_index > 0) {
    music_index -= 1;
  } else {
    music_index = music_list.length - 1;
  }
  loadMusic(music_index);
  playMusic();
}

function seekTo() {
  let temp = this_music.duration * (music_slider.value / 100);
  this_music.currentTime = temp;
}

function setVolume() {
  this_music.volume = volume_slider.value / 100;
}

function volume0() {
  volume_slider.value = 0;
  setVolume();
}

function volume100() {
  volume_slider.value = 100;
  setVolume();
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(this_music.duration)) {
    seekPosition = this_music.currentTime * (100 / this_music.duration);
    music_slider.value = seekPosition;

    let currentMinutes = Math.floor(this_music.currentTime / 60);
    let currentSeconds = Math.floor(
      this_music.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(this_music.duration / 60);
    let durationSeconds = Math.floor(
      this_music.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    current_time.textContent = currentMinutes + ":" + currentSeconds;
    total_time.textContent = durationMinutes + ":" + durationSeconds;
  }
}

function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate("#");
  let Color2 = populate("#");
  var angle = "to right";

  let gradient =
    "linear-gradient(" + angle + "," + Color1 + ", " + Color2 + ")";
  document.body.style.background = gradient;
}

function link() {
  window.open("http://spoti.fi/NCS");
}