import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { firestore } from '../../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-campaign-update-modal',
  templateUrl: './campaign-update-modal.component.html',
  styleUrls: ['./campaign-update-modal.component.scss'],
  standalone:false
})
export class CampaignUpdateModalComponent {

  constructor(
    public dialogRef: MatDialogRef<CampaignUpdateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateCampaign() {
  
    if (this.data?.id) {
      const docRef = doc(firestore, 'campaigns', this.data.id);
  
      updateDoc(docRef, {
        title: this.data.title,
        description: this.data.description
      })
      .then(() => {
        console.log('Firebase’e başarıyla güncellendi!');
        this.dialogRef.close(this.data);
      })
      .catch((error) => {
        console.error('Firebase güncelleme hatası:', error);
      });
    } else {
      console.error('Kampanya ID bulunamadı');
    }
    this.snackBar.open('Kampanya başarıyla güncellendi!', 'Kapat', {
      duration: 3000,
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
      
    });
  }
}