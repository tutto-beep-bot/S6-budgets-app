import { Component } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-budget-list',
  imports: [],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent {

  budgets: Signal<any[]>;

  constructor (private budgetService: BudgetService) {
    this.budgets = this.budgetService.getBudgets();
  }

}
