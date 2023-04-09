import {ethers} from "ethers";
import helloWorldArtifact from '../artifacts/contracts/HellowWorld.sol/HelloWorld.json';

// async function main() {
const main = async() => {
    
    const privateKey: string = process.env.PRIVATE_KEY ?? "";
    if (privateKey === ""){
        throw new Error("NO value set for environement variable PRIVATE_KEY")
    }
    
    const rpcUrl: string = process.env.SEPOLIA_URL ?? "";
    if (rpcUrl === ""){
        throw new Error("NO value set for environement variable SEPOLIA_URL")
    }
    
    // console.log('PRIVATE_KEY', privatekey)
    // console.log('SEPOLIA_URL', sepoliaurl)
    
    const provader = new ethers.providers.JsonRpcProvider(rpcUrl);
    const signer = new ethers.Wallet(privateKey, provader);
    const factory = new ethers.ContractFactory(helloWorldArtifact.abi, helloWorldArtifact.bytecode, signer);
    const contract = await factory.deploy();

    console.log(`HelloWorld contract deploy address ${contract.address}`);
    console.log(`Transaction URL: https://sepolia.etherscan.io/tx/${contract.deployTransaction.hash}`);
    
    await contract.deployed();
    console.log(`deploy completed!!`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});