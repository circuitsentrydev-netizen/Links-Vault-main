import { ChangeEvent } from 'react';
import '../styles/SearchBar.css';

interface SearchBarProps {
  query: string;
  onChange: (q: string) => void;
  totalCount: number;
}

export default function SearchBar({ query, onChange, totalCount }: SearchBarProps) {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search by title, URL, description, or tags..."
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        />
      </div>
      <div className="search-count">
        {totalCount} link{totalCount !== 1 ? 's' : ''} found
      </div>
    </div>
  );
}
