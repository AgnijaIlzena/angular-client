import { Component, inject } from '@angular/core';
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
  styleUrl: './investment-details.component.css'
})
export class InvestmentDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  investmentService = inject(InvestmentService);
  investment: Investment | undefined;
  editForm: FormGroup;

  // create form object
  applyForm = new FormGroup({
    titreoperation: new FormControl(''),
    lentreprise: new FormControl(''),
    ville: new FormControl('')
  });



  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      titreoperation: [''],
      entreprise: [''],
      ville: ['']
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
        ville: this.investment.ville
      });
    }
  }

  async submitEditForm() {
    console.log("this.investment.id", this.investment);
    if (this.editForm.valid) {
      const formData = this.editForm.value;
      console.log("formData", formData);

        try {
          const response = await this.investmentService.submitEditInvestment(
{
              id: this.investment?.id,
              titreoperation: formData.titreoperation ?? '',
              entreprise: formData.entreprise ?? '',
              ville: formData.ville ?? ''
            }
          )

          alert('Form submitted successfully!');
        } catch (error) {
          console.error('Error submitting form:', error);
          alert('Failed to submit form.');
        }
      } else {
        alert('Please fill out the form correctly.');
      }
    }

}
