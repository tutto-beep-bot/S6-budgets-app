import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'

@Component({
  selector: 'app-start-page',
  imports: [RouterModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
  constructor(private router: Router){}
  
  goToApp(){
    this.router.navigate(['/welcome']);
  }
}
