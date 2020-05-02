import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MedicineActionComponent } from './medicine-action/medicine-action.component';

@Injectable({
  providedIn: 'root'
})
export class MedicineFormGuard implements CanDeactivate<MedicineActionComponent> {
  canDeactivate(
    component: MedicineActionComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (component.medicineForm.dirty) {
      const medicineName = component.medicine.name || 'New Medicine';
      return confirm(`Navigate away and lose all changes to ${medicineName}?`);
    }
    return true;
  }

}
