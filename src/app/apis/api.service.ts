import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  apiUrl2= ''
  getPokemon(name: String = ''){
    this.apiUrl2 = this.apiUrl + name
    return this.http.get(this.apiUrl2)
  }

}
