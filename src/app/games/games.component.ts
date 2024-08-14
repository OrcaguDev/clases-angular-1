import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModalComponent } from './modal.component';
@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, GameModalComponent],
  templateUrl: './games.component.html',
  styleUrl: '../../styles.css'
})
export class GamesComponent {
  games = [
    {id: 1, name: 'Super Mario', year: 1990},
    {id: 2, name: 'Mario Kart', year: 1995},
    {id: 3, name: 'Metal Slug', year: 1996},
  ];

  selectedGame: any = null;

  eliminarJuegoSeleccionado() {
    if (this.selectedGame) {
      this.games = this.games.filter(juego => juego.id !== this.selectedGame.id);
      console.log('Juego eliminado:', this.selectedGame);
      console.log('Juegos restantes:', this.games);
      this.closeModal();
    }
  }
  guardarCambiosJuego(juegoActualizado: any) {
    const index = this.games.findIndex(juego => juego.id === juegoActualizado.id);
    if (index !== -1) {
      this.games[index] = juegoActualizado;
      console.log('Juego actualizado:', juegoActualizado);
      console.log('Lista de juegos actualizada:', this.games);
    }
    this.closeModal();
  }
  
  addGame(name: string, year: number) {
    const newId = this.games.length > 0 ? Math.max(...this.games.map(g => g.id)) + 1 : 1;
    this.games.push({ id: newId, name, year });
  }

  closeModal() {
    this.selectedGame = null;
  }
  showGameDetails(game: any) {
    this.selectedGame = game;
  }

  handleAddGame() {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const yearInput = document.getElementById('year') as HTMLInputElement;
    
    const name = nameInput.value.trim();
    const year = parseInt(yearInput.value, 10);
    
    if (name && !isNaN(year)) {
      this.addGame(name, year);
      
      // Limpiar los campos después de agregar el juego
      nameInput.value = '';
      yearInput.value = '';
      
      console.log('Juego añadido:', { name, year });
      console.log('Lista de juegos actualizada:', this.games);
    } else {
      alert('Por favor, ingrese un nombre y un año válido');
    }
  }

  editGame(id: number) {
    console.log(id);
  }

}