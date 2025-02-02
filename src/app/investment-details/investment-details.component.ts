import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { InvestmentService } from "../investment.service";
import { Investment } from "../investment";

@Component({
  selector: 'app-investment-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './investment-details.component.html',
  styleUrls: ['./investment-details.component.css'],
})
export class InvestmentDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  investmentService = inject(InvestmentService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  investment: Investment | undefined;
  editForm: FormGroup;

  // Notification variables
  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' | 'warning' = 'success';

  applyForm = new FormGroup({
    titreoperation: new FormControl(''),
    entreprise: new FormControl(''),
    ville: new FormControl(''),
    enveloppePrev: new FormControl(0)
  });

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      titreoperation: [''],
      entreprise: [''],
      ville: [''],
      enveloppePrev: [0],
    });
  }

  getRandomImageId(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  async ngOnInit() {
    const investmentLocationId = Number(this.route.snapshot.params['id']);
    this.investment = await this.investmentService.getInvestmentLocationById(investmentLocationId);

    if (this.investment) {
      // Prefill the edit form with fetched investment data
      this.editForm.patchValue({
        titreoperation: this.investment.titreoperation,
        entreprise: this.investment.entreprise,
        ville: this.investment.ville,
        enveloppePrev:  Number(this.investment.enveloppePrev) || 0,
      });
    }
  }

  async submitEditForm() {
     if (this.editForm.valid) {
      const formData = this.editForm.value;

      // Deliver data types to reactively update page after submission of form
       const updatedInvestment: Investment = {
         id: this.investment?.id ?? 0,
         titreoperation: formData.titreoperation || this.investment?.titreoperation || '',
         entreprise: formData.entreprise || this.investment?.entreprise || '',
         ville: formData.ville || this.investment?.ville || '',
         slug: this.investment?.slug || '',
         annee: this.investment?.annee || '',
         mandataire: this.investment?.mandataire || '',
         lycee: this.investment?.lycee || '' ,
         notification: this.investment?.notification || '',
         codeuai: this.investment?.codeuai || '' ,
         longitude: this.investment?. longitude || 0,
         etatAvancement: this.investment?.etatAvancement || '',
         montantVotes: parseFloat(formData.montantVotes) || 0,
         cao: this.investment?.cao || '' ,
         latitude: this.investment?.latitude || 0,
         maitrise: this.investment?.maitrise || '',
         modeDevolution: this.investment?.modeDevolution || '',
         aneeIndividualisation: this.investment?.  aneeIndividualisation || '' ,
         enveloppePrev: parseFloat(formData.enveloppePrev) || 0,
         ppi: this.investment?.ppi || '' ,
       };

        try {
          await this.investmentService.submitEditInvestment(updatedInvestment);

          // Update the local investment object so UI reflects the new values
          this.investment = { ...updatedInvestment };
          this.cdr.detectChanges();

          this.showNotification('Investissement mis à jour avec succès !', 'success');
        } catch (error) {
          console.error('Error submitting form:', error);
          this.showNotification('Échec de la mise à jour de l\'investissement.', 'error');
        }
      } else {
        alert('Veuillez remplir le formulaire correctement.');
       this.showNotification('Investissement mis à jour avec succès !', 'warning');
      }
    }

  showNotification(message: string, type: 'success' | 'error' | 'warning') {
    this.notificationMessage = message;
    this.notificationType = type;

    setTimeout(() => {
      this.notificationMessage = null;
    }, 3000);
  }

}
