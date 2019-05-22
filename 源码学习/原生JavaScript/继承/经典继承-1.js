// 经典继承
// 使用Object.create()实现经典继承
(function() {
  // Vehicle--超类
  function Vehicle(name) {
    this.name = name;
  }
  // 超类的方法
  Vehicle.prototype.start = function() {
    return `engine of ${this.name} starting...`;
  };

  // Car 子类
  function Car(name) {
    Vehicle.call(this, name); // 调用超类的构造函数
  }

  // 子类链接到超类
  Car.prototype = Object.create(Vehicle.prototype);
  // 子类私有方法
  Car.prototype.run = function() {
    console.log(`Hello. ${this.start()}`);
  };

  // 测试
  let car1 = new Car("BMW");
  let car2 = new Car("Audi");

  car1.run();
  car2.run();
})();
