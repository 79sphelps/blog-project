import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HOST_IP } from './service.constants';

@Injectable()
export class BlogService {

  constructor(private _http: Http) { }

  getPosts() {
    return this._http.get(`${HOST_IP}/api/posts`)
    .map(res => res.json())
    .toPromise();
  }

  getPost(post: Post) {
    return this._http.get(`${HOST_IP}/api/posts/` + post._id)
    .map(res => res.json())
    .toPromise();
  }

  create(post: Post) {
    console.log('blog.service create...');
    return this._http.post(`${HOST_IP}/api/posts`, post)
    .map(res => res.json())
    .toPromise();
  }

  update(post: Post) {
    console.log('blog.service update...' + post._id);
    console.log(post._id);
    return this._http.put(`${HOST_IP}/api/posts/` + post._id, post)
    .map(res => res.json())
    .toPromise();
  }

  destroy(post: Post) {
    console.log('blog.service destroy...');
    return this._http.delete(`${HOST_IP}/api/posts/` + post._id)
    .map(res => res.json())
    .toPromise();
  }
}
