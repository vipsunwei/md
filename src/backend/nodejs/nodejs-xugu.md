# `Node.js` 如何连接虚谷数据库

## `Nodejs` 版的虚谷数据库驱动

:::tip

需要加入虚谷交流群, 在`QQ群`里找虚谷的工程师要对应版本的驱动包

:::

我们的后端`Java`开发在`QQ群`里, 直接要到了对应`node:16`的`Linux`驱动包 `XuGu-Nodejs-Driver-16.19-RELEASE.tar(1).gz`

咱也不知道为什么他们不在官网挂个下载地址, 所以这里也就不敢把拿到的驱动随便放上来分享下载.

主要就是记录一下在测试连接虚谷数据库的过程.

## Docker 环境下进行测试链接

因为我的机器是`Mac`, 他们没有`Mac`的驱动, 所以使用`Docker`提供一个`Linux`环境进行测试, 我弄了个 `demo` 项目结构如下

```
node_modules
src
  XuGu-Nodejs-Driver-16.19
    libxugusql.so
    Xugudbjs.node
    nodejs 使用手册.md
  index.js
Dockerfile
package.json
```

### 编写 `Dockerfile`

```Dockerfile

FROM node:16

WORKDIR /app

COPY ./package.json .

RUN npm i

COPY ./src ./src

# 注意: 这里是个坑, 那个给我驱动的工程师没有告诉我在 Docker 环境应该怎么用,
# 我们把报错信息和 Dockerfile 发给他们的工程师给回复让配置一下动态库环境变量,
# 加载 libxugusql.so 的时候会用到,
# 一顿搜索终于在 stackoverflow 上找到了正确的答案,
# 就是下边这个 ENV 配置
ENV LD_LIBRARY_PATH=./src/XuGu-Nodejs-Driver-16.19:$LD_LIBRARY_PATH

CMD [ "node", "./src/index.js" ]
```

### 编写测试代码 `index.js`

```js
/**/
const xugu = require("./XuGu-Nodejs-Driver-16.19/Xugudbjs.node");

const conn = xugu.createConnection(
  "IP=192.168.10.10;Port=5138;Database=DB_NODEJS;USER=SYSDBA;PWD=SYSDBA;char_set=utf8"
);

try {
  conn.connect();
} catch (error) {
  console.error(error.message);
  return;
}

const Query = conn.query("select * from NEWTABLE");

Query.on("fields", function (fields) {
  console.log(fields);
});

Query.on("result", function (row) {
  console.log(row);
});

conn.end();
/**/
```

## 构建镜像

```sh

docker build -t node_xugu:1.0 .

```

## 运行容器测试一下

```sh

docker run --rm -it node_xugu:1.0

```

如果正确打印出查询结果就`OK`啦 ✌🏻
