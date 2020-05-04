import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Medicine } from '../../features/medicine/models/medicine.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() medicine: Medicine;

  private _medicineQuantity;

  @Output() addMedicineEvent = new EventEmitter<Medicine>();
  @Output() updateMedicineEvent = new EventEmitter<Medicine>();

  get medicineQuantity() {
    return this._medicineQuantity;
  }

  set medicineQuantity(quantity: number) {
    this._medicineQuantity = quantity;
  }

  constructor() { }
  ngOnInit(): void {
    this.medicineQuantity = this.medicine.quantity || 0;
  }

  addMedicine(){
    this.medicineQuantity++;
    this.addMedicineEvent.emit({...this.medicine, quantity: this.medicineQuantity});
  }

  addQuantity(quantity: number){
    this.medicineQuantity = this.medicineQuantity + quantity;
    this.updateMedicineEvent.emit({...this.medicine, quantity: this.medicineQuantity});
  }


}
