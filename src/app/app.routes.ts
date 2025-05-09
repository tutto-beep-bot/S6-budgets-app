import { Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { WelcomeComponent } from './welcome/welcome.component';


export const routes: Routes = [
    {path: '', component: StartPageComponent},
    {path: 'welcome', component: WelcomeComponent}
];
