import { Link } from '../types/Link';
import LinkCard from './LinkCard';
import EmptyState from './EmptyState';
import '../styles/LinkList.css';

interface LinkListProps {
  links: Link[];
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  isSearching: boolean;
}

export default function LinkList({ links, onEdit, onDelete, isSearching }: LinkListProps) {
  if (links.length === 0) {
    return <EmptyState isSearching={isSearching} />;
  }

  return (
    <div className="link-list">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
