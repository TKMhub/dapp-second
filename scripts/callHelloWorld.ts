import {ethers} from "ethers";
import helloWorldArtifact from '../artifacts/contracts/HellowWorld.sol/HelloWorld.json';

// async function main() {
const main = async(address: string) => {
    const rpcUrl: string = process.env.SEPOLIA_URL ?? "";
    if (rpcUrl === ""){
        throw new Error("NO value set for environement variable SEPOLIA_URL")
    }
    
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(address, helloWorldArtifact.abi, provider);

    const message = await contract.getMessage();
    console.log(`Helloworld contract message: ${message}`);
}

const address = '0x6B59Ef7FA516D2Bfecda0DC0Fc6fF63a85Fe4dD0';

main(address).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});