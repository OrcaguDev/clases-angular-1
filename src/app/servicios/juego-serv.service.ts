import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //importacion de http
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root' //esto es para que se pueda inyectar en toda la aplicacion
})
export class JuegoServService {
  private url = "https://pokeapi.co/api/v2/pokemon/";
  constructor(private http: HttpClient) { } //inicializacion de http


  juegos: string[] = ["Pokemon", "Mario", "Zelda", "Pacman"]; //array de juegos

  ObtenerJuegos(){
    return this.juegos; //metodo para obtener los juegos
  }

  ObtenerPokemonUrl(nombrePokemon: string): Observable<any> {
    return this.http.get(`${this.url}${nombrePokemon.toLowerCase()}`);
  }
  getPokemonShiny(nombrePokemon: string): Observable<any> {
    return this.http.get(`${this.url}${nombrePokemon.toLowerCase()}/shiny`);
  }
}
