(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const BOOK_URL = "https://calendly.com/your-handle/intro-call"; // replace
  const YOUR_EMAIL = "your-email@example.com"; // replace
  const WHATSAPP_NUMBER = "2348000000000"; // replace (Nigeria example format)
  const WHATSAPP_DEFAULT_TEXT = "Hi Victor, I want to build an MVP on AWS. Here is my project:";
  const SITE_URL = "https://yourdomain.com/"; // replace

  const bookBtn = document.getElementById("bookBtn");
  if (bookBtn) {
    bookBtn.addEventListener("click", () => {
      window.open(BOOK_URL, "_blank", "noopener");
    });
  }

  function buildWhatsAppLink() {
    const text = encodeURIComponent(WHATSAPP_DEFAULT_TEXT);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  }

  const whatsappFloat = document.getElementById("whatsappFloat");
  if (whatsappFloat) whatsappFloat.href = buildWhatsAppLink();

  const socialToggle = document.getElementById("socialToggle");
  const floatSocials = document.getElementById("floatSocials");

  if (socialToggle && floatSocials) {
    socialToggle.addEventListener("click", () => {
      const isOpen = floatSocials.style.display === "flex";
      floatSocials.style.display = isOpen ? "none" : "flex";
      floatSocials.setAttribute("aria-hidden", isOpen ? "true" : "false");
    });

    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!target) return;
      const clickedInside =
        floatSocials.contains(target) || socialToggle.contains(target);
      if (!clickedInside) {
        floatSocials.style.display = "none";
        floatSocials.setAttribute("aria-hidden", "true");
      }
    });
  }

  const contactForm = document.getElementById("contactForm");
  const copyMsgBtn = document.getElementById("copyMsgBtn");
  const formNote = document.getElementById("formNote");

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
  }

  function buildEmailSubject(name) {
    return encodeURIComponent(`Project Request from ${name}`);
  }

  function buildEmailBody(name, email, project) {
    const lines = [
      "Hi Victor,",
      "",
      `My name: ${name}`,
      `My email: ${email}`,
      "",
      "What I want to build:",
      project,
      "",
      "Budget range: (optional)",
      "Timeline: (optional)",
      "",
      `Sent from: ${SITE_URL}`
    ];
    return encodeURIComponent(lines.join("\n"));
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "Client";
      const email = document.getElementById("email")?.value.trim() || "";
      const project = document.getElementById("project")?.value.trim() || "";

      if (!isValidEmail(email)) {
        if (formNote) formNote.textContent = "Please enter a valid email address.";
        return;
      }
      if (!project) {
        if (formNote) formNote.textContent = "Please describe what you want to build.";
        return;
      }

      const subject = buildEmailSubject(name);
      const body = buildEmailBody(name, email, project);

      window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
    });
  }

  if (copyMsgBtn) {
    copyMsgBtn.addEventListener("click", async () => {
      const name = document.getElementById("name")?.value.trim() || "Client";
      const email = document.getElementById("email")?.value.trim() || "client@email.com";
      const project = document.getElementById("project")?.value.trim() || "Describe your project here.";

      const message = [
        "Hi Victor,",
        "",
        `My name: ${name}`,
        `My email: ${email}`,
        "",
        "What I want to build:",
        project,
        "",
        "Budget range:",
        "Timeline:",
        "",
        "Thanks!"
      ].join("\n");

      try {
        await navigator.clipboard.writeText(message);
        if (formNote) formNote.textContent = "Copied. Paste it into WhatsApp or email and send.";
      } catch {
        if (formNote) formNote.textContent = "Copy failed. Please select the text and copy manually.";
      }
    });
  }

  /* Tiny SEO helper: update canonical if you forget to change it */
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && canonical.href.includes("yourdomain.com")) {
    // no-op, just a reminder in dev
  }
})();
