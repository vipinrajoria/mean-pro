import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookComponent implements OnInit {
  books: any;
  constructor(private http: HttpClient,private router:Router,private authservice:AuthService) { }
  ngOnInit(){
    if(this.authservice.isAuthenticated()){
    this.http.get('http://localhost:4200/book/',this.books).subscribe(data => {
      this.books = data;
    });
    }
    else{
	this.router.navigate(['/token-create']);
    }

  }
  deleteBook(id){
    this.http.delete('http://localhost:4200/book/'+id)
      .subscribe(res => {
		this.http.get('http://localhost:4200/book').subscribe(data => {
			this.books = data;
		});
	 this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
