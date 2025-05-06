import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WelcomeComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'budgets-app';
}
