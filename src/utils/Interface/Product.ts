import { IAdditional } from './Additional';
import IFile from './File';

export interface IProduct {
  title?: string;
  description?: string;
  price?: number;
  additional?: IAdditional[];
  image?: IFile[];
}
