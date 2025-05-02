import { Injectable, signal } from '@angular/core';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

@Injectable({ providedIn: 'root' })
export class CampaignStateService {
  campaigns = signal<any[]>([]);

  constructor() {
    this.loadCampaigns();
  }

  async loadCampaigns() {
    const snapshot = await getDocs(collection(db, 'campaigns'));
    const campaigns = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    this.campaigns.set(campaigns);
  }

  async updateScore(id: string, delta: number) {
    const current = this.campaigns();
    const campaign = current.find(c => c.id === id);
    if (!campaign) return;

    const newScore = (campaign.score || 0) + delta;

    try {
      const ref = doc(db, 'campaigns', id);
      await updateDoc(ref, { score: newScore });

      this.campaigns.set(
        current.map(c =>
          c.id === id ? { ...c, score: newScore } : c
        )
      );
    } catch (e) {
      console.error('Score güncelleme hatası:', e);
    }
  }

  async updateCampaign(id: string, title: string, description: string) {
    try {
      const docRef = doc(db, 'campaigns', id);
      await updateDoc(docRef, { title, description });
  
      this.campaigns.set(
        this.campaigns().map(c =>
          c.id === id ? { ...c, title, description } : c
        )
      );
    } catch (error) {
      console.error('Güncelleme hatası:', error);
    }
  }
  
  async deleteCampaign(id: string) {
    try {
      const docRef = doc(db, 'campaigns', id);
      await deleteDoc(docRef);
      this.campaigns.set(this.campaigns().filter(c => c.id !== id));
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  }
}