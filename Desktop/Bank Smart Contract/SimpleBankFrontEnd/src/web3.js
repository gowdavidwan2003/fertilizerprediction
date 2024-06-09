import Web3 from 'web3';
import SimpleBankABI from './SimpleBankABI.json';

const web3 = new Web3(Web3.givenProvider || process.env.REACT_APP_GANACHE_URL);

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const simpleBankContract = new web3.eth.Contract(SimpleBankABI.abi, contractAddress);

export { web3, simpleBankContract };
