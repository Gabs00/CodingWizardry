The fibonacci sequence algorithm is:

`F(n) = F(n-1)+F(n-1)`<br />
Where if `n === 0` or `n === 1` then `F(n) = 1`<br />

The code for this would be:

````javascript
function fib(n){
  if(n < 2){
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

````

Unfortinely, using this algorithm in its current state is extremely inefficient. With each call to the fib function, duplicate calculations are being made.

To provide an example:
`````javascript
fib(5)
  -> fib(4) 
      -> fib(3) 
          -> fib(2) + fib(1)
      + fib(2)
          -> fib(1) + fib(0)
  + fib(3)
    -> fib(2)
        -> fib(1) + fib(0)
    + fib(1)
`````

To not only speed up the algorithm, but also make it more efficient, a hashtable can used. In this example we will use a javascript object as a hashtable, since we do not have to worry about collisions. Javascript objects however, are not actually hashtables, though they behave similary.

Below are two functions, the first using just the fibonacci algorithm, the second adding a hash to store previously calculated values. They are wrapped inside a function that will count their executions.

`````javascript
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

`````

As you can see, just adding the hash has drastically reduced the need to calculate n. Resulting in a more efficient, and much faster algorithm.