(function ($) {
  "use strict";

  // Initiate the wowjs
  new WOW().init();

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: true,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 24,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      992: {
        items: 2,
      },
    },
  });
})(jQuery);

// Function to inject the popup form into the document
function insertPopupForm() {
  const popupHTML = `
  <!-- Popup Form -->
  <div class="popup-overlay" id="popupForm">
      <div class="popup-content">
          <span class="close-btn" onclick="closePopup()">&#10060;</span>
          <h2>Join Our Course</h2>
          <hr />
          <form id="courseForm">
              <label for="name">Full Name</label>
              <input type="text" id="name" placeholder="Enter your full name" required>

              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="Enter your phone number" required>

              <label for="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required>

              <label for="course">Select Course</label>
              <select id="course">
                  <option value="" disabled selected>Choose a course</option>
                  <option value="languages">Programming Languages</option>
                  <option value="frontend">Frontend Development</option>
                  <option value="backend">Backend Development</option>
                  <option value="dsa">Data Structures & Algorithms</option>
                  <option value="other">Any Other Course</option>
              </select>

              <label for="otherCourse">Interested in Other Courses?</label>
              <input type="text" id="otherCourse" placeholder="Mention any additional courses">


              <button type="submit" class="submit-btn">Join Now</button>
          </form>
      </div>
  </div>`;

  // Append popup form to the body
  document.body.insertAdjacentHTML("beforeend", popupHTML);
}

// Call function to insert form
insertPopupForm();

// Functions to Open and Close the Popup
function openPopup() {
  document.getElementById("popupForm").style.display = "flex";
}

function closePopup() {
  document.getElementById("popupForm").style.display = "none";
}

// Open Popup
function openPopup() {
  document.getElementById("popupForm").style.display = "flex";
}

// Close Popup
function closePopup() {
  document.getElementById("popupForm").style.display = "none";
}

// Handle Form Submission
document
  .getElementById("courseForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    // Fetch input values
    const gname = document.getElementById("name").value.trim();
    const gmail = document.getElementById("email").value.trim();
    const cname = document.getElementById("course").value;
    const cage = document.getElementById("phone").value.trim();
    const message = document.getElementById("otherCourse")?.value.trim() || "";

    // Basic validation
    if (!gname || !gmail || !cname || !cage) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = {
      "Student Name": gname,
      Email: gmail,
      Course: cname,
      Contact: cage,
      "Additional Course": message,
    };

    try {
      const response = await fetch("https://formspree.io/f/meoowrde", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Your details have been submitted successfully!");
        document.getElementById("courseForm").reset();
        closePopup();
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  });
