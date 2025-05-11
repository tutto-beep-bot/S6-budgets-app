import { Component, computed, signal, Signal } from '@angular/core';
import { BudgetService } from '../services/budget.service';


@Component({
  selector: 'app-budget-list',
  imports: [],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})
export class BudgetListComponent {

  sortType = signal<'date' | 'price' | 'name'>('date');
  searchTerm = signal('');
  isSearchOpen = signal(false);

  constructor(private budgetService: BudgetService) {}

  budgets = computed(() => {
    const list = this.budgetService.budgets();
    const search = this.searchTerm().toLowerCase();
    const filtered = list.filter(b => b.name.toLowerCase().includes(search));
  
    console.log('Filtrado: ', search);
  
    switch (this.sortType()) {
      case 'price':
        return [...filtered].sort((a, b) => b.total - a.total);
      case 'name':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case 'date':
      default:
        return [...filtered].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
  });

  setSort(type: 'date' | 'price' | 'name') {
    this.sortType.set(type);
  }

  updateSearch(event: Event){
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value)
  }

  toggleSearch() {
    this.isSearchOpen.update(open => !open)
  }

}
