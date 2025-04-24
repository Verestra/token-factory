import { Abi } from "viem";
import ERC20_JSON from "./ERC20_FACTORY_ABI.json"
import TOKEN_JSON from "./ERC20_TOKEN_ABI.json"

export const ERC20_FACTORY_ABI_JSON = ERC20_JSON as Abi
export const ERC20_TOKEN_ABI_JSON = TOKEN_JSON as Abi
export const ERC20_FACTORY_CONTRACT = "0xbCa99c484Ca08B7c5FDaC58e2505a08595955B8F";