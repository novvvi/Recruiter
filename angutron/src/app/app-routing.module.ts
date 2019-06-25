import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './components/new/new.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'new',
        component: NewComponent
    },
    {
        path: 'edit',
        component: EditComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
