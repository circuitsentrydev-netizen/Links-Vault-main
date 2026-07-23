import '../styles/Header.css';

export default function Header() {
  return (
    <header className="header">
      <svg className="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      <h1 className="header-title">Links Vault</h1>
      <p className="header-tagline">Your personal link collection</p>
    </header>
  );
}
