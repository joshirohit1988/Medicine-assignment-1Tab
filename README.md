# MedicineAssigment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

# Things Completed in this project

This project utilizies bootstrap CSS , Feature/Shared Module Architecture, Angular Routing, Use of rxjs observable, Angular Template Driven Forms and guards.

To comunicate between components there are two service available which are as follows:
MedicineAvailableService : This service gives the list of Available Medicines.(Mocked medicine Array).

MedicineService: Saves the current list of Medicines in the table. This service Also Have a public API methods to Add, delete, update, clone a medicine in the Medicine List. The list is saved in the local storage to avoid losing the data on refresh.


You can select any medicine from Quick-add section to add medicine in the table.
When you add the quantity or edit any medicine in the table changes will be visible in this section as well.
You can Add, delete, update, clone a medicine in the Medcine List Table.
There are some basic form validation which restricts user to enter invalid data like for Price and Quantity.(But basic only as I had Time limit).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
