import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from 'web3modal';
import { Button, Center, Text } from "@mantine/core";
import { contractAddress } from "../config/constants";

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
    const [currentUseraddress, setCurrentUserAddress] = useState('');

    useEffect(() => {
        checkMetamask();

        if (isConnected)
            initialize()
    })

    const checkMetamask = () => {
        if (typeof window.ethereum !== 'undefined') {
            setHasMetamask(true)
        } else {
            setHasMetamask(false)
        }
    }

    async function connect(){
        if (hasMetamask) {
            const web3ModalProvider = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(web3ModalProvider)

            setSigner(provider.getSigner())
            setIsConnected(true)
        }
    }

    async function initialize () {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const currectUserAddress = await window.ethereum.request({method: 'eth_accounts'})

        setContract(contract)
        setCurrentUserAddress(currectUserAddress)

    }

    return (
        <Center style={{display: "flex", justifyContent: "center"}}>
            {hasMetamask ? (
                isConnected ? (
                    <Text>Successfully connected</Text>
                ) : (
                    <Button onClick={() => connect()}>
                        Connect
                    </Button>
                )
            ) : ("Download Metamask first!")}
        </Center>
    )
} 