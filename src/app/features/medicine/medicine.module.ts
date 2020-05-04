import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineListComponent } from './medicine-list/medicine-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MedicineActionComponent } from './medicine-action/medicine-action.component';
import { FormsModule } from '@angular/forms';
import { MedicineResolver } from './medicine-resolver.service';
import { MedicineFormGuard } from './medicine-form.guard';



@NgModule({
  declarations: [MedicineListComponent, MedicineActionComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: MedicineListComponent
      },
      {
        path: 'add',
        component: MedicineActionComponent,
        canDeactivate: [MedicineFormGuard]
      },
      {path: ':id',
       redirectTo: ':id/edit',
       pathMatch: 'full'
      },
      {
        path: ':id/edit',
        component: MedicineActionComponent,
        canDeactivate: [MedicineFormGuard],
        resolve: { resolvedData: MedicineResolver }
      },
      {
        path: ':id/clone',
        component: MedicineActionComponent,
        canDeactivate: [MedicineFormGuard],
        resolve: { resolvedData: MedicineResolver }
      },
    ])
  ]
})
export class MedicineModule { }
