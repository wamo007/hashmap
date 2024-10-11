import { HashMap } from "./hashmap.js";

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.has('apple'));
console.log(test.set('apple','blue'));
console.log(test.entries());
console.log(test.set('moon','silver'));
console.log(test.entries());
console.log(test.size)