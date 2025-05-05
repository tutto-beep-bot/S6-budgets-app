import { Component, Inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [ReactiveFormsModule, FormBuilder, FormGroup, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})

export class WelcomeComponent {
  private formBuilder = Inject(FormBuilder);

  form: FormGroup = this.formBuilder.group({
    seo: [false],
    ads: [false],
    web: [false]
  });

  prices = {
    seo: 300, 
    ads: 400,
    web: 500,
  }

  total = signal(0);

  constructor() {
    this.form.valueChanges.subscribe(values => {
      const sum = Object.entries(values)
        .filter(([_, checked]) => checked)
        .reduce((acc, [key]) => acc + this.prices[key as keyof typeof this.prices], 0)

      this.total.set(sum)
    })
  }
}
