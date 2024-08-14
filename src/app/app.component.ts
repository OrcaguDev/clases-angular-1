import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { JuegoServService } from './servicios/juego-serv.service'; //importacion del servicio

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GamesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(GamesComponent) gamesComponent!: GamesComponent;
  juegos =""; //variable para almacenar los juegos
  constructor(private juegoServ: JuegoServService){
    this.juegos = juegoServ.ObtenerJuegos().join(", "); //se almacena el array de juegos en la variable
  }
  username = '';
  isLoggedIn = false;
  resultadosPokemon: any;
  mostrarResultados: boolean = false;
  onLogin(inputUsername: string):void{
    if(inputUsername.trim()!== ''){
      this.username = inputUsername;
      this.isLoggedIn = true;
    }else{
      alert('Por favor, ingrese un nombre de usuario válido');
    }
  }

  onLogout():void{
    this.username = '';
    this.isLoggedIn = false;
  }

  addGame() {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const yearInput = document.getElementById('year') as HTMLInputElement;
    
    const name = nameInput.value;
    const year = parseInt(yearInput.value, 10);
    
    if (name && !isNaN(year)) {
      this.gamesComponent.addGame(name, year);
      
      // Limpiar los campos después de agregar el juego
      nameInput.value = '';
      yearInput.value = '';
    } else {
      alert('Por favor, ingrese un nombre y un año válido');
    }
  }

  editGame(id: number) {
    console.log(id);
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