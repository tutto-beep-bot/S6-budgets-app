import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    service = new BudgetService();
  });

  it('should calculate 0 € for 1 page and 1 language', () => {
    expect(service.calculateBudget(1, 1)).toBe(0);
  });

  it('should calculate 30 € for 2 pages and 1 language', () => {
    expect(service.calculateBudget(2, 1)).toBe(30);
  });

  it('should calculate 90 € for 2 pages and 3 languages', () => {
    expect(service.calculateBudget(2, 3)).toBe(90);
  });
});
