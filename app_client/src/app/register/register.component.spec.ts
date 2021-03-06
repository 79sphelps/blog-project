import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// #1 (~7 core imports)
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// #2 (~6 auth components)
import { RootComponent } from '../root/root.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ProfileComponent } from '../profile/profile.component';
import { LandingComponent } from '../landing/landing.component';

// #3 (3 product components)
import { BlogNewComponent } from '../blog-new/blog-new.component';
import { BlogEditComponent } from '../blog-edit/blog-edit.component';
import { BlogListComponent } from '../blog-list/blog-list.component';

// #4 (3 services)
import { BlogService } from '../services/blog.service';
import { AuthenticationService } from '../services/authentication.service';
import { AuthGuardService } from '../services/auth-guard.service';

// #5 (1 route definition import)
import { ROUTES } from '../app.routing';
import { NavbarComponent } from '../navbar/navbar.component';

import { APP_BASE_HREF } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [
        RootComponent,
        HomeComponent,
        LoginComponent,
        BlogNewComponent,
        BlogEditComponent,
        BlogListComponent,
        RegisterComponent,
        ProfileComponent,
        LandingComponent,
        NavbarComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpModule,
        ROUTES
      ],
      providers: [BlogService, AuthenticationService, AuthGuardService, { provide: APP_BASE_HREF, useValue : '/' }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
