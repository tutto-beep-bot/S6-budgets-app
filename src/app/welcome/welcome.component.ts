import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../services/budget.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { BudgetListComponent } from '../budget-list/budget-list.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-welcome',
  imports: [ReactiveFormsModule, CommonModule, PanelComponent, ClientFormComponent, BudgetListComponent, HeaderComponent],
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


  constructor(private formBuilder: FormBuilder, private budgetService: BudgetService, private router: Router, private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      seo: [false],
      ads: [false],
      web: [false],
      pages: [1],
      languages: [1]
    });

    this.route.queryParams.subscribe(params => {
      this.form.patchValue({
        seo: params['seo'] === 'true',
        ads: params['ads'] === 'true',
        web: params['web'] === 'true',
        pages: parseInt(params['pages'] || '1', 10),
        languages: parseInt(params['lang'] || '1', 10)
      })

      const sum = Object.entries(this.form.value)
      .filter(([key, val]) => this.services.includes(key as keyof typeof this.prices) && val)
      .reduce((acc, [key]) => acc + this.prices[key as keyof typeof this.prices], 0)
    })

    this.form.valueChanges.subscribe(values => {
      const sum = Object.entries(this.form.value)
      .filter(([key, val]) => this.services.includes(key as keyof typeof this.prices) && val)
      .reduce((acc, [key]) => acc + this.prices[key as keyof typeof this.prices], 0)

      this.total.set(sum);

      const queryParams: any = {...values};

      if(this.panelTotal > 0){
        queryParams.pages = this.form.get('pages')?.value || 1;
        queryParams.lang = this.form.get('languages')?.value || 1;
      }

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge'
      })
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
