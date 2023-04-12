import { IAdditional } from './Additional';

export interface IProduct {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  additional?: IAdditional[];
  image?: FileList;
}
