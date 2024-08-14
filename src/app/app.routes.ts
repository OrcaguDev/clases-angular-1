import { Routes } from '@angular/router';
import { PokemonesComponent } from './pokemon/pokemones/pokemones.component';
import { GamesComponent } from './games/games.component';
import { InicioComponent } from './inicio/inicio.component';
import { NoAuthComponent } from './no-auth/no-auth.component';
import { LoginComponent } from './login/login.component';

//Guard
import { guardVerificarRutaGuard } from './guard/guard-verificar-ruta.guard';

//Componente hijo
import { ShinyComponent } from './pokemon/shiny/shiny.component';

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
        path: 'no-auth',
        component: NoAuthComponent
    },
    {
        path: 'pokemones',
        component: PokemonesComponent,
        canActivate: [guardVerificarRutaGuard],
        children:[
            {
                path: 'shiny',
                component: ShinyComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'games',
        canActivate: [guardVerificarRutaGuard],
        component: GamesComponent
    }
];