import { Link } from '../types/Link';
import '../styles/LinkCard.css';

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}

export default function LinkCard({ link, onEdit, onDelete }: LinkCardProps) {
  return (
    <div className="link-card">
      <div className="link-card-header">
        <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-title">
          {link.title}
        </a>
        <span className="link-url">{link.url}</span>
      </div>
      <p className="link-description">{link.description}</p>
      {link.tags.length > 0 && (
        <div className="link-tags">
          {link.tags.map((tag, index) => (
            <span key={index} className="link-tag">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="link-actions">
        <button className="btn-action btn-edit" onClick={() => onEdit(link)}>
          Edit
        </button>
        <button className="btn-action btn-delete" onClick={() => onDelete(link.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
