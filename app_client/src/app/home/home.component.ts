import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../models/post.model';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //@Output() createBlogEvent = new EventEmitter();

  posts: Array<Post> = [];

  constructor(private _postsService: BlogService) { 

  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this._postsService.getPosts()
    .then(posts => this.posts = posts)
    .catch(err => console.log(err));
  };

  create(post: Post) {
    console.log('home.component create...');
    this._postsService.create(post)
    .then(post => this.getPosts())
    .catch(err => console.log(err));
  };

  update(post: Post) {
    console.log('home.component update...' + post._id);
    this._postsService.update(post)
    .then(status => this.getPosts())
    .catch(err => console.log(err));
  };

  destroy(post: Post) {
    console.log('home.component destroy...');
    this._postsService.destroy(post)
    .then(status => this.getPosts())
    .catch(err => console.log(err));
  }
}
