export function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand__mark" aria-hidden="true">
          <img className="brand__icon" src="./icons/header.png" alt="" />
        </span>
        <div>
          <h1 className="brand__name">Extract</h1>
          <p className="brand__tagline">By Shaarav4795</p>
        </div>
      </div>
    </header>
  );
}
