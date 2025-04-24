import { useState } from "react"

const TokenForm = ({handleAddToken}: {
  handleAddToken: (e: React.FormEvent, tokenName: string, tokenSymbol: string, tokenSupply: string) => void
}) => {
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenSupply, setTokenSupply] = useState("")

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Create New Token</h2>
      <form onSubmit={(e) => {
        handleAddToken(e, tokenName, tokenSymbol, tokenSupply)
        setTokenName("");
        setTokenSupply("");
        setTokenSymbol("");
      }}>
        <div className="mb-4">
          <label htmlFor="tokenName" className="block text-sm font-medium mb-1">
            Token Name
          </label>
          <input
            type="text"
            id="tokenName"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tokenSymbol" className="block text-sm font-medium mb-1">
            Token Symbol
          </label>
          <input
            type="text"
            id="tokenSymbol"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tokenSupply" className="block text-sm font-medium mb-1">
            Initial Supply
          </label>
          <input
            type="number"
            id="tokenSupply"
            value={tokenSupply}
            onChange={(e) => setTokenSupply(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Create Token
        </button>
      </form>
    </div>
  )
}

export default TokenForm