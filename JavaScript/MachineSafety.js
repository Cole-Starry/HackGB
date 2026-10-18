const machineSafetyQuestions = [
    {
        title: "Check point-of-operation guards",
        instruction: "Before using the press, you notice the guard at the point of operation is loose. What should you do?",
        choices: [
            {
                text: "Keep the press out of service and report the loose guard so it can be repaired before use.",
                correct: true
            },
            {
                text: "Hold the guard in place by hand while the press is running.",
                feedback: "Hands must never be used to compensate for a loose or defective guard near the press's point of operation.",
                correctAction: "Do not operate the press until the guard is repaired and functioning correctly."
            },
            {
                text: "Tie the guard back temporarily so the work can continue.",
                feedback: "Tying back or defeating a guard exposes operators to the press's point-of-operation hazards.",
                correctAction: "Keep the press out of service and report the defect for repair."
            }
        ]
    },
    {
        title: "Use two-hand controls safely",
        instruction: "The press is equipped with two-hand controls. How should the operator start a cycle?",
        choices: [
            {
                text: "Use both hands on the intended controls and keep them there as required for the cycle.",
                correct: true
            },
            {
                text: "Press one button with a hand and use an elbow to press the other.",
                feedback: "Using anything other than the intended two-hand operation can defeat the protection and put a hand in the danger zone.",
                correctAction: "Operate the designated controls as designed, keeping both hands on them for the cycle."
            },
            {
                text: "Tape one control down so the operator can handle the workpiece with both hands.",
                feedback: "Taping down a control defeats a safety function and can allow the press to cycle while a hand is in danger.",
                correctAction: "Never bypass a control; use the press only with its intended two-hand controls."
            }
        ]
    },
    {
        title: "Select suitable tooling",
        instruction: "A die looks damaged and does not match the work order. What is the safe choice?",
        choices: [
            {
                text: "Do not use it; get the correct, inspected tooling approved for the press and job.",
                correct: true
            },
            {
                text: "Use it carefully at reduced speed because the mismatch is small.",
                feedback: "Damaged or unsuitable tooling can fail or eject material even when the press runs slowly.",
                correctAction: "Use only suitable, inspected tooling approved for the press and the work."
            },
            {
                text: "Add a loose spacer to make the damaged die fit.",
                feedback: "An improvised fit can shift or fail under press force and create a serious hazard.",
                correctAction: "Stop and obtain the correct, inspected tooling for the press."
            }
        ]
    },
    {
        title: "Keep hands clear while feeding",
        instruction: "A small workpiece needs to be positioned near the die. What should the operator do?",
        choices: [
            {
                text: "Use the approved holding or feeding tool and keep hands outside the point-of-operation danger zone.",
                correct: true
            },
            {
                text: "Place fingers under the guard for a quick adjustment while the cycle is ready.",
                feedback: "The press can crush or amputate fingers at the point of operation, even during a quick adjustment.",
                correctAction: "Use an approved tool and keep hands outside the danger zone."
            },
            {
                text: "Ask a coworker to reach in and hold the workpiece steady.",
                feedback: "A coworker's hand is still exposed to the press's point-of-operation hazard.",
                correctAction: "Position material with approved tools while everyone stays clear of the danger zone."
            }
        ]
    },
    {
        title: "Respond to a jam safely",
        instruction: "A workpiece becomes stuck in the press. What should the operator do?",
        choices: [
            {
                text: "Stop the operation and follow the site's approved jam-clearing procedure; never reach into moving equipment.",
                correct: true
            },
            {
                text: "Pull the workpiece free while the press is paused between strokes.",
                feedback: "A pause does not ensure the press cannot move or restart; reaching into it can cause severe injury.",
                correctAction: "Stop and follow the approved jam-clearing procedure without reaching into moving equipment."
            },
            {
                text: "Use a metal bar to pry it loose while the cycle remains enabled.",
                feedback: "Prying while the machine is enabled can cause unexpected movement or eject the bar or workpiece.",
                correctAction: "Stop the operation and follow the site's approved jam-clearing procedure."
            }
        ]
    },
    {
        title: "Recognize hydraulic leaks",
        instruction: "You spot hydraulic fluid beneath the press. What should you do?",
        choices: [
            {
                text: "Keep clear, stop using the press safely, and report the leak for qualified inspection and repair.",
                correct: true
            },
            {
                text: "Wipe it up and continue if the press still cycles.",
                feedback: "A leak can indicate a hydraulic fault and can create slip or pressure-injection hazards.",
                correctAction: "Keep clear and report the leak; do not continue operating a press with a suspected hydraulic fault."
            },
            {
                text: "Touch the leaking hose to find the exact source.",
                feedback: "High-pressure hydraulic fluid can penetrate skin and cause serious injury; never check a leak by touch.",
                correctAction: "Stay clear and have the fault inspected by qualified personnel."
            }
        ]
    },
    {
        title: "React to unusual sounds or vibration",
        instruction: "The press begins vibrating unusually and makes a new grinding sound. What should the operator do?",
        choices: [
            {
                text: "Stop the operation using the normal control and report the condition before using the press again.",
                correct: true
            },
            {
                text: "Ignore it until the next scheduled maintenance because the press is still cycling.",
                feedback: "A new noise or vibration can indicate a developing fault that may make continued operation unsafe.",
                correctAction: "Stop the operation and report the abnormal condition for inspection."
            },
            {
                text: "Stand closer to the press to locate the sound while it is running.",
                feedback: "Moving closer to a running press exposes you to moving parts and does not address the possible fault.",
                correctAction: "Stop the operation and report the abnormal condition before further use."
            }
        ]
    },
    {
        title: "Confirm operator readiness",
        instruction: "A coworker who has not been trained on this press asks to run the next job. What should happen?",
        choices: [
            {
                text: "Only a trained, authorized operator may run the press, following its operating procedure.",
                correct: true
            },
            {
                text: "Let the coworker try it while someone experienced watches.",
                feedback: "Watching does not replace required training and authorization for operating a press.",
                correctAction: "Do not allow operation until the coworker has the required training and authorization."
            },
            {
                text: "Show them the start button and let them operate just one cycle.",
                feedback: "Even one cycle can expose an untrained operator and others nearby to serious hazards.",
                correctAction: "Only a trained, authorized operator may run the press."
            }
        ]
    }
];

function main() {
    const app = document.querySelector("#loto-app");
    if (!app) {
        throw new Error("The machine safety quiz container was not found.");
    }

    let currentStep = -1;
    let score = 0;
    let unsafeChoices = 0;
    let stepSecured = false;
    const completedSteps = new Set();
    let answerOrders = machineSafetyQuestions.map((step) => shuffleChoices(step.choices));

    const shell = document.createElement("div");
    shell.className = "loto-game";

    const gameHeader = document.createElement("header");
    gameHeader.className = "loto-game-header";
    const gameName = document.createElement("p");
    gameName.className = "loto-game-name";
    gameName.textContent = "FOUNDRY SHIFT // SAFETY OPS";
    const missionName = document.createElement("p");
    missionName.className = "loto-mission-name";
    missionName.textContent = "MACHINE SAFETY GAME QUIZ";
    gameHeader.append(gameName, missionName);

    const hud = document.createElement("section");
    hud.className = "loto-hud";
    hud.setAttribute("aria-label", "Mission status");
    const stageHud = createHudItem("CURRENT QUESTION", "Briefing");
    const scoreHud = createHudItem("SAFETY SCORE", "000");
    const riskHud = createHudItem("HAZARD EVENTS", "00");
    hud.append(stageHud.item, scoreHud.item, riskHud.item);

    const stepsList = document.createElement("ol");
    stepsList.className = "loto-step-list";
    stepsList.setAttribute("aria-label", "Machine safety quiz questions");

    const progress = document.createElement("progress");
    progress.className = "loto-progress";
    progress.max = machineSafetyQuestions.length;
    progress.value = 0;
    progress.setAttribute("aria-label", "Simulation progress");

    const progressText = document.createElement("p");
    progressText.className = "loto-progress-text";
    progressText.setAttribute("aria-live", "polite");

    const task = document.createElement("section");
    task.className = "loto-task";
    task.setAttribute("aria-label", "Mission objective");

    const dialog = document.createElement("dialog");
    dialog.className = "loto-feedback";
    dialog.setAttribute("aria-labelledby", "loto-feedback-title");
    dialog.addEventListener("cancel", (event) => event.preventDefault());

    const scene = document.createElement("section");
    scene.className = "loto-scene";
    scene.setAttribute("aria-label", "Foundry machine energy-control scene");
    scene.innerHTML = `
        <div class="loto-scene-label"><span class="loto-live-dot"></span> FOUNDRY FLOOR · BAY 04</div>
        <svg class="loto-machine" viewBox="0 0 560 270" role="img" aria-label="Industrial machine with energy lines and a control panel">
            <path class="scene-pipe scene-pipe-electric" d="M64 112H198V72H271" />
            <path class="scene-pipe scene-pipe-hydraulic" d="M66 173H172V196H252" />
            <path class="scene-pipe scene-pipe-air" d="M383 70H487V129" />
            <path class="scene-pipe scene-pipe-mechanical" d="M382 194H474V221" />
            <g class="machine-overlay overlay-crew">
                <circle cx="82" cy="78" r="9" />
                <path d="M65 112q2-22 17-22t17 22M112 84h20M112 94h31M112 104h25" />
                <circle cx="111" cy="76" r="6" />
            </g>
            <g class="machine-overlay overlay-isolation">
                <circle cx="132" cy="112" r="12" />
                <path d="M132 100v24m-12-12h24M454 70v23m-10-12 10-11 10 11" />
                <circle cx="454" cy="70" r="5" />
                <path d="M141 102l9-9m-18 31 9 9" />
            </g>
            <g class="machine-overlay overlay-locks">
                <rect x="177" y="91" width="22" height="22" rx="3" />
                <path d="M182 91v-5a6 6 0 0 1 12 0v5m-7 9v5" />
                <rect x="158" y="181" width="22" height="22" rx="3" />
                <path d="M163 181v-5a6 6 0 0 1 12 0v5m-7 9v5" />
                <path class="lock-tag" d="M199 95h20v18h-20l-5-9zM180 185h17v17h-17l-5-8z" />
                <path class="tag-mark" d="M204 101h10m-10 5h8m-25 83h8m-8 5h6" />
            </g>
            <g class="machine-overlay overlay-stored">
                <circle cx="159" cy="166" r="19" />
                <path d="M159 151v5m-15 10h5m10 15v-5m15-10h-5m-10 0 10-10" />
                <path class="gauge-needle" d="M159 166l10-11" />
                <rect class="safety-block" x="352" y="169" width="19" height="20" />
                <path d="M348 189h27m-23-20v-7m15 7v-7" />
            </g>
            <g class="machine-overlay overlay-test">
                <rect x="375" y="122" width="23" height="43" rx="3" />
                <rect class="tester-screen" x="380" y="128" width="13" height="11" rx="1" />
                <path d="M386 143v11m-4-2 4 4 4-4m-11 10h14" />
                <path class="tester-lead" d="M375 157q-12 9-12 24" />
                <circle cx="363" cy="182" r="3" />
            </g>
            <g class="machine-overlay overlay-work">
                <path d="m147 145 21 21m-5-27 11 11-19 19-11-11zm-10-10 6 6m29 29 6 6" />
                <path class="work-check" d="m126 182 6 6 12-14" />
                <circle cx="135" cy="181" r="18" />
            </g>
            <rect class="machine-base" x="193" y="212" width="198" height="20" rx="3" />
            <rect class="machine-body" x="224" y="97" width="136" height="115" rx="5" />
            <rect class="machine-top" x="246" y="76" width="91" height="21" rx="3" />
            <rect class="machine-window" x="244" y="114" width="96" height="43" rx="3" />
            <path class="machine-bolt" d="M259 128h66M259 140h43" />
            <circle class="machine-wheel" cx="247" cy="181" r="13" />
            <circle class="machine-wheel" cx="337" cy="181" r="13" />
            <rect class="machine-panel" x="405" y="118" width="65" height="91" rx="4" />
            <rect class="panel-display" x="415" y="130" width="45" height="23" rx="2" />
            <circle class="panel-button panel-button-red" cx="426" cy="171" r="6" />
            <circle class="panel-button panel-button-green" cx="449" cy="171" r="6" />
            <path class="scene-floor" d="M35 233H525" />
            <text class="scene-label" x="280" y="255" text-anchor="middle">HYDRAULIC PRESS · UNIT 04</text>
        </svg>
        <div class="loto-energy-legend" aria-label="Energy sources">
            <span class="energy-electric">ELECTRICAL</span>
            <span class="energy-hydraulic">HYDRAULIC</span>
            <span class="energy-air">PNEUMATIC</span>
            <span class="energy-mechanical">MECHANICAL</span>
        </div>
        <p class="loto-scene-caption">Machine status: <strong>INSPECTION IN PROGRESS</strong> <span aria-hidden="true">·</span> Operation not authorized</p>
        <div class="loto-scene-action" role="status" aria-live="polite">
            <div class="loto-scene-action-icon" aria-hidden="true"></div>
            <div>
                <span class="loto-scene-action-label">MACHINE SAFETY BRIEFING</span>
                <strong class="loto-scene-action-title">Prepare to operate the press</strong>
                <p class="loto-scene-action-description">Check machine condition and safe operating practices before starting work.</p>
            </div>
        </div>
    `;

    for (const [index, step] of machineSafetyQuestions.entries()) {
        const item = document.createElement("li");
        const number = document.createElement("span");
        number.className = "loto-step-number";
        number.textContent = String(index + 1).padStart(2, "0");
        const label = document.createElement("span");
        label.textContent = step.title;
        item.append(number, label);
        item.dataset.step = String(index);
        stepsList.append(item);
    }

    const gameBody = document.createElement("div");
    gameBody.className = "loto-game-body";
    const missionPanel = document.createElement("div");
    missionPanel.className = "loto-mission-panel";
    missionPanel.append(stepsList, progress, progressText, task);
    gameBody.append(scene, missionPanel);
    shell.append(gameHeader, hud, gameBody, dialog);
    app.replaceChildren(shell);
    const sceneCaption = scene.querySelector(".loto-scene-caption strong");
    const sceneActionIcon = scene.querySelector(".loto-scene-action-icon");
    const sceneActionLabel = scene.querySelector(".loto-scene-action-label");
    const sceneActionTitle = scene.querySelector(".loto-scene-action-title");
    const sceneActionDescription = scene.querySelector(".loto-scene-action-description");

    const stageVisuals = [
        {
            label: "POINT-OF-OPERATION GUARD",
            title: "Keep the danger zone guarded",
            description: "Check that guards are secure and prevent access to moving parts before operating the press.",
            icon: '<svg viewBox="0 0 48 48"><circle cx="21" cy="21" r="13"/><path d="m31 31 11 11M16 21h10M21 16v10"/><circle cx="21" cy="21" r="3"/></svg>'
        },
        {
            label: "TWO-HAND CONTROL",
            title: "Keep both hands on the controls",
            description: "Use the designated controls as designed. Never tape, wedge, or otherwise defeat a safety control.",
            icon: '<svg viewBox="0 0 48 48"><path d="M8 20h9l13-10v28L17 28H8zM17 28l4 12h8l-5-10M36 18q8 6 0 12M39 12q14 12 0 24"/></svg>'
        },
        {
            label: "PRESS TOOLING",
            title: "Use inspected, suitable tooling",
            description: "Use only tooling in good condition and approved for the press and the job.",
            icon: '<svg viewBox="0 0 48 48"><path d="M24 7v17M13 13a17 17 0 1 0 22 0"/><circle cx="24" cy="30" r="3"/></svg>'
        },
        {
            label: "FEEDING THE PRESS",
            title: "Keep hands outside the danger zone",
            description: "Use approved holding or feeding tools to position material near the point of operation.",
            icon: '<svg viewBox="0 0 48 48"><path d="M6 24h14m8 0h14M20 17l8 14M28 17l-8 14"/><circle cx="24" cy="24" r="19"/><path d="M24 19v10"/></svg>'
        },
        {
            label: "JAM RESPONSE",
            title: "Never reach into moving equipment",
            description: "Stop the operation and follow the site's approved procedure when a workpiece jams.",
            icon: '<svg viewBox="0 0 48 48"><rect x="9" y="21" width="30" height="22" rx="3"/><path d="M16 21v-7a8 8 0 0 1 16 0v7M24 29v6M35 9h8v9h-8zM39 18v7"/></svg>'
        },
        {
            label: "HYDRAULIC SYSTEM",
            title: "Report leaks; never check by touch",
            description: "A leak may signal a fault or high-pressure hazard. Keep clear and report it for qualified inspection.",
            icon: '<svg viewBox="0 0 48 48"><circle cx="23" cy="24" r="17"/><path d="m23 24 9-9M23 10v4M10 24h4M23 34v4M32 24h4M37 9q-6 5 0 9t0 9M42 12q-4 3 0 6t0 6"/></svg>'
        },
        {
            label: "MACHINE CONDITION",
            title: "Respond to unusual noise or vibration",
            description: "Stop and report new grinding, vibration, or other abnormal behavior before operating again.",
            icon: '<svg viewBox="0 0 48 48"><rect x="5" y="8" width="25" height="32" rx="3"/><rect x="10" y="13" width="15" height="8" rx="1"/><path d="M11 28h3m7 0h3m-13 6h12M30 30l5 5 9-12"/></svg>'
        },
        {
            label: "OPERATOR READINESS",
            title: "Only trained operators run the press",
            description: "Operators need the required training and authorization and must follow the press's operating procedure.",
            icon: '<svg viewBox="0 0 48 48"><path d="M29 9a13 13 0 0 0-16 16L6 32a5 5 0 0 0 7 7l7-7A13 13 0 0 0 36 16l-8 8-7-7zM31 34l5-5 7 7-5 5z"/></svg>'
        }
    ];
    const securedVisual = {
        label: "QUESTION COMPLETE",
        title: "Correct safety action",
        description: "Check complete. Continue to the next machine safety question.",
        icon: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><path d="m14 24 7 7 14-15"/></svg>'
    };
    const completeVisual = {
        label: "MACHINE SAFETY CHECK COMPLETE",
        title: "The press is ready for safe operation",
        description: "The operator has confirmed safe machine condition, working safeguards, and readiness to operate.",
        icon: '<svg viewBox="0 0 48 48"><path d="m24 4 17 7v12c0 10-7 17-17 21C14 40 7 33 7 23V11z"/><path d="m15 24 6 6 13-14"/></svg>'
    };

    function createHudItem(label, value) {
        const item = document.createElement("div");
        item.className = "loto-hud-item";
        const labelElement = document.createElement("span");
        labelElement.textContent = label;
        const valueElement = document.createElement("strong");
        valueElement.textContent = value;
        item.append(labelElement, valueElement);
        return { item, value: valueElement };
    }

    function shuffleChoices(choices) {
        const shuffled = [...choices];
        for (let index = shuffled.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
        }
        return shuffled;
    }

    function updateSceneStatus(label, operationAuthorized) {
        sceneCaption.textContent = label;
        sceneCaption.parentElement.lastChild.textContent = operationAuthorized
            ? " Operation authorized"
            : " Operation not authorized";
    }

    function updateSceneVisual(stepIndex, secured = false) {
        const visual = stepIndex >= machineSafetyQuestions.length
            ? completeVisual
            : secured
                ? securedVisual
                : stageVisuals[stepIndex] || {
                    label: "MACHINE SAFETY BRIEFING",
                    title: "Prepare to operate the press",
                    description: "Check machine condition and safe operating practices before starting work.",
                    icon: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><path d="M24 15v10l7 4M8 8l6 6m26-6-6 6"/></svg>'
                };

        sceneActionIcon.innerHTML = visual.icon;
        sceneActionLabel.textContent = visual.label;
        sceneActionTitle.textContent = visual.title;
        sceneActionDescription.textContent = visual.description;
        scene.dataset.stage = String(stepIndex);
        scene.classList.toggle("is-secured", secured || stepIndex >= machineSafetyQuestions.length);
        scene.setAttribute("aria-label", `${visual.label}: ${visual.title}. ${visual.description}`);
    }

    function renderStep() {
        scoreHud.value.textContent = String(score).padStart(3, "0");
        riskHud.value.textContent = String(unsafeChoices).padStart(2, "0");

        if (currentStep < 0) {
            updateSceneVisual(-1);
            stageHud.value.textContent = "Briefing";
            progress.value = 0;
            progressText.textContent = `QUIZ READY · ${machineSafetyQuestions.length} QUESTIONS`;
            for (const item of stepsList.children) {
                item.classList.remove("is-current", "is-complete");
                item.removeAttribute("aria-current");
            }
            const eyebrow = document.createElement("p");
            eyebrow.className = "loto-task-kicker";
            eyebrow.textContent = "YOUR OBJECTIVE";
            const title = document.createElement("h2");
            title.textContent = "Operate the press safely.";
            const briefing = document.createElement("p");
            briefing.textContent = "Test your knowledge of press guarding, safe operation, and machine-condition hazards. Earn 100 points for each correct answer.";
            const note = document.createElement("p");
            note.className = "loto-mission-note";
            note.textContent = "No timer. Safety comes first. If you choose an unsafe action, review the hazard and retry that step.";
            const start = document.createElement("button");
            start.className = "loto-choice loto-start";
            start.type = "button";
            start.textContent = "Start quiz";
            start.addEventListener("click", () => {
                currentStep = 0;
                renderStep();
            });
            task.replaceChildren(eyebrow, title, briefing, note, start);
            return;
        }

        const step = machineSafetyQuestions[currentStep];
        if (!step) {
            renderComplete();
            return;
        }

        stageHud.value.textContent = `${String(currentStep + 1).padStart(2, "0")} / 08`;
        updateSceneVisual(currentStep, stepSecured);
        const machineSafetyConfirmed = completedSteps.size === machineSafetyQuestions.length
            || (stepSecured && currentStep === machineSafetyQuestions.length - 1);
        scene.classList.toggle("is-safe", machineSafetyConfirmed);
        updateSceneStatus(
            machineSafetyConfirmed ? "MACHINE CHECK COMPLETE" : "INSPECTION IN PROGRESS",
            machineSafetyConfirmed
        );
        for (const item of stepsList.children) {
            const index = Number(item.dataset.step);
            item.classList.toggle("is-complete", completedSteps.has(index));
            item.classList.toggle("is-current", index === currentStep);
            if (index === currentStep) {
                item.setAttribute("aria-current", "step");
            } else {
                item.removeAttribute("aria-current");
            }
        }

        progress.value = completedSteps.size;
        progressText.textContent = `QUIZ PROGRESS · ${completedSteps.size} / ${machineSafetyQuestions.length} QUESTIONS COMPLETE`;

        const kicker = document.createElement("p");
        kicker.className = "loto-task-kicker";
        kicker.textContent = `QUESTION ${String(currentStep + 1).padStart(2, "0")} · KNOWLEDGE CHECK`;

        const title = document.createElement("h2");
        title.textContent = step.title;
        const instruction = document.createElement("p");
        instruction.textContent = step.instruction;
        if (stepSecured) {
            const success = document.createElement("p");
            success.className = "loto-success-message";
            success.textContent = "QUESTION COMPLETE · +100 SAFETY POINTS";
            const next = document.createElement("button");
            next.className = "loto-choice loto-start";
            next.type = "button";
            next.textContent = currentStep === machineSafetyQuestions.length - 1 ? "Complete quiz" : "Next question";
            next.addEventListener("click", () => {
                completedSteps.add(currentStep);
                currentStep += 1;
                stepSecured = false;
                renderStep();
            });
            task.replaceChildren(kicker, title, success, next);
            return;
        }

        const choices = document.createElement("div");
        choices.className = "loto-choices";

        for (const [index, choice] of answerOrders[currentStep].entries()) {
            const button = document.createElement("button");
            button.className = "loto-choice";
            button.type = "button";
            const choiceNumber = document.createElement("span");
            choiceNumber.className = "loto-choice-number";
            choiceNumber.textContent = `0${index + 1}`;
            const choiceText = document.createElement("span");
            choiceText.textContent = choice.text;
            button.append(choiceNumber, choiceText);
            button.addEventListener("click", () => handleAction(choice));
            choices.append(button);
        }

        task.replaceChildren(kicker, title, instruction, choices);
    }

    function handleAction(choice) {
        if (!choice.correct) {
            unsafeChoices += 1;
            riskHud.value.textContent = String(unsafeChoices).padStart(2, "0");
            showFailure(choice);
            return;
        }

        score += 100;
        stepSecured = true;
        renderStep();
    }

    function showFailure(choice) {
        const icon = document.createElement("div");
        icon.className = "loto-hazard-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = "!";

        const title = document.createElement("h2");
        title.id = "loto-feedback-title";
        title.textContent = "Hazard! Unsafe action detected";

        const explanation = document.createElement("p");
        explanation.textContent = choice.feedback;

        const correction = document.createElement("p");
        correction.className = "loto-correction";
        correction.textContent = `What to do: ${choice.correctAction}`;

        const retry = document.createElement("button");
        retry.className = "loto-choice loto-retry";
        retry.type = "button";
        retry.textContent = "Retry objective";
        retry.addEventListener("click", () => {
            dialog.close();
            renderStep();
        });

        dialog.replaceChildren(icon, title, explanation, correction, retry);
        dialog.showModal();
    }

    function renderComplete() {
        updateSceneVisual(machineSafetyQuestions.length);
        progress.value = machineSafetyQuestions.length;
        stageHud.value.textContent = "COMPLETE";
        scene.classList.add("is-safe");
        updateSceneStatus("SAFE TO OPERATE", true);
        progressText.textContent = `QUIZ COMPLETE · ${machineSafetyQuestions.length} / ${machineSafetyQuestions.length} QUESTIONS`;
        for (const item of stepsList.children) {
            item.classList.add("is-complete");
            item.classList.remove("is-current");
            item.removeAttribute("aria-current");
        }

        const eyebrow = document.createElement("p");
        eyebrow.className = "loto-task-kicker";
        eyebrow.textContent = "BAY 04 · QUIZ RESULTS";
        const title = document.createElement("h2");
        title.textContent = "Machine safety quiz complete.";
        const message = document.createElement("p");
        message.textContent = "You completed the machine safety quiz. Apply these safe operating practices every time you use the press.";
        const result = document.createElement("div");
        result.className = "loto-result";
        const finalScore = document.createElement("strong");
        finalScore.textContent = `${score} PTS`;
        const rating = document.createElement("span");
        rating.textContent = unsafeChoices === 0
            ? "FLAWLESS SHIFT · No hazards triggered"
            : `${unsafeChoices} HAZARD${unsafeChoices === 1 ? "" : "S"} LEARNED FROM`;
        result.append(finalScore, rating);
        const replay = document.createElement("button");
        replay.className = "loto-choice loto-start";
        replay.type = "button";
        replay.textContent = "Play again";
        replay.addEventListener("click", () => {
            currentStep = -1;
            score = 0;
            unsafeChoices = 0;
            stepSecured = false;
            completedSteps.clear();
            answerOrders = machineSafetyQuestions.map((step) => shuffleChoices(step.choices));
            scene.classList.remove("is-safe");
            updateSceneStatus("INSPECTION IN PROGRESS", false);
            renderStep();
        });
        const chooseGame = document.createElement("a");
        chooseGame.className = "loto-choice loto-start";
        chooseGame.href = "../ChooseGame.html";
        chooseGame.textContent = "Choose another game";
        task.replaceChildren(eyebrow, title, message, result, replay, chooseGame);
    }

    renderStep();
}

main();
