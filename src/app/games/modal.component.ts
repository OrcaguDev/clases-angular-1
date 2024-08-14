import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>Detalles del Juego</h2>
        <div class="form-group">
          <label for="id">ID:</label>
          <input type="text" id="id" [value]="game.id" readonly>
        </div>
        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="text" id="name" [value]="game.name" (input)="onInputChange('name', $event)">
        </div>
        <div class="form-group">
          <label for="year">Año:</label>
          <input type="text" id="year" [value]="game.year" (input)="onInputChange('year', $event)">
        </div>
        <button class="save-button" (click)="guardarCambios()">Guardar Cambios</button>
        <button class="delete-button" (click)="eliminarJuegoSeleccionado()">Eliminar Juego</button>
        <button class="close-button" (click)="closeModal()">Cerrar</button>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal-content {
      background-color: #ffffff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 100%;
    }
    h2 {
      color: #333;
      margin-bottom: 1.5rem;
      text-align: center;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .close-button {
      display: block;
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .close-button:hover {
      background-color: #0056b3;
    }
    .delete-button {
      display: block;
      width: 100%;
      padding: 0.75rem;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-bottom: 1rem;
    }
    .delete-button:hover {
      background-color: #c82333;
    }
    .save-button {
      display: block;
      width: 100%;
      padding: 0.75rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
      margin-bottom: 1rem;
    }
    .save-button:hover {
      background-color: #218838;
    }
  `]
})
export class GameModalComponent {
  @Input() game: any;
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  editedGame: any;

  ngOnInit() {
    this.editedGame = { ...this.game };
  }

  onInputChange(field: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editedGame[field] = value;
  }

  closeModal() {
    this.close.emit();
  }

  eliminarJuegoSeleccionado() {
    this.delete.emit();
  }

  guardarCambios() {
    this.save.emit(this.editedGame);
  }
}