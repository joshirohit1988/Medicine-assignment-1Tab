import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicineAvailableService } from '../shared/services/medicine-available.service';
import { Observable, Subscription } from 'rxjs';
import { Medicine } from '../features/medicine/models/medicine.model';
import { MedicineService } from '../features/medicine/services/medicine.service';
import { FormGroup, FormControl } from '@angular/forms';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  availableMedicines$: Observable<Medicine[]>;

  searchbox: FormControl;

  searchSubscription: Subscription;

  constructor(private medAvailService: MedicineAvailableService, private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.availableMedicines$ = this.medAvailService.medicineInStock();
    this.searchbox = new FormControl('');
    this.searchSubscription = this.searchbox.valueChanges.pipe(
      auditTime(500),
    ).subscribe((val) => this.medAvailService.searchBoxSubject.next(val));
  }

  addMedicine(medicine: Medicine){
    this.medicineService.createMedicine(medicine);
  }

  updateMedicine(medicine: Medicine){
    if (medicine.quantity > 0){
      this.medicineService.updateMedicine(medicine);
    } else{
      this.medicineService.deleteMedicine(medicine);
    }
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
    this.medAvailService.searchBoxSubject.next('');
  }

}
