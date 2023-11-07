import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin={
    usuario: "",
    password: ""
  }

  usuario: string =""
  password: string =""



  constructor(private router: Router, private storage: Storage) { 

  }

  async ngOnInit() {

    await this.storage.create();
  }

  iniciarSesion()
  {


    console.log("Usuario " + this.formLogin.usuario)
    console.log("Contraseña " + this.formLogin.password)

    let datosEnviar : NavigationExtras = {
      queryParams : {
        Usuario : this.formLogin.usuario
      }
    }

    this.router.navigate(['/home'], datosEnviar)

    //Guardando info en el storage

    this.storage.set("nombreUsuario","Italo")
    





  }
}
