import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found.component';



const routes: Routes = [
  {path: 'quickadd', component: HomeComponent},
  {path: 'medicines', loadChildren: () =>  import('./features/medicine/medicine.module').then(m => m.MedicineModule)},
  {path: '', redirectTo: 'quickadd', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
