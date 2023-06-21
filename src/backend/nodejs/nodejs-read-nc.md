---
theme: channing-cyan
---

# 如何用 `Node.js`+`netcdfjs` 轻松读取 `NetCDF` 格式的气象数据

**`netcdfjs`** 是一个 `JavaScript` 库，可以用于读取和探索 `NetCDF` 文件。您可以通过运行 `npm i netcdfjs` 将其用于您的项目, 据说它不仅可以在`Node.js`环境中使用,还可以在浏览器端使用。[`netcdfjs`传送门](https://github.com/cheminfo/netcdfjs)

以下是使用 **`netcdfjs`** 的示例代码：

```js
const { readFileSync } = require("fs");
const { resolve } = require("path");
const NetCDFReader = require("netcdfjs");

let data = null;

try {
  data = readFileSync(resolve(__dirname, "demo.nc"));
} catch (error) {
  console.error(`${error.message}`);
  return;
}

const reader = new NetCDFReader(data);

// 获取 lon 和 lat 和 var 变量的数据
const lonData = reader.getDataVariable("lon");
const latData = reader.getDataVariable("lat");
const varData = reader.getDataVariable("var");
```

此代码从 `NetCDF` 文件中读取数据名为`"lon"`, `"lat"`, `"var"`的数据变量

`NetCDFReader`实例上有个名为`dimensions` 的属性，它的类型是 `any[]`。这个属性返回一个包含多个维度的列表，每个维度都有以下属性：

- `name`: 维度的名称，类型为字符串。
- `size`: 维度的大小，类型为数字。

```js
const dimensions = reader.dimensions;
```

更多`API`信息请查看[`API Documentation`](https://cheminfo.github.io/netcdfjs/)

接下来的目标是根据`lon`和`lat`的`size`, 将`varData`转换成一个二维数组, 因为`size`其实和数组的`length`是一样的, 所以下面我们直接用数组的长度进行转换, 就不用`dimensions`去获取`lon`和`lat`的`size`了.

```js
// 嵌套for循环转 varData 换成二维数组
const varArray = [];
for (let i = 0; i < latData.length; i++) {
  varArray[i] = [];
  for (let j = 0; j < lonData.length; j++) {
    varArray[i][j] = varData[i * lonData.length + j];
  }
}

// or

// 使用 map 函数将 varData 转换为二维数组
const varArray = latData.map((_, i) =>
  lonData.map((_, j) => varData[i * lonData.length + j])
);
```

到这里我们就完成了`Node.js+netcdfjs`读取`NetCDF`文件的数据了, 数据读取到要做什么处理和生成什么样的产品就靠自己了.
