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
  