//Module pattern
//An IIFE where non global code executed, creates a closure scope.






//Keeps your global namespace clean
var globalMethodOne = function(){ 
  //global method one
};

(function nonGlobalMethod(){
  //Will not be seen by the browser
})();



//=========================================
//Closure scope
var globalVarOne = "Hello";

//variables declared inside remain in closure scope
(function(){

  var nonGlobalVar = "World";

})();

//wtf is try/catch? It allows you to TRY an action that may throw an exception
//Then you CATCH the exception and deal with it. It makes it so exceptions don't crash your application
try {
  var hello = globalVarOne + ' ' + nonGlobalVar; // Throws error because nonGlobalVar is does not exist
  //Won't run after exception
} catch(e){
  console.log(e.message);
}



//=========================================
//Create private methods
var zach = (function(){
  var name = "Zach";
  var age = 20;

  return {
    getName: function(){
      return name;
    },
    getAge: function(){
      return age;
    },
    setAge: function(newAge){
      age = newAge;
    }
  };

})();



//=========================================
//Reduces name collision
//o and you can pass it arguments where needed (like window) 
(function(window){
  var document = {};
  document.body = window.document.createElement('div');
  document.create = function(){
    return window.document.createElement('div');
  };
  document.appendChild = function(elem, to){
    to = to || this.body;
    to.appendChild(elem);
    console.log('xdocAdded');
  };

  window.xdoc = document;

})(window);



//=========================================
//Different ways to globalize

//implied attached to window
var modOne = (function(){
  return {
    pie: 'yes please'
  };
})();

//explicit
window.modTwo = (function(){
  return {
    pie: 'yes please'
  };
})();



//=========================================
//passing window as an argument
(function(window){
  window.modThree = {
    pie: 'yes please'
  };
})(window);





//=========================================
//Why use it???
//Simple, when coding you may find yourself declaring many different functions or variables
//to accomplish your goals. These arbitrary functions / variables are cluttering your namespace with no purpose

var telephoneWords = (function(){
  var charMap = {
  /*1"'1', 2:'ABC'*/
  };

  function getNumChars(num){}
  function aRecursiveFunction(/* args */){}

  return function(numberString){
    /*
      call getNumChars
      call aRecursiveFunction
    */
  };
})();

console.log('end');