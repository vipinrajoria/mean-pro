import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-token',
  templateUrl: './create-token.component.html',
  styleUrls: ['./create-token.component.css']
})
export class CreateTokenComponent implements OnInit {
 user={};
  
  constructor(private router: Router,private http: HttpClient) { }
   ngOnInit() {
  
   }

  generateToken(){
	this.http.post('http://localhost:4200/book/register',this.user)
	.subscribe(res =>{
	  this.user=res;
	  localStorage.setItem('token', JSON.stringify(this.user));
	  this.router.navigate(['/books']);
	}, (err) => {
	  console.log(err);
	}
	);
  }
}
