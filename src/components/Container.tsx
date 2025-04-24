import { useMemo } from "react"
import toast from "react-hot-toast"
import { useAccount, useReadContract, useReadContracts, useWriteContract } from "wagmi";
import { ERC20_FACTORY_ABI_JSON, ERC20_FACTORY_CONTRACT, ERC20_TOKEN_ABI_JSON } from "../constants";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../App";
import TokenForm from "./TokenForm";
import TokenList from "./TokenList";
import { Address } from "viem";

export type Token = {
  name: string;
  symbol: string;
  supply: number;
  address: `0x${string}`;
}

const erc20FactoryContract = {
  address: ERC20_FACTORY_CONTRACT as `0x${string}`,
  abi: ERC20_FACTORY_ABI_JSON,
};

const Container = () => {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  
  // Membaca data token dari kontrak
  const { data: tokenAddresses, refetch } = useReadContract({
    ...erc20FactoryContract,
    functionName: "getAllTokens",
    account: address,
    query: {
      enabled: isConnected,
    },
  }) as { data: Address[] | undefined, refetch: () => void };

  // Menyiapkan konfigurasi untuk batch reading token details
  const tokenDetailsConfig = useMemo(() => {
    if (!tokenAddresses) return [];

    return tokenAddresses.flatMap((tokenAddress) => [
      {
        abi: ERC20_TOKEN_ABI_JSON,
        address: tokenAddress,
        functionName: 'name',
      },
      {
        abi: ERC20_TOKEN_ABI_JSON,
        address: tokenAddress,
        functionName: 'symbol',
      },
      {
        abi: ERC20_TOKEN_ABI_JSON,
        address: tokenAddress,
        functionName: 'totalSupply',
      },
    ]);
  }, [tokenAddresses]);

  // Batch read semua detail token
  const { data: tokenDetails } = useReadContracts({
    contracts: tokenDetailsConfig,
    query: {
      enabled: Boolean(tokenAddresses?.length),
    },
  });

  // Memproses data detail token
  const tokens: Token[] = useMemo(() => {
    if (!tokenAddresses || !tokenDetails) return [];

    const result: Token[] = [];
    for (let i = 0; i < tokenAddresses.length; i++) {
      result.push({
        address: tokenAddresses[i],
        name: String(tokenDetails[i * 3].result),
        symbol: String(tokenDetails[i * 3 + 1].result),
        supply: Number(tokenDetails[i * 3 + 2].result) / (10 ** 18),
      });
    }

    return result;
  }, [tokenAddresses, tokenDetails]);

  // Fungsi untuk membuat token baru
  async function handleAddToken(e: React.FormEvent, tokenName: string, tokenSymbol: string, tokenSupply: string) {
    e.preventDefault()
    
    // Validasi input
    if (tokenName.length === 0 || tokenSymbol.length === 0 || tokenSupply.length === 0) {
      toast.dismiss();
      toast.error("Please fill the form", {
        style: {
          background: "#2B2F36",
          color: "#fff",
        },
      });
      return
    }

    toast.loading("Submitting Form...", {
      style: {
        background: "#2B2F36",
        color: "#fff",
      },
    });
    
    try {
      // Menulis ke kontrak
      const result = await writeContractAsync({
        ...erc20FactoryContract,
        functionName: "createToken",
        args: [address, Number(tokenSupply), tokenName, tokenSymbol],
        account: address as `0x${string}`,
      });

      toast.dismiss();
      toast.loading("Creating your token...", {
        style: {
          background: "#2B2F36",
          color: "#fff",
        },
      });

      // Menunggu transaksi dikonfirmasi
      await waitForTransactionReceipt(config, {
        hash: result as `0x${string}`,
      });
      
      toast.dismiss();
      toast.success("Token Successfully Created!", {
        style: {
          background: "#2B2F36",
          color: "#fff",
        },
      });
      
      // Refresh data
      refetch();
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to create token", {
        style: {
          background: "#2B2F36",
          color: "#fff",
        },
      });
      console.error(error);
    }
  }

  return (
    <main className="container mx-auto px-4 md:px-8 lg:px-20 xl:px-60 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">ERC20 Token Factory</h1>
      {isConnected ? (
        <>
          <TokenForm handleAddToken={handleAddToken} />
          <TokenList tokens={tokens} />
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl mb-4">Please connect your wallet to continue</p>
        </div>
      )}
    </main>
  )
}

export default Container