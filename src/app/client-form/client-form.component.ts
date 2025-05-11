import { Component, EventEmitter, Output } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss'
})
export class ClientFormComponent {

  clientForm: FormGroup;

  @Output() formSubmitted = new EventEmitter<{
    name: string;
    phone: string;
    email: string;
  }>(); 

  constructor(private fb: FormBuilder){
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(){
    if (this.clientForm.valid){
      this.formSubmitted.emit(this.clientForm.value);
      this.clientForm.reset();
    }
  }
}
