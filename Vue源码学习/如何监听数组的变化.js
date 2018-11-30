// vue.js 包装了被观察数组的方法，这些方法可以触发视图的更新
// push();
// pop();
// shift();
// unshift();
// splice();
// sort();
// reverse();

// 以下的代码不能触发视图更新
// 直接用索引设置元素，如 vm.items[0] = {}；
// 修改数据的长度，如 vm.items.length = 0。

// 具体如何实现的呢？
// ES5及以下的JS无法完美继承数组，可以用以下方法实现
(async () => {
  const aryMethods = ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"];
  const arrayAugmentations = [];

  aryMethods.forEach(method => {
    // 这里是原生Array的原型方法
    let original = Array.prototype[method];

    // 将push, pop等封装好的方法定义在对象arrayAugmentations的属性上
    // 注意：是属性而非原型属性
    arrayAugmentations[method] = function() {
      console.log("我被改变啦!");

      // 调用对应的原生方法并返回结果
      return original.apply(this, arguments);
    };
  });

  let list = ["a", "b", "c"];
  // 将我们要监听的数组的原型指针指向上面定义的空数组对象
  // 别忘了这个空数组的属性上定义了我们封装好的push等方法
  list.__proto__ = arrayAugmentations;
  list.push("d"); // 我被改变啦！ 4

  // 这里的list2没有被重新定义原型指针，所以就正常输出
  let list2 = ["a", "b", "c"];
  list2.push("d"); // 4
})();

// Vue源码关于监听数组变化的实现的一种变种
(() => {
  function fakeArray() {
    let a = Array.apply(null, arguments);
    a.__proto__ = fakeArray.prototype;
    a.constructor = fakeArray;
    return a;
  }
  original = Array.prototype;
  fakeArray.prototype = Object.create(original);
  fakeArray.prototype.constructor = fakeArray;
  fakeArray.prototype.push = function() {
    console.log("苟利国家生死已");
    original.push.apply(this, arguments);
  };
  var words = fakeArray();
  words.push("岂", "因", "祸", "福", "避", "趋", "之");
  console.log(words.join(""));
})();
