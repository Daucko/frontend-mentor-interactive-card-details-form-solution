const form = document.getElementById("card-form");
const thanks = document.getElementById("thanks");

const fields = {
  name: document.getElementById("name"),
  number: document.getElementById("number"),
  month: document.getElementById("month"),
  year: document.getElementById("year"),
  cvc: document.getElementById("cvc"),
};

const errors = {
  name: document.getElementById("name-error"),
  number: document.getElementById("number-error"),
  exp: document.getElementById("exp-error"),
  cvc: document.getElementById("cvc-error"),
};

const display = {
  name: document.getElementById("card-name-display"),
  number: document.getElementById("card-number-display"),
  month: document.getElementById("card-month-display"),
  year: document.getElementById("card-year-display"),
  cvc: document.getElementById("card-cvc-display"),
};

const defaults = {
  name: "Jane Appleseed",
  number: "0000 0000 0000 0000",
  month: "00",
  year: "00",
  cvc: "000",
};

const isDigits = (value) => /^\d+$/.test(value);

function setError(inputs, errorEl, message) {
  errorEl.textContent = message;
  inputs.forEach((input) => input.classList.toggle("invalid", Boolean(message)));
}

/* ---------- Live card preview ---------- */
fields.name.addEventListener("input", () => {
  display.name.textContent = fields.name.value.trim() || defaults.name;
  setError([fields.name], errors.name, "");
});

fields.number.addEventListener("input", () => {
  const raw = fields.number.value.replace(/\s/g, "");

  // Group into blocks of four: 1234 5678 9123 0000
  fields.number.value = raw.replace(/(.{4})(?=.)/g, "$1 ");

  display.number.textContent = fields.number.value || defaults.number;

  if (raw && !isDigits(raw)) {
    setError([fields.number], errors.number, "Wrong format, numbers only");
  } else {
    setError([fields.number], errors.number, "");
  }
});

fields.month.addEventListener("input", () => {
  display.month.textContent = fields.month.value || defaults.month;
  setError([fields.month, fields.year], errors.exp, "");
});

fields.year.addEventListener("input", () => {
  display.year.textContent = fields.year.value || defaults.year;
  setError([fields.month, fields.year], errors.exp, "");
});

fields.cvc.addEventListener("input", () => {
  display.cvc.textContent = fields.cvc.value || defaults.cvc;
  setError([fields.cvc], errors.cvc, "");
});

/* ---------- Validation ---------- */
function validate() {
  let valid = true;

  // Name
  if (!fields.name.value.trim()) {
    setError([fields.name], errors.name, "Can't be blank");
    valid = false;
  }

  // Card number
  const number = fields.number.value.replace(/\s/g, "");
  if (!number) {
    setError([fields.number], errors.number, "Can't be blank");
    valid = false;
  } else if (!isDigits(number)) {
    setError([fields.number], errors.number, "Wrong format, numbers only");
    valid = false;
  } else if (number.length !== 16) {
    setError([fields.number], errors.number, "Enter all 16 digits");
    valid = false;
  }

  // Expiry date
  const month = fields.month.value.trim();
  const year = fields.year.value.trim();
  const monthBad = !month || !isDigits(month) || Number(month) < 1 || Number(month) > 12;
  const yearBad = !year || !isDigits(year) || year.length !== 2;

  if (monthBad || yearBad) {
    let message = "Can't be blank";
    if ((month && !isDigits(month)) || (year && !isDigits(year))) {
      message = "Wrong format, numbers only";
    } else if (month && isDigits(month) && monthBad) {
      message = "Month must be 01 to 12";
    } else if (year && yearBad) {
      message = "Enter two digits";
    }
    errors.exp.textContent = message;
    fields.month.classList.toggle("invalid", monthBad);
    fields.year.classList.toggle("invalid", yearBad);
    valid = false;
  } else {
    setError([fields.month, fields.year], errors.exp, "");
  }

  // CVC
  const cvc = fields.cvc.value.trim();
  if (!cvc) {
    setError([fields.cvc], errors.cvc, "Can't be blank");
    valid = false;
  } else if (!isDigits(cvc)) {
    setError([fields.cvc], errors.cvc, "Wrong format, numbers only");
    valid = false;
  } else if (cvc.length !== 3) {
    setError([fields.cvc], errors.cvc, "Enter 3 digits");
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validate()) {
    form.hidden = true;
    thanks.hidden = false;
  }
});

/* ---------- Continue: reset to the empty form ---------- */
document.getElementById("continue").addEventListener("click", () => {
  form.reset();
  Object.keys(display).forEach((key) => (display[key].textContent = defaults[key]));
  Object.values(fields).forEach((input) => input.classList.remove("invalid"));
  Object.values(errors).forEach((el) => (el.textContent = ""));
  thanks.hidden = true;
  form.hidden = false;
  fields.name.focus();
});