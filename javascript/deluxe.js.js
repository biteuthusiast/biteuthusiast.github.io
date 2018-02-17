function refresh() {
	if (!web3.isConnected()) {
		console.error("Not connected");
	}

	var err;
	var result;
	
	var addressOf[N];
	var balanceOf[N];
	var lastPing[N];
	
	for (var i = 0; i < N; i++) {
        inst.AddressOf(i, function(err, result) {
			if (result != null)
				a[i] = result;
		})
    }
	
	var text = "";
	
	for (var i = 0; i < N; i++) {
		inst.LastPingOf(a[i], function(err, result) {
			if (result != null)
				lastPing[i]s = result;
		})
        inst.BalanceOf(a[i], function(err, result) {
			if (result != null)
				balanceOf[i]s = web3.fromWei(result, "ether");
		})
		text += Create_Line(a[i], a[i], a[i]) + " ";
    }
	
	$("#currentWinner").html(text);
	
	/*
	web3.eth.getBalance("0x3db9F293B2e992F8C339a543561A615559c375dD", function(err, result) {
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
		text += secondsToHours(deadline - now);
	else
		text += 0;
	text += " ";
	text += b;
	return text
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

	inst = web3.eth.contract([
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
	}
]).at("0x0003dA100d8e57043D6061825a797a32a1391eA6")


	setInterval(() => refresh(), 500);
}