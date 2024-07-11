import { TokenType } from "@/app/context/store";

const GetDecimalValue = (token: TokenType) => {
  const value = `1${"0".repeat(token?.decimals)}`;

  return value;
};

export default GetDecimalValue;
