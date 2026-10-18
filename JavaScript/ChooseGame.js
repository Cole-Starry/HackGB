const ppeWorkerOverlay = document.querySelector(".game-choice-worker-overlay");
const ppeWorkerPeek = document.querySelector(".game-choice-worker-peek");
const Alarm = new Audio("../../Audio/Alarm.mp3");


ppeWorkerPeek.hidden = Math.random() >= 0.25;

ppeWorkerPeek.addEventListener("click", () => {
    ppeWorkerOverlay.hidden = false;
    ppeWorkerPeek.hidden = true;
    Alarm.currentTime = 0;
    Alarm.play();


    setTimeout(() => {
        ppeWorkerOverlay.hidden = true;
        Alarm.pause();
        Alarm.currentTime = 0;
    }, 2000);

});