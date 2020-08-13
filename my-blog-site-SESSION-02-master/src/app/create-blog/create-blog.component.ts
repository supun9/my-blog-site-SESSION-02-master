import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from '../service/blog.service';
import { Blog } from '../model/blog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  currentBlog:Blog;

  blogForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', Validators.required),
    date: new FormControl(),
    imgUrl: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })
  constructor(private blogService: BlogService, private router: Router,private activeRoter: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.activeRoter.snapshot.paramMap.get('id');
    if(id!=0){
      this.blogService.getBlogs().then((val:Blog[])=>{
        console.log(val);
        
        this.currentBlog = val.find(blog => blog.id === id);
        this.blogForm=new FormGroup({
          id: new FormControl(this.currentBlog.id, Validators.required),
          title: new FormControl(this.currentBlog.title, Validators.required),
          date: new FormControl(this.currentBlog.date, Validators.required),
          imgUrl: new FormControl(this.currentBlog.imgUrl, Validators.required),
          description: new FormControl(this.currentBlog.description, Validators.required)
        });
        
  
      });
      
    }else{
      this.blogForm=new FormGroup({
        id: new FormControl(),
        title: new FormControl('', Validators.required),
        date: new FormControl(),
        imgUrl: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required)
      });
    }
  }

  onFormSubmit() {
    const id = +this.activeRoter.snapshot.paramMap.get('id');
    if(id==0){
      if (this.blogForm.valid) {
        this.blogForm.controls.id.setValue(this.getId() + 1);
        this.blogForm.controls.date.setValue(new Date());
        this.blogService.addBlog(this.blogForm.value)
        this.router.navigate([''])
      }else{
        console.log(this.blogForm.valid)
      }
    }else{
      if (this.blogForm.valid) {
        this.blogForm.controls.id.setValue(this.currentBlog.id);
        this.blogForm.controls.date.setValue(new Date());
        this.blogService.editBlog(this.blogForm.value)
        this.router.navigate([''])
      }else{
        console.log(this.blogForm.valid)
      }
    }

  }

  getId() {
    return Math.max.apply(Math, this.blogService.blogs.map(function (o) { return o.id; }))
  }

  get imageUrl() {
    return this.blogForm.value.imgUrl;
  }
}
