import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicineService } from '../services/medicine.service';
import { Medicine } from '../models/medicine.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit {

  title = 'Medicine List';

  listFilter: string;

  errorMessage: string;
  medicines$: Observable<Medicine[]>;

  constructor(private medicineService: MedicineService, private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.medicines$ = this.medicineService.getMedicines();

  }

  deleteMedicine(medicine: Medicine){
    this.medicineService.deleteMedicine(medicine);
  }

}
