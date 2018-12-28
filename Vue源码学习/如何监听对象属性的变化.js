(async () => {
  // 观察者构造函数
  function Observer(data) {
    this.data = data;
    this.walk(data);
  }

  let p = Observer.prototype;

  // 此函数通过Object.defineProperty定义get与set钩子函数
  // 当对象属性变化时触发对应钩子函数
  p.convert = function(key, val) {
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        // 可以在for ... in 中访问 // 总开关
        console.log("你访问了" + key);
        return val;
      },
      set: newVal => {
        console.log("你设置了" + key);
        console.log("新的" + key + " = " + newVal);
        if (newVal === val) return;
        val = newVal;
      }
    });
  };

  // 此函数用于深层次遍历对象的各个属性
  // 采用的是递归的思路
  // 因为我们要为对象的每一个属性绑定getter和setter
  p.walk = function(obj) {
    let val;
    for (let key in obj) {
      // 这里为什么要用hasOwnProperty进行过滤呢？
      // 因为for...in 循环会把对象原型链上的所有可枚举属性都循环出来
      // 而我们想要的仅仅是这个对象本身拥有的属性，所以要这么做。
      if (obj.hasOwnProperty(key)) {
        val = obj[key];

        // 这里进行判断，如果还没有遍历到最底层，递归new Observer
        if (typeof val === "object") {
          new Observer(val);
        }

        this.convert(key, val);
      }
    }
  };

  // 新增属性的时候通过set函数增加
  p.set= function(key,val){
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        // 可以在for ... in 中访问 // 总开关
        console.log("你访问了" + key);
        return val;
      },
      set: newVal => {
        console.log("你设置了" + key);
        console.log("新的" + key + " = " + newVal);
        if (newVal === val) return;
        val = newVal;
      }
    });
  }

  // 测试
  let data = { user: { name: "roy", age: "24" }, address: { city: "xiamen" } };

  let app = new Observer(data);
  
  app.data.address.city = "sanming";
  console.log(app.data.address.city);
  
  app.set("n","n");
  console.log(app.data.n);
})();
