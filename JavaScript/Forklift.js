var wheelsUnchecked = 2;

const metalAudio = new Audio("../../Audio/metal-pipe.mp3");
const hydraulicsAudio = new Audio("../../Audio/hydraulics.mp3");
const HornAudio = new Audio("../../Audio/horn.mp3");
const wheelAudio = new Audio("../../Audio/impact_wrench.mp3");

document.querySelectorAll(".wheel-box").forEach((wheelBox) => {
    wheelBox.addEventListener("click", () => {
        wheelBox.remove();
        wheelsUnchecked--;
        wheelAudio.currentTime = 0; 
        wheelAudio.play();
        if (wheelsUnchecked === 0) {
            document.querySelector("#tires-wheels").checked = true;
        }
    });

});
