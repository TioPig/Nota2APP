import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);
  constructor() {}

  isAuthenticated() {
    return this.authState.value;
   }

   login(usuario:string, pass:string) {

    if(usuario == 'italo' && pass == '1234'){
 
     this.authState.next(true);
 
    } else {
 
    this.authState.next(false);
 
    }
 
  }
 
 
}
