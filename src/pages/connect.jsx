import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from 'web3modal';
import { Button, Center, Textarea } from "@mantine/core";
import { contractAddress, abi } from "../config/constants";

let web3Modal;

const providerOptions = {
    walletConnect: {
        package: WalletConnectProvider,
        options: {
            rpc: {8995: "https://core.bloxberg.org"}
        }
    }
}

if (typeof window != 'undefined') {
    web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
    })
}

export default function Connect() {

    const [hasMetamask, setHasMetamask] = useState(false);
    const [signer, setSigner] = useState(undefined);
    const [isConnected, setIsConnected] = useState(false);

    const [contract, setContract] = useState(undefined);
    const [currentUserAddress, setCurrentUserAddress] = useState('');

    const [dataToChain, setDataToChain] = useState(''); 
    const [dataFromChain, setDataFromChain] = useState([]); 

    useEffect(() => {
        checkMetamask();
        if (isConnected)
            initialize();
    }, [isConnected])

    const checkMetamask = () => {
        if (typeof window.ethereum !== 'undefined') {
            setHasMetamask(true)
        } else {
            setHasMetamask(false)
        }
    }

    const connect = async () => {
        try {
            if (hasMetamask) {
                const web3ModalProvider = await web3Modal.connect();
                const provider = new ethers.providers.Web3Provider(web3ModalProvider);
                const currentSigner = provider.getSigner();

                setSigner(currentSigner);
                setIsConnected(true);

                console.log("Is connected? " + isConnected);
                console.log("SIGNER ",  Object.values(currentSigner));

                // Additional steps after connecting, if needed
                // e.g., set up contract with the signer
                // setContract(new ethers.Contract(contractAddress, abi, currentSigner));
            }
        } catch (error) {
            console.error("Error connecting:", error);
        }
    }

    async function initialize() {
        try {
            const currentContract = new ethers.Contract(contractAddress, abi, signer);
            const currentUserAddress = await window.ethereum.request({ method: 'eth_accounts' });

            setContract(currentContract);
            setCurrentUserAddress(currentUserAddress);
            console.log("Current contract " , currentContract)
        } catch (error) {
            console.error("Error initializing contract:", error);
        }
    }

    async function sendData() {
        try {
            if (hasMetamask && isConnected && contract) {
                await contract.setData(dataToChain, "0xF1ed143134f8B8891480B1790aB093f13b38De9B");
                console.log("Data to chain: " + dataToChain);
                console.log("Is connected: " + isConnected);
                console.log("User address: " + "0xF1ed143134f8B8891480B1790aB093f13b38De9B");
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }

    async function getDataFromChain() {
        console.log("User address: " + "0xF1ed143134f8B8891480B1790aB093f13b38De9B");

        if (contract) {
            // Assuming getDataByAddress returns an array of tuples
            const response = await contract.getDataByAddress("0xF1ed143134f8B8891480B1790aB093f13b38De9B");
            console.log("Response ", response)

            setContract(contract)
            setCurrentUserAddress(currectUserAddress)
        } else {
            console.log('Error')
        }
    }

    return (
        <Center style={{display: "flex", justifyContent: "center"}}>
            {hasMetamask ? (
                isConnected ? (
                    <Center>

                        <Textarea
                            value={dataToChain}
                            onChange={(event) => setDataToChain(event.currentTarget.value)}
                            placeholder={"Store your data to blockchain"}
                            label={"Add data"}
                        >
                        </Textarea>

                        <Button onClick={() => sendData()}>
                            Send data
                        </Button>

                        <Button onClick={() => getDataFromChain()}>
                            Get data
                        </Button>

                    </Center>
                ) : (
                    <Button onClick={() => connect()}>
                        Connect
                    </Button>
                )
            ) : ("Download Metamask first!")}
        </Center>
    )
} 