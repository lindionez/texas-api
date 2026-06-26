const h1 = document.querySelector("h1");
    const h1Text = h1.textContent;
    const letters = h1Text.split("");
    h1.innerHTML = letters.map((letter) => `<span>${letter}</span>`).join("");
    const colors = [
      "#ec4899",
      "#f43f5e",
      "#ef4444",
      "#f97316",
      "#f59e0b",
      "#f59e0b",
      "#84cc16",
      "#10b981",
      "#059669",
      "#2563eb",
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#a855f7",
      "#d946ef",
      "#ec4899",
    ];

    let currentColor = 4;
    const spans = document.querySelectorAll("h1 span");
    setInterval(() => {
      spans.forEach((span, index) => {
        span.style.color = colors.at(currentColor - index > colors.length - 1 ? (currentColor - index) % colors.length : currentColor - index);
      });
      currentColor++;
    }, 180);

    const buttonsList = document.getElementById("buttons-list");
    if (buttonsList && typeof linksData !== "undefined") {
      buttonsList.innerHTML = linksData.map(link => `
        <li>
          <a target="_blank" href="${link.url}">
            <div class="spacer ${link.colorClass}">
              ${link.icon}
            </div>
            <div class="text">${link.name}</div>
            <div class="spacer empty"></div>
          </a>
        </li>
      `).join("");
    }