export default function TopBar() {
  return (
    <header className="topbar">
      <div className="brand">Reading Flow</div>
      <div className="archive">Your Personal Library 2024</div>
      <nav className="links" aria-label="Social and information links">
        <a href="#" aria-label="GitHub">GH</a>
        <a href="#" aria-label="Twitter">TW</a>
        <a href="#">About</a>
      </nav>
    </header>
  );
}
