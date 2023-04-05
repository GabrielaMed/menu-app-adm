import { api } from '../../services/api';
import { IProduct } from '../Interface/Product';

class ProductImageRegistration {
  async handle(productId: string, images: IProduct['image']) {
    if (!images) return;
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };
    let response;

    const uploadImage = async (index: number) => {
      if (!images[index]) return;

      response = await api.post(
        `product/${productId}/image`,
        {
          file: images[index],
        },
        config
      );

      console.log(response, 'img resp');
      await uploadImage(index + 1);
    };

    await uploadImage(0);

    return response;
  }
}

export const productImageRegistration = new ProductImageRegistration();
