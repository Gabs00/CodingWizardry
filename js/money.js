//A class that parses money
function Money(){
}

Money.prototype = new Object();

Money.isValid = function(money){
	if(!(money)){
		return;
	}
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

Money.add = function(){
}