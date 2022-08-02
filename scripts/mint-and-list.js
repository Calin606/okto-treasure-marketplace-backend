//“Minting” an NFT is, in more simple terms, uniquely publishing your token on the blockchain to make it purchasable. A simple step-by-step for starting this involves creating a digital wallet, specifically one that securely stores Cryptocurrency (well-known wallets include Coinbase, MetaMask, and Rainbow).
const {ethers} = require('hardhat');

const PRICE = ethers.utils.parseEther("0.1")

async function mintAndList() {
    //get the contract
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const basicNft = await ethers.getContract("BasicNft")
    console.log("Minting...")
    //call the mint function from the basic nft
    const mintTx = await basicNft.mintNft()
    //wait one second for minting the nft
    const mintTxReceipt = await mintTx.wait(1)
    //that is how we get a specific parameter like tokenId after minting
    const tokenId = mintTxReceipt.events[0].args.tokenId
    console.log("Approving Nft...")

    const approvalTx = await basicNft.approve(nftMarketplace.address, tokenId)
    await approvalTx.wait(1)
    console.log("Listing NFT...")
    const tx = await nftMarketplace.listItem(basicNft.address, tokenId, PRICE)
    await tx.wait(1)
    console.log("NFT Listed!")
}

mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })