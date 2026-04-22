// Currency calculator using fetch()

const API_URL = "https://open.er-api.com/v6/latest/USD";
const DEFAULT_FROM = "EUR";
const DEFAULT_TO = "DKK";

const amountInput = document.querySelector("#amount");
const fromSelect = document.querySelector("#from-currency");
const toSelect = document.querySelector("#to-currency");
const resultBox = document.querySelector("#result-box");
const resultValueEl = document.querySelector("#result-value");
const statusEl = document.querySelector("#status");

let rates = null;

function setStatus(message, kind) {
    statusEl.textContent = message;
    statusEl.className = "status";
    if (kind === "loading") {
        statusEl.classList.add("loading");
    } else if (kind === "error") {
        statusEl.classList.add("error");
    }
}

// API rates are “units per 1 USD”. Cross-rate: amount × (rates[to] / rates[from]).
function convertAmount(amount, fromCode, toCode) {
    if (rates == null) return null;
    const rFrom = rates[fromCode];
    const rTo = rates[toCode];
    if (rFrom == null || rTo == null || rFrom === 0) return null;
    return amount * (rTo / rFrom);
}

function formatNumber(n) {
    if (!Number.isFinite(n)) return "—";
    return new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(n);
}

function updateConversion() {
    if (!rates) return;

    const raw = amountInput.value;
    const amount = raw === "" ? NaN : Number.parseFloat(raw);
    const fromCode = fromSelect.value;
    const toCode = toSelect.value;

    if (raw === "" || Number.isNaN(amount)) {
        resultBox.hidden = true;
        return;
    }

    const converted = convertAmount(amount, fromCode, toCode);
    resultBox.hidden = false;
    resultValueEl.textContent = `${formatNumber(converted)} ${toCode}`;
}

function fillCurrencySelects(rateMap) {
    const codes = Object.keys(rateMap).sort((a, b) => a.localeCompare(b));

    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    for (const code of codes) {
        const optFrom = document.createElement("option");
        optFrom.value = code;
        optFrom.textContent = code;
        fromSelect.appendChild(optFrom);

        const optTo = document.createElement("option");
        optTo.value = code;
        optTo.textContent = code;
        toSelect.appendChild(optTo);
    }

    if (codes.includes(DEFAULT_FROM)) {
        fromSelect.value = DEFAULT_FROM;
    }
    if (codes.includes(DEFAULT_TO)) {
        toSelect.value = DEFAULT_TO;
    }

    fromSelect.disabled = false;
    toSelect.disabled = false;
}

// Load exchange rates
async function loadRates() {
    setStatus("Loading exchange rates…", "loading");

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.result !== "success" || !data.rates) {
            throw new Error("Unexpected API response");
        }

        rates = data.rates;
        fillCurrencySelects(rates);
        setStatus("");
        updateConversion();
    } catch (err) {
        setStatus(err.message, "error");
        resultBox.hidden = true;
        fromSelect.innerHTML = "<option>—</option>";
        toSelect.innerHTML = "<option>—</option>";
        fromSelect.disabled = true;
        toSelect.disabled = true;
    }
}

amountInput.addEventListener("input", updateConversion);
fromSelect.addEventListener("change", updateConversion);
toSelect.addEventListener("change", updateConversion);

loadRates();
