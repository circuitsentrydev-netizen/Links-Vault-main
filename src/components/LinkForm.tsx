import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from '../types/Link';
import '../styles/LinkForm.css';

interface LinkFormProps {
  onAdd: (link: Omit<Link, 'id'>) => void;
  onUpdate: (link: Link) => void;
  onCancel: () => void;
  editingLink: Link | null;
  onShowMessage: (text: string, type: 'success' | 'error') => void;
}

export default function LinkForm({ onAdd, onUpdate, onCancel, editingLink, onShowMessage }: LinkFormProps) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (editingLink) {
      setTitle(editingLink.title);
      setUrl(editingLink.url);
      setDescription(editingLink.description);
      setTags(editingLink.tags.join(', '));
    } else {
      setTitle('');
      setUrl('');
      setDescription('');
      setTags('');
    }
  }, [editingLink]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      onShowMessage('Title is required.', 'error');
      return;
    }

    if (!url.trim()) {
      onShowMessage('URL is required.', 'error');
      return;
    }

    try {
      new URL(url);
    } catch {
      onShowMessage('Please enter a valid URL (e.g. https://example.com).', 'error');
      return;
    }

    if (!description.trim()) {
      onShowMessage('Description is required.', 'error');
      return;
    }

    const tagsArray: string[] = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingLink) {
      onUpdate({
        id: editingLink.id,
        title: title.trim(),
        url: url.trim(),
        description: description.trim(),
        tags: tagsArray,
      });
    } else {
      onAdd({
        title: title.trim(),
        url: url.trim(),
        description: description.trim(),
        tags: tagsArray,
      });
      setTitle('');
      setUrl('');
      setDescription('');
      setTags('');
    }
  };

  return (
    <div className="link-form-card">
      <h2 className="link-form-header">{editingLink ? 'Edit Link' : 'Add New Link'}</h2>
      <form className="link-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="e.g. React Documentation"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            id="url"
            type="text"
            className="form-input"
            placeholder="https://..."
            value={url}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-textarea"
            placeholder="What is this link about?"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            id="tags"
            type="text"
            className="form-input"
            placeholder="e.g. tutorial, frontend, react"
            value={tags}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTags(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingLink ? 'Save Changes' : 'Save Link'}
          </button>
          {editingLink && (
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
