import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';

import { AuthGuardService } from './services/auth-guard.service';

export const AppModules: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
    { path: 'landing', component: LandingComponent, canActivate: [AuthGuardService] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: '**', component: LoginComponent }
];

export const ROUTES: ModuleWithProviders = RouterModule.forRoot(AppModules);
