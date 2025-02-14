//防抖

//定时器方式
function debounce(action, delay) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    const context = this;
    const args = arguments;
    timer = setTimeout(() => {
      //如果使用箭头函数定义回调函数，则无需存储context和args
      //因为箭头函数会从外部作用域中获取this和arguments
      // action.apply(context, args);
      //这两个语句的本质是一样的
      action.apply(this, arguments);
    }, delay);

    // timer = setTimeout(function () {
    //   //但是如果我使用普通函数作为回调，就必须存储context和args
    //   //因为普通函数的this会是全局对象或者undefined
    //   //且它的arguments和外部作用域中的arguments不一样
    //   // action.apply(context, args); //这是对的
    //   // action.apply(this, arguments); //这是错的
    // }, delay);
  }
}

const obj = {
  name: 'obj',
  func(num) {
    console.log('回调函数运行了' + this.name);
    console.log('回调函数运行了' + num);
  }
}

//如果想正确使用obj对象，这里需要显示使用bind进行绑定
//如果不进行绑定，obj.func作为回调函数，成为了一个普通函数
//它的this会变为window/global/undefined
const debounce_func = debounce(obj.func.bind(obj), 2000);

debounce_func(1);
debounce_func(2);
debounce_func(3);
debounce_func(4);
//回调函数运行了obj
//回调函数运行了4
