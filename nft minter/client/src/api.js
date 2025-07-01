// Change this if your Flask server runs on a different port
const API_BASE_URL = "http://localhost:5000"; 

// (Optional) POST to pin image to IPFS or mint NFT
export const mintNFT = async (metadata) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });
    return response.json(); // Could be IPFS CID or tx hash
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
};
