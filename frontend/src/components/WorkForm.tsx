import React, {useState} from 'react';
import api from '../services/api';

interface WorkFormProps {
    onWorkAdded: () => void;
}

const WorkForm: React.FC<WorkFormProps> = ({ onWorkAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [clientSiteUrl, setClientSiteUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/works' , {
                title,
                description,
                imageUrl,
                clientSiteUrl,
                isVisible: true,
            });
            onWorkAdded();
            setTitle('');
            setDescription('');
            setImageUrl('');
            setClientSiteUrl('');
        } catch (error) {
            console.error('Error adding work:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="work-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titlu"
            required
            className="work-form-input"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descriere"
            required
            className="work-form-input"
          />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="URL Imagine"
            required
            className="work-form-input"
          />
          <input
            type="url"
            value={clientSiteUrl}
            onChange={(e) => setClientSiteUrl(e.target.value)}
            placeholder="URL Site Client"
            required
            className="work-form-input"
          />
          <button type="submit" className="work-form-button">Adaugă Lucrare</button>
        </form>
      );
    };

export default WorkForm;