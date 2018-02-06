> #### 建议使用module.exports

#### 1.module.exports:

> module.exports是遵循Common.JS规范的，由于nodejs遵循CommonJS规范,又由模块组成。

> 而且CommonJS中规范了每个模块都有一个module,即该模块本身这个对象;

> 所以module.export表示对外开放的接口,即对外开放加载当前对象的某个属性或方法;

---

#### 2.exports:

> 为了方便，Node为每个模块提供一个exports变量，指向module.exports。

> 而exports是node中特有的为每一个模块赋予的一个全局变量,指向module.exports,
就好比是在每一个Node js文件顶部，都会执行这么一行代码:


```javascript
    var exports = module.exports;
```

> *** 这说明呢？

> *** 这又意味着什么呢？

> *** 意味着，你在当前文件中，如果单独对exports进行赋值，那这时候是不会再赋值给module.exports。具体看下面例子：

```javascript
var module = {
  id: 'hello',
  exports: {}
}

var load = function (exports, module) {
  // hello.js的文件内容
  // ...
  // load函数返回:
  return module;
}
console.log('查看返回的...两个区别...')
console.log(exports) // { load: { id: 'hello', exports: {} } }
console.log(module.exports) // {} 



// 但是...注意了!!!

// 标记01
// 这样赋值相当于切断了exports和module.exports之间的联系,是不能成功导出的.
// 只在当前文件的作用域内有效.
// 是导不出该文件的...
/*exports={
   load: load(module.exports, module)
}*/
// 上面可看到,load是单独赋值给exports,所以输出exports是有值的。
// 但是为什么输出module.exports还是{}

/* 因为默认情况下,module.exports和exports是属于同一个变量,都初始化为一个空对象.
   所以,当你单独给exports赋值,exports的值不再是{},但是,module.exports却还是{}...
   所以exports有值,而module.exports还是初始值.
*/

// ------------------------------------------------------------------


// 所以...
// 正确的导法-01:
exports.load = load(module.exports, module);
// 正确的导法-02:
module.exports.load = load(module.exports, module);


```
#### 2.1. 导出的值是exports还是module.exports???

```javascript
// a.js
module.exports = 'module.exports...'
exports.load = 'exports...'
onsole.log('查看返回的...两个区别...')
console.log('我是exports的值...',exports)
console.log('我是module.exports的值...',module.exports)

// b.js
let load = require('./a.js')
console.log('查看导入的值...')
console.log(load)

// -------------------------------------------------------

/* 通过输出结果可得知,其实你每次导出的值是module.exports的值..
   
   而为什么exports.变量也能导出呢?
   这是因为exports是指向module.exports的,是node的一个简便的表示module.exports而已.
   
   所以前面才会一开始就说,推荐使用module.exports,这也是担心搞混了,还不如只记一个...
*/

```

---