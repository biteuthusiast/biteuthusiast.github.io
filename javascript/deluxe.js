function refresh() {
	if (!web3.isConnected()) {
		console.error("Not connected");
	}

	var err;
	var result;
	
	inst.N.call(function(err, result) {
		console.log(result);
		if (result != null)
			N = result;
		else
			console.error("N is Null");
	});
	
	console.log(N);
		
	var addressOf = new Array(N);
	var balanceOf = new Array(N);
	var lastPing = new Array(N);
		
	for (var i = 0; i < N; i++) {
        inst.AddressOf(i, function(err, result) {
			if (result != null)
				addressOf[i] = result;
		})
    }

	var text = "";
	
	for (var i = 0; i < N; i++) {
		inst.LastPingOf(addressOf[i], function(err, result) {
			if (result != null)
				lastPing[i] = result;
		})
        inst.BalanceOf(addressOf[i], function(err, result) {
			if (result != null)
				balanceOf[i] = web3.fromWei(result, "ether");
		})
		text += Create_Line(addressOf[i], LastPingOf[i], BalanceOf[i]) + " ";
    }
	
	$("#currentWinner").html(text);
	
	/*
	web3.eth.getBalance("0x42F15f1a3bE378F9147f59123f6b9764dbeca628", function(err, result) {
		if (result != null)
			balance = web3.fromWei(result, "ether");
	})
	*/
	web3.eth.defaultAccount = web3.eth.accounts[0];
}

function Create_Line(add, l, b) {
	const now = new Date().getTime() / 1000;
	
	text = add;
	text += " ";
	if (deadline - now > 0)
		text += secondsToHours(12*60*60 - (now - l));
	else
		text += 0;
	text += " ";
	text += b;
	return text
}

function PRESSTHEBUTTON() {
	console.log("Clic");
	var amount = web3.toWei(0.0001, "ether")
	inst.Ping.sendTransaction({
		gas: 100000,
		gasPrice: 1000000000,
		value: amount
	}, function(error, txid) {
		console.log(txid);
	})
}

function withdraw() {
	inst.withdraw.sendTransaction({
		gas: 300000,
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

	inst = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "NumberOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "N",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "LastPingOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "BalanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "AddressOf",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "Kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "Ping",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "a",
				"type": "address"
			}
		],
		"name": "PingFor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
	]).at("0x42F15f1a3bE378F9147f59123f6b9764dbeca628")


	setInterval(() => refresh(), 500);
}