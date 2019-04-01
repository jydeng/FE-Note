(function(params) {
  function Parent(value) {
    this.val = value;
  }

  Parent.prototype.getValue = function() {
    console.log(this.val);
  };

  // 组合继承
  // function Child(value) {
  //   Parent.call(this, value);
  // }

  // Child.prototype = new Parent();
  // const child = new Child(1);
  // child2.getValue();
  // console.log(child instanceof Parent);

  // 寄生式组合继承
  // function Child(value) {
  //   Parent.call(this, value);
  // }
  // Child.prototype = Object.create(Parent.prototype, {
  //   constructor: {
  //     value: Child,
  //     enumerable: false,
  //     writable: true,
  //     configurable: true
  //   }
  // });

  // const child = new Child(1);

  // child.getValue();
  // console.log(child instanceof Parent);

  // ES6继承
  class MyArray extends Array {
    constructor(...args) {
      super(...args);
    }
  }

  var arr = new MyArray();
  arr[0] = 12;
  console.log(arr.length);
})();
