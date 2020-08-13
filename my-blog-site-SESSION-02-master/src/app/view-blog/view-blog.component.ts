import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../service/blog.service';
import { Blog } from '../model/blog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {
  currentBlog: Blog;
  constructor(private activeRoter: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    
    const id = +this.activeRoter.snapshot.paramMap.get('id');
   
    console.log(this.blogService.blogs.length)
    if(this.blogService.blogs.length==0){
      this.blogService.getBlogs().then((val:Blog[])=>{
        console.log(val);
        
        this.currentBlog = val.find(blog => blog.id === id);
        
  
      });
    }else{
      this.currentBlog = this.blogService.blogs.find(blog => blog.id === id);
    }
    
   
    
    
    
    // this.currentBlog = this.blogService.blogs.find(blog => blog.id === id);
    // console.log(this.currentBlog);
    // console.log(this.blogService.blogs)
  }

}
