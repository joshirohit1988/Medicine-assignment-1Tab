import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map, switchMap } from 'rxjs/operators';

import { Medicine } from '../models/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  private medicinesUrl = 'api/medicines';
  medicinesList: Medicine[] = [];
  medicineIdCounter = 100;

  medicineListSubject: BehaviorSubject<Medicine[]>;
  medicineList$: Observable<Medicine[]>;

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {

    const localStorageList = localStorage.getItem('MedicineavailList');

    if (localStorageList){
      this.medicineListSubject = new BehaviorSubject<Medicine[]>(JSON.parse(localStorageList));
      this.medicinesList  = JSON.parse(localStorageList);
      this.medicineIdCounter = JSON.parse(localStorage.getItem('MedicineIdCounter')) || 100;
    } else{
      this.medicineListSubject =  new BehaviorSubject<Medicine[]>([]);
    }

    this.medicineList$ = this.medicineListSubject
    .asObservable()
    .pipe(
      tap((list) => {
        localStorage.setItem('MedicineavailList', JSON.stringify(list));
        localStorage.setItem('MedicineIdCounter', JSON.stringify(this.medicineIdCounter));
      } )
    );
  }

  getMedicines(): Observable<Medicine[]> {
    return this.medicineList$;
  }

  getMedicine(id: number): Observable<Medicine> {
    const index = this.medicinesList.findIndex((cartMed) => cartMed.id === id);
    if (index > -1) {
     return of(this.medicinesList[index]);
    }

    return throwError('No Medicine Found for that Id');
  }

  createMedicine(medicine: Medicine) {
    if (!medicine.id) {
      medicine = {...medicine, id: this.medicineIdCounter++};
    }

    this.medicinesList = [...this.medicinesList, medicine];
    this.medicineListSubject.next(this.medicinesList);
  }

  deleteMedicine(medicine: Medicine) {
    const index = this.medicinesList.findIndex((cartMed) => cartMed.id === medicine.id);

    if (index > -1) {
      this.medicinesList.splice(index, 1);
    }
    this.medicineListSubject.next([...this.medicinesList]);
  }

  updateMedicine(medicine: Medicine) {
    const index = this.medicinesList.findIndex((cartMed) => cartMed.id === medicine.id);

    if (index > -1) {
      this.medicinesList[index] = medicine;
    }
    this.medicineListSubject.next([...this.medicinesList]);
  }

  cloneMedicine(medicine: Medicine){
    medicine.id = null; // will get a new id from MedicineIdcounter
    this.createMedicine(medicine);
  }


 initializeMedicine(): Medicine {
    // Return an initialized object
    return {
      id: 0,
      price: null,
      description: null,
      quantity: null,
      name: null
    };
  }
}
