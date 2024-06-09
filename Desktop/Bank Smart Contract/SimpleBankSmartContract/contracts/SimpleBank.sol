// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleBank {
    mapping(address => uint256) private balances;
    mapping(address => uint256) private loans;

    event Deposit(address indexed account, uint256 amount);
    event Withdraw(address indexed account, uint256 amount);
    event Borrow(address indexed account, uint256 amount);
    event Repay(address indexed account, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function borrow(uint256 amount) public {
        require(balances[msg.sender] >= amount / 2, "Collateral required");
        loans[msg.sender] += amount;
        balances[msg.sender] += amount;
        emit Borrow(msg.sender, amount);
    }

    function repay(uint256 amount) public {
        require(loans[msg.sender] >= amount, "Loan amount exceeded");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        loans[msg.sender] -= amount;
        balances[msg.sender] -= amount;
        emit Repay(msg.sender, amount);
    }

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function getLoanBalance() public view returns (uint256) {
        return loans[msg.sender];
    }
}
