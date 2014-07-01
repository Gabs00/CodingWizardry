/*
Stack class
currently implimentented object methods
  push
  shift
  pop
  unshift
  map (Closer to perls map that can return objects and arrays)
  grep (Closer to perls grep expr list)
  filter
  
  Class functions
  isStack()
  toArray
  
*/

function Stack(){
    for(var i = 0; i < arguments.length; i++){
        this[i] = arguments[i];
    }
    Object.defineProperty(this, "length", {
    enumerable: false,
    writable: true,
    value: arguments.length,
    });
}
Stack.prototype = Object.create(Object.prototype);
Stack.prototype.constructor = new Stack();
Stack.prototype.type = "Stack";
Stack.prototype.self = function(callback, obj, args){
    return callback.apply(obj, args);
}

Stack.toArray = function(stack){
    var array = stack.map(function(value){
        return value;
    });
    return array;
}

Stack.isStack = function(obj){
    if(obj.type === "Stack"){
        return true;
    }
    else{
        return false;
    }
}
Stack.prototype.push = function(){
    var len = this.length;
    var args = arguments.length
    for(var i = 0; i < args; i++){
        this[len+i] = arguments[i];
    }
    this.length = len + args;
    return this.length-len;
}

Stack.prototype.pop = function(){
    var len = this.length;
    var i = len-1;
    var item = this[i];
    delete this[i];
    this.length=i;
    return item;
}

Stack.prototype.shift = function(){
    var item = this[0];
    this.length-=1;
    for(var i = 0; i < this.length; i++){
        this[i] = this[i+1];
    }
    delete this[this.length];
    return item;
}

Stack.prototype.unshift = function(){
    var len = this.length;
    var args = arguments.length;
    var length = (len+args);
    for(var i = length-1; i >0; i--){
        if(i >= args){
            this[i] = this[1+i-len];
        }
        else{
            this[i] = arguments[i];
        }
    }
    this.length =length;
    return this.length - len;
}

Stack.prototype.forEach = function(callback, self){
    self = self || this;
    for(var i = 0; i < this.length; i++){
            this.self(callback, self, [this[i], i, this]);
    }
}

Stack.prototype.map = function(callback, self){
    var result = 0;
    var holder = new Stack();
    self = self || this;
    
    for(var i = 0; i < this.length; i++){
        var tmp = this.self(callback, self, [this[i], i, this]);
        holder.push(tmp);
    }
    holder.forEach(function(value){
        if(Array.isArray(value) || typeof value !== 'object'){
            if(!Array.isArray(result) && typeof result === 'number'){
                result = [];
            }
            if(Array.isArray(result)){
                result.push(value);
            }
            else{
                throw new Error("Can't use mismatched types with map");
            }
        }
        else{
            if(typeof result !== 'object'){
                result = {'':new Stack()};
            }
            if(Array.isArray(value) || typeof value !== 'object'){
                result[''].push(value)
            }
            else{
                for(var i in value){
                    result[i] = value[i];
                }
            }
        }
    });
    return result;
}

Stack.prototype.grep = function(regex){
    var results = new Stack();
    for(var i = 0; i < this.length; i++){
        if(regex.test(this[i])){
            results.push(this[i]);
        }
    }
    return results;
}

Stack.prototype.filter = function(callback, obj){
    obj = obj || this;
    var result = new Stack();
    for(var i = 0; i < this.length; i++){
       if(this.self(callback, obj, [this[i], i, this])){
           result.push(this[i]);
       }
    }
    return result;
}
