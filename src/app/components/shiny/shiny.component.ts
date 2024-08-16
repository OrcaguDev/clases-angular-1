import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegoServService } from '../../servicios/juego-serv.service';

@Component({
  selector: 'app-shiny',
  standalone: true,
  imports: [],
  templateUrl: './shiny.component.html',
  styleUrl: './shiny.component.css'
})
export class ShinyComponent implements OnInit {
nombrePokemonShiny: string = "";
  constructor(private route: ActivatedRoute,private juegoServ: JuegoServService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nombrePokemonShiny = params['nombre'];
    });
  }

  cargarPokemonShiny(){
    this.juegoServ.getPokemonShiny(this.nombrePokemonShiny).subscribe(
      (data) =>{
        console.log(data);
        this.nombrePokemonShiny = data.name;
      },
      (error) =>{
        console.log(error);
        console.log("No se encontró el Pokémon Shiny");
      }
    );
  }
}
