//A class that parses money
function Money(){
	Object.defineProperty(this, 'isValid', {
		enumerable: false,
		writable: false,
		value: new RegExp(/^((\d{0,3}(,\d{3})+)|\d+)(\.\d{2})?$/)
	});
	if(arguments.length > 0){
		for(var i = 0; i < arguments.length; i++){
			if(this.isValid.test(arguments[i])){
				this[i] = arguments[i];
			}
		}
	}

}

//for testing
var a = new Money("100.00");
console.log(a);