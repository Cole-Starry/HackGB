const lotoSteps = [
    {
        title: "Prepare and identify energy sources",
        instruction: "Before touching the equipment, decide how you will identify and control every energy source.",
        choices: [
            {
                text: "Review the machine-specific procedure and identify electrical, hydraulic, pneumatic, mechanical, thermal, and chemical energy.",
                correct: true
            },
            {
                text: "Assume the power switch is the only energy source because the machine is stopped.",
                feedback: "A stopped machine can still contain electrical, hydraulic, pneumatic, mechanical, thermal, or chemical energy. Missing a source can leave the equipment dangerous.",
                correctAction: "Review the machine-specific energy control procedure and identify every energy source, its type, magnitude, and control method."
            },
            {
                text: "Start isolating the equipment before checking its energy control procedure.",
                feedback: "Isolating equipment without first identifying its energy sources can leave an unrecognized source active.",
                correctAction: "Review the machine-specific procedure and identify each energy source and how it must be controlled."
            }
        ]
    },
    {
        title: "Notify affected employees",
        instruction: "The energy sources are identified. Choose what to do before shutting down the equipment.",
        choices: [
            {
                text: "Tell operators and nearby personnel that the equipment will be shut down and locked out.",
                correct: true
            },
            {
                text: "Begin the shutdown without telling anyone because the equipment will be locked soon.",
                feedback: "An operator or nearby employee could try to restart the equipment if they do not know it is being locked out.",
                correctAction: "Notify affected employees before shutdown so they know the equipment will be shut down and locked out."
            },
            {
                text: "Notify affected employees only after the equipment has been isolated.",
                feedback: "Waiting until after isolation leaves a window where someone may operate or restart the equipment without warning.",
                correctAction: "Inform operators and nearby personnel before shutting down the equipment."
            }
        ]
    },
    {
        title: "Shut down the equipment",
        instruction: "Affected employees have been notified. Choose the safe way to stop the machine.",
        choices: [
            {
                text: "Use the machine's normal stopping procedure for an orderly shutdown.",
                correct: true
            },
            {
                text: "Use the disconnect switch as the normal stop control.",
                feedback: "Using an energy-isolating device for normal stopping can create additional hazards and does not replace the orderly shutdown procedure.",
                correctAction: "Use the machine's normal stopping procedure, not the disconnect switch."
            },
            {
                text: "Stop the machine abruptly without following its normal procedure.",
                feedback: "An abrupt shutdown can create hazards. Equipment should be stopped in an orderly way using its normal procedure.",
                correctAction: "Follow the machine's normal stopping procedure."
            }
        ]
    },
    {
        title: "Isolate all energy sources",
        instruction: "The machine is stopped. Choose how to prevent energy from reaching it.",
        choices: [
            {
                text: "Use the procedure to open disconnects, close valves, block mechanical parts, blank lines, or unplug as required.",
                correct: true
            },
            {
                text: "Open the electrical disconnect and leave the other identified sources alone.",
                feedback: "Electrical isolation alone is not enough when hydraulic, pneumatic, mechanical, thermal, or chemical sources are also present.",
                correctAction: "Perform the required isolation action for every energy source identified in the machine-specific procedure."
            },
            {
                text: "Press the stop button and assume all energy sources are isolated.",
                feedback: "A stop button does not isolate energy. The equipment may still receive energy from connected sources.",
                correctAction: "Use the procedure to isolate every identified energy source with its corresponding isolation action."
            }
        ]
    },
    {
        title: "Apply locks and tags",
        instruction: "All energy sources are isolated. Choose how workers should secure the isolation points.",
        choices: [
            {
                text: "Each authorized worker applies their own lock and an identifying tag stating who applied it and why.",
                correct: true
            },
            {
                text: "Use one shared lock for the whole crew without identifying individual workers.",
                feedback: "A shared lock does not give each worker control of their own protection, and an unidentified tag does not show who applied it or why.",
                correctAction: "Each authorized worker applies their own lock and identifying tag. Use a lockbox for group lockout so each worker controls their protection."
            },
            {
                text: "Attach a tag but leave the isolation point unlocked.",
                feedback: "A tag alone does not physically secure an isolation point against operation.",
                correctAction: "Apply a lock and a tag identifying who applied it and why."
            }
        ]
    },
    {
        title: "Release or restrain stored energy",
        instruction: "Locks and tags are in place. Choose how to address energy that remains stored.",
        choices: [
            {
                text: "Bleed lines, discharge capacitors, block elevated parts, release spring tension, and allow hot surfaces to cool as required.",
                correct: true
            },
            {
                text: "Skip stored-energy controls because the energy sources have been isolated.",
                feedback: "Isolation stops new energy from entering, but it does not remove energy already stored in lines, capacitors, elevated parts, springs, or hot surfaces.",
                correctAction: "Release or restrain stored energy using the machine-specific procedure."
            },
            {
                text: "Release pressure from one line and assume all other stored energy is gone.",
                feedback: "Stored energy can remain in multiple components, including capacitors, elevated parts, springs, and hot surfaces.",
                correctAction: "Check the procedure and release or restrain every type of stored energy."
            }
        ]
    },
    {
        title: "Verify the zero-energy state",
        instruction: "Stored energy has been addressed. Choose how to confirm the equipment cannot operate.",
        choices: [
            {
                text: "Try the normal start controls, return them to off, and use appropriate test instruments.",
                correct: true
            },
            {
                text: "Skip testing because the locks are already attached.",
                feedback: "Locks do not prove the equipment is at zero energy. A missed or ineffective isolation can still leave it capable of starting.",
                correctAction: "Attempt to start the machine with normal controls, return them to off, and use test instruments where appropriate."
            },
            {
                text: "Look at the machine and assume it is safe because it is not moving.",
                feedback: "A machine that is not moving may still have hazardous energy. Visual inspection alone does not verify the zero-energy state.",
                correctAction: "Test using normal controls and appropriate instruments, then return controls to off."
            }
        ]
    },
    {
        title: "Perform the work",
        instruction: "Choose when servicing or maintenance may begin.",
        choices: [
            {
                text: "Begin only after isolation, stored-energy controls, and zero-energy verification are complete.",
                correct: true
            },
            {
                text: "Begin work as soon as the machine is stopped, before verification.",
                feedback: "A stopped machine may still contain hazardous energy. Starting work before verification can expose workers to unexpected startup or stored energy.",
                correctAction: "Begin servicing only after all required lockout steps are complete and the zero-energy state has been verified."
            },
            {
                text: "Begin work after locks are attached, while stored energy is still being addressed.",
                feedback: "Stored energy can cause movement, release, or burns even after isolation points are locked.",
                correctAction: "Release or restrain stored energy and verify the zero-energy state before performing work."
            }
        ]
    }
];

function main() {
    const app = document.querySelector("#loto-app");
    if (!app) {
        throw new Error("The lockout/tagout simulation container was not found.");
    }

    let currentStep = -1;
    let score = 0;
    let unsafeChoices = 0;
    let stepSecured = false;
    const completedSteps = new Set();
    let answerOrders = lotoSteps.map((step) => shuffleChoices(step.choices));

    const shell = document.createElement("div");
    shell.className = "loto-game";

    const gameHeader = document.createElement("header");
    gameHeader.className = "loto-game-header";
    const gameName = document.createElement("p");
    gameName.className = "loto-game-name";
    gameName.textContent = "FOUNDRY SHIFT // SAFETY OPS";
    const missionName = document.createElement("p");
    missionName.className = "loto-mission-name";
    missionName.textContent = "MISSION 01 · ZERO ENERGY";
    gameHeader.append(gameName, missionName);

    const hud = document.createElement("section");
    hud.className = "loto-hud";
    hud.setAttribute("aria-label", "Mission status");
    const stageHud = createHudItem("CURRENT STEP", "Briefing");
    const scoreHud = createHudItem("SAFETY SCORE", "000");
    const riskHud = createHudItem("HAZARD EVENTS", "00");
    hud.append(stageHud.item, scoreHud.item, riskHud.item);

    const stepsList = document.createElement("ol");
    stepsList.className = "loto-step-list";
    stepsList.setAttribute("aria-label", "Lockout/tagout safety steps");

    const progress = document.createElement("progress");
    progress.className = "loto-progress";
    progress.max = lotoSteps.length;
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
        <p class="loto-scene-caption">Equipment status: <strong>ENERGIZED</strong> <span aria-hidden="true">·</span> Servicing not authorized</p>
        <div class="loto-scene-action" role="status" aria-live="polite">
            <div class="loto-scene-action-icon" aria-hidden="true"></div>
            <div>
                <span class="loto-scene-action-label">MISSION BRIEFING</span>
                <strong class="loto-scene-action-title">Inspect the press</strong>
                <p class="loto-scene-action-description">Identify the energy hazards before the crew begins work.</p>
            </div>
        </div>
    `;

    for (const [index, step] of lotoSteps.entries()) {
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
            label: "ENERGY SCAN",
            title: "Map every energy source",
            description: "Trace the orange electrical feed, blue hydraulic line, green air line, and yellow mechanical drive.",
            icon: '<svg viewBox="0 0 48 48"><circle cx="21" cy="21" r="13"/><path d="m31 31 11 11M16 21h10M21 16v10"/><circle cx="21" cy="21" r="3"/></svg>'
        },
        {
            label: "CREW ALERT",
            title: "Warn the people in the bay",
            description: "Nearby operators need to know the press is about to be shut down and locked out.",
            icon: '<svg viewBox="0 0 48 48"><path d="M8 20h9l13-10v28L17 28H8zM17 28l4 12h8l-5-10M36 18q8 6 0 12M39 12q14 12 0 24"/></svg>'
        },
        {
            label: "CONTROL PANEL",
            title: "Stop the press normally",
            description: "Use the machine's normal stop control for an orderly shutdown; do not use the disconnect as a stop button.",
            icon: '<svg viewBox="0 0 48 48"><path d="M24 7v17M13 13a17 17 0 1 0 22 0"/><circle cx="24" cy="30" r="3"/></svg>'
        },
        {
            label: "ISOLATION POINTS",
            title: "Break every energy path",
            description: "Open disconnects, close valves, and block or unplug equipment as the machine procedure requires.",
            icon: '<svg viewBox="0 0 48 48"><path d="M6 24h14m8 0h14M20 17l8 14M28 17l-8 14"/><circle cx="24" cy="24" r="19"/><path d="M24 19v10"/></svg>'
        },
        {
            label: "PERSONAL LOCKOUT",
            title: "Fit personal locks and tags",
            description: "Each authorized worker applies their own lock and a tag that identifies who they are and why the lock is on.",
            icon: '<svg viewBox="0 0 48 48"><rect x="9" y="21" width="30" height="22" rx="3"/><path d="M16 21v-7a8 8 0 0 1 16 0v7M24 29v6M35 9h8v9h-8zM39 18v7"/></svg>'
        },
        {
            label: "STORED ENERGY",
            title: "Bleed pressure and restrain motion",
            description: "Release trapped pressure, block raised parts, discharge capacitors, and let hot surfaces cool.",
            icon: '<svg viewBox="0 0 48 48"><circle cx="23" cy="24" r="17"/><path d="m23 24 9-9M23 10v4M10 24h4M23 34v4M32 24h4M37 9q-6 5 0 9t0 9M42 12q-4 3 0 6t0 6"/></svg>'
        },
        {
            label: "ZERO-ENERGY TEST",
            title: "Prove the press cannot start",
            description: "Try the normal start controls, return them to OFF, and use suitable test instruments where needed.",
            icon: '<svg viewBox="0 0 48 48"><rect x="5" y="8" width="25" height="32" rx="3"/><rect x="10" y="13" width="15" height="8" rx="1"/><path d="M11 28h3m7 0h3m-13 6h12M30 30l5 5 9-12"/></svg>'
        },
        {
            label: "MAINTENANCE",
            title: "Release the crew to work",
            description: "Servicing starts only after isolation, stored-energy controls, and zero-energy verification are complete.",
            icon: '<svg viewBox="0 0 48 48"><path d="M29 9a13 13 0 0 0-16 16L6 32a5 5 0 0 0 7 7l7-7A13 13 0 0 0 36 16l-8 8-7-7zM31 34l5-5 7 7-5 5z"/></svg>'
        }
    ];
    const securedVisual = {
        label: "STEP SECURED",
        title: "Correct safety action",
        description: "Objective complete. Continue when you are ready for the next part of the lockout.",
        icon: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><path d="m14 24 7 7 14-15"/></svg>'
    };
    const completeVisual = {
        label: "ZERO ENERGY VERIFIED",
        title: "The machine is safe to service",
        description: "Every isolation point is locked, stored energy is controlled, and the crew can begin work.",
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

    function updateSceneStatus(label, servicingAuthorized) {
        sceneCaption.textContent = label;
        sceneCaption.parentElement.lastChild.textContent = servicingAuthorized
            ? " Servicing authorized"
            : " Servicing not authorized";
    }

    function updateSceneVisual(stepIndex, secured = false) {
        const visual = stepIndex >= lotoSteps.length
            ? completeVisual
            : secured
                ? securedVisual
                : stageVisuals[stepIndex] || {
                    label: "MISSION BRIEFING",
                    title: "Inspect the press",
                    description: "Identify the energy hazards before the crew begins work.",
                    icon: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="19"/><path d="M24 15v10l7 4M8 8l6 6m26-6-6 6"/></svg>'
                };

        sceneActionIcon.innerHTML = visual.icon;
        sceneActionLabel.textContent = visual.label;
        sceneActionTitle.textContent = visual.title;
        sceneActionDescription.textContent = visual.description;
        scene.dataset.stage = String(stepIndex);
        scene.classList.toggle("is-secured", secured || stepIndex >= lotoSteps.length);
        scene.setAttribute("aria-label", `${visual.label}: ${visual.title}. ${visual.description}`);
    }

    function renderStep() {
        scoreHud.value.textContent = String(score).padStart(3, "0");
        riskHud.value.textContent = String(unsafeChoices).padStart(2, "0");

        if (currentStep < 0) {
            updateSceneVisual(-1);
            stageHud.value.textContent = "Briefing";
            progress.value = 0;
            progressText.textContent = "MISSION READY · 8 STEPS";
            for (const item of stepsList.children) {
                item.classList.remove("is-current", "is-complete");
                item.removeAttribute("aria-current");
            }
            const eyebrow = document.createElement("p");
            eyebrow.className = "loto-task-kicker";
            eyebrow.textContent = "YOUR OBJECTIVE";
            const title = document.createElement("h2");
            title.textContent = "Make the press safe.";
            const briefing = document.createElement("p");
            briefing.textContent = "A maintenance crew is waiting at Bay 04. Secure every energy source, prove the machine is safe, and earn 100 points for each correct safety action.";
            const note = document.createElement("p");
            note.className = "loto-mission-note";
            note.textContent = "No timer. Safety comes first. If you choose an unsafe action, review the hazard and retry that step.";
            const start = document.createElement("button");
            start.className = "loto-choice loto-start";
            start.type = "button";
            start.textContent = "Start mission";
            start.addEventListener("click", () => {
                currentStep = 0;
                renderStep();
            });
            task.replaceChildren(eyebrow, title, briefing, note, start);
            return;
        }

        const step = lotoSteps[currentStep];
        if (!step) {
            renderComplete();
            return;
        }

        stageHud.value.textContent = `${String(currentStep + 1).padStart(2, "0")} / 08`;
        updateSceneVisual(currentStep, stepSecured);
        const zeroEnergyVerified = completedSteps.has(lotoSteps.length - 2)
            || (stepSecured && currentStep >= lotoSteps.length - 2);
        scene.classList.toggle("is-safe", zeroEnergyVerified);
        updateSceneStatus(
            zeroEnergyVerified ? "ZERO ENERGY VERIFIED" : "ENERGIZED",
            zeroEnergyVerified
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
        progressText.textContent = `MISSION PROGRESS · ${completedSteps.size} / ${lotoSteps.length} STEPS SECURED`;

        const kicker = document.createElement("p");
        kicker.className = "loto-task-kicker";
        kicker.textContent = `STEP ${String(currentStep + 1).padStart(2, "0")} · OBJECTIVE`;

        const title = document.createElement("h2");
        title.textContent = step.title;
        const instruction = document.createElement("p");
        instruction.textContent = step.instruction;
        if (stepSecured) {
            const success = document.createElement("p");
            success.className = "loto-success-message";
            success.textContent = "STEP SECURED · +100 SAFETY POINTS";
            const next = document.createElement("button");
            next.className = "loto-choice loto-start";
            next.type = "button";
            next.textContent = currentStep === lotoSteps.length - 1 ? "Complete mission" : "Continue mission";
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
        updateSceneVisual(lotoSteps.length);
        progress.value = lotoSteps.length;
        stageHud.value.textContent = "COMPLETE";
        scene.classList.add("is-safe");
        updateSceneStatus("SAFE TO SERVICE", true);
        progressText.textContent = "MISSION COMPLETE · 8 / 8 STEPS SECURED";
        for (const item of stepsList.children) {
            item.classList.add("is-complete");
            item.classList.remove("is-current");
            item.removeAttribute("aria-current");
        }

        const eyebrow = document.createElement("p");
        eyebrow.className = "loto-task-kicker";
        eyebrow.textContent = "BAY 04 · MISSION REPORT";
        const title = document.createElement("h2");
        title.textContent = "Machine secured.";
        const message = document.createElement("p");
        message.textContent = "Zero-energy state verified. The crew can begin servicing safely.";
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
            answerOrders = lotoSteps.map((step) => shuffleChoices(step.choices));
            scene.classList.remove("is-safe");
            updateSceneStatus("ENERGIZED", false);
            renderStep();
        });
        task.replaceChildren(eyebrow, title, message, result, replay);
    }

    renderStep();
}

main();
