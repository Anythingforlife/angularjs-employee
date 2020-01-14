angular.module('myApp.home', [])
.controller('homeCtrl', [function($scope){
	this.welcomeText = 'Welcome to myApp Home 9!';
	console.log(this);
	this.color = '#FFFF00';
	
	// var result;
	// convertHex(this.color);
	// function convertHex(hex){
	// 	hex = hex.replace('#','');
	// 	var r = parseInt(hex.substring(0,2), 16);
	// 	var g = parseInt(hex.substring(2,4), 16);
	// 	var b = parseInt(hex.substring(4,6), 16);
	
	// 	result = r+','+g+','+b;
	// 	this.color = result;
	// 	return result;
	// }
	// this.color = result;

	this.constructor =  function () {
		document.documentElement.style.setProperty('--foreground-default', (this.color).toString());
		console.log(this.color);
	}

	this.constructor();

	this.apply = function () {
		this.color =  this.color == '#FF0000' ? '#00FF00' :'#FF0000';
		document.documentElement.style.setProperty('--foreground-default', (this.color).toString());
	}

}]);