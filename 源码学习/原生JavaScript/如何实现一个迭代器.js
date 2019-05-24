(function() {
  function Iterdtor(arr) {
    let data = [];
    // 此处应该深拷贝，避免引用影响
    if (Array.isArray(arr)) {
      data = arr;
    } else {
      data = [arr];
    }

    let length = data.length;
    let index = 0;

    // 核心
    this.next = function() {
      let result = {};
      result.value = data[index];
      result.done = index === length - 1 ? true : false;
      if (index !== length) {
        index++;
        return result;
      }

      return {
        value: undefined,
        done: true
      };
    };
  }

  let arr = [1, 2, 3, 4, 5, 6, 7, 8];
  // 生成一个迭代器对象
  let itertor = new Iterdtor(arr);
  console.log(itertor.next());
  console.log(itertor.next());
})();
