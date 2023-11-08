import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit{

  formLogin = {
    usuario: "",
    password: ""
  };

  usuario: string =""
  password: string =""

  constructor(
    private router: Router,
    private storage: Storage,
    private authService: AuthService,
    private toastController: ToastController
  ) {  }

  async ngOnInit() {
    await this.storage.create()
  }

  async iniciarSesion() {
    const usuario = this.formLogin.usuario
    const password = this.formLogin.password
    const autenticado = this.authService.login(usuario, password);
    
    if (autenticado) {
      // Autenticación exitosa, redirige al usuario a la página de inicio
      let datosEnviar: NavigationExtras = {
        queryParams: {
          nombreUsuario: this.formLogin.usuario
        }
      };
      
      this.router.navigate(['/home'], datosEnviar);
      // Guardando info en el storage
      this.storage.set("nombreUsuario", this.formLogin.usuario);
      this.storage.set("password", this.formLogin.password);
  
      // Resetear el formulario
      this.formLogin.usuario = ''
      this.formLogin.password = ''

    } else {
      // Autenticación fallida, muestra un mensaje de error
      const toast = await this.toastController.create({
        message: 'Credenciales incorrectas. Por favor, inténtalo de nuevo.',
        duration: 2000,
        position: 'top' 
      });
      toast.present();
    }
  }
}

