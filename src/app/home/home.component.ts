import { Component, OnInit } from '@angular/core';
import { MedicineAvailableService } from '../shared/services/medicine-available.service';
import { Observable } from 'rxjs';
import { Medicine } from '../features/medicine/models/medicine.model';
import { MedicineService } from '../features/medicine/services/medicine.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  availableMedicines$: Observable<Medicine[]>;

  constructor(private medAvailService: MedicineAvailableService, private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.availableMedicines$ = this.medAvailService.medicineInStock();
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

}
