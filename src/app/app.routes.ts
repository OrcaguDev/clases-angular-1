import { Routes } from '@angular/router';
import { PokemonesComponent } from './components/pokemones/pokemones.component';
import { GamesComponent } from './components/games/games.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';

//Error 404
import { Error404Component } from './components/error404/error404.component';

//Guard
import { guardVerificarRutaGuard } from './guard/guard/guard-verificar-ruta.guard';

//Componente hijo
import { ShinyComponent } from './components/shiny/shiny.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [guardVerificarRutaGuard],
        component: InicioComponent
    },
    {
        path: 'inicio',
        canActivate: [guardVerificarRutaGuard],
        component: InicioComponent
    },
    {
        path: 'pokemones',
        component: PokemonesComponent,
        canActivate: [guardVerificarRutaGuard],
        children:[
            {
                path: 'shiny/:nombre',
                component: ShinyComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'games',
        canActivate: [guardVerificarRutaGuard],
        component: GamesComponent
    },
    {
        path: '**',
        component: Error404Component
    }
];