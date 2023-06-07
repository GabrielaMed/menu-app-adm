import { api } from '../../services/api';
import { IProduct } from '../Interface/Product';

class ProductImageRegistration {
  async handle(productId: string, images: IProduct['Image']) {
    try {
      if (!images) return;
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      const uploadImage = async (index: number): Promise<any> => {
        if (!images[index]) return;

        const response = await api.post(
          `product/${productId}/image`,
          {
            file: images[index],
          },
          config
        );

        if (index + 1 < images.length) {
          await uploadImage(index + 1);
        }

        return response;
      };

      const response = await uploadImage(0);
      return response;
    } catch (err) {
      console.log('error', err);
    }
  }
}

export const productImageRegistration = new ProductImageRegistration();
