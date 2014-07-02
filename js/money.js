//A class that parses money
function Money(){

}
Money.prototype = new Object();
Money.isValid = function(money){
	var reg = /^((\d{0,3}(,\d{3})+)|\d+)(\.\d{2})?$/;
	var results;
	if(Array.isArray(money)){
		results = [];
		money.forEach(function(value){
			if(reg.test(value)){
				results.push(true);
			}
			else{
				results.push(false);
			}
		})
	}
	else if(typeof money === 'object'){
		results = {};
		for(var i in money){
			if(reg.test(money[i])){
				results[i] = true;
			}
			else{
				results[i] = false;
			}
		}
	}
	else {
		results = reg.test(money);
	}
	return results;
}

//for testing
var a = {a:'10.00', b:'10,00,'};
var b = ['10.000', '1,000'];
var c = "100.00";
var e = "1,000,00";
console.log(Money.isValid(a), "|", Money.isValid(b), "|", Money.isValid(c), "|", Money.isValid(e));