import React, { useState } from 'react';
import WorkEditForm from './WorkEditForm';

interface Work {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  clientSiteUrl: string;
  isVisible: boolean;
}

interface WorkCardProps {
  work: Work;
  onDelete: () => void;
  onToggleVisibility: () => void;
  onUpdate: () => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, onDelete, onToggleVisibility, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);

    if(!work.isVisible) {
        return (
            <div className="work-card-empty">
              <button className="toggle" onClick={onToggleVisibility}>
                Arată
              </button>
            </div>
          );
    }

    if(isEditing) {
        return (
            <WorkEditForm
            work={work}
            onWorkUpdated={() => {
              setIsEditing(false);
              onUpdate();
            }}
            onCancel={() => setIsEditing(false)}
          />
        );
    }
    return (
      <div className="work-card">
        <img src={work.imageUrl} alt={work.title} />
        <div className="work-card-content">
          <h3>{work.title}</h3>
          <p>{work.description}</p>
          <a href={work.clientSiteUrl} target="_blank" rel="noopener noreferrer">
            Site-ul clientului
          </a>
          <div>
            <button className='edit' onClick={() => setIsEditing(true)}>Editează</button>
            <button className="delete" onClick={onDelete}>Șterge</button>
            <button className="toggle" onClick={onToggleVisibility}>Ascunde</button>
          </div>
        </div>
      </div>
    );
  };

export default WorkCard;