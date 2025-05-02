import { Component, OnInit } from '@angular/core';
import { collection, getDocs, doc, updateDoc, deleteDoc, getFirestore, getDoc } from 'firebase/firestore';
import { db, firestore } from '../../../../firebase.config';
import { CampaignUpdateModalComponent } from '../../../campaign-update-modal/campaign-update-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { signal, computed } from '@angular/core';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
  standalone: false
})
export class CampaignListComponent implements OnInit {
  campaigns = signal<any[]>([]);
  totalCampaignCount = computed(() => this.campaigns().length);

  constructor(private dialog: MatDialog) {}

  async ngOnInit() {
    await this.getCampaigns();
  }

  openUpdateModal(campaign: any): void {
    const dialogRef = this.dialog.open(CampaignUpdateModalComponent, {
      width: '400px',
      data: campaign
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        console.log(result);
        try {
          const docRef = doc(firestore, 'campaigns', result.id);
          await updateDoc(docRef, {
            title: result.title,
            description: result.description
          });
          console.log('Firebase’e başarıyla güncellendi');
          this.getCampaigns(); 
        } catch (error) {
          console.error('Güncelleme hatası:', error);
        }
      }
    });
  }

  async getCampaigns() {
    try {
      const querySnapshot = await getDocs(collection(db, 'campaigns'));
      this.campaigns.set(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })));
      console.log(this.campaigns());
    } catch (error) {
      console.error('Kampanyalar alınırken hata oluştu:', error);
    }
  }

  async updateScore(id: string, scoreChange: number) {
    try {
      const campaignRef = doc(db, 'campaigns', id);
      const campaignSnapshot = await getDoc(campaignRef);
      if (campaignSnapshot.exists()) {
        const currentScore = campaignSnapshot.data()['score'] || 0;
        const newScore = currentScore + scoreChange; 
        await updateDoc(campaignRef, { score: newScore });
        await this.getCampaigns();
      } else {
        console.error(`Kampanya ${id} bulunamadı.`);
      }
    } catch (error) {
      console.error(`Kampanya ${id} puanı güncellenirken hata oluştu:`, error);
    }
  }

  async deleteCampaign(id: string) {
    try {
      const campaignRef = doc(db, 'campaigns', id);
      await deleteDoc(campaignRef);
      await this.getCampaigns();
    } catch (error) {
      console.error(`Kampanya ${id} silinirken hata oluştu:`, error);
    }
  }
}