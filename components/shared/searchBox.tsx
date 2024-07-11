"use client";
import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import InputBox from "./inputBox";
import DialogModal from "../modals/modal";
import { useRouter, useSearchParams } from "next/navigation";
import { TokenType } from "@/app/context/store";
import MultiLineLoading from "../modals/dataLoading";

interface props {
  label: string;
  setTokenInfo: (token: TokenType) => void;
}

const SearchBox = ({ label, setTokenInfo }: props) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("modal");
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const [tokens, setTokens] = useState<TokenType[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (value: string) => {
    setLoading(true);
    await axios
      .get(`/api/recommendedTokens?id=${value}`)
      .then((res) => {
        setLoading(false);
        setTokens(res.data.recommendedTokens);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleChange = (value: string) => {
    setInput(value);
    if (value !== "") {
      fetchData(value);
    } else {
      setTokens([]);
    }
  };

  return (
    <DialogModal
      show={search == "event"}
      width="w-full"
      onCloseModal={() => router.push("/")}
    >
      <div className="p-4 bg-[#14171a] rounded-2xl flex flex-col space-y-3 w-full">
        <label className="text-white">{label}</label>
        <div className="bg-[#1b1f22] flex items-center justify-between p-4 rounded-lg gap-2 h-10 ring-1 ring-[#2d3339]">
          <InputBox
            input={input}
            handleChange={handleChange}
            placeholder="Chain Id"
          />
          <FaSearch id="search-icon" className="text-white" />
        </div>
        <div className="max-h-32 overflow-auto invisible-scrollbar">
          {loading && <MultiLineLoading />}
          {tokens &&
            tokens?.map((token, id) => (
              <div
                className="cursor-pointer p-2 flex items-center space-x-2 mb-1 rounded-lg hover:border hover:border-[#277eec] hover:bg-[#277eec33]"
                key={id}
                onClick={() => {
                  setTokenInfo(token), router.push("/");
                }}
              >
                <img
                  src={token?.logoURI}
                  width={30}
                  alt="token image"
                  className="rounded-full"
                />
                <div className="text-white text-xs flex flex-col">
                  <h1>{token?.name}</h1>
                  <h2>{token?.symbol}</h2>
                </div>
              </div>
            ))}
        </div>
      </div>
    </DialogModal>
  );
};

export default SearchBox;
