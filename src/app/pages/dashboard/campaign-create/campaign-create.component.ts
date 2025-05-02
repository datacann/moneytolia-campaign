import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../firebase.config';

@Component({
  selector: 'app-campaign-create',
  templateUrl: './campaign-create.component.html',
  styleUrls: ['./campaign-create.component.scss'],
  standalone:false
})
export class CampaignCreateComponent {
  campaignForm: FormGroup;
  showSuccessMessage = false;

  constructor(private fb: FormBuilder) {
    this.campaignForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.campaignForm.invalid) return;

    const campaign = {
      title: this.campaignForm.value.title,
      description: this.campaignForm.value.description,
      score: 0,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      await addDoc(collection(db, 'campaigns'), campaign);
      this.showSuccessMessage = true;
      this.campaignForm.reset();

      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
    } catch (err) {
      console.error('Kampanya eklenemedi:', err);
    }
  }
}