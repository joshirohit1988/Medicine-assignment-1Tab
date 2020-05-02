export class Medicine {
id: number;
name: string;
description: string;
quantity: number;
price: number;
}

export interface MedicineResolvedData {
    medicine: Medicine;
    resolvedType?: ActionMode;
    error?: any;
}

export enum ActionMode {
    edit = 'Edit',
    clone = 'Clone',
    add = 'Add'
}
