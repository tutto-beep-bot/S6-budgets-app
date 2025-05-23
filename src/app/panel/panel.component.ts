import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

  @Output() totalWebCostChange = new EventEmitter<number>();

  form: FormGroup;
  totalWebCost: number = 0;

  constructor(private budgetService: BudgetService, private fb: FormBuilder) {
    this.form = this.fb.group({
      pages: [1],
      languages: [1]
    })

    this.form.valueChanges.subscribe(values => {
      this.totalWebCost = this.budgetService.calculateBudget(
        values.pages,
        values.languages
      );
      this.totalWebCostChange.emit(this.totalWebCost);
    });

  }

  increase(controlName: 'pages' | 'languages') {
    const current = this.form.get(controlName)?.value || 0;
    this.form.get(controlName)?.setValue(current + 1);
  }
  
  decrease(controlName: 'pages' | 'languages') {
    const current = this.form.get(controlName)?.value || 0;
    if (current > 1) {
      this.form.get(controlName)?.setValue(current - 1);
    }
  }

}
