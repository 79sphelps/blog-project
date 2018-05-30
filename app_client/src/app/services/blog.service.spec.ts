import { TestBed, inject, ComponentFixture } from '@angular/core/testing';

import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// #4 (3 services)
import { BlogService } from '../services/blog.service';
import { AuthenticationService } from '../services/authentication.service';
import { AuthGuardService } from '../services/auth-guard.service';


describe('BlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterTestingModule, BlogService, AuthenticationService, AuthGuardService],
      imports: [
        HttpClientModule,
        HttpModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([BlogService], (service: BlogService) => {
    expect(service).toBeTruthy();
  }));


});
