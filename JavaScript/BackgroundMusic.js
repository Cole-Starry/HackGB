const musicPreferenceKey = "foundryBackgroundMusicPreference";
const musicTrack = document.body.dataset.backgroundMusicTrack || "Meander.mp3";
const musicTitle = document.body.dataset.backgroundMusicTitle || "Meander";
const musicPositionKey = `foundryBackgroundMusicPosition:${musicTrack}`;
const music = new Audio(new URL(`../Audio/${musicTrack}`, document.currentScript.src));
const outcomeType = document.body.dataset.outcome;
const outcomeTrack = outcomeType === "defeat" ? "Defeat.mp3" : "Success.mp3";
const musicControl = document.createElement("button");
const savedPosition = Number(sessionStorage.getItem(musicPositionKey));
let musicUnavailable = false;

const outcomeSound = new Audio(new URL(`../Audio/${outcomeTrack}`, document.currentScript.src));
let outcomeSoundPlayed = false;

outcomeSound.volume = 0.65;
outcomeSound.addEventListener("error", () => {
    console.error(`Unable to load the ${outcomeType || "success"} sound.`, outcomeSound.error);
});

const playOutcomeSound = () => {
    if (outcomeSoundPlayed) {
        return;
    }

    outcomeSoundPlayed = true;
    outcomeSound.play().catch((error) => {
        if (error.name === "NotAllowedError") {
            const retryOnInteraction = () => {
                document.removeEventListener("pointerdown", retryOnInteraction);
                document.removeEventListener("keydown", retryOnInteraction);
                outcomeSound.play().catch((retryError) => {
                    console.error(`Unable to play the ${outcomeType || "success"} sound.`, retryError);
                });
            };
            document.addEventListener("pointerdown", retryOnInteraction, { once: true });
            document.addEventListener("keydown", retryOnInteraction, { once: true });
            return;
        }

        console.error(`Unable to play the ${outcomeType || "success"} sound.`, error);
    });
};

outcomeSound.addEventListener("play", () => {
    outcomeSoundPlayed = true;
});

if (outcomeType) {
    playOutcomeSound();
}
document.addEventListener("training-success", playOutcomeSound);

music.loop = true;
music.preload = "auto";
music.volume = 0.35;

musicControl.type = "button";
musicControl.className = "background-music-control";
musicControl.textContent = "♫ Play music";
musicControl.setAttribute("aria-label", `Play ${musicTitle} background music`);
musicControl.setAttribute("aria-pressed", "false");
document.body.append(musicControl);

const updateMusicControl = () => {
    const isPlaying = !music.paused;
    musicControl.textContent = isPlaying ? "♫ Pause music" : "♫ Play music";
    musicControl.setAttribute("aria-label", `${isPlaying ? "Pause" : "Play"} ${musicTitle} background music`);
    musicControl.setAttribute("aria-pressed", String(isPlaying));
};

const showMusicUnavailable = () => {
    musicUnavailable = true;
    musicControl.disabled = true;
    musicControl.textContent = "♫ Music unavailable";
    musicControl.setAttribute("aria-label", `${musicTitle} background music is unavailable`);
    musicControl.setAttribute("aria-pressed", "false");
};

const startMusic = (savePreference) => {
    if (musicUnavailable) {
        return;
    }

    if (savePreference) {
        sessionStorage.setItem(musicPreferenceKey, "playing");
    }

    music.play().catch((error) => {
        if (error.name !== "NotAllowedError") {
            console.error(`Unable to play ${musicTitle} background music.`, error);
            showMusicUnavailable();
        }
    });
};

const saveMusicPosition = () => {
    if (Number.isFinite(music.currentTime)) {
        sessionStorage.setItem(musicPositionKey, String(music.currentTime));
    }
};

music.addEventListener("loadedmetadata", () => {
    if (Number.isFinite(savedPosition) && savedPosition > 0 && Number.isFinite(music.duration) && music.duration > 0) {
        music.currentTime = savedPosition % music.duration;
    }
}, { once: true });
music.addEventListener("play", () => {
    updateMusicControl();
    if (sessionStorage.getItem(musicPreferenceKey) !== "paused") {
        sessionStorage.setItem(musicPreferenceKey, "playing");
    }
});
music.addEventListener("pause", updateMusicControl);
music.addEventListener("timeupdate", saveMusicPosition);
music.addEventListener("error", () => {
    console.error(`Unable to load ${musicTitle} background music.`, music.error);
    showMusicUnavailable();
});

musicControl.addEventListener("click", () => {
    if (music.paused) {
        startMusic(true);
    } else {
        sessionStorage.setItem(musicPreferenceKey, "paused");
        music.pause();
        saveMusicPosition();
    }
});

document.addEventListener("click", (event) => {
    if (musicControl.contains(event.target) || sessionStorage.getItem(musicPreferenceKey) === "paused") {
        return;
    }
    if (music.paused) {
        startMusic(true);
    }
});

window.addEventListener("pagehide", saveMusicPosition);

if (sessionStorage.getItem(musicPreferenceKey) !== "paused") {
    startMusic(false);
}
