import { Component } from '@angular/core';
import { JuegoServService } from '../../servicios/juego-serv.service'; //importacion del servicio



@Component({
  selector: 'app-pokemones',
  standalone: true,
  imports: [],
  templateUrl: './pokemones.component.html',
  styleUrl: './pokemones.component.css'
})
export class PokemonesComponent {
  resultadosPokemon: any ={};
  mostrarResultados: boolean = false;
  juegos =""; //variable para almacenar los juegos
  constructor(private juegoServ: JuegoServService) {
    this.juegos = juegoServ.ObtenerJuegos().join(", "); //se almacena el array de juegos en la variable
  }


  obtenerPokemones() {
    const nombrePokemon = document.getElementById('pokemon-name') as HTMLInputElement;
    this.juegoServ.ObtenerPokemonUrl(nombrePokemon.value).subscribe(
      (data) => {
        this.resultadosPokemon = {
          imagen: data.sprites.other['official-artwork'].front_default,
          nombre: data.species.name
        };
        this.mostrarResultados = true;
      },
      (error) => {
        console.error('Error al obtener los pokemones:', error);
      }
    );
  }
  volverABuscar(){
    this.mostrarResultados = false;
    this.resultadosPokemon = null;
  }
}
