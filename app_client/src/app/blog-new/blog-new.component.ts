import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Post } from '../models/post.model';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'app-blog-new',
  templateUrl: './blog-new.component.html',
  styleUrls: ['./blog-new.component.css']
})
export class BlogNewComponent implements OnInit {
  newPost: Post;
  @Output() createPostEvent = new EventEmitter();
  @ViewChild('closeBtn') closeBtn: ElementRef;

  form: FormGroup;
  title: FormControl; 
  description: FormControl;

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.title = new FormControl("", Validators.required);
    this.description = new FormControl("", Validators.required);
  }

  createForm() {
    this.form = new FormGroup({
      newPost: new FormGroup({ title: this.title, description: this.description })
    })
  }

  constructor(private _changeDetectionRef : ChangeDetectorRef) { 
    this.newPost = new Post();
  }

  /*
  constructor(fb: FormBuilder) { 
    //this.newPost = new Post();
    this.form = fb.group({
      "title": this.title,
      "description": this.description
    });

    this.form.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .filter(data => data.title.length > 5)
      .filter(data => this.form.valid)
      .map(data => {
        data.title = data.title.replace(/<(?:.|\n)*?>/gm, '');
        return data;
      })
      .subscribe(data => console.log(JSON.stringify(data)));
  }
  */



  create() {
    console.log('blog-new.component create...');
    this.createPostEvent.emit(this.newPost);
    this.closeBtn.nativeElement.click();
    this._changeDetectionRef.detectChanges();
  }
}
