import { Injectable } from '@nestjs/common';

@Injectable()
export class WorksService {
    private works = [
        {
            id: '1',
            title: 'Proiect 1',
            description: 'Descriere proiect 1',
            imageUrl: 'https://via.placeholder.com/150',
            clientSiteUrl: 'https://example.com',
            isVisible: true,
        },
    ];
    findAll() {
        return this.works;
      }
    
      findOne(id: string) {
        return this.works.find(work => work.id === id);
      }
    
      create(createWorkDto: any) {
        const lastWork = this.works.length > 0 ? this.works[this.works.length - 1] : null;
        const newId = lastWork ? (parseInt(lastWork.id) + 1).toString() :'1';

        const newWork = { id: newId, ...createWorkDto };
        this.works.push(newWork);
        return newWork;
      }
    
      update(id: string, updateWorkDto: any) {
        const index = this.works.findIndex(work => work.id === id);
        if (index !== -1) {
          this.works[index] = { ...this.works[index], ...updateWorkDto };
          return this.works[index];
        }
        return null;
      }
    
      remove(id: string) {
        const index = this.works.findIndex(work => work.id === id);
        if (index !== -1) {
          const removedWork = this.works.splice(index, 1);
          return removedWork[0];
        }
        return null;
      }

}
