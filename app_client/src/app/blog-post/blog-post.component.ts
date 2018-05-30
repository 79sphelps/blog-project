import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  @Input() post: Post;
  @Output() destroyPostEvent = new EventEmitter();
  @Output() updatePostEvent = new EventEmitter();
  readMore: String = "";
  @ViewChild('readMoreLess') readText: ElementRef;

  constructor() { 
  }

  ngOnInit() {
    this.readText.nativeElement.textContent = 'See More';
  }

  destroy(post: Post) {
    console.log('blog-list.component destroy...');
    this.destroyPostEvent.emit(post);
  }
  
  update(post: Post) {
    console.log('blog-list.component update...');
    this.updatePostEvent.emit(post);
  }

  updateReadText() {
    this.post.display = !this.post.display;
    if (this.post.display) {
      this.readText.nativeElement.textContent = 'Show Less';
    } else {
      this.readText.nativeElement.textContent = 'See More';
    }
  }
}
