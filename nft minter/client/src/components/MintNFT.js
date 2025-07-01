import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./utils/contract";

const MintNFT = ({ imageUrl }) => {
  const [minting, setMinting] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const loadContract = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Ethereum provider not found! Install MetaMask.");
      return;
    }

    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    } catch (err) {
      console.error("Wallet connection error:", err);
      alert("Connect your wallet to continue.");
    }
  };

  const handleMint = async () => {
    if (!imageUrl) return alert("Generate an image first!");

    setMinting(true);
    setTxHash(null);

    try {
      const contract = await loadContract();
      if (!contract) return;

      const [account] = await window.ethereum.request({ method: "eth_accounts" });
      const tx = await contract.mintNFT(account, imageUrl);
      setTxHash(tx.hash);

      await tx.wait();
      alert("✅ NFT Minted Successfully!");
    } catch (err) {
      console.error("Minting error:", err);
      alert("❌ Failed to mint NFT.");
    }

    setMinting(false);
  };

  return (
    <div>
      <button onClick={handleMint} disabled={minting} className="mint-button">
        {minting ? "Minting..." : "Mint NFT"}
      </button>

      {txHash && (
        <div className="tx-hash">
          <p>Transaction Hash:</p>
          <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
            View on Etherscan
          </a>
        </div>
      )}
    </div>
  );
};

export default MintNFT;
