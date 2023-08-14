import Web3 from 'web3';
import { ABI } from './ABI';

const CONTRACT_ADDRESS = '0x5f8AD5A0AdA161994d7efee13E29b9f960C2B856';

export async function doLogin() {
  if (!window.ethereum) throw new Error('No MetaMask found');

  const web3 = new Web3(window.ethereum);

  const accounts = await web3.eth.requestAccounts();

  if (!accounts || !accounts.length)
    throw new Error('Wallet not found or allowed');

  localStorage.setItem('@cryptwitter:wallet', accounts[0]);

  return accounts[0];
}

function getContract() {
  if (!window.ethereum) throw new Error('No MetaMask found');

  const web3 = new Web3(window.ethereum);
  const from = localStorage.getItem('@cryptwitter:wallet') || undefined;

  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function addTweet(text: string) {
  const contract = getContract();
  return contract.methods.addTweet(text).send();
}

export async function changeUsername(newName: string) {
  const contract = getContract();
  return contract.methods.changeUsername(newName).send();
}

interface Tweet {
  author: string;
  username: string;
  timestamp: number;
  text: string;
}

export async function getLastTweets(page: number) {
  const contract = getContract();
  const tweets: Tweet[] = await contract.methods.getLastTweets(page).call();

  return tweets
    .map((tweet) => {
      return { ...tweet };
    })
    .filter((tweet) => tweet.text !== '');
}
