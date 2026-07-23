import { useState, useEffect } from 'react';
import { Link } from './types/Link';
import Header from './components/Header';
import LinkForm from './components/LinkForm';
import SearchBar from './components/SearchBar';
import LinkList from './components/LinkList';
import './styles/App.css';

const STORAGE_KEY = 'links-vault-links';

export default function App() {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedLinks = localStorage.getItem(STORAGE_KEY);
    if (storedLinks) {
      try {
        setLinks(JSON.parse(storedLinks));
      } catch (e) {
        console.error('Failed to parse links from localStorage');
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    }
  }, [links, isLoaded]);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const addLink = (newLink: Omit<Link, 'id'>) => {
    const link: Link = {
      ...newLink,
      id: Date.now().toString(),
    };
    setLinks([link, ...links]);
    showMessage('Link added successfully!', 'success');
  };

  const updateLink = (updatedLink: Link) => {
    setLinks(links.map((l) => (l.id === updatedLink.id ? updatedLink : l)));
    setEditingLink(null);
    showMessage('Link updated successfully!', 'success');
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
    if (editingLink?.id === id) {
      setEditingLink(null);
    }
    showMessage('Link deleted.', 'success');
  };

  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;

    return (
      link.title.toLowerCase().includes(query) ||
      link.url.toLowerCase().includes(query) ||
      link.description.toLowerCase().includes(query) ||
      link.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="app-container">
      <Header />

      {message && (
        <div className={`message-banner message-${message.type}`}>
          {message.text}
        </div>
      )}

      <LinkForm
        onAdd={addLink}
        onUpdate={updateLink}
        onCancel={() => setEditingLink(null)}
        editingLink={editingLink}
        onShowMessage={showMessage}
      />

      <SearchBar
        query={searchQuery}
        onChange={setSearchQuery}
        totalCount={filteredLinks.length}
      />

      <LinkList
        links={filteredLinks}
        onEdit={setEditingLink}
        onDelete={deleteLink}
        isSearching={searchQuery.length > 0}
      />
    </div>
  );
}
