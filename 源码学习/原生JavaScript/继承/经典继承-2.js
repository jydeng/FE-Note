// 经典继承
// 使用行为委托来关联原型，移除prototype、constructor与new关键字。
(function() {
  // 基础对象
  let Vehicle = {
    init: function(name) {
      this.name = name;
    },
    start: function() {
      return `engine of ${this.name} starting...`;
    }
  };

  // 创建委托链接
  let Car = Object.create(Vehicle);

  // 子对象的方法
  Car.run = function() {
    console.log(`Hello. ${this.start()}`);
  };

  //测试
  let car1 = Object.create(Car);
  car1.init("BMW");

  let car2 = Object.create(Car);
  car2.init("Audi");

  car1.run();
  car2.run();
})();
