import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BudgetService {

    private budgetList = signal<any[]>([]);

    calculateBudget(pages: number, languages: number): number {
        return (pages + languages - 2)  * 30;
    }

    addBudget(budget: any){
        const withDate = { ...budget, date: new Date()};
        this.budgetList.update(current => [...current, budget]);
    }

    getBudgets(){
        return this.budgetList.asReadonly();
    }
}