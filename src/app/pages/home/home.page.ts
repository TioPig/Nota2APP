import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/apis/api.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  formPoke = {
    pokeName: ""
  };
  pokeName: string = "258";
  pokemon: any = [];
  mensaje: string = "";
  urlPoke: string = "";
  constructor(private rutaActiva : ActivatedRoute, 
              private storage: Storage, 
              private authService: AuthService,
              private router: Router,
              private api: ApiService) 
  { 

    this.rutaActiva.queryParams.subscribe(params => {

      if(params ['nombreUsuario'])
      {
        this.mensaje = params ['nombreUsuario']
      }

    })
    this.api.getPokemon(this.pokeName).subscribe((res) => {
      this.pokemon = res
      this.urlPoke = this.pokemon.sprites.front_default
      console.log(this.pokemon);
  
     }, (error)=>{
  
      console.log(error);
  
     });
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

  
  cambiarPokemon(){
    
    this.api.getPokemon(this.formPoke.pokeName.toLowerCase()).subscribe((res) => {
      this.pokemon = res
      this.urlPoke = this.pokemon.sprites.front_default
    })
    }
}