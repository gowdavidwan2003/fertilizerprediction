import React, { useState, useEffect } from 'react';
import { web3, simpleBankContract } from './web3';
import './Bank.css';

const Bank = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [loan, setLoan] = useState('');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          setError('No accounts found. Please connect your wallet.');
          return;
        }
        setAccounts(accounts);
        setSelectedAccount(accounts[0]);
        await getBalance(accounts[0]);
        await getLoanBalance(accounts[0]);
      } catch (error) {
        setError('Failed to load accounts. Please refresh the page.');
      }
    };
    loadAccounts();
  }, []);

  const getBalance = async (account) => {
    try {
      const balance = await simpleBankContract.methods.getBalance().call({ from: account || selectedAccount });
      setBalance(web3.utils.fromWei(balance, 'ether'));
      setError('');
    } catch (error) {
      setError('Failed to get balance. Please try again.');
    }
  };

  const getLoanBalance = async (account) => {
    try {
      const loan = await simpleBankContract.methods.getLoanBalance().call({ from: account || selectedAccount });
      setLoan(web3.utils.fromWei(loan, 'ether'));
      setError('');
    } catch (error) {
      setError('Failed to get loan balance. Please try again.');
    }
  };

  const deposit = async () => {
    try {
      await simpleBankContract.methods.deposit().send({ from: selectedAccount, value: web3.utils.toWei(amount, 'ether') });
      getBalance();
    } catch (error) {
      setError('Failed to deposit. Please try again.');
    }
  };

  const withdraw = async () => {
    try {
      await simpleBankContract.methods.withdraw(web3.utils.toWei(amount, 'ether')).send({ from: selectedAccount });
      getBalance();
    } catch (error) {
      setError('Failed to withdraw. Please try again.');
    }
  };

  const borrowLoan = async () => {
    try {
      await simpleBankContract.methods.borrow(web3.utils.toWei(amount, 'ether')).send({ from: selectedAccount });
      getLoanBalance();
    } catch (error) {
      setError('Failed to borrow loan. Please try again.');
    }
  };

  const repayLoan = async () => {
    try {
      await simpleBankContract.methods.repay(web3.utils.toWei(amount, 'ether')).send({ from: selectedAccount });
      getLoanBalance();
    } catch (error) {
      setError('Failed to repay loan. Please try again.');
    }
  };

  const transfer = async (recipient, transferAmount) => {
    try {
      await simpleBankContract.methods.transfer(recipient, web3.utils.toWei(transferAmount, 'ether')).send({ from: selectedAccount });
    } catch (error) {
      setError('Failed to transfer funds. Please try again.');
    }
  };

  return (
    <div className="bank-container">
      <h1>Simple Bank</h1>
      <div class="right-align">
        <p>Vidwan Gowda H M - 1MS21IS126</p>
        <p>Varshith R - 1MS21IS124</p>
        <p>Indraneel T - 1MS21IS045</p>
        <p>Rakesh P - 1MS21IS081</p>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="account-selection">
        <label>Select Account:</label>
        <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
          {accounts.map((account) => (
            <option key={account} value={account}>{account}</option>
          ))}
        </select>
      </div>
      <div className="bank-balance">
        <p>Balance: {balance} ETH</p>
        <button onClick={() => getBalance()}>Check Balance</button>
      </div>
      <div className="loan-balance">
        <p>Loan Balance: {loan} ETH</p>
        <button onClick={() => getLoanBalance()}>Check Loan Balance</button>
      </div>
      <div className="bank-actions">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount (ETH)"
        />
        <button onClick={deposit}>Deposit</button>
        <button onClick={withdraw}>Withdraw</button>
        <button onClick={borrowLoan}>Borrow Loan</button>
        <button onClick={repayLoan}>Repay Loan</button>
      </div>
      <div className="bank-actions transfer-section">
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient Address"
        />
        <input
          type="text"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          placeholder="Transfer Amount (ETH)"
        />
        <button onClick={() => transfer(recipient, transferAmount)}>Transfer</button>
      </div>
    </div>
  );
};

export default Bank;
