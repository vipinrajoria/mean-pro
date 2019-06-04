import { Injectable, Injector} from '@angular/core';
import {HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private injector:Injector) {}
  intercept(req,next){
     if(!localStorage.getItem('token')){
	 return next.handle(req);
     }
     else{
	    let authservice=this.injector.get(AuthService);
	    let tokenizereq = req.clone({
	      setHeaders: {
		Authorization: `Bearer ${authservice.getToken()}`
	      }
	    });
	    return next.handle(tokenizereq);
    }
  }
}