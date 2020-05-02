import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineActionComponent } from './medicine-action.component';

describe('MedicineActionComponent', () => {
  let component: MedicineActionComponent;
  let fixture: ComponentFixture<MedicineActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
