import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface Work {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    clientSiteUrl: string;
    isVisible: boolean;
}

interface WorkEditFormProps {
  work: Work;
  onWorkUpdated: () => void;
  onCancel: () => void;
}

const WorkEditForm: React.FC<WorkEditFormProps> = ({ work, onWorkUpdated, onCancel }) => {
  const [title, setTitle] = useState(work.title);
  const [description, setDescription] = useState(work.description);
  const [imageUrl, setImageUrl] = useState(work.imageUrl);
  const [clientSiteUrl, setClientSiteUrl] = useState(work.clientSiteUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/works/${work.id}`, {
        title,
        description,
        imageUrl,
        clientSiteUrl,
      });
      onWorkUpdated();
    } catch (error) {
      console.error('Error updating work:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titlu"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descriere"
        required
      />
      <input
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="URL Imagine"
        required
      />
      <input
        type="url"
        value={clientSiteUrl}
        onChange={(e) => setClientSiteUrl(e.target.value)}
        placeholder="URL Site Client"
        required
      />
      <button type="submit">Actualizează</button>
      <button type="button" onClick={onCancel}>Anulează</button>
    </form>
  );
};

export default WorkEditForm;