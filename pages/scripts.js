document.documentElement.classList.add("js");

document.getElementById("year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));

const nav = document.getElementById("nav");
const handleScroll = () =>
  nav.classList.toggle("scrolled", window.scrollY > 40);
handleScroll();
window.addEventListener("scroll", handleScroll, { passive: true });

const roomAvailability = {
  smallRoom: {
    total: 8,
    available: 8,
  },
  largeRoom: {
    total: 1,
    available: 0,
  },
};

const updateAvailability = () => {
  document.querySelectorAll("[data-room-availability]").forEach((container) => {
    const cardTitle =
      container.closest("article")?.querySelector("h3")?.textContent?.trim() ||
      "";
    const roomKey = cardTitle.includes("Besar") ? "largeRoom" : "smallRoom";
    const availability = roomAvailability[roomKey];
    const badge = container.querySelector("[data-availability-badge]");
    const text = container.querySelector("[data-availability-text]");
    const fill = container.querySelector("[data-availability-fill]");
    const percentElement = container.querySelector(
      "[data-availability-percent]",
    );

    if (!availability || !badge || !text || !fill || !percentElement) return;

    const percent =
      availability.total > 0
        ? Math.round((availability.available / availability.total) * 100)
        : 0;
    const isAvailable = availability.available > 0;
    badge.textContent = isAvailable ? "Tersedia" : "Penuh";
    badge.classList.toggle("availability-badge--available", isAvailable);
    badge.classList.toggle("availability-badge--full", !isAvailable);
    text.textContent = `${availability.available} dari ${availability.total} kamar tersedia`;
    fill.style.width = `${percent}%`;
    percentElement.textContent = `${percent}%`;
  });
};

updateAvailability();

const OWNER_WHATSAPP = "6285176705683";
const waForm = document.getElementById("wa-form");
if (waForm) {
  waForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const text = `Halo Kos Musafir 18, saya ingin menjadwalkan survey.\nNama: ${data.get("name")}\nWhatsApp: ${data.get("phone")}\nTipe Kamar: ${data.get("room")}\nPesan: ${data.get("message") || "-"} `;
    window.open(
      `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener",
    );
  });
}
