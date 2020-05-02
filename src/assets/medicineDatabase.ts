import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Medicine } from 'src/app/features/medicine/models/medicine.model';

export class MedicineData implements InMemoryDbService {

  createDb() {
    const medicines: Medicine[] = [
      {
        id: 15,
        name: 'Poonam',
        description: 'This medicine is used to kill infection of stomach worms',
        quantity: 1,
        price: 50
      },
      {
        id: 20,
        name: 'Rohit',
        description: 'This medicine is used to kill infection of stomach worms',
        quantity: 3,
        price: 60
      },
      // {
      //   id: 3,
      //   name: 'cheston',
      //   description: 'This medicine is used to kill infection of stomach worms',
      //   quantity: 2,
      //   price: 80
      // },
      // {
      //   id: 3,
      //   name: 'D-cold',
      //   description: 'This medicine is used to kill infection of stomach worms',
      //   quantity: 4,
      //   price: 80
      // },
      // {
      //   id: 3,
      //   name: 'Strpsil',
      //   description: 'This medicine is used to kill infection of stomach worms',
      //   quantity: 4,
      //   price: 60
      // }
    ];
    return { medicines };
  }
}
