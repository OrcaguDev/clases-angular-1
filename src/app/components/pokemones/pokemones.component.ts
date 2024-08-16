import { Component } from '@angular/core';
import { JuegoServService } from '../../servicios/juego-serv.service'; //importacion del servicio
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';



@Component({
  selector: 'app-pokemones',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './pokemones.component.html',
  styleUrl: './pokemones.component.css'
})
export class PokemonesComponent {
  nombrePokemonShiny: string = "";
  resultadosPokemon: any ={};
  mostrarResultados: boolean = false;
  juegos =""; //variable para almacenar los juegos
  constructor(private juegoServ: JuegoServService, private router: Router) {
    this.juegos = juegoServ.ObtenerJuegos().join(", "); //se almacena el array de juegos en la variable
  }


  obtenerPokemones() {
    const nombrePokemon = document.getElementById('pokemon-name') as HTMLInputElement;
    if(!nombrePokemon.value){
      alert("Ingrese un nombre de pokemon válido.")
      return;
    }
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

  buscarShiny(){
    if(this.nombrePokemonShiny){
      this.router.navigate(['pokemones', 'shiny', this.nombrePokemonShiny]);
    }
  }

  actualizarNombrePokemonShiny(event: Event){
    this.nombrePokemonShiny = (event.target as HTMLInputElement).value;
  }
}
