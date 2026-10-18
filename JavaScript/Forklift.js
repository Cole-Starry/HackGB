var wheelsUnchecked = 2;
var forksUnchecked = 2;
var HornUnchecked = 1;

const metalAudio = new Audio("../../Audio/metal-pipe.mp3");
const hydraulicsAudio = new Audio("../../Audio/hydraulics.mp3");
const hornAudio = new Audio("../../Audio/car-honk.mp3");
const wheelAudio = new Audio("../../Audio/impact_wrench.mp3");


document.querySelectorAll(".wheel-box").forEach((wheelBox) => {
    wheelBox.addEventListener("click", () => {
        wheelBox.remove();
        wheelsUnchecked--;
        
        wheelAudio.play();
        if (wheelsUnchecked === 0) {
            wheelAudio.currentTime = 0;
            document.querySelector("#tires-wheels").checked = true;
            document.querySelectorAll(".ForkMast").forEach((ForkMast) => {
                ForkMast.classList.add("Pointer");
            });
        }
    });

});

document.querySelectorAll(".ForkMast").forEach((ForkMast) => {
    ForkMast.addEventListener("click", () => 
        {
            if(wheelsUnchecked === 0) 
            {
                wheelAudio.currentTime = 100;
                ForkMast.remove(); 
                metalAudio.currentTime = 0;
                forksUnchecked--;
                metalAudio.play();

                if (forksUnchecked === 0) 
                {
                    
                    document.querySelector("#forks-mast").checked = true;
                    document.querySelector(".Horn").classList.add("Pointer");
                }
            }
        }
    );

});

var Horn = document.querySelector(".Horn");

Horn.addEventListener("click", () => 
{
    if(wheelsUnchecked <= 0 && forksUnchecked <= 0)
    {
        Horn.remove();
        HornUnchecked--;
        metalAudio.currentTime = 100;
        hornAudio.currentTime = 0;
        hornAudio.play();
        document.querySelector("#lights-horn-alarms").checked = true;
    }
});

document.querySelector(".Drive").addEventListener("click", () => 
{
    const allTasksComplete = Array.from(
        document.querySelectorAll(".inspection-item input")
    ).every((task) => task.checked);

    if(allTasksComplete)
    {
        hydraulicsAudio.currentTime = 0;
        hydraulicsAudio.play();
        window.location.href = "Success.html";
    }
    else
    {
        window.location.href = "GameOver.html";
    }
});


