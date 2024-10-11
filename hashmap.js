// any time u access an index
// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bound");
// }

// class HashNode {
//     constructor(value, nextNode = null) {
//         this.value = value;
//         this.next = nextNode;
//     }
// }

export class HashMap {
    
    constructor(size = 16) {
        this.buckets = new Array(size);
        this.size = size;
        this.countActive = 0;
        this.loadFactorRatio = 0.75;
    }

    getLoadFactor() {
        return this.countActive/this.size;
    }

    resize() {
        const reSized = this.size * 2;
        const reBuckets = new Array(reSized);
        for(let bucket of this.buckets) {
            if (bucket) {
                for(let items of bucket) {
                    let reIndexed = this.hash(items[0]) % reSized;
                    if (!reBuckets[reIndexed]) {
                        reBuckets[reIndexed] = [];
                    }
                    reBuckets[reIndexed].push([items[0],items[1]]);
                }
            }
        }
        this.buckets = reBuckets;
        this.size = reSized;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.size;
    }

    set(key,value) {
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        if(!this.buckets[index]) {
            this.buckets[index] = [];
        } 
        for(let bucket of this.buckets[index]) {
            if (bucket[0] === key) {
                bucket[1] = value;
                return;
            }
        }
        this.buckets[index].push([key, value]);
        this.countActive++;

        if (this.getLoadFactor() > this.loadFactorRatio) {
            this.resize();
        }
    }

    get(key) {
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        if(!this.buckets[index]) {
            return null;
        }
        for (let bucket of this.buckets[index]) {
            if (bucket[0] === key) {
                return bucket[1];
            }
        }
    }

    has(key) {
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        if(!this.buckets[index]) {
            return false;
        }
        for (let bucket of this.buckets[index]) {
            if (bucket[0] === key) {
                return true;
            }
        }
    }

    remove(key) {
        let index = this.hash(key);
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        }
        if(!this.buckets[index]) {
            return false;
        }
        this.buckets.splice(index, index);
    }

    length() {
        return this.countActive;
    }

    keys() {
        let totalKeys = [];
        for (let i=0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                for (let bucket of this.buckets[i]) {
                    totalKeys.push(bucket[0]);
                }
            }
        } return totalKeys;
    }

    values() {
        let totalValues = [];
        for (let i=0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                for (let bucket of this.buckets[i]) {
                    totalValues.push(bucket[1]);
                }
            }
        } return totalValues;
    }

    entries() {
        let totalArray = [];
        for (let i=0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                for (let bucket of this.buckets[i]) {
                    totalArray.push([bucket[0],bucket[1]]);
                }
            }
        } return totalArray;
    }
}

// const test = new HashMap();
// console.log(test.hash('Samara'));
// console.log(test.set('Samara', 'test'));
// console.log(test.get('Samara'));
// console.log(test.has('Samara'));
// console.log(test.set('devyat','jiqulik'));
// console.log(test.remove('Samara'));
// console.log(test.length());
// console.log(test.keys());
// console.log(test.values());
// console.log(test.entries());
