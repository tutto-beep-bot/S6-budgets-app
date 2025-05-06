import { Component, Inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [ReactiveFormsModule, CommonModule],
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

  constructor(private formBuilder: FormBuilder) {
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
}
