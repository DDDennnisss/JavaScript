const PENDING = "pending";
const RESOLVE = "resolved";
const REJECT = "rejected";

function MyPromise(fn) {
  let self = this;

  this.state = PENDING;
  this.value = null;

  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];

  function resolve(value) {
    if (value instanceof MyPromise) {
      return value.then(resolve, reject)
    }

    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = RESOLVE;
        self.value = value;

        self.resolvedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    }, 0)
  }

  function reject(value) {
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = REJECT;
        self.value = value;

        self.rejectedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    })
  }

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e)
  }

  MyPromise.prototype.then = function (onResolved, onRejected) {
    onResolved = typeof onResolved === "function" ? onResolved : function (value) { return value }
    onRejected = typeof onRejected === "function" ? onRejected : function (error) { throw error }

    if (this.state === PENDING) {
      this.rejectedCallbacks.push(onRejected);
      this.resolvedCallbacks.push(onResolved)
    }

    if (this.state === REJECT) {
      onRejected(this.value)
    }
    if (this.state === RESOLVE) {
      onResolved(this.value)
    }
  }
}