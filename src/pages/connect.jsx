import WalletConnectProvider from "@walletconnect/web3-provider"
import { useEffect, useState } from "react";
import Web3Modal from 'web3modal'
import { ethers } from 'ethers';
import {Button, Center, Text, Textarea} from '@mantine/core';

import { contractAddress, abi } from "../config/constants";
import Form from "./form";

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

    const[hasMetamask, setHasMetamask] = useState(false);
    const[signer, setSigner] = useState(undefined);
    const[isConnected, setIsConnected] = useState(false)

    const[contract, setContract] = useState(undefined)
    const[currentUserAddress, setCurrentUserAddress] = useState('')

    const[dataToChain, setDataToChain] = useState('')
    const[dataFromChain, setDataFromChain] = useState('')

    const[showForm, setShowForm] = useState(false)



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

    async function connect() {
        if(hasMetamask) {
            const web3ModalProvider = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(web3ModalProvider)

            setSigner(provider.getSigner())
            setIsConnected(true)
        }
    }

    async function initialize () {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const currentUserAddress = await window.ethereum.request({method: 'eth_accounts'})
    
        setContract(contract)
        setCurrentUserAddress(currentUserAddress)
    }

    async function sendData() {
        if (hasMetamask && isConnected) {
            await contract.setData(dataToChain, currentUserAddress[0])
        }
    }

    async function getDataFromChain() {
        const response = await contract.getDataByAddress(currentUserAddress[0])
    
        setDataFromChain(response)
    } 

    async function submitInsuranceRequest(date, coveragePeriod, user, cost) {
        const response = await contract.submitInsuranceRequest(date, coveragePeriod, user[0], cost)
        console.log("Insurance submitted!")
    }

    async function getAllInsuranceRequests() {
        const response = await contract.getAllInsuranceRequests()
        console.log(response)
    }

    return (
        <Center style={{display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        }}>

            {hasMetamask ? (
                isConnected ? (
                    <div>
                        Is connected: {JSON.stringify(isConnected)};
                        <Button onClick={() => setShowForm(true)}>New Insurance Request Form</Button>
                        <Button onClick={() => getAllInsuranceRequests}>Show all requests</Button>
                        {showForm && <Form currentUser={currentUserAddress} submit={submitInsuranceRequest} hide={setShowForm}/>}
                    </div>
                ) : (
                    <div>
                        Is connected: {JSON.stringify(isConnected)};
                        <Button onClick={() => connect()}>
                            Connect
                        </Button>
                    </div>
                )
            ) : ("Download Metamask")}
        </Center>
    )
} 