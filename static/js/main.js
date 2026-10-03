const sections = document.querySelectorAll("section[id], footer[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        history.replaceState(null, "", `#${entry.target.id}`);
      }
    });
  },
  {
    threshold: 0.5
  }
);

sections.forEach((section) => {
  observer.observe(section);
});
