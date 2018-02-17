var deadline;
var winner;
var balance;

function refresh() {
	if (!web3.isConnected()) {
		console.error("Not connected");
	}

	var err;
	var result;
	inst.deadline.call(function(err, result) {
		if (result != null)
			deadline = result.c[0];
	});
	inst.winner.call(function(err, result) {
		if (result != null)
			winner = result;
	});
	web3.eth.getBalance("0x3db9F293B2e992F8C339a543561A615559c375dD", function(err, result) {
		if (result != null)
			balance = web3.fromWei(result, "ether");
	})
	var nextwinnerpot;
	if(balance < 0.0005)
            nextwinnerpot = balance;
        else
            nextwinnerpot = balance/10;
	
	balance = Math.round(balance * 1e6) / 1e6;
	nextwinnerpot = Math.round(nextwinnerpot * 1e6) / 1e6;

	const now = new Date().getTime() / 1000;

	if (deadline - now > 0)
		$("#timeLeft").text(secondsToHours(deadline - now));
	else
		$("#timeLeft").text("Leader can take the money.");
	
	$("#currentWinner").html('The leader is <a href="https://etherscan.io/address/' + winner + '">' + winner + '</a>.');
	if(winner == undefined)
		$("#currentWinner").html('Install and connect to <a href="https://metamask.io/">MetaMask</a>.');
	$("#currentPlayer").html('You are <a href="https://etherscan.io/address/' + web3.eth.defaultAccount + '">' + web3.eth.defaultAccount + '</a>.');
	$("#currentPot").text("There is " + balance + " ETH in the contract.");
	$("#NextWinnerPot").text("Next winner will take " + nextwinnerpot + " ETH of the contract.");
	
	
	web3.eth.defaultAccount = web3.eth.accounts[0];
}

function PRESSTHEBUTTON() {
	console.log("Clic");
	var amount = web3.toWei(0.0001, "ether")
	inst.click.sendTransaction({
		gas: 100000,
		gasPrice: 1000000000,
		value: amount
	}, function(error, txid) {
		console.log(txid);
	})
}

function withdraw() {
	inst.withdraw.sendTransaction({
		gas: 100000,
		gasPrice: 1000100000
	}, function(error, txid) {
		console.log(txid);
	})
}

function secondsToHours(total) {
	const hours = Math.floor(total / 3600)
	const r1 = total % 3600
	const minutes = Math.floor(r1 / 60)
	const seconds = Math.floor(r1 % 60)

	if (hours > 0)
		return hours + "h" + minutes + "m" + seconds + "s";
	else if (minutes > 0)
		return minutes + "m" + seconds + "s";
	else
		return seconds + "s";
}


function initialize() {

	var Web3 = require('web3');

	if (typeof web3 !== 'undefined') {
		web3 = new Web3(web3.currentProvider);
	} else {
		console.log("Connecting to local node.");
		web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
	}

	inst = web3.eth.contract([{
			"constant": true,
			"inputs": [],
			"name": "deadline",
			"outputs": [{
				"name": "",
				"type": "uint256"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "withdraw",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": false,
			"inputs": [],
			"name": "click",
			"outputs": [],
			"payable": true,
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "winner",
			"outputs": [{
				"name": "",
				"type": "address"
			}],
			"payable": false,
			"stateMutability": "view",
			"type": "function"
		}
	]).at("0x3db9F293B2e992F8C339a543561A615559c375dD")


	setInterval(() => refresh(), 500);
}