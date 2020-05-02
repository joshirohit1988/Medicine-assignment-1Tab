import { TestBed } from '@angular/core/testing';

import { MedicineAvailableService } from './medicine-available.service';

describe('MedicineAvailableService', () => {
  let service: MedicineAvailableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineAvailableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
