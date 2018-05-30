import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../models/post.model';

import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { BlogPostComponent } from '../blog-post/blog-post.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
  animations: [
    trigger('posts', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
        ]), {optional: true}),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1})
          ]))
        ]), {optional: true}),
      ])
    ])
  ]
})
export class BlogListComponent {
  @Input() posts;
  @Output() destroyPostEvent = new EventEmitter();
  @Output() updatePostEvent = new EventEmitter();

  constructor() { 
  }

  
  destroy(post: Post) {
    console.log('blog-list.component destroy...');
    this.destroyPostEvent.emit(post);
  }
  
  update(post: Post) {
    console.log('blog-list.component update...');
    this.updatePostEvent.emit(post);
  }
  
}
