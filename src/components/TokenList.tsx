type Token = {
    name: string;
    symbol: string;
    supply: number;
    address: `0x${string}`;
  }
  
  const TokenList = ({tokens} : {tokens: Token[]}) => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Tokens History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-700">
                <th className="p-2">Name</th>
                <th className="p-2">Symbol</th>
                <th className="p-2">Supply</th>
                <th className="p-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {tokens.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-2 text-center">No tokens created yet</td>
                </tr>
              ) : (
                tokens.map((token, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="p-2">{token.name}</td>
                    <td className="p-2">{token.symbol}</td>
                    <td className="p-2">{token.supply.toFixed(0)}</td>
                    <td className="p-2 text-xs md:text-sm">{token.address}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  export default TokenList