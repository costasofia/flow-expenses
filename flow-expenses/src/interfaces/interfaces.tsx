export interface Transaction {
    id: number;
    value: number;
    date: string;
    description: string;
    idCategories: number;
    type: string;
    idUser: number;
  }

export interface Categories {
  id: number;
  name: string;
}

export interface Expenses {
  id: number;
  value: number | string;
  date: string;
  description: string;
  idCategories: number ;
  idUser: number;
}