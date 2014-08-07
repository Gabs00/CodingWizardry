function countFib(n){
  var count = 0;

  //Below is the fibonacci algorithm
  function fib(n){
    count++; //count is not a part of the algorithm, we are using it to count iterations
    if(n < 2){
      return 1;
    }
    return fib(n-1)+ fib(n-2);
  }
  //End algorithm

  var result = fib(n);
  console.log(count);
  return result;
}

function countHashFib(n){
  var count = 0;

  //Below is the hashed fibonacci algorith
  function hashFib(){
    var hash = {};
    var fib = function(n){
      count++; //count is not a part of the algorithm
      if(n < 2){
        return 1;
      }
      else if(hash[n] !== undefined){
        return hash[n];
      }
      else{
        hash[n] = fib(n-1)+fib(n-2);
        return hash[n];
      }
    };
    return fib;
  }
  //End algorithm


  var hFib = hashFib();
  var result = hFib(n);
  console.log(count);
  return result;
}

countHashFib(10); //count = 19
countFib(10); //count = 177