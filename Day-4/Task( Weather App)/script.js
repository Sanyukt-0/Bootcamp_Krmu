/* ============================================
   AETHER WEATHER — script.js
   OpenWeatherMap API Integration
   ============================================ */

const API_KEY = 'e6c4fa69bb9bbcc97ad12a226d2dd9a5';
const BASE    = 'https://api.openweathermap.org/data/2.5';

/* ---- DOM refs ---- */
const cityInput    = document.getElementById('city-input');
const searchBtn    = document.getElementById('search-btn');
const geoBtn       = document.getElementById('geo-btn');
const errorBox     = document.getElementById('error-box');
const errorMsg     = document.getElementById('error-msg');
const loading      = document.getElementById('loading');
const weatherMain  = document.getElementById('weather-main');
const emptyState   = document.getElementById('empty-state');

/* ---- Particle canvas ---- */
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function spawnParticles(n = 60) {
  particles = [];
  for (let i = 0; i < n; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.5 + 0.1,
    });
  }
}
spawnParticles();

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(56,189,248,${p.alpha})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ---- Utilities ---- */
const degToDir = d => {
  const dirs = ['N','NE','E','SE','S','SW','W','NW'];
  return dirs[Math.round(d / 45) % 8];
};
const fmt12 = ts => {
  const d = new Date(ts * 1000);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};
const fmtDay = ts => {
  const d = new Date(ts * 1000);
  return d.toLocaleDateString('en-US', { weekday: 'short' });
};
const mpsToKmh = v => (v * 3.6).toFixed(1);

function showError(msg) {
  errorMsg.textContent = msg;
  errorBox.classList.remove('hidden');
  setTimeout(() => errorBox.classList.add('hidden'), 4000);
}
function setLoading(on) {
  loading.classList.toggle('hidden', !on);
}
function showMain() {
  weatherMain.classList.remove('hidden');
  emptyState.classList.add('hidden');
}

/* ---- Fetch current weather ---- */
async function fetchWeather(city) {
  const url = `${BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(r.status === 404 ? `City "${city}" not found.` : `Error ${r.status}`);
  return r.json();
}

async function fetchWeatherByCoords(lat, lon) {
  const url = `${BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Error ${r.status}`);
  return r.json();
}

/* ---- Fetch 5-day forecast ---- */
async function fetchForecast(city) {
  const url = `${BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const r = await fetch(url);
  if (!r.ok) return null;
  return r.json();
}

async function fetchForecastByCoords(lat, lon) {
  const url = `${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const r = await fetch(url);
  if (!r.ok) return null;
  return r.json();
}

/* ---- Render weather data ---- */
function renderWeather(data) {
  /* City & country */
  document.getElementById('city-name').textContent  = data.name;
  document.getElementById('country-code').textContent = data.sys.country;

  /* Local time using timezone offset from API */
  const utcNow = Date.now() / 1000;
  const localUnix = utcNow + data.timezone;
  const localDate = new Date(localUnix * 1000);
  document.getElementById('local-time').textContent =
    localDate.toUTCString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1') + ' local time';

  /* Temperature */
  document.getElementById('main-temp').textContent  = Math.round(data.main.temp);
  document.getElementById('feels-like').textContent = Math.round(data.main.feels_like);
  document.getElementById('temp-max').textContent   = Math.round(data.main.temp_max);
  document.getElementById('temp-min').textContent   = Math.round(data.main.temp_min);

  /* Condition */
  const cond = data.weather[0];
  document.getElementById('condition-pill').textContent = cond.description;
  const icon = document.getElementById('weather-icon');
  icon.src = `https://openweathermap.org/img/wn/${cond.icon}@2x.png`;
  icon.alt = cond.description;

  /* Stats */
  const hum = data.main.humidity;
  document.getElementById('humidity').textContent = hum + '%';
  document.getElementById('humidity-bar').style.width = hum + '%';

  const wspeed = mpsToKmh(data.wind.speed);
  document.getElementById('wind-speed').textContent = wspeed;
  const wdeg = data.wind.deg || 0;
  document.getElementById('wind-dir').textContent = degToDir(wdeg);
  document.getElementById('wind-needle').style.transform = `rotate(${wdeg}deg)`;

  const pres = data.main.pressure;
  document.getElementById('pressure').textContent = pres;
  // Arc from 950–1050 hPa range
  const arcPct = Math.min(1, Math.max(0, (pres - 950) / 100));
  const arcLen = 110;
  document.getElementById('pressure-arc-fill').style.strokeDashoffset = arcLen - arcLen * arcPct;

  const vis = data.visibility !== undefined ? (data.visibility / 1000).toFixed(1) : 'N/A';
  document.getElementById('visibility').textContent = vis;

  document.getElementById('cloudiness').textContent  = data.clouds.all;
  document.getElementById('sea-level').textContent   = data.main.sea_level || data.main.pressure;

  /* Sun */
  const rise = data.sys.sunrise;
  const set  = data.sys.sunset;
  document.getElementById('sunrise').textContent = fmt12(rise);
  document.getElementById('sunset').textContent  = fmt12(set);

  const daylightH = ((set - rise) / 3600).toFixed(1);
  document.getElementById('daylight-label').textContent = `${daylightH}h daylight`;

  // Animate arc
  setTimeout(() => {
    const arcPath = document.getElementById('sun-arc-path');
    arcPath.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)';
    arcPath.style.strokeDashoffset = '0';

    // Sun dot position along arc
    const now = Date.now() / 1000;
    const frac = Math.max(0, Math.min(1, (now - rise) / (set - rise)));
    const angle = Math.PI * frac; // 0 (sunrise left) → π (sunset right)
    const cx = 10 + 180 * frac;
    const cy = 90 - Math.sin(angle) * 75;
    const sunDot = document.getElementById('sun-dot');
    sunDot.setAttribute('cx', cx.toFixed(1));
    sunDot.setAttribute('cy', cy.toFixed(1));
  }, 200);

  /* Coords */
  document.getElementById('lat-lon').textContent =
    `${data.coord.lat.toFixed(4)}°N, ${data.coord.lon.toFixed(4)}°E`;
  document.getElementById('timezone').textContent =
    `UTC ${data.timezone >= 0 ? '+' : ''}${(data.timezone / 3600).toFixed(1)}`;

  showMain();
}

/* ---- Render forecast ---- */
function renderForecast(data) {
  if (!data) return;
  const strip = document.getElementById('forecast-strip');
  strip.innerHTML = '';

  // Pick one entry per day (around noon)
  const seen = new Set();
  const days = [];
  for (const item of data.list) {
    const d = new Date(item.dt * 1000);
    const day = d.toDateString();
    const hour = d.getUTCHours();
    if (!seen.has(day) && (hour === 12 || hour === 11 || hour === 13)) {
      seen.add(day);
      days.push(item);
    }
    if (days.length === 5) break;
  }
  // Fallback: just grab first entry per day
  if (days.length < 3) {
    seen.clear();
    for (const item of data.list) {
      const day = new Date(item.dt * 1000).toDateString();
      if (!seen.has(day)) { seen.add(day); days.push(item); }
      if (days.length === 5) break;
    }
  }

  days.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.style.animationDelay = `${0.45 + i * 0.07}s`;
    card.innerHTML = `
      <div class="fc-day">${i === 0 ? 'Today' : fmtDay(item.dt)}</div>
      <div class="fc-icon"><img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="${item.weather[0].description}" /></div>
      <div class="fc-temps">
        <span class="fc-hi">${Math.round(item.main.temp_max)}°</span>
        <span class="fc-lo">${Math.round(item.main.temp_min)}°</span>
      </div>
      <div class="fc-desc">${item.weather[0].description}</div>
    `;
    strip.appendChild(card);
  });
}

/* ---- Main fetch & render ---- */
async function loadCity(city) {
  setLoading(true);
  weatherMain.classList.add('hidden');
  errorBox.classList.add('hidden');
  try {
    const [weather, forecast] = await Promise.all([
      fetchWeather(city),
      fetchForecast(city),
    ]);
    renderWeather(weather);
    renderForecast(forecast);
  } catch (e) {
    showError(e.message);
    emptyState.classList.remove('hidden');
  } finally {
    setLoading(false);
  }
}

async function loadCoords(lat, lon) {
  setLoading(true);
  weatherMain.classList.add('hidden');
  errorBox.classList.add('hidden');
  try {
    const [weather, forecast] = await Promise.all([
      fetchWeatherByCoords(lat, lon),
      fetchForecastByCoords(lat, lon),
    ]);
    renderWeather(weather);
    renderForecast(forecast);
  } catch (e) {
    showError(e.message);
    emptyState.classList.remove('hidden');
  } finally {
    setLoading(false);
  }
}

/* ---- Event listeners ---- */
searchBtn.addEventListener('click', () => {
  const v = cityInput.value.trim();
  if (v) loadCity(v);
});

cityInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const v = cityInput.value.trim();
    if (v) loadCity(v);
  }
});

geoBtn.addEventListener('click', () => {
  if (!navigator.geolocation) { showError('Geolocation not supported.'); return; }
  navigator.geolocation.getCurrentPosition(
    pos => loadCoords(pos.coords.latitude, pos.coords.longitude),
    ()  => showError('Location access denied. Please search by city name.'),
  );
});

/* ---- Clock tick ---- */
setInterval(() => {
  const el = document.getElementById('local-time');
  if (!el.dataset.offset) return;
  const offset = parseInt(el.dataset.offset);
  const localUnix = Date.now() / 1000 + offset;
  const d = new Date(localUnix * 1000);
  el.textContent = d.toUTCString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1') + ' local time';
}, 1000);

/* ---- Auto-load on start (default city) ---- */
loadCity('London');
