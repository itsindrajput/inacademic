// function used in pages
document.addEventListener("DOMContentLoaded", () => {
  const truncateElements = document.querySelectorAll(".truncate");
  console.log(truncateElements);
  truncateElements.forEach((element) => {
    const originalText = element.innerText;
    console.log(originalText);
    if (originalText.length > 100) {
      element.innerText = originalText.slice(0, 100) + "...";
    }
  });
});

// document.getElementById("joinUsButton").addEventListener("click", function () {
//   const url =
//     "https://docs.google.com/forms/d/e/1FAIpQLScHrRci2k0vB-Lyo-h09OJli_QZScjC9waSpYho0_0ffhK59w/viewform?embedded=true";

//   window.open(
//     url,
//     "JoinUsForm",
//     "width=500,height=600,scrollbars=yes,resizable=no"
//   );
// });

document
  .getElementById("appointmentForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    let valid = true;

    document
      .querySelectorAll(".text-danger")
      .forEach((el) => el.classList.add("d-none"));

    const gname = document.getElementById("gname").value.trim();
    if (!gname) {
      document.getElementById("gnameError").classList.remove("d-none");
      valid = false;
    }

    const gmail = document.getElementById("gmail").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(gmail)) {
      document.getElementById("gmailError").classList.remove("d-none");
      valid = false;
    }

    const cname = document.getElementById("cname").value.trim();
    if (!cname) {
      document.getElementById("cnameError").classList.remove("d-none");
      valid = false;
    }

    const cage = document.getElementById("cage").value.trim();
    if (!/^\d{10}$/.test(cage)) {
      document.getElementById("cageError").classList.remove("d-none");
      valid = false;
    }

    const message = document.getElementById("message").value.trim();
    if (!message) {
      document.getElementById("messageError").classList.remove("d-none");
      valid = false;
    }

    if (valid) {
      const formData = {
        "Student Name": gname,
        Email: gmail,
        Stream: cname,
        Contact: cage,
        Message: message,
      };

      try {
        const response = await fetch("https://formspree.io/f/meoonyrl", {
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

// FAQ Data
const faqs = [
  {
    id: "Zero",
    question:
      "I don't even know Basics of programming. Is it safe for me to join?",
    answer: `Yes, we've got you covered, but safety comes with precaution, 
                 and for you, that means a commitment to attend classes and practice regularly.`,
    expanded: true,
  },
  {
    id: "One",
    question: "How do I communicate with my mentor or trainer?",
    answer: `Once you're enrolled in the program, you'll be added to a 
                 dedicated WhatsApp group where you can post your doubts and questions at any time. 
                 Our trainers are active in the group and will respond to your queries as soon as possible, 
                 ensuring you receive timely support and guidance throughout your learning journey.`,
    expanded: false,
  },
  {
    id: "Two",
    question: "What if I miss a live session?",
    answer: `If you miss a live session, don't worry! You'll be provided with a 
                 link to the recorded lecture so you can catch up at your convenience. 
                 Additionally, if the content isn't clear or if you need extra help, we can arrange 
                 a quick doubt-summary session to ensure you're up to speed and ready to join the current session.`,
    expanded: false,
  },
  {
    id: "Three",
    question: "What resources are provided to students during the program?",
    answer: `Throughout the program, you'll receive special notes from your mentor, 
                 along with the lecture PowerPoint presentations for easy reference. 
                 Additionally, practice problems with detailed solutions will be provided 
                 to help you reinforce your learning and sharpen your skills.`,
    expanded: false,
  },
  {
    id: "Four",
    question: "How do I get placed in a job after completing the course?",
    answer: `We will guide you throughout the course, sharing our best knowledge and insights 
                 to help you with your job preparation. Additionally, we provide a personalized roadmap 
                 tailored to your career goals, ensuring you are fully equipped to land your dream job. 
                 Our referral program will also assist you by connecting you with potential employers, 
                 increasing your chances of getting hired.`,
    expanded: false,
  },
  {
    id: "Five",
    question: "Can I access course material after completing the program?",
    answer: `Yes, you will have lifetime access to all course materials, including recorded lectures, 
                 presentations, and additional resources. This means you can revisit the content anytime 
                 to refresh your knowledge. Additionally, you'll have ongoing access to any updates or 
                 new resources added to the program, ensuring you're always up-to-date with the latest industry trends.`,
    expanded: false,
  },
];

const faqContainer = document.createElement("div");
faqContainer.className = "container-xxl py-5";
faqContainer.innerHTML = `
      <div class="container">
        <div
          class="text-center mx-auto mb-5 wow fadeInUp"
          style="max-width: 600px"
        >
          <h1 class="mb-3">Frequently Asked Questions</h1>
        </div>
        <div class="accordion" id="accordionExample"></div>
      </div>
    `;

const accordion = faqContainer.querySelector(".accordion");

faqs.forEach((faq) => {
  const item = document.createElement("div");
  item.className = "accordion-item";
  item.innerHTML = `
        <h2 class="accordion-header" id="heading${faq.id}">
          <button
            class="accordion-button ${faq.expanded ? "" : "collapsed"}"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse${faq.id}"
            aria-expanded="${faq.expanded}"
            aria-controls="collapse${faq.id}"
          >
            ${faq.question}
          </button>
        </h2>
        <div
          id="collapse${faq.id}"
          class="accordion-collapse collapse ${faq.expanded ? "show" : ""}"
          aria-labelledby="heading${faq.id}"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">${faq.answer}</div>
        </div>
      `;
  accordion.appendChild(item);
});

document.getElementById("faq-section").appendChild(faqContainer);
