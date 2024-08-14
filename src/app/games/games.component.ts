import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameModalComponent } from './modal.component';
@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, GameModalComponent],
  template: `
    <ul class="games-list" id="games-list">
      @for (game of games; track game.id) {
        <li class="game-item" (click)="showGameDetails(game)">
          <span class="game-id">{{game.id}}</span>
          <span class="game-name">{{game.name}}</span>
          <span class="game-year">{{game.year}}</span>
        </li>
      }
    </ul>
    @if (selectedGame) {
      <app-game-modal 
        [game]="selectedGame" 
        (close)="closeModal()"
        (delete)="eliminarJuegoSeleccionado()"
        (save)="guardarCambiosJuego($event)"
      ></app-game-modal>
    }
  `,
  styleUrl: './games.component.css'
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
}