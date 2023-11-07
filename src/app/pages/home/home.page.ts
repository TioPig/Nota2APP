import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  mensaje: string = "";
  constructor(private rutaActiva : ActivatedRoute, private storage: Storage, private authService: AuthService) { 

    this.rutaActiva.queryParams.subscribe(params => {

      if(params ['Usuario'])
      {
        this.mensaje = params ['Usuario']
      }

    })

  }

  ngOnInit() {
  }

  async verStorage(){
    let nombre = await this.storage.get("nombreUsuario")
    console.log("Nombre guardado es: " + nombre)
  }


  login() {
    this.authService.login("italo", "1234");

 }
}