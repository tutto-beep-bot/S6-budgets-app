import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../services/budget.service';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-welcome',
  imports: [ReactiveFormsModule, CommonModule, PanelComponent, ClientFormComponent],
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})

export class WelcomeComponent {
  form: FormGroup;

  prices = {
    seo: 300,
    ads: 400,
    web: 500,
  };

  services: Array<keyof typeof this.prices> = ['seo', 'ads', 'web'];

  total = signal(0);
  panelTotal: number = 0;

  
  constructor(private formBuilder: FormBuilder, private budgetService: BudgetService) {
    this.form = this.formBuilder.group({
      seo: [false],
      ads: [false],
      web: [false],
    });

    this.form.valueChanges.subscribe(values => {
      const sum = Object.entries(values)
        .filter(([_, checked]) => checked)
        .reduce((acc, [key]) => acc + this.prices[key as keyof typeof this.prices], 0);

      this.total.set(sum);
    });
  }

  handleTotalChange(newCost: number){
    this.panelTotal = newCost;
  }

  handleClientForm(clientData: {name: string; phone: string; email: string}){
    const selectedServices = this.services.filter(s => this.form.get(s)?.value);

    const newBudget = {
      ...clientData,
      services: selectedServices,
      total: this.total() + this.panelTotal
    }

    this.budgetService.addBudget(newBudget);
    this.form.reset();
    this.panelTotal = 0;
  }

}
