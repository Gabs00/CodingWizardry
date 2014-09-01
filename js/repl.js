var r = require('repl');

var i = r.start("REPL >>");
//console.log(i);
console.log(i.rli.output.write('eval(1+5)'));