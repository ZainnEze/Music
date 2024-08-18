const audio = document.getElementById('audio');
const songTitle = document.getElementById('song-title');
const songDuration = document.getElementById('song-duration');
const playPauseBtn = document.getElementById('play-pause-btn');
const repeatBtn = document.getElementById('repeat-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const songs = [
    { title: "DJ Good Life", src: "djgl.mp3" },
    { title: "DJ Sweet Love X Melody", src: "djswxm.mp3" },
    { title: "DJ Hilang Harapan Rmx", src: "djhpr.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;
let isRepeating = false;

function loadSong(song) {
    audio.src = song.src;
    songTitle.textContent = song.title;
}

function updateDuration() {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
    
    songDuration.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / ${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}

function playPauseSong() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
}

function toggleRepeat() {
    isRepeating = !isRepeating;
    repeatBtn.style.backgroundColor = isRepeating ? '#28a745' : '#007bff';
    audio.loop = isRepeating;
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playPauseSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playPauseSong();
}

audio.addEventListener('timeupdate', updateDuration);
audio.addEventListener('ended', () => {
    if (!isRepeating) {
        nextSong();
    }
});
playPauseBtn.addEventListener('click', playPauseSong);
repeatBtn.addEventListener('click', toggleRepeat);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

window.onload = () => {
    loadSong(songs[currentSongIndex]);
};
