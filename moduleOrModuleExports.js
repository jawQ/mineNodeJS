var modules = {
  id: 'hello',
  exports: {}
};
var load = function (exports, modules) {
  // hello.js的文件内容
  // ...
  // load函数返回:
  return modules
};
// 错误导出方式
// exports = {
//   load: load(module.exports, module)
// }
// 正确导出方式
module.exports = 123
exports.load = 1233

console.log('查看返回的...两个区别...')
console.log('我是exports的值...',exports) // { load: { id: 'hello', exports: {} } }
console.log('我是module.exports的值...',module.exports) // {} 