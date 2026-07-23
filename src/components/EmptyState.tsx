interface EmptyStateProps {
  isSearching: boolean;
}

export default function EmptyState({ isSearching }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <h3 className="empty-title">
        {isSearching ? 'No results found' : 'No links yet'}
      </h3>
      <p className="empty-desc">
        {isSearching
          ? 'Try adjusting your search terms.'
          : 'Add your first link above to start building your vault.'}
      </p>
    </div>
  );
}
