import { Box, Input, InputPhoto, Label, Textarea } from './style';

export const ProductInfo = () => {
  return (
    <>
      <Box>
        <Label>Foto:</Label>
        <InputPhoto
          name='photo'
          type='file'
          accept='image/png, image/jpeg, image/jpg'
        />
      </Box>
      <Box>
        <Label>Título:</Label>
        <Input name='title' />
      </Box>
      <Box>
        <Label>Descrição:</Label>
        <Textarea name='description' />
      </Box>
      <Box>
        <Label>Valor:</Label>
        <Input name='price' type='number' />
      </Box>
    </>
  );
};
