import React, { useState, useEffect } from 'react';
import WorkCard from './WorkCard';
import WorkForm from './WorkForm';
import api from '../services/api';

interface Work {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  clientSiteUrl: string;
  isVisible: boolean;
}

const WorkList: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  
  const fetchWorks = async () => {
    try {
      const response = await api.get('/works');
      console.log(response.data);
      setWorks(response.data);
    } catch (error) {
      console.error('Error fetching works:', error);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/works/${id}`);
      fetchWorks();
    } catch (error) {
      console.error('Error deleting work:', error);
    }
  };

  const handleToggleVisibility = async (id: string, isVisible: boolean) => {
    try {
      await api.put(`/works/${id}`, { isVisible: !isVisible });
      fetchWorks();
    } catch (error) {
      console.error('Error updating work visibility:', error);
    }
  };

  return (
    <div>
      <div className='buttonAfiseaza'></div>  
      <div className="work-form-container page-footer">
        <WorkForm onWorkAdded={fetchWorks} />
      </div>  
      <div className="work-list">
        {works.map((work) => (
          <WorkCard
            key={work.id}
            work={work}
            onDelete={() => handleDelete(work.id)}
            onToggleVisibility={() => handleToggleVisibility(work.id, work.isVisible)}
            onUpdate={fetchWorks}
          />
        ))}
      </div>
      
    </div>
  );
};

export default WorkList;