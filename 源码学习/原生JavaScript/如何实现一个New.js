(function() {
  // 1.首先函数接受不定量的参数，第一个参数为构造函数，接下来的参数被构造函数使用
  // 2.然后内部创建一个空对象 obj
  // 3.因为 obj 对象需要访问到构造函数原型链上的属性，所以我们通过 setPrototypeOf 将两者联系起来。这段代码等同于 obj.__proto__ = Con.prototype
  // 4.将 obj 绑定到构造函数上，并且传入剩余的参数
  // 5.判断构造函数返回值是否为对象，如果为对象就使用构造函数返回的值，否则使用 obj，这样就实现了忽略构造函数返回的原始值
  function create(Con, ...args) {
    let obj = {};
    Object.setPrototypeOf(obj, Con.prototype);
    let result = Con.apply(obj, args);
    return result instanceof Object ? result : obj;
  }

  function Test(name, age) {
    this.name = name;
    this.age = age;
  }

  Test.prototype.sayName = function() {
    console.log(this.name);
  };

  const a = create(Test, "roy", "27");
  console.log(a.name);
  console.log(a.age);
  a.sayName();
})();
