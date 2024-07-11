"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

export type TokenType = {
  address: string;
  symbol: string;
  name: string;
  chainId: number;
  decimals: number;
  logoURI: string;
};

type QuoteType = {
  srcChainId: number;
  srcQuoteTokenAddress: string;
  srcQuoteTokenAmount: string;
  dstChainId: number;
  dstQuoteTokenAddress: string;
  slippage: number;
  receiver: string;
  bridgeProvider: string;
  srcBridgeTokenAddress: string;
  dstBridgeTokenAddress: string;
  srcSwapProvider?: string;
  dstSwapProvider?: string;
  transactionCounts: number;
  estimatedGas: string;
  estimatedTransferTime: number;
};

interface ContextProps {
  srctokenInfo: TokenType;
  setSrcTokenInfo: Dispatch<SetStateAction<TokenType>>;
  dsttokenInfo: TokenType;
  setDstTokenInfo: Dispatch<SetStateAction<TokenType>>;
  quoteInfo: QuoteType;
  setQuoteInfo: Dispatch<SetStateAction<QuoteType>>;
}

const GlobalContext = createContext<ContextProps>({
  srctokenInfo: {
    address: "",
    symbol: "",
    name: "",
    chainId: 0,
    decimals: 0,
    logoURI: "",
  },
  setSrcTokenInfo: (): TokenType => ({
    address: "",
    symbol: "",
    name: "",
    chainId: 0,
    decimals: 0,
    logoURI: "",
  }),
  dsttokenInfo: {
    address: "",
    symbol: "",
    name: "",
    chainId: 0,
    decimals: 0,
    logoURI: "",
  },
  setDstTokenInfo: (): TokenType => ({
    address: "",
    symbol: "",
    name: "",
    chainId: 0,
    decimals: 0,
    logoURI: "",
  }),
  quoteInfo: {
    srcChainId: 0,
    srcQuoteTokenAddress: "",
    srcQuoteTokenAmount: "",
    dstChainId: 0,
    dstQuoteTokenAddress: "",
    slippage: 0,
    receiver: "",
    bridgeProvider: "",
    srcBridgeTokenAddress: "",
    dstBridgeTokenAddress: "",
    srcSwapProvider: "",
    dstSwapProvider: "",
    transactionCounts: 0,
    estimatedGas: "",
    estimatedTransferTime: 0,
  },
  setQuoteInfo: (): QuoteType => ({
    srcChainId: 0,
    srcQuoteTokenAddress: "",
    srcQuoteTokenAmount: "",
    dstChainId: 0,
    dstQuoteTokenAddress: "",
    slippage: 0,
    receiver: "",
    bridgeProvider: "",
    srcBridgeTokenAddress: "",
    dstBridgeTokenAddress: "",
    srcSwapProvider: "",
    dstSwapProvider: "",
    estimatedGas: "",
    estimatedTransferTime: 0,
    transactionCounts: 0,
  }),
});

export const GlobalContextProvider = ({ children }: any) => {
  const [srctokenInfo, setSrcTokenInfo] = useState<TokenType | any>();
  const [dsttokenInfo, setDstTokenInfo] = useState<TokenType | any>();
  const [quoteInfo, setQuoteInfo] = useState<QuoteType | any>();

  return (
    <GlobalContext.Provider
      value={{
        srctokenInfo,
        setSrcTokenInfo,
        dsttokenInfo,
        setDstTokenInfo,
        quoteInfo,
        setQuoteInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
