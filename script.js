const traitOrder = ["care", "guide", "solve", "companion"];

/* Result */
const traits = {
  care: {
    en: "Care",
    title: "The Caregiver",
    tagline: "You notice what someone needs before they have to ask.",
    description:
      "You look after people through small, concrete things — whether they have eaten, whether their week is too heavy, whether they mentioned needing something weeks ago. Your affection is practical: it shows up in what you do, not only in what you say. People feel looked after around you, often without being able to say exactly why.",
    ending: "images/ending-care.png",
  },
  guide: {
    en: "Guidance",
    title: "The Guide",
    tagline: "You move things forward, and give the two of you something to look forward to.",
    description:
      "You lead with ideas. You suggest the next step, set a rhythm, and turn a good conversation into an actual plan. Where others wait for the moment to arrive, you make one — a trip, an exhibition, a small ritual that becomes yours. People feel carried along by your momentum, and steadied by having somewhere to go next.",
    ending: "images/ending-guide.png",
  },
  solve: {
    en: "Solving",
    title: "The Solver",
    tagline: "When something is off, you look for what will actually work.",
    description:
      "You meet difficulty practically. You check the times, find the slot, fix the small problem standing in the way so the bigger feeling has room to breathe. You are the person who makes a hard week manageable, and the one others trust to get something unstuck. Your care looks like reliability.",
    ending: "images/ending-solve.png",
  },
  companion: {
    en: "Companionship",
    title: "The Companion",
    tagline: "You stay, and you listen — unhurried.",
    description:
      "You give time and attention without rushing anyone through it. You let a story finish, sit with someone through a bad day, and make ordinary hours feel like company. Your closeness is built from presence: nothing performed, nothing hurried, no advice unless it is asked for.",
    ending: "images/ending-companion.png",
  },
};

/* stage */
const scenes = [
  {
    title: "The First Spark",
    intro: "The evening is over. A message arrives from the person you just met.",
    hotspot: "the phone screen",
    question: "“I had a great time talking to you today.” What do you say?",
    response: "“I would like that. Let’s keep talking.”",
    choices: [
      { type: "care", text: "“You must be tired after tonight. Go and rest — we’ll talk tomorrow.”" },
      { type: "guide", text: "“There’s an exhibition I want to see. Come with me next weekend?”" },
      { type: "solve", text: "“I found the place you mentioned. Let me send you the address.”" },
      { type: "companion", text: "“You never finished that story. I’d love to hear the rest.”" },
    ],
  },
  {
    title: "A Difficult Day",
    intro: "Your partner has had a rough day, and wants to be with you for a while.",
    hotspot: "the speech bubble",
    question: "What do you do first?",
    response: "“Thank you for being here.”",
    choices: [
      { type: "care", text: "Ask if they have eaten, and make them something they like." },
      { type: "guide", text: "Help them break the day into smaller steps, and start on the first one together." },
      { type: "solve", text: "Ask what went wrong, and help them work out what to do next." },
      { type: "companion", text: "Sit beside them and listen, without rushing to offer advice." },
    ],
  },
  {
    title: "Different Plans",
    intro: "One free afternoon: you want a movie, they want the market.",
    hotspot: "the movie ticket",
    question: "There is time for one. What do you do?",
    response: "“Let’s find a plan that works for both of us.”",
    choices: [
      { type: "care", text: "Ask what they are most excited about, and go with the one that matters more to them." },
      { type: "guide", text: "Make the call: the movie today, the market next Sunday — and sort the tickets." },
      { type: "solve", text: "Check the times and the routes, and see whether both can still fit." },
      { type: "companion", text: "Go to the market with them — the plan matters less than the afternoon together." },
    ],
  },
  {
    title: "A Busy Week",
    intro: "Both calendars are full, and you have hardly spoken all week.",
    hotspot: "the calendar",
    question: "How do you reconnect?",
    response: "“I’ve missed you too. Let’s make a little time.”",
    choices: [
      { type: "care", text: "Offer to take one thing off their list, so their week gets a little lighter." },
      { type: "guide", text: "Suggest a small ritual you both keep — one song together before bed." },
      { type: "solve", text: "Find a slot that fits both calendars, and protect it." },
      { type: "companion", text: "Ask how they have really been, and listen without checking the time." },
    ],
  },
  {
    title: "One Year Together",
    intro: "A whole year of small moments, and a gift waiting to be opened.",
    hotspot: "the photo",
    question: "How would you celebrate your first anniversary?",
    response: "Another moment to remember.",
    choices: [
      { type: "care", text: "Give them the small thing they mentioned needing weeks ago." },
      { type: "guide", text: "Plan the next chapter — somewhere new for the two of you to go." },
      { type: "solve", text: "Make a list of everything you both want to do this year, and book the first one." },
      { type: "companion", text: "Clear an evening, phones down, and talk about the year you’ve had." },
    ],
  },
];


const get = (id) => document.getElementById(id);
const panels = Array.from(document.querySelectorAll(".scene"));
const navButtons = Array.from(document.querySelectorAll(".nav-button"));
const dialog = get("moment-dialog");

let current = 0;
let answers = Array(scenes.length).fill(null);

function showExperience(index) {
  get("result-view").hidden = true;
  get("welcome-view").hidden = true;
  get("experience-view").hidden = false;
  document.body.classList.add("stage-open");
  showScene(index);
}

function updateHud(index) {
  navButtons.forEach((button, i) => {
    button.classList.toggle("active", i === index);
    button.classList.toggle("completed", answers[i] !== null);
  });

  const scene = scenes[index];

  get("page-title").textContent = scene.title;
  get("scene-count").textContent = `Moment ${index + 1} / ${scenes.length}`;
  get("scene-introduction").textContent = scene.intro;
  get("scene-hint").textContent = `Click ${scene.hotspot} to answer.`;

  const done = answers.filter((answer) => answer !== null).length;
  get("answered-count").textContent = `${done} of ${scenes.length} answered`;
  get("result-button").hidden = answers.includes(null);
}

function showScene(index) {
  dialog.close();
  current = index;

  panels.forEach((panel, i) => (panel.hidden = i !== index));
  updateHud(index);
}

/* question dialog */
function renderDialog() {
  const scene = scenes[current];
  const answered = answers[current] !== null;

  get("dialog-step").textContent = `Moment ${current + 1} / ${scenes.length}`;
  get("dialog-title").textContent = scene.title;
  get("question").textContent = scene.question;

  get("dialog-response").textContent = scene.response;
  get("dialog-response").hidden = !answered;
  get("choices").hidden = answered;
  get("dialog-actions").hidden = !answered;
  get("next-button").textContent = answers.includes(null)
    ? "Next moment"
    : "See my result";

  const choices = get("choices");
  choices.replaceChildren(); 
  scene.choices.forEach((choice, i) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.textContent = choice.text;
    button.onclick = () => {
      answers[current] = i;
      renderDialog();
      updateHud(current);
    };
    choices.append(button);
  });
}

/*  result */
function scoreAnswers() {
  const counts = { care: 0, guide: 0, solve: 0, companion: 0 };
  answers.forEach((answer, i) => {
    const type = scenes[i].choices[answer].type;
    counts[type] += 1;
  });

  let best = 0;
  traitOrder.forEach((key) => {
    if (counts[key] > best) best = counts[key];
  });
  const tops = traitOrder.filter((key) => counts[key] === best);

  return { tops, primary: tops[0] };
}

function showResult() {
  if (answers.includes(null)) return;
  dialog.close();

  const score = scoreAnswers();
  const trait = traits[score.primary];

  get("result-image").src = trait.ending;
  get("result-image").alt = `${trait.title} — ${trait.tagline}`;
  get("result-kicker").textContent =
    score.tops.length > 1 ? "Your primary style · joint result" : "Your primary style";
  get("result-title").textContent = trait.title;
  get("result-tagline").textContent = trait.tagline;
  get("result-description").textContent = trait.description;

  const meta = get("result-meta");
  if (score.tops.length > 1) {
    const names = score.tops.map((key) => traits[key].en).join(" and ");
    meta.textContent = `Two of your traits came out even: ${names}. The ending above follows your ${trait.en.toLowerCase()} side.`;
    meta.hidden = false;
  } else {
    meta.hidden = true;
  }

  get("experience-view").hidden = true;
  document.body.classList.remove("stage-open");
  get("result-view").hidden = false;
}

/* buttons */
navButtons.forEach((button, i) => (button.onclick = () => showScene(i)));

document.querySelectorAll(".hotspot").forEach((button) => {
  button.onclick = () => {
    renderDialog();
    dialog.showModal();
  };
});

get("start-button").onclick = () => showExperience(0);
get("close-dialog").onclick = () => dialog.close();

get("change-answer").onclick = () => {
  answers[current] = null;
  renderDialog();
  updateHud(current);
};

get("next-button").onclick = () => {
  if (!answers.includes(null)) return showResult();

  for (let step = 1; step <= scenes.length; step++) {
    const next = (current + step) % scenes.length;
    if (answers[next] === null) return showScene(next);
  }
};

get("result-button").onclick = showResult;
get("restart-button").onclick = () => {
  answers = Array(scenes.length).fill(null);
  showExperience(0);
};
