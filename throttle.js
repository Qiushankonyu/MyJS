//节流

//方式一：时间戳方式
// function throttle(action, delay) {
//   let lastRun = 0;
//   return function () {
//     const context = this;
//     const args = arguments;
//     const currentTime = +new Date;
//     if (currentTime - lastRun >= delay) {
//       action.apply(context, args);
//       lastRun = currentTime;
//     }
//   }
// }

//方式二：定时器方式
function throttle(action, delay) {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    if (timer) {
      //如果此时已经有事件在定时器的回调中了
      //则直接返回，不再执行相同事件
      return;
    } else {
      //此时没有相同事件运行
      //则开启一个定时器
      timer = setTimeout(() => {
        //执行回调函数
        action.apply(context, args);
        //执行完毕后销毁定时器
        timer = null;
      }, delay);
    }

  }
}

const obj = {
  name: 'obj',
  func() {
    console.log('回调函数运行了');
  }
}

const thro_func = throttle(obj.func, 2000);

setInterval(() => {
  thro_func()
}, 1000);