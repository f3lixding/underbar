(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n===0) {
      return [];
    } else if(n>array.length) {
      return array;
    }
    return n === undefined ? array[array.length-1] : array.slice(n-1, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(collection.constructor === Array) {
      for(var i=0; i<collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if(collection.constructor === Object) {
      for(var item in collection) {
        iterator(collection[item], item, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var res = [];
    _.each(collection, function(item) {
      if(test(item)) res.push(item);
    });
    return res;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    // var res = [];
    // var accepted = new Set(_.filter(collection, test));
    // _.each(collection, function(item) {
    //   if(!accepted.has(item)) res.push(item);
    // });
    // return res; // too slow
    var res = [];
    _.each(collection, function(item) {
      if(!test(item)) res.push(item);
    });
    return res;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var resContent = [];
    var res = [];
    if(!isSorted) {
      array.sort();
      isSorted = true;
    }
    if(isSorted) {
      var dictSet = new Set([]);
      _.each(array, function(item, index) {
        var temp = iterator === undefined ? item : iterator(item);
        if(!dictSet.has(temp)) {
          res.push(temp);
          resContent.push(array[index]);
          dictSet.add(temp);
        }
      });
    }
    return resContent;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var res = [];
    _.each(collection, function(item) {
      res.push(iterator(item));
    });
    return res;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    var acc;
    if(collection.constructor === Array) {
      var i;
      if(accumulator === undefined) {
        acc = collection[0];
        i = 1;
      } else {
        acc = accumulator;
        i = 0;
      }
      for(; i<collection.length; i++) {
        acc = iterator(acc, collection[i]);
      }
    } else if(collection.constructor === Object) {
      for(var item in collection) {
        if(accumulator === undefined) {
          accumulator = 1;
          continue;
        }
        acc = iterator(acc, collection[item]);
      }
    }

    return acc;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
       if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(compliant, item) {
      if(!compliant) {
        return false;
      }
      return iterator === undefined ? Boolean(item) : Boolean(iterator(item));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    return _.reduce(collection, function(compliant, item) {
      if(compliant) {
        return true;
      }
      return iterator === undefined ? Boolean(item) : Boolean(iterator(item));
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    if(arguments.length <= 1) {
      return arguments[0];
    } else {
      var main = arguments[0];
      for(var i=1; i<arguments.length; i++) {
        for(var item in arguments[i]) {
          main[item] = arguments[i][item];
        }
      }
      return arguments[0];
    }
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    if(arguments.length <= 1) {
      return arguments[0];
    } else {
      var main = arguments[0];
      for(var i=1; i<arguments.length; i++) {
        for(var item in arguments[i]) {
          if(main[item]===undefined) {
            main[item] = arguments[i][item];
          }
        }
      }
      return arguments[0];
    }
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  _.memoize = function(func) {
    var argsVisited = {};
    function res() {
      var arg = [];
      _.reduce(arguments, function(acc, item) {
        arg.push(item);
        return acc + item;
      }, 0);
      var argKey = arg.join(' ');
      if(argsVisited[argKey]===undefined) {
        argsVisited[argKey] = func.apply(this, arguments);
      }
      return argsVisited[argKey];
    }
    return res;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var arg = [];
    _.reduce(arguments, function(acc, item) {
      arg.push(item);
      return acc + item;
    }, 0);
    arg = arg.slice(2);
    return (function(_callback, arg, wait) {
      setTimeout(function() { _callback.apply(this, arg) }, wait)
    })(func, arg, arguments[1]);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    function randomGen(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    var copy = array.slice();
    var res = [];
    while(copy.length != 0) {
      var index = randomGen(0, copy.length);
      res.push(copy.splice(index, 1)[0]);
    }
    return res;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var res = [];
    _.reduce(collection, function(acc, item) {
      var method = typeof functionOrKey === 'string' ? item[functionOrKey] : functionOrKey;
      res.push(method.apply(item, args));
      return acc + item;
    }, 0);
    return res;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if(iterator.constructor === String) {
      var iter = iterator;
      iterator = function(item) {
        return item[iter];
      }
    }

    return collection.sort(function(a, b) {
      return iterator(a) - iterator(b);
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var res = [];
    var temp = [];
    _.each(arguments, function(item) {
      temp.push(item);
    });
    var tempUnsorted = temp.slice();

    _.sortBy(temp, 'length');

    var maxLen = temp[temp.length-1].length;

    for(var i=0; i<maxLen; i++) {
      var subRes = [];
      for(var j=0; j<temp.length; j++) {
        subRes.push(tempUnsorted[j][i]);
      }
      res.push(subRes);
    }
    return res;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    // need to use recursion
    return _.reduce(nestedArray, function(acc, item) {
      return acc.concat(Array.isArray(item) ? _.flatten(item) : [item]);
    }, []);
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = [];
    var argSet = [];
    var visited = new Set([]);
    _.each(arguments, function(arg) {
      args.push(arg);
      argSet.push(new Set(arg));
    });
    args = _.flatten(args);
    var res = [];
    _.each(args, function(item) {
      if(!visited.has(item) && _.every(argSet, function(subSet) { return subSet.has(item); })) {
        res.push(item);
        visited.add(item)
      }
    });
    return res;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var res = arguments[0];
    var argSet = [];
    for(var i=1; i<arguments.length; i++) {
      var tempSet = new Set(arguments[i]);
      _.each(res, function(item, index) {
        if(tempSet.has(item)) res.splice(index, 1);
      });
    }
    return res;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var canBeCalled = true;
    return function() {
      if(canBeCalled) {
        func.apply(this, arguments);
        canBeCalled = false;
        (function(wait) {
          setTimeout(function() {
            canBeCalled = true;
          }, wait);
        })(wait);
      }
    };
  };
}());
