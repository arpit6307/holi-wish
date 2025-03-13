document.addEventListener("DOMContentLoaded", () => {
    // Music Play/Pause
    const holiSong = document.getElementById("holiSong");
    const playPauseBtn = document.getElementById("playPauseBtn");
    let isPlaying = false;

    playPauseBtn.addEventListener("click", () => {
        if (isPlaying) {
            holiSong.pause();
            playPauseBtn.textContent = "🔊 Play Music";
        } else {
            holiSong.play();
            playPauseBtn.textContent = "⏸ Pause Music";
        }
        isPlaying = !isPlaying;
    });

    // Camera Functionality
    const openCameraBtn = document.getElementById("openCameraBtn");
    const closeCameraBtn = document.getElementById("closeCameraBtn");
    const captureBtn = document.getElementById("captureBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const cameraContainer = document.getElementById("camera-container");
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const previewContainer = document.getElementById("preview-container");
    const previewImage = document.getElementById("preview-image");
    const notification = document.getElementById("notification");

    let stream = null;

    // Open Camera
    openCameraBtn.addEventListener("click", async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            cameraContainer.style.display = "block";
        } catch (err) {
            alert("Camera access denied! Please allow camera permissions.");
        }
    });

    // Close Camera
    closeCameraBtn.addEventListener("click", () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        cameraContainer.style.display = "none";
    });

    // Capture Photo with Holi Filter
    captureBtn.addEventListener("click", () => {
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Apply Holi filter image
        const holiFilter = new Image();
        holiFilter.src = "holi_filter.png";  // Holi filter overlay
        holiFilter.onload = () => {
            context.drawImage(holiFilter, 0, 0, canvas.width, canvas.height); // Overlay filter
            const imageDataURL = canvas.toDataURL("image/png");

            // Show preview
            previewImage.src = imageDataURL;
            previewContainer.style.display = "block";

            // Show notification
            notification.style.display = "block";
            setTimeout(() => {
                notification.style.display = "none";
            }, 3000);
        };
    });

    // Download Photo with Holi Filter
    downloadBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.href = previewImage.src;
        link.download = "Holi_Selfie.png";
        link.click();
    });

    // Holi Themed Particle Animation
    function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        
        // Random position and color
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        
        document.body.appendChild(particle);

        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }

    setInterval(createParticle, 200);
});
