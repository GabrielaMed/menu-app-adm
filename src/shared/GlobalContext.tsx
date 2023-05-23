import { ReactNode, createContext, useState } from 'react';

type GlobalContextData = {
  companyId: string;
  setCompanyId: (companyId: string) => void;
  productId: string;
  setProductId: (productId: string) => void;
};

export const GlobalContext = createContext({} as GlobalContextData);

type Props = {
  children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [companyId, setCompanyId] = useState('');
  const [productId, setProductId] = useState('');

  return (
    <GlobalContext.Provider
      value={{
        companyId,
        setCompanyId,
        productId,
        setProductId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};