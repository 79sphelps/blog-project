import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  @Input() post;
  @Output() updatePostEvent = new EventEmitter();
  editPost: Post;

  constructor() { 
    this.editPost = new Post();
  }

  ngOnInit() {
    Object.assign(this.editPost, this.post);
  }

  update() {
    console.log('blog-list.component update...');
    this.editPost.editable = false;
    this.updatePostEvent.emit(this.editPost);
    //this.closeBtn.nativeElement.click();
  }

}
