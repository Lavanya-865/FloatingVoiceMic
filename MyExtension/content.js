const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function injectMicButton() {
    // Avoid duplicate mic
    if (document.getElementById("floating-voice-mic")) return;

    const micBtn = document.createElement("button");
    micBtn.id = "floating-voice-mic";
    micBtn.textContent = "🎙️";

    // Inject styles (optional if using CSS file)
    micBtn.style.position = "fixed";
    micBtn.style.top = "10px";
    micBtn.style.right = "10px";
    micBtn.style.zIndex = "9999";
    micBtn.style.background = "black";
    micBtn.style.color = "#fff";
    micBtn.style.border = "none";
    micBtn.style.borderRadius = "50%";
    micBtn.style.width = "40px";
    micBtn.style.height = "40px";
    micBtn.style.fontSize = "20px";
    micBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
    micBtn.style.cursor = "pointer";

    micBtn.addEventListener("click", () => {
        if (!SpeechRecognition) {
            alert("Speech recognition not supported.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            micBtn.textContent = "🎤";
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log("Heard:", transcript);
            micBtn.textContent = "🎙️";

            if (transcript.includes("youtube")) {
                window.open("https://www.youtube.com", "_blank");
            } else if (transcript.includes("linkedin")) {
                window.open("https://www.linkedin.com", "_blank");
            } else if (transcript.includes("google")) {
                window.open("https://www.google.com", "_blank");
            } else if (transcript.includes("github")) {
                window.open("https://www.github.com", "_blank");
            }  else if (transcript.includes("instagram")) {
                window.open("https://www.instagram.com", "_blank")
            } else {
                alert("No matching command: " + transcript);
            }
        };

        recognition.onerror = (e) => {
            console.error("Speech error:", e.error);
            micBtn.textContent = "🎙️";
            if (e.error === "not-allowed") {
                alert("Microphone access blocked. Please allow it in browser settings.");
            }
        };

        recognition.onend = () => {
            micBtn.textContent = "🎙️";
        };

        recognition.start();
    });

    // Safe append
    if (document.body) {
        document.body.appendChild(micBtn);
    } else {
        // If body doesn't exist yet, wait until it does
        const observer = new MutationObserver(() => {
            if (document.body) {
                document.body.appendChild(micBtn);
                observer.disconnect();
            }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }
}

// Wait until DOM is ready
if (document.readyState === "complete" || document.readyState === "interactive") {
    injectMicButton();
} else {
    window.addEventListener("DOMContentLoaded", injectMicButton);
}
