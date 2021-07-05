function fn() {}
// export function () {} // 匿名不行

class className {}
// export class  {} // 匿名不行

const age = 18;
console.log(this)
export { fn as func, className, age };
export default {test:'test'};
