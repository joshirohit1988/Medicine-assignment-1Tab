import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { MedicineService } from './services/medicine.service';
import { MedicineResolvedData, ActionMode } from './models/medicine.model';


@Injectable({
  providedIn: 'root'
})
export class MedicineResolver implements Resolve<MedicineResolvedData> {

  constructor(private medicineService: MedicineService) { }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<MedicineResolvedData> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Medicine id is not a number: ${id}`;
      console.error(message);
      return of({ medicine: null, error: message });
    }
    const resolvedType = route.routeConfig.path === ':id/clone' ? ActionMode.clone :  ActionMode.edit;
    return this.medicineService.getMedicine(+id)
      .pipe(
        map(medicine => ({ medicine: {...medicine} , resolvedType}) ),
        catchError(error => {
          const message = `Medicine Service Retrieval error: ${error}`;
          console.error(message);
          return of({ medicine: null, error: message });
        })
      );
  }

}
