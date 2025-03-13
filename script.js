// Initialize Particles.js (Colorful Holi Effect)
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: ["#ff0000", "#ff7300", "#ffeb00", "#0fff00", "#00fff7", "#2400ff", "#8600ff"] },
    shape: { type: "circle" },
    size: { value: 5 },
    move: { speed: 1.5 },
    opacity: { value: 0.7 }
  }
});

// Function to Play/Pause Holi Song
function toggleMusic() {
  var music = document.getElementById("holiMusic");
  var button = document.getElementById("musicBtn");
  
  if (music.paused) {
      music.play();
      button.innerText = "🔇 Stop Holi Song";
  } else {
      music.pause();
      button.innerText = "🎵 Play Holi Song";
  }
}
