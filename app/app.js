const params = new URLSearchParams(window.location.search);
const shell = document.querySelector(".app-shell");
const slides = [...document.querySelectorAll(".slide")];
const progress = [...document.querySelectorAll(".step-progress span")];
const homeView = document.querySelector(".home-view");
const iosNotice = document.getElementById("iosNotice");
const testLog = document.getElementById("testLog");
const clock = document.getElementById("clock");

let slide = clamp(Number(params.get("slide") || 0), 0, slides.length - 1);
let lang = params.get("lang") === "zh" ? "zh" : "en";
let mode = params.get("mode") === "night" ? "night" : "light";
let homeMode = params.get("home") === "light" ? "light" : "dark";
let offerIndex = 0;
let elapsed = (4 * 60 * 60) + (12 * 60) + 36;

const offers = [
  {
    verdict: "Good Offer",
    verdictZh: "推荐接",
    metrics: "$31/hr · $1.62/mi · 11.5 mi · 26 min",
    metricsZh: "$31/小时 · $1.62/英里 · 11.5 英里 · 26 分钟",
    fare: "$24.80",
    rating: "5.00",
    route: "10 min (3.4 mi)<br>Downtown pickup<br>16 min (8.1 mi)<br>Airport dropoff",
    routeZh: "10 分钟 (3.4 英里)<br>市中心上车<br>16 分钟 (8.1 英里)<br>机场下车"
  },
  {
    verdict: "Bad Offer",
    verdictZh: "建议跳过",
    metrics: "$15/hr · $0.52/mi · 24.0 mi · 58 min",
    metricsZh: "$15/小时 · $0.52/英里 · 24.0 英里 · 58 分钟",
    fare: "$12.50",
    rating: "4.86",
    route: "24 min (10.9 mi)<br>Suburban pickup<br>34 min (13.1 mi)<br>Low-demand dropoff",
    routeZh: "24 分钟 (10.9 英里)<br>郊区上车<br>34 分钟 (13.1 英里)<br>低需求区域下车"
  },
  {
    verdict: "Fair Offer",
    verdictZh: "一般订单",
    metrics: "$24/hr · $1.41/mi · 11.2 mi · 36 min",
    metricsZh: "$24/小时 · $1.41/英里 · 11.2 英里 · 36 分钟",
    fare: "$18.40",
    rating: "4.94",
    route: "12 min (2.6 mi)<br>Hotel pickup<br>24 min (8.6 mi)<br>Midtown dropoff",
    routeZh: "12 分钟 (2.6 英里)<br>酒店上车<br>24 分钟 (8.6 英里)<br>城中区下车"
  }
];

const copy = {
  en: {
    tagline: "Net income driving assistant",
    stepWelcome: "Step 01 / Welcome",
    welcomeTitle: "Drive Less, Earn More!",
    welcomeBody: "Tomato helps you judge the offer before you accept it. No account, no password, no platform login.",
    welcomeOneTitle: "See net value",
    welcomeOneBody: "Compare fare, time, distance, cost, rating, and area risk in one decision card.",
    welcomeTwoTitle: "One-tap start",
    welcomeTwoBody: "No sign-in wall. Start onboarding and test offer analysis immediately.",
    stepDoes: "Step 02 / What Tomato does",
    doesTitle: "Understand the offer first.",
    doesBody: "Tomato combines pay, time, distance, cost, rating, and area risk so you can decide faster.",
    recommend: "Accept",
    retained: "Estimated retained",
    minutes: "Minutes",
    netHourly: "Net hourly",
    riskOne: "Leaving downtown",
    riskTwo: "Return risk",
    triggerBtn: "Trigger popup",
    nextOfferBtn: "Try another offer",
    testLog: "Offer popup test is ready.",
    stepReady: "Step 04 / Ready",
    readyTitle: "Ready for night or day.",
    readyBody: "Tomato uses the same decision language in light mode and night mode, so it stays readable during late shifts.",
    permNotice: "Notifications",
    permNoticeBody: "Show the verdict while the request is still on screen.",
    permOffer: "Offer recognition",
    permOfferBody: "Read visible offer details for local estimates.",
    permGoal: "Income goal",
    permGoalBody: "Classify offers against the hourly target you choose.",
    backBtn: "Back",
    nextBtn: "Continue",
    doneBtn: "Enter app",
    noticeTitle: "Good Offer",
    now: "now",
    popupShown: "Notification shown for the current offer.",
    anotherOffer: "Loaded another offer and refreshed the notification.",
    home: {
      status: "Online",
      gps: "GPS recording",
      online: "Online",
      pause: "Pause",
      end: "End",
      goalTitle: "Shift net income target",
      incomeLabel: "Estimated net income",
      target: "Target",
      remaining: "Remaining",
      revenue: "Platform gross",
      cost: "Estimated cost",
      sync: "21:40 synced · GPS cost estimate",
      syncBtn: "Sync",
      tripTitle: "Latest offer analysis",
      take: "Accept",
      push: "On pace",
      takeLabel: "Estimated retained",
      riskA: "Return risk",
      riskB: "Leaves downtown",
      offer: "Offer",
      tripCost: "Cost",
      time: "Time",
      rating: "Rating",
      tabHome: "Home",
      tabRecords: "Records",
      tabSettings: "Settings"
    }
  },
  zh: {
    tagline: "净收入驾驶助手",
    stepWelcome: "第 01 步 / 欢迎",
    welcomeTitle: "少跑冤枉路，多留净收入。",
    welcomeBody: "Tomato 帮你在接单前快速识别更值得跑的订单。无需账号、密码或平台登录。",
    welcomeOneTitle: "看净收入",
    welcomeOneBody: "把报价、时间、距离、成本、评分和区域风险放进同一张决策卡。",
    welcomeTwoTitle: "一键开始",
    welcomeTwoBody: "没有登录墙。打开后就能测试订单识别和通知判断。",
    stepDoes: "第 02 步 / Tomato 做什么",
    doesTitle: "先看懂这一单。",
    doesBody: "Tomato 不会替你接单，只会综合收入、时间、距离、成本和风险，帮你更快判断。",
    recommend: "推荐接",
    retained: "预计可留",
    minutes: "分钟",
    netHourly: "净时薪",
    riskOne: "离开市中心",
    riskTwo: "空返风险",
    triggerBtn: "触发通知",
    nextOfferBtn: "换一单",
    testLog: "订单弹窗测试已就绪。",
    stepReady: "第 04 步 / 准备好了",
    readyTitle: "白天夜间都清楚。",
    readyBody: "Tomato 在浅色和夜间模式里使用同一套判断语言，方便晚班驾驶时快速阅读。",
    permNotice: "通知",
    permNoticeBody: "在订单还可操作时显示判断结果。",
    permOffer: "订单识别",
    permOfferBody: "读取屏幕上可见的订单信息并本地估算。",
    permGoal: "收入目标",
    permGoalBody: "按你设置的时薪目标分类订单。",
    backBtn: "返回",
    nextBtn: "继续",
    doneBtn: "进入 App",
    noticeTitle: "推荐接",
    now: "现在",
    popupShown: "已为当前订单显示通知。",
    anotherOffer: "已切换订单，并刷新通知。",
    home: {
      status: "在线中",
      gps: "GPS 记录中",
      online: "在线",
      pause: "暂停",
      end: "结束",
      goalTitle: "本班净收入目标",
      incomeLabel: "当前预计净收入",
      target: "目标",
      remaining: "还差",
      revenue: "平台流水",
      cost: "估算成本",
      sync: "21:40 同步 · GPS 成本估算",
      syncBtn: "同步流水",
      tripTitle: "最新订单分析",
      take: "推荐接",
      push: "推进目标",
      takeLabel: "预计可留",
      riskA: "空返风险",
      riskB: "离开 Downtown",
      offer: "报价",
      tripCost: "成本",
      time: "时间",
      rating: "评分",
      tabHome: "主页",
      tabRecords: "记录",
      tabSettings: "设置"
    }
  }
};

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = value;
  });
}

function applyCopy() {
  const current = copy[lang];
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-copy]").forEach((node) => {
    const key = node.dataset.copy;
    if (current[key]) node.textContent = current[key];
  });
  document.querySelectorAll("[data-home]").forEach((node) => {
    const key = node.dataset.home;
    if (current.home[key]) node.textContent = current.home[key];
  });
  document.getElementById("langBtn").textContent = lang === "zh" ? "EN" : "中";
  document.getElementById("nextBtn").textContent = slide === slides.length - 1 ? current.doneBtn : current.nextBtn;
  updateOffer();
}

function applyMode() {
  document.body.classList.toggle("night", mode === "night");
  document.getElementById("modeBtn").textContent = mode === "night" ? "Day" : "Night";
}

function applyHomeMode() {
  const isLight = homeMode === "light";
  homeView.classList.toggle("light", isLight);
  homeView.dataset.designId = isLight ? "Home.Light" : "Home.Dark";
  document.getElementById("homeModeBtn").textContent = isLight ? "☀" : "☾";
}

function renderSlide() {
  slides.forEach((node, index) => {
    node.classList.toggle("active", index === slide);
  });
  progress.forEach((node, index) => {
    node.classList.toggle("active", index <= slide);
  });
  document.getElementById("backBtn").disabled = slide === 0;
  document.getElementById("nextBtn").textContent = slide === slides.length - 1 ? copy[lang].doneBtn : copy[lang].nextBtn;
  if (slide === 2) {
    setTimeout(triggerNotice, 220);
  } else {
    iosNotice.classList.remove("show");
  }
}

function updateOffer() {
  const offer = offers[offerIndex];
  const isZh = lang === "zh";
  setText("[data-copy='noticeTitle']", isZh ? offer.verdictZh : offer.verdict);
  setText("[data-copy='noticeMetrics']", isZh ? offer.metricsZh : offer.metrics);
  document.querySelector("[data-offer='fare']").textContent = offer.fare;
  document.querySelector("[data-offer='rating']").textContent = offer.rating;
  document.querySelector("[data-offer='route']").innerHTML = isZh ? offer.routeZh : offer.route;
}

function triggerNotice() {
  updateOffer();
  iosNotice.classList.remove("show");
  requestAnimationFrame(() => {
    setTimeout(() => iosNotice.classList.add("show"), 40);
  });
  testLog.textContent = copy[lang].popupShown;
}

function nextOffer() {
  offerIndex = (offerIndex + 1) % offers.length;
  triggerNotice();
  testLog.textContent = copy[lang].anotherOffer;
}

function showView(view) {
  shell.dataset.view = view;
  document.querySelectorAll("[data-view-target]").forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTarget === view);
  });
}

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function updateShiftTimer() {
  elapsed += 1;
  const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");
  document.getElementById("shiftTimer").textContent = `${hours}:${minutes}:${seconds}`;
}

document.getElementById("backBtn").addEventListener("click", () => {
  slide = clamp(slide - 1, 0, slides.length - 1);
  renderSlide();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  if (slide === slides.length - 1) {
    showView("home");
    return;
  }
  slide = clamp(slide + 1, 0, slides.length - 1);
  renderSlide();
});

document.getElementById("triggerBtn").addEventListener("click", triggerNotice);
document.getElementById("nextOfferBtn").addEventListener("click", nextOffer);
document.getElementById("langBtn").addEventListener("click", () => {
  lang = lang === "zh" ? "en" : "zh";
  applyCopy();
  renderSlide();
});
document.getElementById("modeBtn").addEventListener("click", () => {
  mode = mode === "night" ? "light" : "night";
  applyMode();
});
document.getElementById("homeModeBtn").addEventListener("click", () => {
  homeMode = homeMode === "dark" ? "light" : "dark";
  applyHomeMode();
});
document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.viewTarget));
});

applyCopy();
applyMode();
applyHomeMode();
renderSlide();
updateClock();
setInterval(updateClock, 30_000);
setInterval(updateShiftTimer, 1000);
