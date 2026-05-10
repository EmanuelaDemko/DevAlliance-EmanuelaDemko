// ========== Contact Form ==========

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    validateContactForm();
  });

  form.querySelectorAll(".form-control").forEach(input => {
    input.addEventListener("input", function () {
      this.classList.remove("is-invalid");
    });
  });
}

function validateContactForm() {
  const name = document.getElementById("contactName");
  const email = document.getElementById("contactEmail");
  const subject = document.getElementById("contactSubject");
  const message = document.getElementById("contactMessage");
  const alertBox = document.getElementById("formAlert");

  let isValid = true;

  alertBox.style.display = "none";

  if (!name.value.trim() || name.value.trim().length < 2) {
    showFieldError(name, "Please enter your name (at least 2 characters).");
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
    showFieldError(email, "Please enter a valid email address.");
    isValid = false;
  }

  if (!subject.value.trim()) {
    showFieldError(subject, "Please enter a subject.");
    isValid = false;
  }

  if (!message.value.trim() || message.value.trim().length < 10) {
    showFieldError(message, "Please enter a message (at least 10 characters).");
    isValid = false;
  }

  if (isValid) {
    alertBox.className = "alert alert-success";
    alertBox.innerHTML = '<i class="fas fa-check-circle me-2"></i>Thank you for your message! We will get back to you soon.';
    alertBox.style.display = "block";

    document.getElementById("contactForm").reset();

    setTimeout(() => {
      alertBox.style.display = "none";
    }, 5000);
  } else {
    alertBox.className = "alert alert-danger";
    alertBox.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Please fix the errors below and try again.';
    alertBox.style.display = "block";
  }
}

function showFieldError(field, message) {
  field.classList.add("is-invalid");
  const errorEl = field.parentElement.querySelector(".validation-error");
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = "block";
  }
}

// ========== Init ==========

document.addEventListener("DOMContentLoaded", function () {
  initContactForm();
});