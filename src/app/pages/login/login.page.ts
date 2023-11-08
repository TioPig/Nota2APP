import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit{
  loginForm = this.formBuilder.group({
    usuario: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private storage: Storage,
    private authService: AuthService,
    private toastController: ToastController,
    private formBuilder: FormBuilder
  ) {  }

  async ngOnInit() {
    await this.storage.create();
  }

  async iniciarSesion() {
    const autenticado = this.authService.login(this.loginForm.value.usuario, this.loginForm.value.password);
    
    if (autenticado) {
      // Autenticación exitosa, redirige al usuario a la página de inicio
      let datosEnviar: NavigationExtras = {
        queryParams: {
          nombreUsuario: this.loginForm.value.usuario
        }
      };
      
      this.router.navigate(['/home'], datosEnviar);
      // Guardando info en el storage
      this.storage.set("nombreUsuario", this.loginForm.value.usuario);
      this.storage.set("password", this.loginForm.value.password);
  
      // Resetear el formulario
      this.loginForm.reset();
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

