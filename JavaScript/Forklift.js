var wheelsUnchecked = 2;
var forksUnchecked = true;

const metalAudio = new Audio("../../Audio/metal-pipe.mp3");
const hydraulicsAudio = new Audio("../../Audio/hydraulics.mp3");
const HornAudio = new Audio("../../Audio/horn.mp3");
const wheelAudio = new Audio("../../Audio/impact_wrench.mp3");

document.querySelectorAll(".wheel-box").forEach((wheelBox) => {
    wheelBox.addEventListener("click", () => {
        wheelBox.remove();
        wheelsUnchecked--;
        
        wheelAudio.play();
        if (wheelsUnchecked === 0) {
            wheelAudio.currentTime = 0;
            document.querySelector("#tires-wheels").checked = true;
        }
    });

});

document.querySelector(".Forks").addEventListener("click", () => {
    if(wheelsUnchecked === 0){
        document.querySelector(".Forks").remove();
        hydraulicsAudio.currentTime = 0;
        wheelAudio.currentTime = 0;
        metalAudio.play();
        document.querySelector("#forks-mast").checked = true;
        forksUnchecked = false;
    }}
);


