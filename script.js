const pacts = [
  {
    id: "sleep",
    context: "Personal",
    object: "calendar",
    title: "Can I sleep before midnight for five nights?",
    room: "Quiet Club",
    status: "Proof due tonight",
    mood: "Your streak is currently negotiating with Thursday.",
    size: "feature",
    people: ["E", "N"],
  },
  {
    id: "deck",
    context: "Group",
    object: "prediction",
    title: "Will the deck be submitted before Friday review?",
    room: "Studio Sprint",
    status: "3 predictions hidden",
    mood: "Percentages unlock after everyone picks a side.",
    size: "tall",
    people: ["E", "M", "A", "S"],
  },
  {
    id: "runs",
    context: "Group",
    object: "race",
    title: "Who logs the most runs before month end?",
    room: "Sunday Run Club",
    status: "Mira took the lead",
    mood: "A tiny lead change, a large amount of smugness.",
    size: "wide",
    people: ["M", "E", "J", "R"],
  },
  {
    id: "delivery",
    context: "Personal",
    object: "calendar",
    title: "No food delivery until Sunday night.",
    room: "Solo Pact",
    status: "Day 3 open",
    mood: "The app store is not proof of dinner.",
    size: "",
    people: ["E"],
  },
  {
    id: "dinner",
    context: "Couple",
    object: "number",
    title: "How late will the 8 PM dinner actually start?",
    room: "Two-person table",
    status: "Answers face down",
    mood: "Closest answer wins planning immunity.",
    size: "tall",
    people: ["E", "A"],
  },
  {
    id: "buzzword",
    context: "Group",
    object: "jar",
    title: "Rs 50 whenever someone says circle back.",
    room: "Monday Standup",
    status: "Rs 250 recorded",
    mood: "No payments here. Just receipts.",
    size: "",
    people: ["K", "N", "E", "P"],
  },
  {
    id: "tickets",
    context: "Group",
    object: "elimination",
    title: "Who still has concert tickets by show day?",
    room: "Balcony Section",
    status: "2 passes retired",
    mood: "Official excuse: budget suddenly became real.",
    size: "wide",
    people: ["E", "L", "V", "T", "N"],
  },
];

const betSections = [
  {
    id: "progress",
    title: "In Progress",
    count: "3 live",
    items: [
      { id: "sleep", icon: "🔥", type: "Habit", title: "Sleep before midnight", day: 4, totalDays: 5, startDate: "2026-09-04", stake: "$20", status: "In Progress", tone: "blue", people: ["EA", "NA"], proof: "Photo proof before midnight", requiresProof: true, reward: "Winner keeps the streak alive." },
      { id: "runs", icon: "🏃", type: "Race", title: "Most runs this month", day: 12, totalDays: 30, startDate: "2026-09-01", stake: "Breakfast", status: "In Progress", tone: "green", people: ["MR", "EA", "JV", "RS"], proof: "Run screenshots or wearable sync", requiresProof: true, reward: "Highest total wins." },
      { id: "buzzword", icon: "🫙", type: "Jar", title: "Office phrase jar", day: 3, totalDays: 7, startDate: "2026-09-03", stake: "For fun", status: "In Progress", tone: "pink", people: ["KN", "NA", "EA", "PR", "SA"], proof: "Group honor log", requiresProof: false, reward: "Lowest violations wins." },
    ],
  },
  {
    id: "pending",
    title: "Pending",
    count: "2 waiting",
    items: [
      { id: "deck", icon: "🔮", type: "Prediction", predictionKind: "yesNo", title: "Will Friday deck ship?", day: 0, totalDays: 3, startDate: "2026-09-09", stake: "Coffee", status: "Invite Pending", tone: "lavender", people: ["EA", "MS", "AR", "NK"], proof: "Result confirmed by timestamp", requiresProof: false, reward: "Correct side wins coffee." },
      { id: "dinner", icon: "⏱️", type: "Number", title: "Dinner start time", day: 0, totalDays: 1, startDate: "2026-09-09", stake: "Breakfast", status: "Draft", tone: "yellow", people: ["EA", "AS"], proof: "Actual arrival time", requiresProof: false, reward: "Closest answer wins planning immunity." },
    ],
  },
  {
    id: "history",
    title: "History",
    count: "2 done",
    items: [
      { id: "delivery", icon: "✅", type: "Habit", title: "No food delivery", day: 7, totalDays: 7, startDate: "2026-09-01", stake: "Dinner", status: "Completed", tone: "green", people: ["EA"], proof: "Weekly check-ins verified", requiresProof: false, reward: "Eeshita won." },
      { id: "tickets", icon: "🏆", type: "Elimination", title: "Concert ticket survivor", day: 10, totalDays: 10, startDate: "2026-08-30", stake: "Movie ticket", status: "Completed", tone: "yellow", people: ["EA", "LS", "VK"], proof: "Final ticket status logged", requiresProof: false, reward: "Survivor badge unlocked." },
    ],
  },
];

const activity = [
  ["Verify", "Naina submitted sleep proof", "Approve it or ask for one more photo."],
  ["Nudge", "Mira took the lead in Sunday Run Club", "Jay reacted: suspicious cardio behaviour."],
  ["Invite", "Studio Sprint wants your prediction", "Pick a side before Friday review closes."],
  ["Result", "Dinner delay reveal is ready", "Actual start time: 8:47 PM."],
];

const reactions = ["Called it", "Cap", "Proud of you", "No chance", "Proof?", "RIP", "Suspicious", "Starting Monday?"];
const statLibrary = [
  { id: "won", label: "Bets won", value: "42", color: "#3363ff" },
  { id: "lost", label: "Bets lost", value: "14", color: "#ff4a10" },
  { id: "accuracy", label: "Accuracy", value: "75%", color: "#ffb800" },
  { id: "badge-streak", label: "Badge", value: "🔥 Streak saver", color: "#030303", badge: true },
  { id: "badge-proof", label: "Badge", value: "📸 Proof queen", color: "#3363ff", badge: true },
  { id: "badge-called", label: "Badge", value: "🎯 Called it", color: "#ff4a10", badge: true },
  { id: "badge-ice", label: "Badge", value: "🧊 No cap", color: "#030303", badge: true },
  { id: "streak", label: "Best streak", value: "18d", color: "#030303" },
  { id: "clean", label: "Clean wins", value: "9", color: "#ff4a10" },
];
const playerProgress = {
  betsWon: 42,
  betsLost: 14,
  bestStreak: 18,
  completedPacts: 5,
  predictionsWon: 5,
  totalPredictions: 56,
  exactNumberGuesses: 1,
  currentStreak: 12,
  photoProofsVerified: 10,
  rejectedProofs: 0,
  proofPactsCompleted: 1,
  finalHourCheckIns: 1,
  raceWins: 1,
  eliminationWins: 1,
  jarViolations: 3,
  groupPactsCompleted: 5,
};
const achievements = [
  { id: "first-pact", emoji: "🏁", name: "First Pact", condition: "Complete your first Pact", title: "Rookie", tone: "#fff1d6", isUnlocked: (p) => p.completedPacts >= 1 },
  { id: "called-it", emoji: "🔮", name: "Called It", condition: "Win five predictions", title: "Called It", tone: "#f8dff0", isUnlocked: (p) => p.predictionsWon >= 5 },
  { id: "bullseye", emoji: "🎯", name: "Bullseye", condition: "Guess a number exactly right", title: "Sharpshooter", tone: "#dfe6ff", isUnlocked: (p) => p.exactNumberGuesses >= 1 },
  { id: "kept-word", emoji: "🤝", name: "Kept Your Word", condition: "Successfully complete five Pacts", title: "Reliable One", tone: "#dff4e8", isUnlocked: (p) => p.completedPacts >= 5 },
  { id: "on-roll", emoji: "🔥", name: "On a Roll", condition: "Maintain a seven-day streak", title: "Locked In", tone: "#ffe2d3", isUnlocked: (p) => p.currentStreak >= 7 },
  { id: "proof-queen", emoji: "📸", name: "Proof Queen", condition: "Submit 10 verified photo proofs", title: "Proof Queen", tone: "#dff0ff", isUnlocked: (p) => p.photoProofsVerified >= 10 },
  { id: "no-cap", emoji: "🧊", name: "No Cap", condition: "Complete a proof-based Pact without any proof being rejected", title: "No Cap", tone: "#dbf5f1", isUnlocked: (p) => p.proofPactsCompleted >= 1 && p.rejectedProofs === 0 },
  { id: "streak-saver", emoji: "⏰", name: "Streak Saver", condition: "Check in during the final hour before your streak expires", title: "Streak Saver", tone: "#fff1d6", isUnlocked: (p) => p.finalHourCheckIns >= 1 },
  { id: "first-across", emoji: "🏃", name: "First Across", condition: "Win a race challenge", title: "Front Runner", tone: "#dfe6ff", isUnlocked: (p) => p.raceWins >= 1 },
  { id: "last-standing", emoji: "🏆", name: "Last One Standing", condition: "Win an elimination Pact", title: "Survivor", tone: "#fff1d6", isUnlocked: (p) => p.eliminationWins >= 1 },
  { id: "repeat-offender", emoji: "🚩", name: "Repeat Offender", condition: "Receive 10 jar violations", title: "Walking Red Flag", tone: "#ffe2d3", isUnlocked: (p) => p.jarViolations >= 10 },
  { id: "group-glue", emoji: "🫶", name: "Group Glue", condition: "Complete five Group Pacts", title: "Group Glue", tone: "#f8dff0", isUnlocked: (p) => p.groupPactsCompleted >= 5 },
  { id: "pact-legend", emoji: "👑", name: "Pact Legend", condition: "Complete 25 Pacts", title: "Pact Legend", tone: "#fff1d6", isUnlocked: (p) => p.completedPacts >= 25 },
];
const settingsOptions = [
  ["✏️", "Edit Profile", "Change profile photo and name."],
  ["🔗", "Invite via Link", "Copy or share your personal invite link."],
  ["🔔", "Notifications", "Control check-ins, invites, verification requests, results, reactions, achievements and weekly recaps."],
  ["📸", "Proof Settings", "Choose proof visibility, auto-hide proof after verification and manage uploaded proof."],
  ["❔", "Help", "How Pact works, report a problem, report harmful activity, suggest a feature or contact support."],
  ["👤", "Account", "Email, phone, login method, connected apps, download data, logout, deactivate or delete account."],
];
const appState = {
  profile: {
    name: "Eeshita Anand",
    photo: "",
  },
  notifications: {
    "Check-in reminders": true,
    Invitations: true,
    "Verification requests": true,
    Results: true,
    Reactions: true,
    Achievements: true,
    "Weekly recaps": true,
  },
  proof: {
    visibility: "Private",
    hideAfterVerification: true,
    deleteAfter30Days: false,
  },
  account: {
    email: "eeshita@example.com",
    phone: "",
    loginMethod: "Apple",
  },
  proofPreviewVersion: "neutral-polaroid",
};
const settingsPages = {
  "Edit Profile": {
    note: "Update how your profile appears across Pact.",
    render: () => `
      <label class="settings-field">Profile photo<input id="profilePhotoInput" type="file" accept="image/*" /></label>
      <label class="settings-field">Display name<input id="profileNameInput" type="text" value="${appState.profile.name}" /></label>
      <button class="settings-primary" type="button" data-save-profile>Save changes</button>
    `,
  },
  "Invite via Link": {
    note: "Share your personal invite wherever your friends already are.",
    render: () => `
      <div class="invite-link">pact.app/eeshita</div>
      <div class="settings-action-grid single">
        <button type="button" data-settings-action="Invite link copied">Copy link</button>
        <button type="button" data-settings-action="Phone share sheet opened">Share invite</button>
      </div>
    `,
  },
  Notifications: {
    note: "Choose what Pact can nudge you about.",
    render: () => `
      <button class="settings-primary" type="button" data-settings-action="Notification permission requested">Allow notifications</button>
      ${Object.entries(appState.notifications).map(([item, checked]) => settingToggle(item, checked, "notification")).join("")}
    `,
  },
  "Proof Settings": {
    note: "Control how proof is stored, shown and cleaned up.",
    render: () => `
      ${settingChoice("Default proof visibility", ["Private", "Friends", "Group"], appState.proof.visibility, "proof-visibility")}
      ${settingToggle("Hide proof after verification", appState.proof.hideAfterVerification, "proof-hide")}
      ${settingToggle("Delete proof after 30 days", appState.proof.deleteAfter30Days, "proof-delete")}
      <button class="settings-danger" type="button" data-settings-action="Uploaded proof manager opened">Manage uploaded proof</button>
    `,
  },
  Help: {
    note: "Get support or tell us what needs attention.",
    render: () => `
      <div class="settings-action-grid single">
        ${["How Pact works", "Report a problem", "Report harmful activity", "Suggest a feature", "Contact support"].map((item) => `<button type="button" data-settings-action="${item} opened">${item}</button>`).join("")}
      </div>
    `,
  },
  Account: {
    note: "Manage login, connections and account safety.",
    render: () => `
      <label class="settings-field">Email<input id="accountEmailInput" type="email" value="${appState.account.email}" /></label>
      <label class="settings-field">Phone<input id="accountPhoneInput" type="tel" value="${appState.account.phone}" placeholder="Add phone" /></label>
      ${settingChoice("Login method", ["Apple", "Google", "Email"], appState.account.loginMethod, "login-method")}
      <button class="settings-primary" type="button" data-save-account>Save account</button>
      <div class="settings-action-grid single">
        ${["Connected apps", "Download data", "Logout", "Deactivate account", "Delete account"].map((item) => `<button type="button" data-settings-action="${item} opened">${item}</button>`).join("")}
      </div>
    `,
  },
};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const STORAGE_KEY = "pactPrototypeState";
const UI_STATE_KEY = "pactPrototypeUiState";
let currentFilter = "All";
let profileStats = statLibrary.slice(0, 4).map((stat) => ({ ...stat }));
let unlockedAchievementIds = new Set(achievements.filter((item) => item.isUnlocked(playerProgress)).map((item) => item.id));
let profileEditMode = false;
let pendingStatTarget = null;
let dragIndex = null;
let longPressTimer = null;
let suppressStatClick = false;
let activePointerId = null;
let betsSearchOpen = false;
let betsSearchTerm = "";
let selectedProofDay = null;
let habitCalendarViews = {};
let activeChallengeId = null;
let restoringUiState = false;
let uiStateTimer = null;
let betsJumpLock = false;
let betsJumpTimer = null;

function objectArt(pact, large = false) {
  if (pact.object === "calendar") {
    return `<div class="object calendar-object ${large ? "large-object" : ""}">
      ${["M", "T", "W", "T", "F", "S", "S"].map((d, index) => `<span class="${index < 3 ? "done" : index === 4 ? "pending" : ""}" aria-label="${index < 3 ? "Stamped" : index === 4 ? "Due" : "Upcoming"}"><b>${d}</b><i>${index < 3 ? "\u2713" : index === 4 ? "Due" : ""}</i></span>`).join("")}
    </div>`;
  }
  if (pact.object === "prediction") {
    return `<div class="object vote-object ${large ? "large-object" : ""}">
      <span class="picked">Yes<small>${large ? "62%" : "Hidden"}</small></span>
      <span>No<small>${large ? "38%" : "Pick"}</small></span>
    </div>`;
  }
  if (pact.object === "race") {
    return `<div class="object race-object ${large ? "large-object" : ""}">
      ${[
        ["M", "76%", "lead"],
        ["E", "64%", ""],
        ["J", "51%", ""],
        ["R", "45%", ""],
      ].map(([name, pos, lead]) => `<div><span class="${lead}" style="--pos:${pos}">${name}</span></div>`).join("")}
    </div>`;
  }
  if (pact.object === "number") {
    return `<div class="object number-object ${large ? "large-object" : ""}">
      ${["?", "?", large ? "47m" : "?", "?"].map((value, index) => `<span style="--tilt:${[-4, 3, -1, 5][index] || 0}deg">${value}</span>`).join("")}
      <em>Actual line</em>
    </div>`;
  }
  if (pact.object === "jar") {
    return `<div class="object jar-object ${large ? "large-object" : ""}">
      <div class="jar">${[12, 29, 45, 57, 68].map((bottom, index) => `<i style="--b:${bottom}%; --l:${18 + index * 11}%"></i>`).join("")}</div>
      <strong>Rs 250</strong>
    </div>`;
  }
  return `<div class="object passes-object ${large ? "large-object" : ""}">
    ${["Esha", "Lee", "Vihaan", "Tara", "Noor"].map((name, index) => `<span class="${index > 2 ? "out" : ""}">${name}</span>`).join("")}
  </div>`;
}

function avatarRow(names) {
  return names.map((name) => `<span>${name}</span>`).join("");
}

function memberAvatarRow(names) {
  const visible = names.slice(0, 3);
  const extra = names.length - visible.length;
  return visible.map((name) => `<span>${name}</span>`).join("") + (extra > 0 ? `<span class="more-members">+${extra}</span>` : "");
}

function renderGallery() {
  const visible = pacts.filter((pact) => currentFilter === "All" || pact.context === currentFilter);
  $("#pactGallery").innerHTML = visible.map((pact) => `
    <article class="pact-card ${pact.size}" data-pact="${pact.id}" data-object="${pact.object}" role="button" tabindex="0" aria-label="${escapeHtml(pact.title)}">
      <div class="card-top">
        <span>${pact.context}</span>
        <span>${pact.status}</span>
      </div>
      ${objectArt(pact)}
      <div class="card-copy">
        <p>${pact.room}</p>
        <h3>${pact.title}</h3>
        <small>${pact.mood}</small>
      </div>
      <div class="avatar-row">${avatarRow(pact.people)}</div>
    </article>
  `).join("");
  $$("[data-pact]").forEach((card) => {
    card.addEventListener("click", () => openPact(card.dataset.pact));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPact(card.dataset.pact);
      }
    });
  });
}

function renderPulse() {
  $("#pulseList").innerHTML = activity.slice(0, 3).map(([type, title, text]) => `
    <article class="pulse-item">
      <span>${type}</span>
      <div><strong>${title}</strong><p>${text}</p></div>
    </article>
  `).join("");
}

function renderSpaces() {
  const normalizedSearch = betsSearchTerm.trim().toLowerCase();
  const activeJump = $("[data-bets-jump].active")?.dataset.betsJump || betSections[0].id;
  const previousScrollTop = $("#spaceGrid")?.scrollTop || 0;
  $("#betsToolbar").innerHTML = `
    <section class="bets-summary" aria-label="Bet summary">
      ${betSections.map((section) => `
        <button class="${section.id === activeJump ? "active" : ""}" type="button" data-bets-jump="${section.id}">
          <strong>${section.title}</strong>
          <span>${sectionCountLabel(section)}</span>
        </button>
      `).join("")}
    </section>
    <div class="bets-search-row ${betsSearchOpen ? "open" : ""}">
      <input id="betsSearchInput" type="search" value="${escapeHtml(betsSearchTerm)}" placeholder="Search bets, members, stake..." aria-label="Search bets" />
      <button type="button" data-clear-bets-search>Clear</button>
    </div>
  `;
  $("#spaceGrid").innerHTML = `
    ${betSections.map((section) => `
      <section class="bets-section" id="bets-${section.id}">
        <div class="bets-section-head">
          <h2>${section.title}</h2>
          <span>${sectionCountLabel(section)}</span>
        </div>
        <div class="bet-list">
          ${filteredBets(section, normalizedSearch).map((bet) => `
            <article class="bet-tile ${bet.tone}">
              <div class="bet-orb" aria-hidden="true"></div>
              <div class="bet-tile-top">
                <div>
                  <h3>${escapeHtml(bet.title)}</h3>
                  ${stakeJar(bet.stake)}
                </div>
                <span>${escapeHtml(bet.status)}</span>
              </div>
              <div class="bet-progress-line">
                <strong>${betProgressLabel(bet)}</strong>
                <div><span style="width:${betProgressPercent(bet)}%"></span></div>
              </div>
              <div class="bet-tile-bottom">
                <div class="avatar-row member-avatars">${memberAvatarRow(bet.people)}</div>
                <button type="button" data-view-challenge="${bet.id}">View Challenge</button>
              </div>
            </article>
          `).join("") || `<article class="empty-bets">No bets match this search.</article>`}
        </div>
      </section>
    `).join("")}
  `;
  const searchInput = $("#betsSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      betsSearchTerm = searchInput.value;
      renderSpaces();
      $("#betsSearchInput")?.focus();
    });
    if (betsSearchOpen) {
      searchInput.focus();
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    }
  }
  $("[data-clear-bets-search]")?.addEventListener("click", () => {
    betsSearchTerm = "";
    renderSpaces();
  });
  $$("[data-view-challenge]").forEach((button) => button.addEventListener("click", () => {
    openChallenge(button.dataset.viewChallenge);
  }));
  $$("[data-bets-jump]").forEach((button) => button.addEventListener("click", () => {
    jumpToBetsSection(button.dataset.betsJump);
  }));
  if (previousScrollTop) $("#spaceGrid").scrollTop = previousScrollTop;
}

function betsSectionOffset(target, scroller) {
  return target.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop;
}

function syncBetsSummary() {
  const scroller = $("#spaceGrid");
  if (!scroller || betsJumpLock) return;
  const sections = $$(".bets-section");
  if (!sections.length) return;
  const threshold = scroller.scrollTop + 32;
  let current = sections[0];
  sections.forEach((section) => {
    if (betsSectionOffset(section, scroller) <= threshold) current = section;
  });
  const id = current.id.replace("bets-", "");
  $$("[data-bets-jump]").forEach((item) => item.classList.toggle("active", item.dataset.betsJump === id));
}

function sectionCountLabel(section) {
  const count = section.items.length;
  if (section.id === "progress") return `${count} live`;
  if (section.id === "pending") return `${count} waiting`;
  return `${count} done`;
}

function filteredBets(section, term) {
  if (!term) return section.items;
  return section.items.filter((bet) => [bet.title, bet.type, bet.stake, bet.status, bet.proof, bet.reward, ...bet.people].join(" ").toLowerCase().includes(term));
}

function betProgressPercent(bet) {
  const totalDays = Math.max(1, Number(bet.totalDays) || 1);
  const currentDay = Math.min(Math.max(0, Number(bet.day) || 0), totalDays);
  return Math.min(100, Math.round((currentDay / totalDays) * 100));
}

function betProgressLabel(bet) {
  const totalDays = Math.max(1, Number(bet.totalDays) || 1);
  const currentDay = Math.max(0, Number(bet.day) || 0);
  if (bet.status === "Completed" || currentDay >= totalDays) return "Betting days are over";
  return `Day ${currentDay} of ${totalDays}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  }[char]));
}

function findBet(id) {
  const location = findBetLocation(id);
  if (!location) return null;
  return { ...location.bet, section: location.section.title, sectionId: location.section.id };
}

function findBetLocation(id) {
  for (const section of betSections) {
    const index = section.items.findIndex((item) => item.id === id);
    if (index >= 0) return { section, index, bet: section.items[index] };
  }
  return null;
}

function openChallenge(id, focusSelector = null) {
  const bet = findBet(id);
  if (!bet) return;
  activeChallengeId = id;
  const progress = betProgressPercent(bet);
  const primaryAction = challengePrimaryAction(bet);
  $("#challengeScreen").innerHTML = `
    <article class="challenge-hero ${bet.tone}">
      <div class="bet-orb" aria-hidden="true"></div>
      <div class="bet-tile-top challenge-hero-top">
        <div>
          <h2>${escapeHtml(bet.title)}</h2>
          <p class="challenge-stake-line">Stake <strong>${escapeHtml(bet.stake)}</strong></p>
        </div>
        <span>${escapeHtml(bet.status)}</span>
      </div>
      <div class="challenge-progress">
        <div><span style="width:${progress}%"></span></div>
        <strong>${betProgressLabel(bet)}</strong>
      </div>
      <div class="avatar-row member-avatars">${memberAvatarRow(bet.people)}</div>
    </article>
    ${stakePotCard(bet)}
    ${tugOfWarCard(bet)}
    ${betCalendar(bet)}
    ${challengeMemberBoard(bet)}
    ${challengeTypePanel(bet)}
    <section class="challenge-detail-grid">
      <article><span>Proof</span><strong>${escapeHtml(bet.proof)}</strong></article>
      <article><span>Outcome</span><strong>${escapeHtml(bet.reward)}</strong></article>
      <article><span>Members</span><strong>${bet.people.length}</strong></article>
    </section>
    <div class="challenge-actions">
      <button type="button" data-challenge-action="${primaryAction.action}" data-challenge-id="${bet.id}">${primaryAction.label}</button>
      <button type="button" data-view="activity">Open Chat</button>
    </div>
  `;
  showView("challenge");
  setupTugAnimation();
  if (focusSelector) {
    requestAnimationFrame(() => {
      $(focusSelector)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
  rememberUiState(true);
}

function challengePrimaryAction(bet) {
  if (bet.sectionId === "pending" && bet.status === "Invite Pending") return { action: "accept", label: "Accept Bet" };
  if (bet.sectionId === "pending") return { action: "start", label: "Start Bet" };
  if (bet.sectionId === "history" || bet.status === "Completed") return { action: "recap", label: "View Recap" };
  return { action: "progress", label: bet.day + 1 >= bet.totalDays ? "Complete Bet" : "Add Progress" };
}

function stakeJar(stake, size = "") {
  const info = stakeInfo(stake);
  return `<div class="stake-jar ${size}" aria-label="Stake: ${escapeHtml(stake)}">
    <span class="stake-jar-glass ${info.kind}" aria-hidden="true"><span>${escapeHtml(info.content)}</span></span>
    <span class="stake-copy"><small>Stake</small><strong>${escapeHtml(stake)}</strong></span>
  </div>`;
}

function stakeInfo(stake) {
  const text = String(stake).toLowerCase();
  if (/[$₹€£]|rs|inr|usd|money|cash/.test(text)) return { kind: "money", content: String(stake).replace(/\s+/g, "") };
  if (/breakfast/.test(text)) return { kind: "food", content: "🥞" };
  if (/lunch/.test(text)) return { kind: "food", content: "🥗" };
  if (/dinner/.test(text)) return { kind: "food", content: "🍽️" };
  if (/coffee/.test(text)) return { kind: "food", content: "☕" };
  if (/dessert|cake|ice cream/.test(text)) return { kind: "food", content: "🍰" };
  if (/movie|ticket/.test(text)) return { kind: "treat", content: "🎟️" };
  if (/for fun|fun/.test(text)) return { kind: "fun", content: "✨" };
  return { kind: "treat", content: "🎁" };
}

function stakePotCard(bet) {
  const info = stakeInfo(bet.stake);
  const pieces = stakePotPieces(bet.stake, info);
  return `<section class="stake-pot-card" aria-label="Stake pot">
    <h3>Stake Pot</h3>
    <article>
      <div class="big-stake-jar ${info.kind}" aria-hidden="true">
        <span class="jar-lid"></span>
        <div class="jar-glass">
          ${pieces.map((piece, index) => `<span style="--x:${piece.x}px; --y:${piece.y}px; --r:${piece.r}deg">${escapeHtml(piece.label)}</span>`).join("")}
        </div>
      </div>
      <div class="stake-pot-copy">
        <span>Total Stakes</span>
        <strong>${escapeHtml(stakePotTotal(bet))}</strong>
        <p>${bet.people.length} ${bet.people.length === 1 ? "player" : "players"} in this bet</p>
        <div class="avatar-row member-avatars">${memberAvatarRow(bet.people)}</div>
      </div>
    </article>
  </section>`;
}

function stakePotTotal(bet) {
  const numeric = String(bet.stake).match(/([$₹€£]|rs\.?|inr)?\s?(\d+)/i);
  if (!numeric) return bet.stake;
  const amount = Number(numeric[2]) * Math.max(1, bet.people.length);
  const prefix = numeric[1] || "$";
  const cleanPrefix = /rs|inr/i.test(prefix) ? "₹" : prefix;
  return `${cleanPrefix}${amount.toLocaleString("en-IN")}`;
}

function stakePotPieces(stake, info) {
  const moneySymbol = String(stake).match(/[$₹€£]/)?.[0] || (/rs|inr/i.test(String(stake)) ? "₹" : "$");
  const label = info.kind === "money" ? moneySymbol : info.content;
  return [
    { label, x: 3, y: 88, r: -18 },
    { label, x: 22, y: 72, r: 12 },
    { label, x: 43, y: 91, r: -8 },
    { label, x: 57, y: 65, r: 18 },
    { label, x: 7, y: 108, r: -14 },
    { label, x: 30, y: 103, r: 22 },
    { label, x: 50, y: 111, r: -20 },
    { label, x: 60, y: 94, r: 8 },
  ];
}

function tugOfWarCard(bet) {
  if (!isCoupleHabitBet(bet)) return "";
  const [leftPlayer, rightPlayer] = bet.people;
  const advantage = Math.round((betProgressPercent(bet) - 50) * 0.67);
  const leftScore = Math.max(0, Math.min(100, 50 + advantage));
  const rightScore = 100 - leftScore;
  const maxPull = bet.status === "Completed" ? 32 : 24;
  const pull = Math.max(-maxPull, Math.min(maxPull, Math.round((leftScore - 50) * -1.2)));
  return `<section class="tug-card" aria-label="Tug of war">
    <div class="tug-card-head">
      <h3>Tug of War</h3>
      <span>${escapeHtml(leftPlayer)} vs ${escapeHtml(rightPlayer)}</span>
    </div>
    <div class="tug-arena" style="--tug-pull:${pull}px">
      <div class="tug-player left">
        <span class="tug-character" aria-hidden="true"><i></i><b></b></span>
        <strong>${escapeHtml(leftPlayer)}</strong>
        <small>${leftScore}%</small>
      </div>
      <div class="tug-rope" aria-hidden="true">
        <i></i>
        <b></b>
      </div>
      <div class="tug-player right">
        <span class="tug-character" aria-hidden="true"><i></i><b></b></span>
        <strong>${escapeHtml(rightPlayer)}</strong>
        <small>${rightScore}%</small>
      </div>
    </div>
  </section>`;
}

function isCoupleHabitBet(bet) {
  return bet.type === "Habit" && bet.people.length === 2;
}

function challengeMemberBoard(bet) {
  if (bet.people.length <= 2) return "";
  if (isYesNoPredictionBet(bet)) {
    const teams = predictionTeams(bet.people);
    return `<section class="member-board-card prediction-team-board ${bet.people.length > 4 ? "dense-board" : ""}" aria-label="Prediction teams">
      <div class="member-board-head">
        <h3>Prediction Board</h3>
      </div>
      <div class="prediction-team-columns">
        <article>
          <strong>Yes</strong>
          <div>${teams.yes.map((person, index) => memberPin(person, index)).join("")}</div>
        </article>
        <article>
          <strong>No</strong>
          <div>${teams.no.map((person, index) => memberPin(person, index + teams.yes.length)).join("")}</div>
        </article>
      </div>
    </section>`;
  }
  return `<section class="member-board-card ${bet.people.length > 4 ? "dense-board" : ""}" aria-label="Player board">
    <div class="member-board-head">
      <h3>Player Board</h3>
    </div>
    <div class="member-pin-grid">${bet.people.map((person, index) => memberPin(person, index)).join("")}</div>
  </section>`;
}

function isYesNoPredictionBet(bet) {
  return bet.type === "Prediction" && (bet.predictionKind === "yesNo" || /\b(yes|no|will|won't|would|should|can|is|are|did|does)\b/i.test(bet.title));
}

function predictionTeams(people) {
  return people.reduce((teams, person, index) => {
    teams[index % 2 === 0 ? "yes" : "no"].push(person);
    return teams;
  }, { yes: [], no: [] });
}

function memberPin(initials, index = 0) {
  return `<button class="member-pin note-${(index % 6) + 1}" type="button" aria-label="${escapeHtml(initials)}">
    <span>${escapeHtml(initials)}</span>
  </button>`;
}

function memberName(initials) {
  const names = {
    EA: "Eeshita Anand",
    NA: "Naina Arora",
    MR: "Maya Rao",
    JV: "Jules Verma",
    RS: "Riya Shah",
    KN: "Kabir Nair",
    PR: "Priya Rai",
    SA: "Samaira Ali",
    MS: "Meera Sen",
    AR: "Aarav Rao",
    NK: "Nikita Kapoor",
    AS: "Arjun Singh",
    LS: "Leah Suri",
    VK: "Vivaan Kohli",
  };
  return names[initials] || `${initials} Player`;
}

function setupTugAnimation() {
  const cards = $$(".tug-card");
  if (!cards.length) return;
  cards.forEach((card) => card.classList.remove("in-play"));
  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("in-play"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      window.setTimeout(() => entry.target.classList.add("in-play"), 180);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.45 });
  cards.forEach((card) => observer.observe(card));
}

function betCalendar(bet) {
  const completed = calendarCompletedDays(bet);
  const selected = selectedProofDay?.betId === bet.id ? selectedProofDay.day : null;
  const days = habitCalendarDays(bet);
  const view = habitCalendarView(bet);
  const visibleDays = visibleHabitCalendarDays(bet, days, view);
  const hasMonthView = isMonthLength(bet);
  const calendarTitle = view === "month" ? "Month Calendar" : days.length > 7 ? "Bet Calendar" : "Weekly Calendar";
  return `<section class="habit-proof-card" aria-label="Bet calendar">
    <div class="habit-proof-head">
      <div>
        <h3>${calendarTitle}</h3>
        <p>${habitCalendarRangeLabel(visibleDays)}</p>
      </div>
      <span>${betProgressLabel(bet)}</span>
    </div>
    ${hasMonthView ? `<div class="calendar-view-toggle" aria-label="Calendar view">
      ${["week", "month"].map((option) => `<button class="${view === option ? "active" : ""}" type="button" data-calendar-view="${option}" data-calendar-bet="${bet.id}">${option}</button>`).join("")}
    </div>` : ""}
    <div class="habit-calendar-row ${visibleDays.length > 7 ? "range-view" : ""} ${view === "month" ? "month-view" : ""}">
      ${visibleDays.map((item) => {
        const isDone = completed.has(item.day);
        const isCurrent = !isDone && item.day === Math.max(1, Math.min(Number(bet.day) || 1, Number(bet.totalDays) || 1));
        const isFuture = item.day > Math.max(1, Number(bet.day) || 1) && bet.status !== "Completed";
        return `<button class="${isDone ? "done" : ""} ${isCurrent ? "current" : ""} ${isFuture ? "future" : ""} ${selected === item.day ? "selected" : ""}" type="button" data-proof-day="${item.day}" data-proof-bet="${bet.id}" aria-label="${item.label} proof">
          <span>${item.weekday}</span>
          <strong>${isDone ? "✓" : item.dateNumber}</strong>
          <small>${isCurrent ? "Today" : item.month}</small>
        </button>`;
      }).join("")}
    </div>
    ${selected ? calendarActionPanel(bet, selected, completed.has(selected)) : ""}
  </section>`;
}

function habitCalendarView(bet) {
  return isMonthLength(bet) && habitCalendarViews[bet.id] === "month" ? "month" : "week";
}

function isMonthLength(bet) {
  return Number(bet.totalDays) >= 30;
}

function habitCalendarDays(bet) {
  const totalDays = Math.max(1, Number(bet.totalDays) || 1);
  const start = parseLocalDate(bet.startDate || todayIsoDate());
  return Array.from({ length: totalDays }, (_, index) => {
    const date = addDays(start, index);
    return {
      day: index + 1,
      date,
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 1),
      dateNumber: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      label: date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
    };
  });
}

function visibleHabitCalendarDays(bet, days, view) {
  if (!isMonthLength(bet) || view === "month") return days;
  const activeDay = Math.max(1, Math.min(Number(bet.day) || 1, days.length));
  const startIndex = Math.min(Math.max(0, activeDay - 4), Math.max(0, days.length - 7));
  return days.slice(startIndex, startIndex + 7);
}

function habitCalendarRangeLabel(days) {
  if (!days.length) return "";
  const first = days[0].date;
  const last = days[days.length - 1].date;
  const format = { month: "short", day: "numeric" };
  return `${first.toLocaleDateString("en-US", format)} - ${last.toLocaleDateString("en-US", format)}`;
}

function parseLocalDate(value) {
  const [year, month, day] = String(value).split("-").map(Number);
  if (!year || !month || !day) return new Date();
  return new Date(year, month - 1, day);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function todayIsoDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function completedProofDays(bet) {
  return new Set(Object.keys(bet.proofs || {}).map(Number));
}

function calendarCompletedDays(bet) {
  if (isProofBet(bet)) return completedProofDays(bet);
  const loggedDays = (bet.logs || bet.completedDays || []).map(Number);
  if (!loggedDays.length && bet.status === "Completed") {
    return new Set(Array.from({ length: Math.max(1, Number(bet.totalDays) || 1) }, (_, index) => index + 1));
  }
  return new Set(loggedDays);
}

function isProofBet(bet) {
  if (typeof bet.requiresProof === "boolean") return bet.requiresProof;
  return /photo|proof|screenshot|wearable|timestamp/i.test(String(bet.proof));
}

function calendarActionPanel(bet, day, isDone) {
  if (isProofBet(bet)) return proofActionPanel(bet, day, isDone);
  return logActionPanel(bet, day, isDone);
}

function logActionPanel(bet, day, isDone) {
  const dateLabel = habitDateLabel(bet, day);
  return `<div class="proof-action-panel log-action-panel">
    <div>
      <strong>${dateLabel} log</strong>
      <p>${isDone ? "This date is logged." : "Tap to keep a simple progress log for this date."}</p>
    </div>
    <button type="button" data-log-complete="${bet.id}" data-log-day="${day}">${isDone ? "Keep logged" : "Mark logged"}</button>
    ${isDone ? `<button type="button" data-log-discard="${bet.id}" data-log-day="${day}">Remove log</button>` : ""}
    <button type="button" data-proof-close>Close</button>
  </div>`;
}

function proofActionPanel(bet, day, isDone) {
  const proof = bet.proofs?.[day];
  const dateLabel = habitDateLabel(bet, day);
  if (proof) {
    return `<div class="proof-action-panel proof-polaroid-panel">
      <figure class="proof-photo-polaroid">
        <span aria-hidden="true"></span>
        <button type="button" data-proof-view="${bet.id}" data-proof-day="${day}" aria-label="Open full proof image">
          <img src="${escapeHtml(proof.dataUrl)}" alt="Proof for day ${day}" />
        </button>
        <figcaption>${dateLabel} proof</figcaption>
      </figure>
      <div class="proof-polaroid-actions">
        <button type="button" data-proof-keep="${bet.id}" data-proof-day="${day}">Keep it</button>
        <button type="button" data-proof-discard="${bet.id}" data-proof-day="${day}">Discard</button>
      </div>
    </div>`;
  }
  return `<div class="proof-action-panel">
    <div>
      <strong>${dateLabel} proof</strong>
      <p>${escapeHtml(bet.proof)}. ${isDone ? "This date is already verified." : "Upload proof or mark the task complete for this date."}</p>
    </div>
    <label class="proof-upload-button">
      Upload proof
      <input type="file" accept="image/*" data-proof-upload="${bet.id}" data-proof-day="${day}" />
    </label>
    <button type="button" data-proof-complete="${bet.id}" data-proof-day="${day}">${isDone ? "Keep verified" : "Mark complete"}</button>
    <button type="button" data-proof-close>Close</button>
  </div>`;
}

function habitDateLabel(bet, day) {
  const start = parseLocalDate(bet.startDate || todayIsoDate());
  const date = addDays(start, Math.max(0, Number(day) - 1));
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function registerProofDay(betId, day, message = "Proof added", proofData = null) {
  const location = findBetLocation(betId);
  if (!location) return;
  const bet = location.bet;
  const previousDay = bet.day;
  const previousProofCount = playerProgress.photoProofsVerified;
  const previousStreak = playerProgress.currentStreak;
  if (!proofData) {
    bet.completedDays = (bet.completedDays || []).filter((item) => item !== Number(day));
    selectedProofDay = { betId, day: Number(day) };
    saveState();
    renderSpaces();
    openChallenge(betId, ".proof-action-panel");
    toast("Upload proof to verify");
    return;
  }
  const completed = completedProofDays(bet);
  completed.add(Number(day));
  bet.completedDays = [...completed].sort((a, b) => a - b);
  bet.proofs = bet.proofs || {};
  bet.proofs[day] = proofData;
  bet.day = Math.max(bet.day, Number(day));
  playerProgress.currentStreak = Math.max(playerProgress.currentStreak, bet.completedDays.length);
  playerProgress.photoProofsVerified += 1;
  if (!saveState()) {
    delete bet.proofs[day];
    bet.completedDays = bet.completedDays.filter((item) => item !== Number(day));
    bet.day = previousDay;
    playerProgress.photoProofsVerified = previousProofCount;
    playerProgress.currentStreak = previousStreak;
    return;
  }
  selectedProofDay = null;
  renderSpaces();
  openChallenge(betId, ".habit-proof-card");
  if (!checkAchievements()) toast(message);
}

function registerLogDay(betId, day) {
  const location = findBetLocation(betId);
  if (!location) return;
  const bet = location.bet;
  const logs = new Set((bet.logs || bet.completedDays || []).map(Number));
  logs.add(Number(day));
  bet.logs = [...logs].sort((a, b) => a - b);
  bet.completedDays = bet.logs;
  bet.day = Math.max(Number(bet.day) || 0, Number(day));
  playerProgress.currentStreak = Math.max(playerProgress.currentStreak, bet.completedDays.length);
  selectedProofDay = null;
  saveState();
  renderSpaces();
  openChallenge(betId, ".habit-proof-card");
  toast("Date logged");
}

function discardLogDay(betId, day) {
  const location = findBetLocation(betId);
  if (!location) return;
  const bet = location.bet;
  bet.logs = (bet.logs || bet.completedDays || []).filter((item) => Number(item) !== Number(day));
  bet.completedDays = bet.logs;
  if (Number(bet.day) === Number(day)) bet.day = Math.max(0, ...bet.completedDays);
  selectedProofDay = { betId, day: Number(day) };
  saveState();
  renderSpaces();
  openChallenge(betId, ".proof-action-panel");
  toast("Log removed");
}

function discardProofDay(betId, day) {
  const location = findBetLocation(betId);
  if (!location) return;
  const bet = location.bet;
  if (bet.proofs) delete bet.proofs[day];
  bet.completedDays = (bet.completedDays || []).filter((item) => item !== Number(day));
  if (bet.day === Number(day)) bet.day = Math.max(0, ...bet.completedDays);
  selectedProofDay = { betId, day: Number(day) };
  saveState();
  renderSpaces();
  openChallenge(betId, ".proof-action-panel");
  toast("Proof discarded");
}

function readProofFile(file, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const image = new Image();
    image.addEventListener("load", () => {
      const maxSize = 900;
      const ratio = Math.min(1, maxSize / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * ratio));
      const height = Math.max(1, Math.round(image.height * ratio));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, width, height);
      callback({
        dataUrl: canvas.toDataURL("image/jpeg", 0.78),
        name: file.name,
        type: "image/jpeg",
        addedAt: new Date().toISOString(),
      });
    });
    image.addEventListener("error", () => {
      toast("Could not read this image");
    });
    image.src = reader.result;
  });
  reader.readAsDataURL(file);
}

function openFullProof(betId, day) {
  const bet = findBet(betId);
  const proof = bet?.proofs?.[day];
  if (!proof) return;
  const dateLabel = habitDateLabel(bet, day);
  $("#drawerObject").innerHTML = `<div class="full-proof-viewer"><img src="${escapeHtml(proof.dataUrl)}" alt="Full proof for ${dateLabel}" /></div>`;
  $("#drawerCopy").innerHTML = `
    <div class="full-proof-copy">
      <h2 id="drawerTitle">${dateLabel} proof</h2>
      <p>${escapeHtml(proof.name || "Uploaded proof")}</p>
    </div>
  `;
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
}

function challengeTypePanel(bet) {
  if (bet.type === "Habit") return "";
  const progress = betProgressPercent(bet);
  const panels = {
    Habit: {
      title: "Habit Track",
      body: `<div class="habit-days">${Array.from({ length: Math.min(bet.totalDays, 7) }, (_, index) => `<span class="${index < bet.day ? "done" : ""}">${index + 1}</span>`).join("")}</div>`,
    },
    Race: {
      title: "Race Board",
      body: `<div class="race-board">${bet.people.slice(0, 4).map((person, index) => `<p><span>${escapeHtml(person)}</span><strong style="width:${Math.max(22, progress - index * 9)}%"></strong></p>`).join("")}</div>`,
    },
    Prediction: {
      title: "Prediction",
      body: `<div class="prediction-board"><button>Yes</button><button>No</button><p>Votes stay hidden until the reveal.</p></div>`,
    },
    Number: {
      title: "Number Guess",
      body: `<div class="number-board"><span>?</span><span>?</span><span>?</span><p>Closest answer wins when the result is added.</p></div>`,
    },
    Jar: {
      title: "Jar Log",
      body: `<div class="jar-board"><span>🫙</span><p>Every violation adds to the shared stake jar.</p></div>`,
    },
    Elimination: {
      title: "Elimination",
      body: `<div class="elimination-board">${bet.people.map((person, index) => `<span class="${index > 1 && bet.status === "Completed" ? "out" : ""}">${escapeHtml(person)}</span>`).join("")}</div>`,
    },
  };
  const panel = panels[bet.type] || panels.Habit;
  return `<section class="challenge-type-card ${bet.type.toLowerCase()}" aria-label="${panel.title}">
    <div><span>${escapeHtml(bet.icon || iconForType(bet.type))}</span><h3>${panel.title}</h3></div>
    ${panel.body}
  </section>`;
}

function handleChallengeAction(id, action) {
  const location = findBetLocation(id);
  if (!location) return;
  const { section, index, bet } = location;

  if (action === "accept" || action === "start") {
    section.items.splice(index, 1);
    bet.status = "In Progress";
    bet.day = Math.max(1, bet.day);
    betSections.find((item) => item.id === "progress").items.unshift(bet);
    saveState();
    renderSpaces();
    showView("spaces");
    jumpToBetsSection("progress");
    toast(action === "accept" ? "Bet accepted" : "Bet started");
    return;
  }

  if (action === "progress") {
    bet.day = Math.min(bet.totalDays, bet.day + 1);
    playerProgress.currentStreak = Math.max(playerProgress.currentStreak, bet.day);
    if (bet.proof.toLowerCase().includes("photo")) playerProgress.photoProofsVerified += 1;
    if (bet.day >= bet.totalDays) {
      section.items.splice(index, 1);
      bet.status = "Completed";
      bet.day = bet.totalDays;
      betSections.find((item) => item.id === "history").items.unshift(bet);
      applyCompletedBetProgress(bet);
      saveState();
      renderSpaces();
      renderProfileStats();
      renderAchievements();
      showView("spaces");
      jumpToBetsSection("history");
      if (!checkAchievements()) celebration("Bet completed");
      return;
    }
    saveState();
    openChallenge(id);
    toast(`Day ${bet.day} saved`);
    return;
  }

  toast("Recap opened");
}

function applyCompletedBetProgress(bet) {
  playerProgress.betsWon += 1;
  playerProgress.completedPacts += 1;
  playerProgress.bestStreak = Math.max(playerProgress.bestStreak, playerProgress.currentStreak, bet.totalDays);
  if (bet.type === "Prediction") playerProgress.predictionsWon += 1;
  if (bet.type === "Prediction") playerProgress.totalPredictions += 1;
  if (bet.type === "Number") playerProgress.exactNumberGuesses += 1;
  if (bet.type === "Race") playerProgress.raceWins += 1;
  if (bet.type === "Elimination") playerProgress.eliminationWins += 1;
  if (bet.people.length > 2) playerProgress.groupPactsCompleted += 1;
  if (bet.proof.toLowerCase().includes("proof")) playerProgress.proofPactsCompleted += 1;
}

function jumpToBetsSection(sectionId) {
  requestAnimationFrame(() => {
    const target = $(`#bets-${sectionId}`);
    const scroller = $("#spaceGrid");
    if (!target || !scroller) return;
    $$("[data-bets-jump]").forEach((item) => item.classList.toggle("active", item.dataset.betsJump === sectionId));
    betsJumpLock = true;
    window.clearTimeout(betsJumpTimer);
    betsJumpTimer = window.setTimeout(() => {
      betsJumpLock = false;
    }, 700);
    scroller.scrollTo({ top: Math.max(0, betsSectionOffset(target, scroller) - 4), behavior: "smooth" });
  });
}

function renderActivity() {
  $("#activityList").innerHTML = activity.map(([type, title, text]) => `
    <article class="activity-item">
      <span>${type}</span>
      <div><strong>${title}</strong><p>${text}</p></div>
      <button data-handle>Handle</button>
    </article>
  `).join("");
  $$("[data-handle]").forEach((button) => button.addEventListener("click", () => {
    button.closest(".activity-item").classList.add("handled");
    playerProgress.photoProofsVerified += 1;
    saveState();
    if (!checkAchievements()) toast("Handled");
  }));
}

function openPact(id) {
  const pact = pacts.find((item) => item.id === id);
  $("#drawerObject").innerHTML = objectArt(pact, true);
  $("#drawerCopy").innerHTML = `
    <p class="kicker">${pact.context} - ${pact.room}</p>
    <h2 id="drawerTitle">${pact.title}</h2>
    <p>${pact.mood}</p>
    <div class="detail-grid">
      <span>Tracking: ${pact.object}</span>
      <span>Proof: honor or photo</span>
      <span>Consequence: configurable</span>
    </div>
    <div class="reaction-row">
      ${reactions.map((reaction) => `<button data-reaction="${reaction}">${reaction}</button>`).join("")}
    </div>
    <div class="sticker-shelf" id="stickerShelf"></div>
    <div class="drawer-actions">
      <button data-action="check">Check in</button>
      <button data-action="proof">Submit proof</button>
      <button data-action="reveal">Reveal result</button>
    </div>
  `;
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
  $$("[data-reaction]").forEach((button) => button.addEventListener("click", () => {
    $("#stickerShelf").insertAdjacentHTML("beforeend", `<span>${button.dataset.reaction}</span>`);
  }));
  $$("[data-action]").forEach((button) => button.addEventListener("click", () => {
    const unlocked = applyPactProgress(pact, button.dataset.action);
    saveState();
    if (!unlocked) toast(`${button.textContent} added`);
  }));
}

function closeDrawer() {
  $("#drawer").classList.remove("open");
  $("#drawer").setAttribute("aria-hidden", "true");
}

function inferObject(value) {
  const text = value.toLowerCase();
  if (text.includes("rs") || text.includes("every time") || text.includes("jar")) return ["Jar", "A physical shared jar that fills as people add violations."];
  if (text.includes("who") && (text.includes("most") || text.includes("logs") || text.includes("wins"))) return ["Race", "Participants move forward as progress is logged."];
  if (text.includes("who") && (text.includes("still") || text.includes("cancel"))) return ["Elimination", "People begin inside the Pact and visually drop out as events happen."];
  if (text.includes("how") || text.includes("late") || text.includes("many")) return ["Number prediction", "Guesses stay face down until the actual result lands."];
  if (text.includes("week") || text.includes("day") || text.includes("sleep") || text.includes("delivery")) return ["Habit calendar", "Daily tiles with honor check-ins, optional proof and a visible streak."];
  return ["Yes-or-no prediction", "Two sides, hidden percentages and a reveal when voting closes."];
}

function previewFromIdea() {
  const [title, description] = inferObject($("#ideaInput").value);
  $("#recommendTitle").textContent = title;
  $("#recommendText").textContent = description;
  const previewPact = {
    object: title.includes("Jar") ? "jar" : title.includes("Race") ? "race" : title.includes("Elimination") ? "elimination" : title.includes("Number") ? "number" : title.includes("Yes") ? "prediction" : "calendar",
  };
  $("#recommendPreview").innerHTML = objectArt(previewPact, true);
}

function syncCreateDateDefaults() {
  const startInput = $("#betStartInput");
  const durationInput = $("#betDurationInput");
  if (startInput && !startInput.value) startInput.value = todayIsoDate();
  if (durationInput) {
    const duration = estimateDuration($("#ideaInput").value);
    durationInput.value = [5, 7, 14, 30].includes(duration) ? String(duration) : "5";
  }
}

function toast(message) {
  const toastEl = $("#toast");
  toastEl.textContent = message;
  toastEl.classList.remove("celebration");
  toastEl.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => toastEl.classList.remove("show"), 1500);
}

function celebration(message) {
  const toastEl = $("#toast");
  toastEl.textContent = message;
  toastEl.classList.add("show", "celebration");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => toastEl.classList.remove("show", "celebration"), 2600);
}

function renderAchievements() {
  $("#achievementRow").innerHTML = achievements.map((achievement) => {
    const unlocked = unlockedAchievementIds.has(achievement.id);
    return `<button class="achievement-badge ${unlocked ? "" : "locked"}" type="button" data-achievement="${achievement.id}" aria-label="${achievement.name}" style="--badge-bg:${achievement.tone}">
      <span class="achievement-icon">${unlocked ? achievement.emoji : "🔒"}</span>
      <strong>${unlocked ? achievement.name : "Locked"}</strong>
      <span>${unlocked ? achievement.title : "Tap for goal"}</span>
    </button>`;
  }).join("");
}

function openAchievement(id) {
  const achievement = achievements.find((item) => item.id === id);
  if (!achievement) return;
  const unlocked = unlockedAchievementIds.has(id);
  $("#drawerObject").innerHTML = "";
  $("#drawerCopy").innerHTML = `
    <div class="achievement-detail ${unlocked ? "" : "locked"}">
      <span class="achievement-icon" style="--badge-bg:${achievement.tone}">${unlocked ? achievement.emoji : "🔒"}</span>
      <h2 id="drawerTitle">${achievement.name}</h2>
      <strong>${unlocked ? achievement.title : "Locked"}</strong>
      <p>${achievement.condition}</p>
    </div>
  `;
  $("#drawer").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
}

function openSettings() {
  renderSettingsHome();
  showView("settings");
}

function renderSettingsHome() {
  $("#settingsScreen").innerHTML = `
    <section class="settings-home" aria-label="Settings">
      <article class="settings-profile-card">
        <div class="settings-avatar">
          <img src="${appState.profile.photo}" alt="" />
          <span>${initialsFromName(appState.profile.name)}</span>
        </div>
        <div>
          <strong>${appState.profile.name}</strong>
          <p>${appState.account.email}</p>
        </div>
      </article>

      <p class="settings-group-title">Account</p>
      <div class="settings-group-card">
        ${settingsHomeRow("👤", "Edit Profile", true)}
        ${settingsHomeToggle("🔔", "Notifications", Object.values(appState.notifications).some(Boolean))}
        ${settingsHomeRow("🛡️", "Proof Settings", true, "Privacy")}
      </div>

      <p class="settings-group-title">Sharing</p>
      <div class="settings-group-card">
        ${settingsHomeRow("🔗", "Invite via Link", true)}
      </div>

      <p class="settings-group-title">Support</p>
      <div class="settings-group-card">
        ${settingsHomeRow("❔", "Help", true)}
        ${settingsHomeRow("⚙️", "Account", true)}
      </div>
    </section>
  `;
}

function settingsHomeRow(icon, title, arrow, visibleTitle = title) {
  return `<button class="settings-home-row" type="button" data-setting="${title}">
    <span class="settings-row-icon" aria-hidden="true">${icon}</span>
    <strong>${visibleTitle}</strong>
    ${arrow ? `<span class="settings-chevron" aria-hidden="true">›</span>` : ""}
  </button>`;
}

function settingsHomeToggle(icon, title, checked) {
  return `<div class="settings-home-row">
    <span class="settings-row-icon" aria-hidden="true">${icon}</span>
    <button type="button" data-setting="${title}"><strong>${title}</strong></button>
    <label class="settings-switch" aria-label="${title}">
      <input type="checkbox" data-master-notifications ${checked ? "checked" : ""} />
      <span></span>
    </label>
  </div>`;
}

function settingToggle(label, checked, key) {
  return `<label class="setting-toggle"><span>${label}</span><input type="checkbox" data-toggle-setting="${key}" data-toggle-label="${label}" ${checked ? "checked" : ""} /></label>`;
}

function settingChoice(label, options, selected, key) {
  return `<div class="setting-choice" data-choice-setting="${key}"><span>${label}</span><div>${options.map((option) => `<button class="${option === selected ? "active" : ""}" type="button" data-choice-value="${option}">${option}</button>`).join("")}</div></div>`;
}

function openSettingsPage(title) {
  const page = settingsPages[title];
  if (!page) return;
  $("#settingsScreen").innerHTML = `
    <section class="settings-panel settings-detail-panel settings-full-detail" aria-label="${title}">
      <h2 id="drawerTitle">${title}</h2>
      <p>${page.note}</p>
      <div class="settings-detail-content">${page.render()}</div>
    </section>
  `;
}

function initialsFromName(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("").toUpperCase() || "EA";
}

function applyProfile() {
  $$(".profile-front h2, .back-share-card h2").forEach((heading) => {
    heading.textContent = appState.profile.name;
  });
  $$(".settings-profile-card strong").forEach((heading) => {
    heading.textContent = appState.profile.name;
  });
  $$(".settings-profile-card p").forEach((text) => {
    text.textContent = appState.account.email;
  });
  $$(".big-avatar img").forEach((img) => {
    img.src = appState.profile.photo;
  });
  $$(".settings-avatar img").forEach((img) => {
    img.src = appState.profile.photo;
  });
  $$(".big-avatar span").forEach((span) => {
    span.textContent = initialsFromName(appState.profile.name);
  });
  $$(".settings-avatar span").forEach((span) => {
    span.textContent = initialsFromName(appState.profile.name);
  });
}

function saveProfileFromSettings() {
  const nameInput = $("#profileNameInput");
  if (nameInput?.value.trim()) appState.profile.name = nameInput.value.trim();
  applyProfile();
  renderProfileStats();
  saveState();
  toast("Profile saved");
}

function updateProfilePhoto(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    appState.profile.photo = reader.result;
    applyProfile();
    saveState();
    toast("Profile photo updated");
  });
  reader.readAsDataURL(file);
}

function handleToggle(input) {
  const key = input.dataset.toggleSetting;
  const label = input.dataset.toggleLabel;
  if (key === "notification") appState.notifications[label] = input.checked;
  if (key === "proof-hide") appState.proof.hideAfterVerification = input.checked;
  if (key === "proof-delete") appState.proof.deleteAfter30Days = input.checked;
  saveState();
  toast(`${label} ${input.checked ? "on" : "off"}`);
}

function handleChoice(button) {
  const group = button.closest("[data-choice-setting]");
  const key = group.dataset.choiceSetting;
  const value = button.dataset.choiceValue;
  button.parentElement.querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
  if (key === "proof-visibility") appState.proof.visibility = value;
  if (key === "login-method") appState.account.loginMethod = value;
  saveState();
  toast(`${value} selected`);
}

function saveAccountFromSettings() {
  appState.account.email = $("#accountEmailInput")?.value.trim() || appState.account.email;
  appState.account.phone = $("#accountPhoneInput")?.value.trim() || "";
  applyProfile();
  saveState();
  toast("Account saved");
}

function checkAchievements() {
  const newlyUnlocked = achievements.filter((achievement) => achievement.isUnlocked(playerProgress) && !unlockedAchievementIds.has(achievement.id));
  newlyUnlocked.forEach((achievement) => unlockedAchievementIds.add(achievement.id));
  if (!newlyUnlocked.length) return false;
  renderAchievements();
  saveState();
  celebration(`🎉 Badge unlocked: ${newlyUnlocked[0].emoji} ${newlyUnlocked[0].name}`);
  return true;
}

function applyPactProgress(pact, action) {
  if (action === "check") {
    playerProgress.currentStreak += 1;
    playerProgress.finalHourCheckIns += pact.id === "sleep" ? 1 : 0;
  }
  if (action === "proof") playerProgress.photoProofsVerified += 1;
  if (action === "reveal") {
    playerProgress.completedPacts += 1;
    if (pact.object === "prediction") playerProgress.predictionsWon += 1;
    if (pact.object === "number") playerProgress.exactNumberGuesses += 1;
    if (pact.object === "race") playerProgress.raceWins += 1;
    if (pact.object === "elimination") playerProgress.eliminationWins += 1;
    if (pact.context === "Group") playerProgress.groupPactsCompleted += 1;
    if (pact.object === "calendar") playerProgress.proofPactsCompleted += 1;
  }
  return checkAchievements();
}

function syncDerivedStats() {
  const statById = Object.fromEntries(statLibrary.map((stat) => [stat.id, stat]));
  if (statById.won) statById.won.value = String(playerProgress.betsWon);
  if (statById.lost) statById.lost.value = String(playerProgress.betsLost);
  if (statById.streak) statById.streak.value = `${playerProgress.bestStreak}d`;
  if (statById.accuracy) {
    const total = Math.max(1, playerProgress.betsWon + playerProgress.betsLost);
    statById.accuracy.value = `${Math.round((playerProgress.betsWon / total) * 100)}%`;
  }
  profileStats = profileStats.map((stat) => ({ ...stat, value: statById[stat.id]?.value ?? stat.value }));
}

function saveState() {
  syncDerivedStats();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      appState,
      betSections,
      playerProgress,
      profileStats,
      unlockedAchievementIds: [...unlockedAchievementIds],
    }));
    return true;
  } catch {
    toast("Photo is too large to save");
    return false;
  }
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) {
      refreshSampleStakes();
      ensureBetDates();
      syncDerivedStats();
      return;
    }
    if (saved.appState?.profile) Object.assign(appState.profile, saved.appState.profile);
    if (saved.appState?.notifications) Object.assign(appState.notifications, saved.appState.notifications);
    if (saved.appState?.proof) Object.assign(appState.proof, saved.appState.proof);
    if (saved.appState?.account) Object.assign(appState.account, saved.appState.account);
    if (saved.playerProgress) Object.assign(playerProgress, saved.playerProgress);
    if (Array.isArray(saved.betSections)) betSections.splice(0, betSections.length, ...saved.betSections);
    refreshSampleStakes();
    ensureBetDates();
    if (appState.proofPreviewVersion !== "neutral-polaroid") {
      clearProofUploads();
      appState.proofPreviewVersion = "neutral-polaroid";
    }
    if (Array.isArray(saved.profileStats)) profileStats = saved.profileStats.map((stat) => ({ ...stat }));
    unlockedAchievementIds = new Set(Array.isArray(saved.unlockedAchievementIds) ? saved.unlockedAchievementIds : achievements.filter((item) => item.isUnlocked(playerProgress)).map((item) => item.id));
    syncDerivedStats();
    saveState();
  } catch {
    syncDerivedStats();
  }
}

function refreshSampleStakes() {
  const sampleStakes = {
    runs: "Breakfast",
    deck: "Coffee",
    delivery: "Dinner",
    tickets: "Movie ticket",
  };
  const sampleProofModes = {
    sleep: true,
    runs: true,
    buzzword: false,
    deck: false,
    dinner: false,
    delivery: false,
    tickets: false,
  };
  const sampleCopy = {
    deck: {
      title: "Will Friday deck ship?",
      predictionKind: "yesNo",
      reward: "Correct side wins coffee.",
    },
  };
  betSections.forEach((section) => {
    section.items.forEach((bet) => {
      if (sampleStakes[bet.id]) bet.stake = sampleStakes[bet.id];
      if (bet.id in sampleProofModes) bet.requiresProof = sampleProofModes[bet.id];
      if (sampleCopy[bet.id]) Object.assign(bet, sampleCopy[bet.id]);
    });
  });
}

function ensureBetDates() {
  const sampleDates = {
    sleep: "2026-09-04",
    runs: "2026-09-01",
    buzzword: "2026-09-03",
    deck: "2026-09-09",
    dinner: "2026-09-09",
    delivery: "2026-09-01",
    tickets: "2026-08-30",
  };
  const sampleDurations = {
    sleep: 5,
    delivery: 7,
  };
  betSections.forEach((section) => {
    section.items.forEach((bet) => {
      if (sampleDates[bet.id]) bet.startDate = sampleDates[bet.id];
      if (sampleDurations[bet.id]) bet.totalDays = sampleDurations[bet.id];
      if (!bet.startDate) bet.startDate = todayIsoDate();
    });
  });
}

function clearProofUploads() {
  betSections.forEach((section) => {
    section.items.forEach((bet) => {
      if (bet.proofs) bet.proofs = {};
      if (bet.completedDays) bet.completedDays = [];
    });
  });
}

function createBetFromIdea() {
  const input = $("#ideaInput");
  const title = input.value.trim();
  if (!title) {
    toast("Add a bet idea first");
    return;
  }
  const [objectTitle] = inferObject(title);
  const activeContext = $(".create-options button.active")?.dataset.context || "Personal";
  const type = objectTitle.replace("Habit calendar", "Habit").replace("Number prediction", "Number").replace("Yes-or-no prediction", "Prediction");
  const totalDays = Number($("#betDurationInput")?.value) || estimateDuration(title);
  const startDate = $("#betStartInput")?.value || todayIsoDate();
  const requiresProof = $("#betProofModeInput")?.value === "proof";
  const predictionKind = type === "Prediction" && /\b(yes|no|will|won't|would|should|can|is|are|did|does)\b/i.test(title) ? "yesNo" : "open";
  const people = activeContext === "Personal"
    ? [initialsFromName(appState.profile.name)]
    : activeContext === "Couple"
      ? [initialsFromName(appState.profile.name), "AS"]
      : [initialsFromName(appState.profile.name), "NA", "MR", "JS"];
  const newBet = {
    id: `custom-${Date.now()}`,
    icon: iconForType(type),
    type,
    predictionKind,
    title,
    day: 0,
    totalDays,
    startDate,
    stake: inferStake(title),
    status: "Draft",
    tone: toneForType(type),
    people,
    proof: requiresProof ? "Photo proof required" : "Normal progress log",
    requiresProof,
    reward: activeContext === "Personal" ? "Personal promise tracked." : "Group result unlocked when finished.",
  };
  betSections.find((section) => section.id === "pending").items.unshift(newBet);
  saveState();
  renderSpaces();
  showView("spaces");
  jumpToBetsSection("pending");
  toast("Draft added to Pending");
}

function estimateDuration(text) {
  const lower = text.toLowerCase();
  if (lower.includes("month")) return 30;
  if (lower.includes("week")) return 7;
  if (lower.includes("today") || lower.includes("tonight")) return 1;
  const match = lower.match(/(\d+)\s*(day|days|night|nights)/);
  return match ? Number(match[1]) : 5;
}

function inferStake(text) {
  const lower = text.toLowerCase();
  const money = text.match(/([$₹€£]\s?\d+|rs\.?\s?\d+|inr\s?\d+|\d+\s?(rs|rupees|dollars|bucks))/i);
  if (money) return money[0].replace(/\s+/g, " ").trim();
  if (lower.includes("breakfast")) return "Breakfast";
  if (lower.includes("lunch")) return "Lunch";
  if (lower.includes("dinner")) return "Dinner";
  if (lower.includes("coffee")) return "Coffee";
  if (lower.includes("movie")) return "Movie ticket";
  if (lower.includes("dessert") || lower.includes("cake")) return "Dessert";
  return "For fun";
}

function iconForType(type) {
  return {
    Habit: "🔥",
    Race: "🏃",
    Elimination: "🏆",
    Number: "⏱️",
    Jar: "🫙",
    Prediction: "🔮",
  }[type] || "✨";
}

function toneForType(type) {
  return {
    Habit: "blue",
    Race: "green",
    Elimination: "yellow",
    Number: "yellow",
    Jar: "pink",
    Prediction: "lavender",
  }[type] || "blue";
}

function renderProfileStats() {
  syncDerivedStats();
  $("#backStats").className = `back-stats ${profileStats.length > 4 ? "compact-stats" : ""}`;
  $("#backStats").innerHTML = profileStats.map((stat, index) => `
    <article class="${stat.badge ? "badge-stat" : ""}" data-stat-index="${index}">
      <button class="stat-remove" type="button" data-remove-stat="${index}" aria-label="Remove ${stat.label}">-</button>
      <span>${stat.label}</span>
      <strong style="color:${statTextColor(stat.color)}">${stat.value}</strong>
    </article>
  `).join("") + (profileEditMode && profileStats.length < 4 ? `<button class="add-stat-tile" id="addStatTile" type="button" aria-label="Add stat">+</button>` : "");
  $("#profileCard").classList.toggle("editing", profileEditMode);
  if (dragIndex !== null) {
    $(`[data-stat-index="${dragIndex}"]`)?.classList.add("dragging-stat");
  }
}

function statTextColor(color) {
  return color === "#030303" ? "var(--ink)" : color;
}

function openStatPicker(mode, index = null) {
  pendingStatTarget = { mode, index };
  const usedIds = new Set(profileStats.map((stat) => stat.id));
  const choices = statLibrary.filter((stat) => !usedIds.has(stat.id));
  $("#statOptions").innerHTML = choices.length
    ? choices.map((stat) => `<button type="button" data-pick-stat="${stat.id}"><strong>${stat.value}</strong><span>${stat.label}</span></button>`).join("")
    : `<button type="button" disabled>Everything available is already on this card</button>`;
  $("#statSheet").classList.add("open");
  $("#statSheet").setAttribute("aria-hidden", "false");
}

function closeStatPicker() {
  $("#statSheet").classList.remove("open");
  $("#statSheet").setAttribute("aria-hidden", "true");
  pendingStatTarget = null;
}

function removeStatAt(index) {
  if (profileStats.length <= 2) {
    toast("Two boxes minimum");
    return;
  }
  profileStats.splice(index, 1);
  renderProfileStats();
  saveState();
}

function onStatPointerMove(event) {
  if (dragIndex === null || (activePointerId !== null && event.pointerId !== activePointerId)) return;
  event.preventDefault();
  const overIndex = getNearestStatIndex(event.clientX, event.clientY);
  if (overIndex === dragIndex) return;
  [profileStats[dragIndex], profileStats[overIndex]] = [profileStats[overIndex], profileStats[dragIndex]];
  dragIndex = overIndex;
  suppressStatClick = true;
  renderProfileStats();
  saveState();
}

function getNearestStatIndex(x, y) {
  let nearestIndex = dragIndex;
  let nearestDistance = Infinity;
  $$("[data-stat-index]").forEach((card) => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(centerX - x, centerY - y);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestIndex = Number(card.dataset.statIndex);
    }
  });
  return nearestIndex;
}

function endStatDrag() {
  clearTimeout(longPressTimer);
  dragIndex = null;
  activePointerId = null;
  window.removeEventListener("pointermove", onStatPointerMove);
  $$(".dragging-stat").forEach((card) => card.classList.remove("dragging-stat"));
  setTimeout(() => {
    suppressStatClick = false;
  }, 80);
}

function startPotentialStatDrag(event) {
  if (!profileEditMode) return;
  if (event.target.closest("[data-remove-stat], #addStatTile")) return;
  const statCard = event.target.closest("[data-stat-index]");
  if (!statCard) return;
  activePointerId = event.pointerId;
  const index = Number(statCard.dataset.statIndex);
  clearTimeout(longPressTimer);
  longPressTimer = setTimeout(() => {
    dragIndex = index;
    suppressStatClick = true;
    statCard.classList.add("dragging-stat");
    window.addEventListener("pointermove", onStatPointerMove);
    window.addEventListener("pointerup", endStatDrag, { once: true });
    window.addEventListener("pointercancel", endStatDrag, { once: true });
  }, 280);
}

function downloadProfileBack() {
  syncDerivedStats();
  const canvas = document.createElement("canvas");
  const scale = 2;
  const rows = Math.ceil(profileStats.length / 2);
  const width = 760;
  const height = 214 + rows * 214;
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);

  ctx.fillStyle = "#f7f7f7";
  roundRect(ctx, 0, 0, width, height, 58);
  ctx.fill();

  ctx.fillStyle = "#dfe6ff";
  roundRect(ctx, -30, 0, 300, 250, 70);
  ctx.fill();
  ctx.fillStyle = "#f8dff0";
  roundRect(ctx, 490, height - 230, 300, 250, 70);
  ctx.fill();

  ctx.fillStyle = "#030303";
  drawSingleLineText(ctx, appState.profile.name, 56, 104, 640, 56, 34);

  profileStats.forEach(({ label, value, color, badge }, index) => {
    const x = 56 + (index % 2) * 330;
    const y = 156 + Math.floor(index / 2) * 214;
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    roundRect(ctx, x, y, 290, 170, 44);
    ctx.fill();
    ctx.fillStyle = "#9a9a9a";
    ctx.font = "900 22px 'Nunito Sans', system-ui, sans-serif";
    ctx.fillText(label.toUpperCase(), x + 34, y + 52);
    ctx.fillStyle = color;
    if (badge) {
      drawWrappedText(ctx, value, x + 34, y + 108, 220, 32, 30);
    } else {
      drawSingleLineText(ctx, value, x + 34, y + 114, 220, 58, 34);
    }
  });

  ctx.fillStyle = "#9a9a9a";
  ctx.font = "900 24px 'Nunito Sans', system-ui, sans-serif";
  ctx.fillText("Pact", 56, height - 44);

  const link = document.createElement("a");
  link.download = "pact-profile-card.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
  toast("Back card downloaded");
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  words.forEach((word, index) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = testLine;
    }
    if (index === words.length - 1) ctx.fillText(line, x, y);
  });
}

function drawWrappedText(ctx, text, x, y, maxWidth, size, lineHeight) {
  ctx.font = `900 ${size}px 'Nunito Sans', system-ui, sans-serif`;
  const words = text.split(" ");
  let line = "";
  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = testLine;
    }
  });
  if (line) ctx.fillText(line, x, y);
}

function drawSingleLineText(ctx, text, x, y, maxWidth, startSize, minSize) {
  let size = startSize;
  do {
    ctx.font = `900 ${size}px 'Nunito Sans', system-ui, sans-serif`;
    size -= 2;
  } while (ctx.measureText(text).width > maxWidth && size >= minSize);
  ctx.fillText(text, x, y);
}

function scrollRoot() {
  const main = $("main");
  if (!main) return null;
  return getComputedStyle(main).overflowY === "auto" ? main : null;
}

function currentScrollTop() {
  const root = scrollRoot();
  return root ? root.scrollTop : window.scrollY;
}

function scrollRootTo(top, behavior = "smooth") {
  const root = scrollRoot();
  if (root) root.scrollTo({ top, behavior });
  else window.scrollTo({ top, behavior });
}

function scrollProgress() {
  const root = scrollRoot();
  const max = root ? root.scrollHeight - root.clientHeight : document.documentElement.scrollHeight - window.innerHeight;
  return Math.min(1, Math.max(0, currentScrollTop() / Math.max(1, max)));
}

function showView(view, options = {}) {
  $$(".view").forEach((section) => section.classList.toggle("active", section.id === view));
  $$("[data-view]").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  document.body.classList.toggle("settings-mode", view === "settings");
  document.body.classList.toggle("bets-mode", view === "spaces");
  document.body.dataset.scene = view;
  if (view !== "challenge") activeChallengeId = null;
  if (options.resetScroll !== false) scrollRootTo(0);
  rememberUiState();
}

function initDepthScene() {
  const canvas = document.querySelector("#pact3d");
  if (!canvas || !window.THREE) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  if ("outputColorSpace" in renderer && THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
  else if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  const world = new THREE.Group();
  scene.add(world);
  scene.add(new THREE.HemisphereLight(0xdfe6ff, 0x1a1408, 0.42));
  scene.add(new THREE.AmbientLight(0xffffff, 0.18));
  const keyLight = new THREE.DirectionalLight(0xfff1dc, 0.7);
  keyLight.position.set(-6, 7, 9);
  scene.add(keyLight);
  const warmLight = new THREE.PointLight(0xffc98a, 0.75, 40, 1);
  warmLight.position.set(-5, 3.5, 6);
  scene.add(warmLight);
  const coolLight = new THREE.PointLight(0x5d7cff, 0.65, 36, 1);
  coolLight.position.set(3, -3, 5);
  scene.add(coolLight);

  const physical = new THREE.Group();
  world.add(physical);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xe6edff,
    transparent: true,
    opacity: 0.34,
    roughness: 0.12,
    metalness: 0.05,
    transmission: 0.2,
    thickness: 0.6,
  });
  const coinMaterial = new THREE.MeshStandardMaterial({ color: 0xf5b52a, roughness: 0.3, metalness: 0.75 });
  const inkMaterial = new THREE.MeshStandardMaterial({ color: 0x151a26, roughness: 0.5, metalness: 0.15 });
  const blueMaterial = new THREE.MeshStandardMaterial({ color: 0x3f68ff, roughness: 0.32, metalness: 0.15 });
  const paperMaterial = new THREE.MeshStandardMaterial({ color: 0xf6f1e6, roughness: 0.85 });

  // Stake jar with coins: bottom-left of the stage.
  const jar = new THREE.Group();
  jar.position.set(-3.3, -1.7, -0.8);
  jar.rotation.z = 0.06;
  const jarBody = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.2, 2.3, 42, 1, true), glassMaterial);
  const jarBase = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.18, 0.08, 42), glassMaterial);
  jarBase.position.y = -1.15;
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.88, 0.26, 32), inkMaterial);
  lid.position.y = 1.26;
  jar.add(jarBody, jarBase, lid);
  for (let index = 0; index < 13; index += 1) {
    const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.07, 24), coinMaterial);
    const angle = index * 2.33;
    const radius = 0.16 + (index % 4) * 0.2;
    coin.position.set(Math.cos(angle) * radius, -0.86 + (index % 3) * 0.19, Math.sin(angle) * radius);
    coin.rotation.set(Math.PI / 2.2, index * 0.65, index * 0.18);
    jar.add(coin);
  }
  physical.add(jar);

  // Proof polaroid with a stamp: mid-left, closest to the phone.
  const proof = new THREE.Group();
  proof.position.set(-1.35, 1.35, -1.4);
  proof.rotation.set(-0.12, -0.3, 0.1);
  const photo = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.45, 0.1), paperMaterial);
  const photoFrame = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.5, 0.12), new THREE.MeshStandardMaterial({ color: 0x4a5f9e, roughness: 0.7 }));
  photoFrame.position.set(0, 0.28, 0.06);
  const photoMoon = new THREE.Mesh(new THREE.CircleGeometry(0.26, 32), new THREE.MeshStandardMaterial({ color: 0xffe9b8, roughness: 0.5, emissive: 0xffd27a, emissiveIntensity: 0.35 }));
  photoMoon.position.set(0.45, 0.62, 0.125);
  const proofTape = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 0.06), new THREE.MeshStandardMaterial({ color: 0xffc9dc, roughness: 0.5, transparent: true, opacity: 0.9 }));
  proofTape.position.set(0.05, 1.18, 0.1);
  proofTape.rotation.z = 0.12;
  const stamp = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.04, 32), new THREE.MeshStandardMaterial({ color: 0xffb800, roughness: 0.55 }));
  stamp.rotation.x = Math.PI / 2;
  stamp.position.set(0.6, -0.85, 0.09);
  proof.add(photo, photoFrame, photoMoon, proofTape, stamp);
  physical.add(proof);

  // Pin board: top-left, furthest back.
  const board = new THREE.Group();
  board.position.set(-3.7, 2.5, -3.6);
  board.rotation.set(0.14, 0.38, -0.05);
  const boardBody = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.35, 0.24), new THREE.MeshStandardMaterial({ color: 0xb87149, roughness: 0.8 }));
  board.add(boardBody);
  [
    [-0.95, 0.42, 0xffe89a], [0.75, 0.35, 0xc8eef3], [-0.54, -0.52, 0xffd0df], [1.05, -0.46, 0xdbe6ff],
  ].forEach(([x, y, color], index) => {
    const note = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.64, 0.12), new THREE.MeshStandardMaterial({ color, roughness: 0.7 }));
    note.position.set(x, y, 0.17);
    note.rotation.z = (index - 1.5) * 0.08;
    const pin = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 20), new THREE.MeshStandardMaterial({ color: 0xffcf73, metalness: 0.25, roughness: 0.38 }));
    pin.position.set(x, y + 0.23, 0.29);
    board.add(note, pin);
  });
  physical.add(board);

  // Prediction ring: lower-middle, half tucked behind the phone.
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.12, 18, 56), blueMaterial);
  ring.position.set(-1, -2.5, -2.8);
  ring.rotation.x = 0.8;
  physical.add(ring);

  // A few loose coins for depth.
  const looseCoins = new THREE.Group();
  [[-0.4, -0.6, -0.4], [-2.2, 0.15, -1.1], [-0.2, 2.7, -3]].forEach(([x, y, z], index) => {
    const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.06, 24), coinMaterial);
    coin.position.set(x, y, z);
    coin.rotation.set(1.1 + index * 0.3, index * 0.7, 0.4);
    looseCoins.add(coin);
  });
  physical.add(looseCoins);

  const pointer = { x: 0, y: 0 };
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  let needsFrame = true;
  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    needsFrame = true;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  // The stage is fully covered by the app shell below 500px, so skip work there.
  function shouldAnimate() {
    return !document.hidden && window.innerWidth >= 500 && !reducedMotion.matches;
  }

  function render(time) {
    requestAnimationFrame(render);
    if (!shouldAnimate() && !needsFrame) return;
    needsFrame = false;
    const scroll = scrollProgress();
    const sceneName = document.body.dataset.scene || "home";
    const challengeBoost = sceneName === "challenge" ? 1 : sceneName === "spaces" ? 0.55 : 0;
    world.rotation.y += (pointer.x * 0.14 - world.rotation.y) * 0.025;
    world.rotation.x += (-pointer.y * 0.08 - world.rotation.x) * 0.025;
    physical.position.y = Math.sin(time * 0.0006) * 0.12 - scroll * 1.35;
    jar.rotation.y = time * 0.0002 + scroll * 1.1;
    jar.rotation.z = 0.06 + Math.sin(time * 0.0007) * 0.06;
    proof.rotation.z = 0.1 + Math.sin(time * 0.00085) * 0.08;
    board.rotation.y = 0.38 + Math.sin(time * 0.00045) * 0.08;
    ring.rotation.z = time * 0.00055;
    looseCoins.children.forEach((coin, index) => {
      coin.rotation.y = time * 0.0004 + index;
      coin.position.y += Math.sin(time * 0.0009 + index * 2) * 0.0015;
    });
    physical.scale.setScalar(0.9 + challengeBoost * 0.18);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(render);
}

function showViewFromHash() {
  const view = window.location.hash.replace("#", "");
  if (view && $(`#${view}.view`)) showView(view);
}

function activeViewId() {
  return $(".view.active")?.id || "home";
}

function rememberUiState(immediate = false) {
  if (restoringUiState) return;
  window.clearTimeout(uiStateTimer);
  const writeState = () => {
    try {
      sessionStorage.setItem(UI_STATE_KEY, JSON.stringify({
        view: activeViewId(),
        challengeId: activeChallengeId,
        scrollY: currentScrollTop(),
        spacesScrollTop: $("#spaceGrid")?.scrollTop || 0,
      }));
      localStorage.setItem(UI_STATE_KEY, JSON.stringify({
        view: activeViewId(),
        challengeId: activeChallengeId,
        scrollY: currentScrollTop(),
        spacesScrollTop: $("#spaceGrid")?.scrollTop || 0,
      }));
    } catch {
      // Session restore is optional; the prototype still works without it.
    }
  };
  if (immediate) {
    writeState();
    return;
  }
  uiStateTimer = window.setTimeout(writeState, 80);
}

function restoreUiState() {
  let state = null;
  try {
    state = JSON.parse(sessionStorage.getItem(UI_STATE_KEY) || localStorage.getItem(UI_STATE_KEY) || "null");
  } catch {
    state = null;
  }
  if (!state) {
    showViewFromHash();
    return;
  }
  restoringUiState = true;
  if (state.view === "challenge" && state.challengeId && findBet(state.challengeId)) {
    openChallenge(state.challengeId);
  } else if (state.view && $(`#${state.view}.view`)) {
    showView(state.view, { resetScroll: false });
  } else {
    showViewFromHash();
  }
  requestAnimationFrame(() => {
    const spaces = $("#spaceGrid");
    if (spaces && Number.isFinite(Number(state.spacesScrollTop))) spaces.scrollTop = Number(state.spacesScrollTop);
    scrollRootTo(Number(state.scrollY) || 0, "auto");
    restoringUiState = false;
    rememberUiState();
  });
}

function init() {
  loadState();
  renderGallery();
  renderPulse();
  renderSpaces();
  renderActivity();
  previewFromIdea();
  syncCreateDateDefaults();
  renderProfileStats();
  renderAchievements();
  applyProfile();

  $$("[data-view]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
  $$("[data-filter]").forEach((button) => button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    $$("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
    renderGallery();
  }));
  $$("[data-spotlight]").forEach((button) => button.addEventListener("click", () => {
    $("#spotlightObject").classList.add("stamped");
    $("#spotlightTitle").textContent = button.dataset.spotlight === "approve" ? "Proof approved" : "More proof requested";
    $("#spotlightText").textContent = button.dataset.spotlight === "approve" ? "The stamp landed. Naina keeps the streak." : "A follow-up request is now waiting in Activity.";
    toast(button.dataset.spotlight === "approve" ? "Approved" : "Request sent");
  }));
  $("#ideaInput").addEventListener("input", previewFromIdea);
  $$("[data-suggestion]").forEach((button) => button.addEventListener("click", () => {
    $("#ideaInput").value = button.dataset.suggestion;
    previewFromIdea();
    syncCreateDateDefaults();
  }));
  $$(".create-options button").forEach((button) => button.addEventListener("click", () => {
    $$(".create-options button").forEach((item) => item.classList.toggle("active", item === button));
  }));
  $("#publishPact").addEventListener("click", () => {
    createBetFromIdea();
  });
  $(".bets-search").addEventListener("click", () => {
    betsSearchOpen = !betsSearchOpen;
    renderSpaces();
  });
  $("#profileCard").addEventListener("click", (event) => {
    if (profileEditMode || event.target.closest(".profile-back")) return;
    $("#profileCard").classList.toggle("flipped");
  });
  $("#profileCard").addEventListener("mouseleave", () => {
    if (!profileEditMode) $("#profileCard").classList.remove("flipped");
  });
  $("#profileCard").addEventListener("keydown", (event) => {
    if (profileEditMode) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      $("#profileCard").classList.toggle("flipped");
    }
  });
  $("#customizeCard").addEventListener("click", (event) => {
    event.stopPropagation();
    profileEditMode = !profileEditMode;
    $("#profileCard").classList.add("flipped");
    closeStatPicker();
    renderProfileStats();
    $("#customizeCard").textContent = profileEditMode ? "Done" : "Customize";
  });
  document.addEventListener("click", (event) => {
    if (profileEditMode) return;
    if (!event.target.closest("#profileCard")) $("#profileCard").classList.remove("flipped");
  });
  $("#backStats").addEventListener("click", (event) => {
    event.stopPropagation();
    if (!profileEditMode) return;
    if (suppressStatClick) {
      suppressStatClick = false;
      return;
    }
    const removeButton = event.target.closest("[data-remove-stat]");
    if (removeButton) {
      removeStatAt(Number(removeButton.dataset.removeStat));
      return;
    }
    if (event.target.closest("#addStatTile")) {
      openStatPicker("add");
      return;
    }
    const statCard = event.target.closest("[data-stat-index]");
    if (statCard) openStatPicker("replace", Number(statCard.dataset.statIndex));
  });
  $("#backStats").addEventListener("pointerdown", (event) => {
    event.stopPropagation();
    startPotentialStatDrag(event);
  }, true);
  $("#backStats").addEventListener("pointerup", () => {
    clearTimeout(longPressTimer);
    if (dragIndex !== null) endStatDrag();
  }, true);
  $("#backStats").addEventListener("pointercancel", endStatDrag, true);
  $("#backStats").addEventListener("pointerleave", () => {
    clearTimeout(longPressTimer);
  });
  $("#downloadCard").addEventListener("click", (event) => {
    event.stopPropagation();
    downloadProfileBack();
  });
  $(".settings-button").addEventListener("click", openSettings);
  $("[data-settings-return]").addEventListener("click", () => {
    if ($(".settings-full-detail")) {
      renderSettingsHome();
      return;
    }
    showView("profile");
  });
  $("[data-challenge-return]").addEventListener("click", () => showView("spaces"));
  $("#settingsScreen").addEventListener("click", (event) => {
    const settingButton = event.target.closest("[data-setting]");
    if (settingButton) {
      openSettingsPage(settingButton.dataset.setting);
      return;
    }
    const choiceButton = event.target.closest(".setting-choice button");
    if (choiceButton) {
      handleChoice(choiceButton);
      return;
    }
    if (event.target.closest("[data-save-profile]")) {
      saveProfileFromSettings();
      return;
    }
    if (event.target.closest("[data-save-account]")) {
      saveAccountFromSettings();
      return;
    }
    const actionButton = event.target.closest("[data-settings-action]");
    if (actionButton) {
      if (actionButton.dataset.settingsAction === "Invite link copied") {
        navigator.clipboard?.writeText("https://pact.app/eeshita");
      }
      if (actionButton.dataset.settingsAction === "Phone share sheet opened" && navigator.share) {
        navigator.share({ title: "Join me on Pact", url: "https://pact.app/eeshita" });
      }
      if (actionButton.dataset.settingsAction === "Notification permission requested" && "Notification" in window) {
        Notification.requestPermission().then((permission) => toast(`Notifications ${permission}`));
        return;
      }
      toast(actionButton.dataset.settingsAction);
    }
  });
  $("#challengeScreen").addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      showView(viewButton.dataset.view);
      return;
    }
    const calendarViewButton = event.target.closest("[data-calendar-view][data-calendar-bet]");
    if (calendarViewButton) {
      habitCalendarViews[calendarViewButton.dataset.calendarBet] = calendarViewButton.dataset.calendarView;
      openChallenge(calendarViewButton.dataset.calendarBet, ".habit-proof-card");
      return;
    }
    const proofDayButton = event.target.closest("[data-proof-day][data-proof-bet]");
    if (proofDayButton) {
      const betId = proofDayButton.dataset.proofBet;
      const day = Number(proofDayButton.dataset.proofDay);
      const isSameOpenDay = selectedProofDay?.betId === betId && selectedProofDay.day === day;
      selectedProofDay = isSameOpenDay ? null : { betId, day };
      openChallenge(betId, isSameOpenDay ? ".habit-proof-card" : ".proof-action-panel");
      return;
    }
    const proofCompleteButton = event.target.closest("[data-proof-complete]");
    if (proofCompleteButton) {
      registerProofDay(proofCompleteButton.dataset.proofComplete, proofCompleteButton.dataset.proofDay, "Task completed");
      return;
    }
    const logCompleteButton = event.target.closest("[data-log-complete]");
    if (logCompleteButton) {
      registerLogDay(logCompleteButton.dataset.logComplete, logCompleteButton.dataset.logDay);
      return;
    }
    const logDiscardButton = event.target.closest("[data-log-discard]");
    if (logDiscardButton) {
      discardLogDay(logDiscardButton.dataset.logDiscard, logDiscardButton.dataset.logDay);
      return;
    }
    const proofViewButton = event.target.closest("[data-proof-view]");
    if (proofViewButton) {
      openFullProof(proofViewButton.dataset.proofView, proofViewButton.dataset.proofDay);
      return;
    }
    const proofKeepButton = event.target.closest("[data-proof-keep]");
    if (proofKeepButton) {
      selectedProofDay = null;
      openChallenge(proofKeepButton.dataset.proofKeep, ".habit-proof-card");
      toast("Proof kept");
      return;
    }
    const proofDiscardButton = event.target.closest("[data-proof-discard]");
    if (proofDiscardButton) {
      discardProofDay(proofDiscardButton.dataset.proofDiscard, proofDiscardButton.dataset.proofDay);
      return;
    }
    if (event.target.closest("[data-proof-close]")) {
      selectedProofDay = null;
      const currentId = $("#challengeScreen [data-challenge-id]")?.dataset.challengeId;
      if (currentId) openChallenge(currentId, ".habit-proof-card");
      return;
    }
    const actionButton = event.target.closest("[data-challenge-action]");
    if (actionButton) handleChallengeAction(actionButton.dataset.challengeId, actionButton.dataset.challengeAction);
  });
  $("#challengeScreen").addEventListener("change", (event) => {
    const proofInput = event.target.closest("[data-proof-upload]");
    if (proofInput && proofInput.files?.length) {
      readProofFile(proofInput.files[0], (proofData) => {
        registerProofDay(proofInput.dataset.proofUpload, proofInput.dataset.proofDay, "Proof uploaded", proofData);
      });
    }
  });
  $("#settingsScreen").addEventListener("change", (event) => {
    const masterNotifications = event.target.closest("[data-master-notifications]");
    if (masterNotifications) {
      Object.keys(appState.notifications).forEach((key) => {
        appState.notifications[key] = masterNotifications.checked;
      });
      saveState();
      toast(`Notifications ${masterNotifications.checked ? "on" : "off"}`);
      return;
    }
    const photoInput = event.target.closest("#profilePhotoInput");
    if (photoInput) {
      updateProfilePhoto(photoInput.files?.[0]);
      return;
    }
    const toggleInput = event.target.closest("[data-toggle-setting]");
    if (toggleInput) handleToggle(toggleInput);
  });
  $("#achievementRow").addEventListener("click", (event) => {
    const badge = event.target.closest("[data-achievement]");
    if (badge) openAchievement(badge.dataset.achievement);
  });
  $("#statSheet").addEventListener("click", (event) => {
    if (event.target.id === "statSheet") {
      closeStatPicker();
      return;
    }
    event.stopPropagation();
    const option = event.target.closest("[data-pick-stat]");
    if (!option) return;
    const chosen = statLibrary.find((stat) => stat.id === option.dataset.pickStat);
    if (!chosen || !pendingStatTarget) return;
    if (pendingStatTarget.mode === "add" && profileStats.length < 4) profileStats.push({ ...chosen });
    if (pendingStatTarget.mode === "replace") profileStats[pendingStatTarget.index] = { ...chosen };
    closeStatPicker();
    renderProfileStats();
    saveState();
  });
  $("#statSheet").addEventListener("pointerdown", (event) => event.stopPropagation());
  $("#closeDrawer").addEventListener("click", closeDrawer);
  $("#drawer").addEventListener("click", (event) => {
    if (event.target.id === "drawer") closeDrawer();
  });
  window.addEventListener("hashchange", showViewFromHash);
  window.addEventListener("scroll", rememberUiState, { passive: true });
  $("main")?.addEventListener("scroll", rememberUiState, { passive: true });
  $("#spaceGrid")?.addEventListener("scroll", () => {
    rememberUiState();
    syncBetsSummary();
  }, { passive: true });
  window.addEventListener("beforeunload", () => rememberUiState(true));
  restoreUiState();
}

init();
try {
  initDepthScene();
} catch (error) {
  console.warn("Pact 3D stage unavailable, continuing without it.", error);
  document.body.classList.add("no-stage");
}
