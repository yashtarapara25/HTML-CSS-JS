const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const volumeControl = document.getElementById('volume');
const songName = document.getElementById('songName');
const songArtist = document.getElementById('songArtist');

// Placeholder song info (you can replace this with dynamic data if using an API)
let currentSong = {
  name: 'Sample Song',
  artist: 'Sample Artist',
  src: 'song.mp3', // Or an online song URL
};

// Load song
audioPlayer.src = currentSong.src;
songName.textContent = currentSong.name;
songArtist.textContent = currentSong.artist;

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';  // Change button to pause
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = '▶️';  // Change button to play
  }
});

// Update progress bar as song plays
audioPlayer.addEventListener('timeupdate', () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress;
});

// Jump to specific time in song (clicking the progress bar)
progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});

// Volume control
volumeControl.addEventListener('input', () => {
  audioPlayer.volume = volumeControl.value / 100;
});

// Skip to next song (You can replace this with an array of songs if desired)
nextBtn.addEventListener('click', () => {
  alert('Next song functionality can be added!');
});

// Skip to previous song (You can replace this with an array of songs if desired)
prevBtn.addEventListener('click', () => {
  alert('Previous song functionality can be added!');
});
