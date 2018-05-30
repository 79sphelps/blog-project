import { Component, OnInit, HostListener} from '@angular/core';
import { Router } from '@angular/router';

import { Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance, EasingLogic } from 'ng2-page-scroll';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('menu') menu: ElementRef

  constructor(private _router: Router, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) { 
    if (!localStorage.getItem('mean-token')) {
      this._router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  goToProfile() {
    this._router.navigateByUrl('/profile');
  };

  logout() {
    localStorage.removeItem('mean-token');
    this._router.navigate(['/']);
    this.closeMenu();
  };  

  /*
  @HostListener('mousedown') aboutClick() {
    this.menu.nativeElement.click();
  }
  */

  closeMenu() {
    this.menu.nativeElement.click();
  }

  /*
  public goToTop(): void {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#page-top');
    this.pageScrollService.start(pageScrollInstance);
  };  

  public goToPosts(): void {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#blog-list');
    this.pageScrollService.start(pageScrollInstance);
  };   

  public goToAbout(): void {
      let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#about');
      this.pageScrollService.start(pageScrollInstance);
      this.menu.nativeElement.click();
  };    
  
  public goToContact(): void {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#contact');
    this.pageScrollService.start(pageScrollInstance);
    this.menu.nativeElement.click();
  };  
  */

  public myEasing: EasingLogic = {
    ease: (t: number, b: number, c: number, d: number): number => {
      // easeInOutExpo easing
      if (t === 0) {
          return b;
      }
      if (t === d) {
          return b + c;
      }
      if ((t /= d / 2) < 1) {
          return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      }
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
  };  
}
