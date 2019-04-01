(function() {
  function Promise(fn) {
    var state = "pending";
    var doneList = [];
    var failList = [];

    this.then = function(done, fail) {
      switch (state) {
        case "pending":
          doneList.push(done);
          failList.push(fail || null);
          return this;

        case "fulfilled":
          done();
          return this;

        case "rejected":
          fail();
          return this;
      }
    };

    function resolve(newValue) {
      state = "fulfilled";
      setTimeout(function() {
        var value = newValue;
        for (var i = 0; i < doneList.length; i++) {
          var temp = doneList[i](value);
          if (temp instanceof Promise) {
            var newP = temp;
            for (i++; i < doneList.length; i++) {
              newP.then(doneList[i], failList[i]);
            }
          } else {
            value = temp;
          }
        }
      }, 0);
    }

    function reject(newValue) {
      state = "rejected";
      setTimeout(function() {
        var value = newValue;
        var temp = failList[0](value);
        if (temp instanceof Promise) {
          var newP = temp;
          for (i++; i < doneList.length; i++) {
            newP.then(doneList[i], failList[i]);
          }
        } else {
          value = temp;
          doneList.shift();
          failList.shift();
          resolve(value);
        }
      }, 0);
    }

    fn(resolve, reject);
  }

  var p = function() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject("p 的结果");
      }, 100);
    });
  };

  var p2 = function(input) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        console.log("p2拿到前面传入的值：" + input);
        resolve("p2的结果");
      }, 100);
    });
  };

  p()
    .then(
      function(res) {
        console.log("p的结果:" + res);
        return "p then方法第一次返回";
      },
      function(value) {
        console.log(value);
        return "p then方法第一次错误的返回";
      }
    )
    .then(function(res) {
      console.log("p第一次then方法的返回：" + res);
      return "p then方法第二次返回";
    })
    .then(p2)
    .then(function(res) {
      console.log("p2的结果：" + res);
    });
})();
