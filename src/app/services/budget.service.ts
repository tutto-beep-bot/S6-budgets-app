import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BudgetService {
  calculateBudget(pages: number, languages: number): number {
    return (pages * languages * 30);
  }
}