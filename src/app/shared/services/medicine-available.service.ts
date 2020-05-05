import { Injectable } from '@angular/core';
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { Medicine } from '../../features/medicine/models/medicine.model';
import { HttpClient } from '@angular/common/http';
import { MedicineService } from '../../features/medicine/services/medicine.service';
import { AVAILABLE_MEDICINES } from './available-medicine.data';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicineAvailableService {

  searchBoxSubject =  new BehaviorSubject<string>('');
  searchBoxValue$: Observable<string>;

  constructor(private http: HttpClient, private medicineService: MedicineService) {
    this.searchBoxValue$ = this.searchBoxSubject.asObservable().pipe(
      map((val) => val.trim()),
      distinctUntilChanged()
    );
  }

  medicineInStock(): Observable<Medicine[]> {

    // return of(MedicinesData as any);
    return combineLatest([of(AVAILABLE_MEDICINES), this.medicineService.getMedicines(), this.searchBoxValue$])
      .pipe(
        map(([availMeds, cartMeds, searchBoxVal]) => {
          const finalMeds: Medicine[] = [...availMeds];

          cartMeds.forEach((cartMed) => {
            const index = finalMeds.findIndex((availMed) => availMed.id === cartMed.id);
            if (index > -1) {
              finalMeds[index] = cartMed;
            } else {
              finalMeds.push(cartMed);
            }
          });

          return finalMeds.filter((med) => med.name.toLowerCase().includes(searchBoxVal.toLowerCase()) ||
            med.description.toLowerCase().includes(searchBoxVal.toLowerCase())
          );
        })
      );
  }


}
