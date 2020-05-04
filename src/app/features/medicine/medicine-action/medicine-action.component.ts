import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicineService } from '../services/medicine.service';
import { Medicine, MedicineResolvedData, ActionMode } from '../models/medicine.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-medicine-action',
  templateUrl: './medicine-action.component.html',
  styleUrls: ['./medicine-action.component.scss']
})
export class MedicineActionComponent implements OnInit {
  pageTitle = 'Medicine Add';
  errorMessage: string;

  medicine: Medicine;
  actionMode: ActionMode;
  @ViewChild('medicineForm') public medicineForm: NgForm;

  constructor(private _medicineService: MedicineService,
              private _router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.data.subscribe(data => {
      const resolvedData: MedicineResolvedData = data['resolvedData'];
      if (data.hasOwnProperty('resolvedData')){
        this.onMedicineRetrieved(resolvedData.medicine, resolvedData.resolvedType);
      } else {
        this.onMedicineRetrieved(this._medicineService.initializeMedicine(), ActionMode.add);
      }

      /**
       * stackblitz was giving error thus replacing this expression
       * */
      if(resolvedData && resolvedData.error){
        this.errorMessage = resolvedData?.error;
      }

    });

  }

  onMedicineRetrieved(medicine: Medicine, actionMode: ActionMode) {
    this.medicine = medicine;
    this.actionMode = actionMode;

    if (!this.medicine) {
      this.pageTitle = 'No Medicine found';
    } else if (actionMode === ActionMode.add) {
      this.pageTitle = 'Add Medicine';
    } else if (actionMode === ActionMode.edit) {
      this.pageTitle = `Edit Medicine: ${this.medicine.name}`;
    } else if (actionMode === ActionMode.clone) {
      this.pageTitle = `Clone Medicine: ${this.medicine.name}`;
    }

  }

  saveMedicine() {

    if (this.actionMode === ActionMode.add) {
      this._medicineService.createMedicine(this.medicine);
    } else if (this.actionMode === ActionMode.edit) {
      this._medicineService.updateMedicine(this.medicine);
    } else if (this.actionMode === ActionMode.clone) {
      this._medicineService.cloneMedicine(this.medicine);
    }
    this._router.navigate(['/medicines']);
  }


}
