import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  mensaje: string = "";
  constructor(private rutaActiva : ActivatedRoute, 
              private storage: Storage, 
              private authService: AuthService,
              private router: Router) 
  { 

    this.rutaActiva.queryParams.subscribe(params => {

      if(params ['nombreUsuario'])
      {
        this.mensaje = params ['nombreUsuario']
      }

    })

  }

  ngOnInit() {
  }

  async verStorage(){
    let nombre = await this.storage.get("nombreUsuario")
    console.log("Nombre guardado es: " + nombre)
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}