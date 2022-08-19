//“Minting” an NFT is, in more simple terms, uniquely publishing your token on the blockchain to make it purchasable. A simple step-by-step for starting this involves creating a digital wallet, specifically one that securely stores Cryptocurrency (well-known wallets include Coinbase, MetaMask, and Rainbow).
const { ethers, network } = require('hardhat');
const { moveBlocks } = require('../utils/move-blocks')

async function mint() {
    const basicNft = await ethers.getContract("BasicNft")
    console.log("Minting...")
    //call the mint function from the basic nft
    const mintTx = await basicNft.mintNft()
    //wait one second for minting the nft
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.events[0].args.tokenId
    console.log(`Fot TokenID: ${tokenId}`)
    console.log(`NFT Address: ${basicNft.address}`)

    if(network.config.chainId == "31337") {
        await moveBlocks(2, (sleepAmount = 1000))
    }
}

mint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })