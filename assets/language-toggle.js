(() => {
  const translations = {
    "profile-summary":
      "I optimize service response times, manage appointments and schedules, track cases, and resolve administrative processes efficiently.",
    "remote-support": "Remote (Spanish / English Support)",
    location: "On-site | Córdoba, Argentina",
    "profile-heading": "Professional Profile",
    "profile-description":
      "An operations coordination and student support specialist experienced in managing dynamic workflows for international startups and high-demand educational environments in the U.S. I combine an analytical, methodical approach to ensure consistent follow-up and data accuracy with a strong commitment to student support, prioritizing each student's adjustment to change and emotional well-being as essential foundations for academic progress.",
    "experience-heading": "Work Experience",
    "experience-role": "Operations Coordinator & Executive Assistant",
    "company-location":
      "<strong>EdTech Startup Papaya (U.S.)</strong> | <em>Remote</em>",
    "experience-description":
      "Coordinated student support and follow-up programs, managed live session schedules, supported students and families, and maintained clear communication with tutors, teachers, and school coordinators.",
    agendas:
      "<strong>Scheduling & Calendar Management:</strong> Coordinated live sessions among students, tutors, and school administrators using Google Calendar and Calendly. Optimized schedules to maximize attendance, reduce gaps, and balance professionals' workloads.",
    communications:
      "<strong>Communications Automation:</strong> Designed and launched automated email sequences to schedule, confirm, and reschedule meetings seamlessly.",
    attendance:
      "<strong>Attendance & Academic Quality:</strong> Audited live sessions to uphold service standards and maintained detailed spreadsheets (Excel / Google Sheets) tracking attendance, grades, and academic progress by grade and school.",
    needs:
      "<strong>Needs Assessment:</strong> Monitored and identified subject areas where students needed support, assigned targeted assistance, and coordinated follow-up meetings with school coordinators.",
    onboarding:
      "<strong>Onboarding & Follow-up:</strong> Trained and supported new tutors to help them quickly adopt the startup's guidelines.",
    "tools-heading": "Technology Stack & Tools",
    "productivity-heading": "Productivity & Management",
    "productivity-tools": "Google Workspace / Microsoft 365",
    airtable: "Airtable (operational databases)",
    calendars: "Calendly & Google Calendar",
    "ai-heading": "Applied Artificial Intelligence | Cloude Cowork / ChatGPT",
    "ai-writing": "Executive writing, report summaries, and auditing",
    "ai-templates": "Template and summary development",
    "ai-research": "Operational research and benchmarking",
    "ai-automation": "Email automation",
    "communication-heading": "Communication & Follow-up",
    slack: "Slack (channels, bots, and workflows)",
    "video-calls": "Zoom / Google Meet",
    kpis: "KPI tracking in Excel / Sheets",
    "contact-heading": "Contact & Availability",
    "contact-description":
      "Available for on-site and remote executive assistance, project coordination, and operational support.",
    "email-label": "Email",
    "linkedin-label": "LinkedIn",
    "site-title": "Executive Assistance & Operations Coordination",
    "skip-link": "Skip to content",
    "back-to-top": "Back to top",
    footer:
      "Florencia Espeche · Executive Assistance & Operations Coordination 🌿",
  };

  function initializeLanguageToggle() {
    const header = document.querySelector(".md-header__inner");
    const title = document.querySelector(
      '.md-header__title .md-header__topic:not([data-md-component="header-topic"]) .md-ellipsis'
    );
    const footer = document.querySelector(".md-copyright__highlight");
    const logoLink = document.querySelector(
      '.md-header [data-md-component="logo"]'
    );

    if (!header || !title || !footer || !logoLink) {
      throw new Error("Language toggle could not find the site header or footer.");
    }

    const originalTitle = title.innerHTML;
    const originalDocumentTitle = document.title;
    const originalFooter = footer.innerHTML;
    const originalLogoLabel = logoLink.getAttribute("aria-label");
    const originalLogoTitle = logoLink.getAttribute("title");
    const originals = new Map(
      Array.from(document.querySelectorAll("[data-i18n]")).map((element) => [
        element,
        element.innerHTML,
      ])
    );
    for (const element of originals.keys()) {
      if (!Object.prototype.hasOwnProperty.call(
        translations,
        element.dataset.i18n
      )) {
        throw new Error(`Missing English translation: ${element.dataset.i18n}`);
      }
    }

    const button = document.createElement("button");
    button.className = "language-toggle";
    button.type = "button";
    button.setAttribute("aria-pressed", "false");
    button.textContent = "EN";
    button.setAttribute("aria-label", "Switch language to English");
    header.append(button);

    function setLanguage(language) {
      const isEnglish = language === "en";
      for (const [element, spanishText] of originals) {
        element.innerHTML = isEnglish
          ? translations[element.dataset.i18n]
          : spanishText;
      }

      title.innerHTML = isEnglish
        ? translations["site-title"]
        : originalTitle;
      footer.innerHTML = isEnglish ? translations.footer : originalFooter;
      logoLink.setAttribute(
        "aria-label",
        isEnglish ? translations["site-title"] : originalLogoLabel
      );
      logoLink.setAttribute(
        "title",
        isEnglish ? translations["site-title"] : originalLogoTitle
      );
      document.title = isEnglish
        ? originalDocumentTitle.replace(
            "Asistencia Ejecutiva & Coordinación de Operaciones",
            translations["site-title"]
          )
        : originalDocumentTitle;
      document.documentElement.lang = language;
      button.textContent = isEnglish ? "ES" : "EN";
      button.setAttribute("aria-pressed", String(isEnglish));
      button.setAttribute(
        "aria-label",
        isEnglish ? "Cambiar idioma a español" : "Switch language to English"
      );
      button.title = isEnglish
        ? "Cambiar idioma a español"
        : "Switch language to English";

      const skipLink = document.querySelector(".md-skip");
      const backToTop = document.querySelector(".md-top");
      if (skipLink) {
        skipLink.textContent = isEnglish
          ? translations["skip-link"]
          : "Saltar a contenido";
      }
      if (backToTop) {
        backToTop.setAttribute(
          "aria-label",
          isEnglish ? translations["back-to-top"] : "Volver al principio"
        );
        const label = Array.from(backToTop.childNodes).find(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
        );
        if (label) {
          label.textContent = isEnglish
            ? "\n  Back to top\n"
            : "\n  Volver al principio\n";
        }
      }
    }

    button.addEventListener("click", () => {
      setLanguage(button.getAttribute("aria-pressed") === "false" ? "en" : "es");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeLanguageToggle, {
      once: true,
    });
  } else {
    initializeLanguageToggle();
  }
})();
