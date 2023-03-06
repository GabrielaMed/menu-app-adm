import { IAdditional } from './Additional';

export interface IProduct {
  title?: string;
  description?: string;
  price?: number;
  additional?: IAdditional[];
  image?: FileList;
}
