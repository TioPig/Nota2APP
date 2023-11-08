import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router : Router,
    public authenticationService: AuthService
  ) { }
  canActivate(): boolean {
    if (this.authenticationService.isAuthenticated()) {
      // Si el usuario está autenticado, permite la activación de la ruta
      return true;
    } else {
      // Si el usuario no está autenticado, redirige a la página de login y no permite la activación de la ruta
      this.router.navigate(['/login']);
      return false;
    }
  }
}