document
  .getElementById("appointmentForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    let valid = true;

    // Hide all previous error messages
    document
      .querySelectorAll(".text-danger")
      .forEach((el) => el.classList.add("d-none"));

    // Validate Name
    const name = document.getElementById("name").value.trim();
    if (!name) {
      showError("name", "Please enter your name.");
      valid = false;
    }

    // Validate Email
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("email", "Please enter a valid email address.");
      valid = false;
    }

    // Validate Subject
    const subject = document.getElementById("subject").value;
    if (!subject) {
      showError("subject", "Please select a subject.");
      valid = false;
    }

    // Validate Phone Number
    const phone = document.getElementById("number").value.trim();
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      showError("number", "Please enter a valid 10-digit phone number.");
      valid = false;
    }

    // Validate Message
    const message = document.getElementById("message").value.trim();
    if (!message) {
      showError("message", "Please write your message.");
      valid = false;
    }

    if (valid) {
      const formData = {
        name,
        email,
        subject,
        phone,
        message,
      };

      try {
        const response = await fetch("https://formspree.io/f/xzzzonkr", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Form submitted successfully!");
          document.getElementById("appointmentForm").reset();
        } else {
          alert("Failed to submit form. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      }
    }
  });

// Function to show error messages dynamically
function showError(fieldId, message) {
  const errorElement = document.createElement("div");
  errorElement.className = "text-danger";
  errorElement.innerText = message;
  const field = document.getElementById(fieldId);
  field.parentElement.appendChild(errorElement);
}
