import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);
  constructor(private storage: Storage) {}

  isAuthenticated() {
    return this.authState.value;
   }

   login(usuario: string, pass: string): boolean {
    if ((usuario === 'italo' && pass === '1234') || (usuario === 'juanito' && pass === '1234')) {
      this.authState.next(true);
      return true; // Autenticación exitosa
    } else {
      this.authState.next(false);
      return false; // Autenticación fallida
    }
  }
  logout() {
    this.authState.next(false);
    // Elimina la información de usuario del almacenamiento si es necesario
    this.storage.remove("nombreUsuario");
    this.storage.remove("password");
  }
 
}
