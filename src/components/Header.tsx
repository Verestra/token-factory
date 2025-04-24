import { ConnectButton } from "@rainbow-me/rainbowkit"

const Header = () => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold">Monad Token Factory</div>
        <ConnectButton />
      </div>
    </header>
  )
}

export default Header