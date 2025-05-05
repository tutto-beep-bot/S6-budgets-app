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

}
