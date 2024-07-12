"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchBox from "../shared/searchBox";
import { useGlobalContext } from "@/app/context/store";
import axios from "axios";
import GetDecimalValue from "@/utils/getDecimalValue";
import Spinner from "./spinner";
import { SingleLineLoading } from "./dataLoading";

interface TranParam {
  srcQuoteTokenUsdValue: string;
  dstQuoteTokenUsdValue: string;
}

const BridgeBox = () => {
  const pathname = usePathname();
  const {
    srctokenInfo,
    dsttokenInfo,
    setSrcTokenInfo,
    setDstTokenInfo,
    setQuoteInfo,
    quoteInfo,
  } = useGlobalContext();
  const [quoteLoading, setQuoteLoading] = useState<boolean>(false);
  const [tranLoading, setTranLoading] = useState<boolean>(false);
  const [linkToggle, setLinkToggle] = useState<boolean>(true);
  const [tranParam, setTranParam] = useState<TranParam>();
  const tokenAmount = GetDecimalValue(srctokenInfo);

  const getQuote = async () => {
    if (srctokenInfo && dsttokenInfo) {
      setQuoteLoading(true);
      await axios
        .post(
          `${process.env.BRIDGE_API_BASE_URL}/api/quote?srcChainId=${srctokenInfo.chainId}&srcQuoteTokenAddress=${srctokenInfo.address}&srcQuoteTokenAmount=${tokenAmount}&dstChainId=${dsttokenInfo.chainId}&dstQuoteTokenAddress=${dsttokenInfo.address}&slippage=1`
        )
        .then((res) => {
          const route = res.data.routes[0];
          setQuoteInfo({
            srcChainId: route.srcChainId,
            srcQuoteTokenAddress: route.srcQuoteTokenAddress,
            srcQuoteTokenAmount: route.srcQuoteTokenAmount,
            dstChainId: route.dstChainId,
            dstQuoteTokenAddress: route.dstQuoteTokenAddress,
            slippage: route.slippage,
            receiver: route.bridgeDescription.srcBridgeTokenAddress,
            bridgeProvider: route.bridgeDescription.provider,
            srcBridgeTokenAddress:
              route.bridgeDescription.srcBridgeTokenAddress,
            dstBridgeTokenAddress:
              route.bridgeDescription.dstBridgeTokenAddress,
            srcSwapProvider: route.srcSwapDescription.provider,
            dstSwapProvider: route.dstSwapDescription.provider,
            estimatedGas: route.estimatedGas,
            estimatedTransferTime: route.estimatedTransferTime,
            transactionCounts: route.transactionCounts,
          });
          setQuoteLoading(false);
        })
        .catch((err) => {
          setQuoteLoading(false);
          console.log(err);
        });
    } else {
      alert("Please select source and destination token");
    }
  };

  const proceedTransaction = async () => {
    if (srctokenInfo && dsttokenInfo) {
      setTranLoading(true);
      await axios
        .post(
          `${process.env.BRIDGE_API_BASE_URL}/api/buildTx?srcChainId=${quoteInfo.srcChainId}&srcQuoteTokenAddress=${quoteInfo.srcQuoteTokenAddress}&srcQuoteTokenAmount=${quoteInfo.srcQuoteTokenAmount}&dstChainId=${quoteInfo.dstChainId}&dstQuoteTokenAddress=${quoteInfo.dstQuoteTokenAddress}&slippage=${quoteInfo.slippage}&receiver=${quoteInfo.receiver}&bridgeProvider=${quoteInfo.bridgeProvider}&srcBridgeTokenAddress=${quoteInfo.srcBridgeTokenAddress}&dstBridgeTokenAddress=${quoteInfo.dstBridgeTokenAddress}&srcSwapProvider=${quoteInfo.srcSwapProvider}&dstSwapProvider=${quoteInfo.dstSwapProvider}`
        )
        .then((res) => {
          setTranLoading(false);
          const route = res.data.route;
          setTranParam(route);
        })
        .catch((err) => {
          setTranLoading(false);
          console.log(err);
        });
    } else {
      alert("Please get a quote to proceed");
    }
  };

  return (
    <div className="p-6 bg-[#14171a] rounded-2xl w-1/3 text-white flex flex-col space-y-6 h-full">
      <SearchBox
        label="Search a Token"
        setTokenInfo={linkToggle ? setSrcTokenInfo : setDstTokenInfo}
      />
      <div className="flex flex-col space-y-4">
        <div className="bg-[#1b1f22] flex items-start justify-evenly p-4 rounded-lg">
          <Link
            href={{
              pathname: pathname,
              query: {
                modal: "event",
              },
            }}
            onClick={() => setLinkToggle(true)}
            type="button"
            className="text-white bg-[#1f2428] hover:bg-[#2c2f33] focus:ring-4 ring-1 ring-[#2d3339] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
          >
            {srctokenInfo ? (
              <div className="cursor-pointer p-2 flex items-center space-x-2 rounded-lg">
                <img
                  src={srctokenInfo?.logoURI}
                  width={30}
                  alt="token image"
                  className="rounded-full"
                />
                <div className="text-white text-xs flex flex-col">
                  <h1>{srctokenInfo?.name}</h1>
                  <h2>{srctokenInfo?.symbol}</h2>
                </div>
              </div>
            ) : (
              <div> Choose a token(from)</div>
            )}
          </Link>

          <Link
            href={{
              pathname: pathname,
              query: {
                modal: "event",
              },
            }}
            onClick={() => setLinkToggle(false)}
            type="button"
            className="text-white bg-[#1f2428] hover:bg-[#2c2f33] focus:ring-4 ring-1 ring-[#2d3339] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
          >
            {dsttokenInfo ? (
              <div className="cursor-pointer p-2 flex items-center space-x-2 rounded-lg">
                <img
                  src={dsttokenInfo?.logoURI}
                  width={30}
                  alt="token image"
                  className="rounded-full"
                />
                <div className="text-white text-xs flex flex-col">
                  <h1>{dsttokenInfo?.name}</h1>
                  <h2>{dsttokenInfo?.symbol}</h2>
                </div>
              </div>
            ) : (
              <div> Choose a token(to)</div>
            )}
          </Link>
        </div>
        <button
          onClick={getQuote}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        >
          {quoteLoading ? <Spinner /> : <div>Get Quote</div>}
        </button>
        <div className="bg-[#1b1f22] flex items-start justify-between p-4 rounded-lg gap-2 h-[80px]">
          <div className="text-xs flex flex-col gap-2">
            <h3>Estimated Gas</h3>
            <div>
              {quoteLoading ? (
                <SingleLineLoading />
              ) : quoteInfo ? (
                quoteInfo?.estimatedGas
              ) : (
                0
              )}
            </div>
          </div>
          <div className="text-xs flex flex-col gap-2">
            <h3>Transaction Counts</h3>
            <div>
              {quoteLoading ? (
                <SingleLineLoading />
              ) : quoteInfo ? (
                quoteInfo?.transactionCounts
              ) : (
                0
              )}
            </div>
          </div>
          <div className="text-xs flex flex-col gap-2">
            <h3>Transfer Time</h3>
            <div>
              {quoteLoading ? (
                <SingleLineLoading />
              ) : quoteInfo ? (
                quoteInfo?.estimatedTransferTime
              ) : (
                0
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={proceedTransaction}
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
      >
        {tranLoading ? <Spinner /> : <div>Proceed to Bridge</div>}
      </button>
      {tranLoading && (
        <div className="flex items-start justify-between">
          <div className="text-xs flex flex-col gap-2">
            <h3>Source Quote USD</h3>
            <div>
              {tranLoading ? (
                <SingleLineLoading />
              ) : (
                tranParam?.srcQuoteTokenUsdValue
              )}
            </div>
          </div>
          <div className="text-xs flex flex-col gap-2">
            <h3>Destination Quote USD</h3>
            <div>
              {tranLoading ? (
                <SingleLineLoading />
              ) : (
                tranParam?.dstQuoteTokenUsdValue
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BridgeBox;
