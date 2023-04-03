import { IAdditional } from './Additional';

export interface IProduct {
  name?: string;
  description?: string;
  price?: number;
  additional?: IAdditional[];
  image?: FileList;
}
