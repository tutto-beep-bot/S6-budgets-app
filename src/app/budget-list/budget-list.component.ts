import { Component, computed, signal, Signal } from '@angular/core';
import { BudgetService } from '../services/budget.service';


@Component({
  selector: 'app-budget-list',
  imports: [],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})
export class BudgetListComponent {

  sortType = signal<'date' | 'price' | 'name'>('date');
  searchTerm = signal('');

  constructor(private budgetService: BudgetService) {}

  budgets = computed(() => {
    const list = this.budgetService.getBudgets()();
    const search = this.searchTerm().toLowerCase();

    const filtered = list.filter(b => b.name.toLowerCase().includes(search));

    switch (this.sortType()) {
      case 'price':
        return [...list].sort((a, b) => b.total - a.total);
      case 'name':
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case 'date':
      default:
        return [...list].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
  });

  setSort(type: 'date' | 'price' | 'name') {
    this.sortType.set(type);
  }

  updateSearch(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value)
  }

}
