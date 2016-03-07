'use strict';

let stream = require('stream'),
    randtoken = require('rand-token');
// Import events module
var events = require('events');

class RandStream extends stream.Readable {

  constructor () {
    super ({
      encoding: 'utf8',
      objectMode: false,
      read: () => {
        setTimeout(() => {
          let chunk = randtoken.generate(
            Math.floor(5 + Math.random() * 25),
            '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.'
          );
          console.log(`CHUNK: ${chunk}`);
          this.push(chunk, 'utf8');
        }, Math.random() * 1000);
      }
    });

  }
  
}

function asyncOp (input, callback) {
  console.log(`START: ${input}`);

  let prom = new Promise(function(resolve) {
    setTimeout(() => {
      console.log(`FINISH: ${input}`);
      resolve();
    }, Math.random() * 1000);
  });

  if(!callback) {
    return prom;
  }

  prom.then(callback);
}

/**1. Asynchronous Operations**/
/**Create a function doAsync which accepts an array input. Each element in the array can be either of type String or [String].**/
function doAsync (input) {

asyncOp(input);

}
let input = [
  'A',
  [ 'B', 'C' ],
  'D'
]
doAsync(input);

/**2. Streams**/
/*Create a class RandStringSource which accepts an instance of the class RandStream. RandStringSource should be a subclass of events.EventEmitter.*/
class RandStringSource extends events.EventEmitter {

  constructor(){
	super ({
	})
  }  
}

/**3. Resource Pooling**/
class ResourceManager {
 
 constructor(count) {
   this.count = count;
 }
 borrow(res)
 {
   return res('1');
 } 
}

let source = new RandStringSource(new RandStream());
source.on('data', (data) => {
  console.log(data);
})

let pool = new ResourceManager(2);
console.log('START');

let timestamp = Date.now();

pool.borrow((res) => {
  console.log('RES: 1');

  setTimeout(() => {
    res.release;
  }, 500);
});

pool.borrow((res) => {
  console.log('RES: 2');
});

pool.borrow((res) => {
  console.log('RES: 3');
  console.log('DURATION: ' + (Date.now() - timestamp));
});

module.exports = {
  RandStream,
  asyncOp,
  RandStringSource,
  ResourceManager,
};
