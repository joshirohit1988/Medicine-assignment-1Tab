import { Injectable } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { Medicine } from '../../features/medicine/models/medicine.model';
import { HttpClient } from '@angular/common/http';
import { MedicineService } from '../../features/medicine/services/medicine.service';
import { AVAILABLE_MEDICINES } from './available-medicine.data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicineAvailableService {

  constructor(private http: HttpClient, private medicineService: MedicineService) { }


  medicineInStock(): Observable<Medicine[]> {

    // return of(MedicinesData as any);
    return combineLatest([of(AVAILABLE_MEDICINES), this.medicineService.getMedicines()])
      .pipe(
        map(([availMeds, cartMeds]) => {
          const finalMeds: Medicine[] = [...availMeds];

          cartMeds.forEach((cartMed) => {
            const index = finalMeds.findIndex((availMed) => availMed.id === cartMed.id);
            if (index > -1) {
              finalMeds[index] = cartMed;
            } else {
              finalMeds.push(cartMed);
            }
          });

          return finalMeds;
        })
      );
  }


}
