import { React, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import styles from './Wallet.module.css';
import simple_token_abi from './contracts/simple_token_abi.json';
import Interactions from './Interactions';


function EthWallet() {
    
    //ganache contract token address from Remix
    const contractAddress = '0xBD0432ef6305CA662e20D624b34C30574846D93b';

    const [tokenName, setTokenName] = useState("Token");
    const [connButtonText, setConnButtonText] = useState("Connect Wallet");
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [balance, setBalance] = useState(null);

    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);

    let setConnectionButtonText;

    const connectWalletHandler = () => {
        if(window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangeHandler(result[0]);
                setConnectionButtonText('Wallet Connected');
            })
            .catch(error => {
                setErrorMessage(error.message);
            })

        } else {
            console.log('need to install metamask');
            setErrorMessage('Please install Metamask');
        }
    }

    const accountChangeHandler = (newAddress) => {
        setDefaultAccount(newAddress);
        updateEthers();
    }

    const updateEthers = () => {
        let tempProvider = new ethers.providers.Web3Provider(window.ethereum);//connect to our Metamask wallet

        let tempSigner = tempProvider.getSigner();

        let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner);

        setProvider(tempProvider);
        setSigner(tempSigner);
        setContract(tempContract);

    }
    
    return (
        <div>            
            <h2>{tokenName + "ERC-20 Wallet"}</h2>
            <button className={styles.button6} onclick={connectWalletHandler} >{connButtonText}</button>
            <div className={styles.walletCard}>
                <div>
                    <h3>
                        Address: {defaultAccount}
                    </h3>
                    <h3>
                        {tokenName} Balance: {balance}
                    </h3>
                </div>   
            </div>
            {errorMessage}
        </div>
    )
}

export default EthWallet
