import { Routes } from '@angular/router';
import { PokemonesComponent } from './pokemon/pokemones/pokemones.component';
import { GamesComponent } from './games/games.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    },
    {
        path: 'inicio',
        component: InicioComponent
    },
    {
        path: 'pokemones',
        component: PokemonesComponent
    },
    {
        path: 'games',
        component: GamesComponent
    }
];