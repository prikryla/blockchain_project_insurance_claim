module.exports = {
    contractAddress: '0xDA0bab807633f07f013f94DD0E6A4F96F8742B53',
    abi:[
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_walletAddress",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "_firstName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_lastName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_email",
                    "type": "string"
                }
            ],
            "name": "registerUser",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_data",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "setData",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "_hash",
                    "type": "bytes"
                },
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "setHast",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "firstName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "lastName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "email",
                            "type": "string"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct insurance.User",
                    "name": "user",
                    "type": "tuple"
                }
            ],
            "name": "testValue",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "_hash",
                    "type": "bytes"
                }
            ],
            "name": "getAddressByHash",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_user",
                    "type": "address"
                }
            ],
            "name": "getDataByAddress",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "date",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "data",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct insurance.Data[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_walletAddress",
                    "type": "address"
                }
            ],
            "name": "getUserByAddress",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "firstName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "lastName",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "email",
                            "type": "string"
                        }
                    ],
                    "internalType": "struct insurance.User",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "name": "hashToUserMap",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_walletAddress",
                    "type": "address"
                }
            ],
            "name": "isRegistered",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "users",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "firstName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "lastName",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "usersData",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "date",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "data",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
}