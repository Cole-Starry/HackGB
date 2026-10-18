const fireHazardButton = document.querySelector(".Fire-Hazard");
const hardhatButton = document.querySelector(".Hardhat");
const forkliftButton = document.querySelector(".Forlift");
const startLink = document.querySelector(".StartLink");
const hazardButtons = [fireHazardButton, hardhatButton, forkliftButton].filter(Boolean);
const defaultStartLink = startLink?.getAttribute("href") ?? "ChooseGame.html";

const resetStartLink = () => {
    if (startLink) {
        startLink.href = defaultStartLink;
    }
};

window.addEventListener("pageshow", resetStartLink);

const setEnabledHazardButtons = (enabledButtons) => {
    hazardButtons.forEach((button) => {
        button.disabled = !enabledButtons.includes(button);
    });
};

if (forkliftButton) {
    const trafficSounds = new Audio("../Audio/TraficSounds.mp3");
    let worker;
    let forkliftActivityStarted = false;
    let forkliftSpawnTimeout;
    let forkliftGameEnded = false;
    const forkliftSpawnInterval = 2200;
    const forkliftImageBounds = { width: 225, height: 225, left: 19, top: 63, right: 193, bottom: 163 };
    const workerImageBounds = { width: 365, height: 547, left: 60, top: 48, right: 316, bottom: 546 };
    trafficSounds.loop = true;
    trafficSounds.addEventListener("error", () => {
        console.error("Unable to load the forklift traffic sound.", trafficSounds.error);
    });

    const stopTrafficSounds = () => {
        trafficSounds.pause();
        trafficSounds.currentTime = 0;
    };

    const getVisibleBounds = (element, imageBounds) => {
        const bounds = element.getBoundingClientRect();

        return {
            left: bounds.left + bounds.width * imageBounds.left / imageBounds.width,
            right: bounds.left + bounds.width * imageBounds.right / imageBounds.width,
            top: bounds.top + bounds.height * imageBounds.top / imageBounds.height,
            bottom: bounds.top + bounds.height * imageBounds.bottom / imageBounds.height
        };
    };

    const followPointer = (event) => {
        worker.style.left = `${event.clientX}px`;
        worker.style.top = `${event.clientY}px`;
    };

    const spawnForklift = () => {
        const forklift = document.createElement("img");
        const forkliftWidth = Math.min(280, Math.max(180, window.innerWidth * 0.3));
        const forkliftHeight = forkliftWidth;
        const lane = Math.random() * Math.max(0, window.innerHeight - forkliftHeight);
        const travelDistance = window.innerWidth + forkliftWidth;
        const travelDuration = 3500;
        let animationFrame;
        let startTime;

        forklift.src = "../images/MovingForklifts.png";
        forklift.alt = "";
        forklift.setAttribute("aria-hidden", "true");
        Object.assign(forklift.style, {
            position: "fixed",
            top: `${lane}px`,
            left: `${window.innerWidth}px`,
            width: `${forkliftWidth}px`,
            zIndex: "30",
            pointerEvents: "none"
        });
        document.body.appendChild(forklift);

        const travel = (timestamp) => {
            if (forkliftGameEnded) {
                forklift.remove();
                return;
            }

            if (startTime === undefined) {
                startTime = timestamp;
            }

            const progress = Math.min((timestamp - startTime) / travelDuration, 1);
            const left = window.innerWidth - progress * travelDistance;
            forklift.style.left = `${left}px`;

            if (worker) {
                const workerBounds = getVisibleBounds(worker, workerImageBounds);
                const forkliftBounds = getVisibleBounds(forklift, forkliftImageBounds);
                const wasHit = workerBounds.left < forkliftBounds.right
                    && workerBounds.right > forkliftBounds.left
                    && workerBounds.top < forkliftBounds.bottom
                    && workerBounds.bottom > forkliftBounds.top;

                if (wasHit) {
                    forkliftGameEnded = true;
                    window.clearTimeout(forkliftSpawnTimeout);
                    window.cancelAnimationFrame(animationFrame);
                    stopTrafficSounds();
                    resetStartLink();
                    window.location.href = "ForLiftHazard/ForkliftDefeat.html";
                    return;
                }
            }

            if (progress < 1) {
                animationFrame = window.requestAnimationFrame(travel);
            } else {
                forklift.remove();
            }
        };

        animationFrame = window.requestAnimationFrame(travel);
    };

    const scheduleForklift = () => {
        if (forkliftGameEnded) {
            return;
        }

        forkliftSpawnTimeout = window.setTimeout(() => {
            spawnForklift();
            scheduleForklift();
        }, forkliftSpawnInterval);
    };

    forkliftButton.addEventListener("click", (event) => {
        if (forkliftActivityStarted) {
            return;
        }

        forkliftActivityStarted = true;
        trafficSounds.play().catch((error) => {
            console.error("Unable to play the forklift traffic sound.", error);
        });
        setEnabledHazardButtons([]);
        if (startLink) {
            startLink.href = "ForLiftHazard/ForkLiftLeft.html";
        }

        worker = document.createElement("img");
        worker.src = "../images/WorkerGuy.png";
        worker.alt = "";
        worker.setAttribute("aria-hidden", "true");
        Object.assign(worker.style, {
            position: "fixed",
            left: `${event.clientX}px`,
            top: `${event.clientY}px`,
            width: `${Math.min(90, Math.max(60, window.innerWidth * 0.1))}px`,
            transform: "translate(-50%, -50%)",
            zIndex: "31",
            pointerEvents: "none",
            transition: "left 100ms ease-out, top 100ms ease-out"
        });
        document.body.appendChild(worker);
        document.addEventListener("pointermove", followPointer);
        scheduleForklift();
        spawnForklift();
    });

    startLink?.addEventListener("click", () => {
        if (forkliftActivityStarted) {
            stopTrafficSounds();
        }
    });
}

if (hardhatButton) {
    const hardhatLandingSound = new Audio("../Audio/HelmetGroundHit.mp3");
    let activeHardhatFalls = 0;

    hardhatLandingSound.volume = 0.5;
    hardhatLandingSound.addEventListener("error", () => {
        console.error("Unable to load the hardhat landing sound.", hardhatLandingSound.error);
    });

    hardhatButton.addEventListener("click", () => {
        if (activeHardhatFalls === 0) {
            setEnabledHazardButtons([hardhatButton]);
        }
        activeHardhatFalls++;

        const hardhat = document.createElement("img");
        const hardhatSize = Math.min(160, Math.max(90, window.innerWidth * 0.18));
        const horizontalPosition = Math.random() * Math.max(0, window.innerWidth - hardhatSize);
        const removeHardhat = () => {
            hardhat.remove();
            activeHardhatFalls--;

            if (activeHardhatFalls === 0) {
                setEnabledHazardButtons(hazardButtons);
            }
        };
        const landHardhat = () => {
            const landingSound = hardhatLandingSound.cloneNode();
            landingSound.volume = hardhatLandingSound.volume;
            landingSound.play().catch((error) => {
                console.error("Unable to play the hardhat landing sound.", error);
            });
            window.setTimeout(removeHardhat, 1000);
        };

        hardhat.alt = "";
        hardhat.setAttribute("aria-hidden", "true");
        Object.assign(hardhat.style, {
            position: "fixed",
            top: "0",
            left: `${horizontalPosition}px`,
            width: `${hardhatSize}px`,
            transform: "translateY(-150%) rotate(-15deg)",
            zIndex: "30",
            pointerEvents: "none"
        });
        document.body.appendChild(hardhat);

        hardhat.addEventListener("load", () => {
            const landingOffset = Math.max(0, window.innerHeight - hardhat.offsetHeight);

            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                hardhat.style.transform = "none";
                hardhat.style.top = `${landingOffset}px`;
                window.setTimeout(landHardhat, 1200);
                return;
            }

            const fallAnimation = hardhat.animate(
                [
                    { transform: "translateY(-150%) rotate(-15deg)" },
                    { transform: `translateY(${landingOffset}px) rotate(360deg)` }
                ],
                { duration: 1800, easing: "cubic-bezier(.55, .05, .85, .35)", fill: "forwards" }
            );
            fallAnimation.onfinish = landHardhat;
        }, { once: true });
        hardhat.addEventListener("error", () => {
            console.error("Unable to load the falling hardhat image.", hardhat.src);
            removeHardhat();
        }, { once: true });
        hardhat.src = "../images/Hardhat.png";
    });
}

if (fireHazardButton && startLink) {
    const fireLayer = document.createElement("div");
    const burningSound = new Audio("../Audio/BurningSound.mp3");
    const fireExtinguishedSound = new Audio("../Audio/FireExtinguished.mp3");
    const activeFires = new Set();
    const targetScore = 30;
    const maxActiveFires = 15;
    const fireSpawnInterval = 1500;
    let score = 0;
    let spawnTimeout;
    let gameEnded = false;

    burningSound.loop = true;
    burningSound.addEventListener("error", () => {
        console.error("Unable to load the fire hazard sound.", burningSound.error);
    });
    fireExtinguishedSound.volume = 0.5;
    fireExtinguishedSound.addEventListener("error", () => {
        console.error("Unable to load the fire extinguished sound.", fireExtinguishedSound.error);
    });

    fireLayer.setAttribute("aria-label", "Active fire hazards");
    Object.assign(fireLayer.style, {
        position: "fixed",
        inset: "0",
        zIndex: "20",
        pointerEvents: "none"
    });
    document.body.appendChild(fireLayer);

    const finishGame = (destination) => {
        if (gameEnded) {
            return;
        }

        gameEnded = true;
        window.clearTimeout(spawnTimeout);
        burningSound.pause();
        burningSound.currentTime = 0;
        resetStartLink();
        window.location.href = destination;
    };

    const addFire = () => {
        if (gameEnded || score >= targetScore) {
            return false;
        }

        const size = Math.min(96, Math.max(64, window.innerWidth * 0.16));
        const fireButton = document.createElement("button");
        const fireImage = document.createElement("img");
        const fireImageNumber = Math.floor(Math.random() * 3) + 1;

        fireButton.type = "button";
        fireButton.setAttribute("aria-label", "Extinguish fire");
        Object.assign(fireButton.style, {
            position: "fixed",
            top: `${Math.random() * Math.max(0, window.innerHeight - size)}px`,
            left: `${Math.random() * Math.max(0, window.innerWidth - size)}px`,
            width: `${size}px`,
            padding: "0",
            border: "0",
            background: "transparent",
            cursor: "pointer",
            pointerEvents: "auto",
            filter: "drop-shadow(0 0 12px rgba(255, 83, 0, .65))"
        });

        fireImage.src = `../images/Fire${fireImageNumber}.png`;
        fireImage.alt = "";
        fireImage.draggable = false;
        Object.assign(fireImage.style, {
            display: "block",
            width: "100%",
            height: "auto"
        });

        fireButton.appendChild(fireImage);
        fireButton.addEventListener("click", () => {
            activeFires.delete(fireButton);
            fireButton.remove();
            fireExtinguishedSound.currentTime = 0;
            fireExtinguishedSound.play().catch((error) => {
                console.error("Unable to play the fire extinguished sound.", error);
            });
            score += Math.floor(Math.random() * 3) + 1;

            if (score >= targetScore && activeFires.size === 0) {
                finishGame("FireHazard/FireHazardPutOut.html");
            }
        }, { once: true });

        activeFires.add(fireButton);
        fireLayer.appendChild(fireButton);

        if (activeFires.size >= maxActiveFires) {
            finishGame("FireHazard/FireHazardDefeat.html");
            return false;
        }

        return true;
    };

    const addFireMultiple = (count) => {
        for (let i = count; i > 0; i--) {
            if (!addFire()) {
                break;
            }
        }
    };

    const scheduleNextFire = () => {
        if (score < targetScore && !gameEnded) {
            spawnTimeout = window.setTimeout(() => {
                if (score >= targetScore || gameEnded) {
                    return;
                }

                addFireMultiple(Math.floor(Math.random() * 3) + 1);
                scheduleNextFire();
            }, fireSpawnInterval);
        }
    };

    fireHazardButton.addEventListener("click", () => {
        setEnabledHazardButtons([]);
        document.body.classList.add("fire-active");
        startLink.href = "FireHazard/FireHazardVictory.html";
        burningSound.play().catch((error) => {
            console.error("Unable to play the fire hazard sound.", error);
        });
        addFireMultiple(Math.floor(Math.random() * 3) + 1);
        scheduleNextFire();
        fireHazardButton.classList.remove("Fire-Hazard");
    }, { once: true });
}
