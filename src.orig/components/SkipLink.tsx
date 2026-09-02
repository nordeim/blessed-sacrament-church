export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      onClick={(event) => {
        event.preventDefault();
        const main = document.getElementById("main-content");
        if (!main) return;
        main.focus({ preventScroll: true });
        main.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      Skip to content
    </a>
  );
}
