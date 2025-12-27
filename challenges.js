// ===============================
// VectorView – Challenges Logic
// ===============================

// Scenario database
const scenarios = {
  concert: {
    title: "🎸 Rock Concert Stage",
    desc: "The singer stands in front of loud drums. The microphone should focus forward and reject sound from behind.",
    answer: "cardioid",
    explain: "Cardioid microphones capture sound primarily from the front while rejecting rear noise.",
    link: "cardioid.html"
  },

  podcast: {
    title: "🎙 Podcast Interview",
    desc: "Two people sit face-to-face. One microphone must capture both voices while rejecting side noise.",
    answer: "figure8",
    explain: "Figure-8 patterns capture sound from the front and back while rejecting noise from the sides.",
    link: "figure8.html"
  },

  meeting: {
    title: "🧑‍🤝‍🧑 Round Table Meeting",
    desc: "Multiple speakers sit around a circular table. All voices should be captured equally.",
    answer: "omni",
    explain: "Omnidirectional microphones capture sound equally from all directions.",
    link: "omni.html"
  },

  film: {
    title: "🎥 Film Set Dialogue",
    desc: "A boom microphone must isolate dialogue while rejecting surrounding ambient noise.",
    answer: "shotgun",
    explain: "Shotgun microphones provide a narrow forward pickup pattern, ideal for film and broadcast.",
    link: "shotgun.html"
  }
};

let currentScenario = null;

// Load selected scenario
function loadScenario(key) {
  currentScenario = scenarios[key];

  document.getElementById("scenarioTitle").textContent = currentScenario.title;
  document.getElementById("scenarioDesc").textContent = currentScenario.desc;

  document.getElementById("solver").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("pattern").value = "";
}

// Check user answer
function checkAnswer() {
  if (!currentScenario) return;

  const choice = document.getElementById("pattern").value;
  const result = document.getElementById("result");

  if (!choice) {
    result.innerHTML = `<p class="wrong">Please select a pattern first.</p>`;
    result.classList.remove("hidden");
    return;
  }

  if (choice === currentScenario.answer) {
    result.innerHTML = `
      <h3 class="correct">✅ Correct Choice</h3>
      <p>${currentScenario.explain}</p>
      <a class="explore-link" href="${currentScenario.link}">
        Explore this pattern →
      </a>
    `;
  } else {
    result.innerHTML = `
      <h3 class="wrong">❌ Incorrect</h3>
      <p>This pattern does not provide the required directional control.</p>
      <p><strong>Hint:</strong> Think about where noise rejection is needed.</p>
    `;
  }

  result.classList.remove("hidden");
}
