# Docker 命令

## 服务相关命令

### 启动 `docker` 服务

```bash

systemctl start docker

```

### 停止 `docker` 服务

```bash

systemctl stop docker

```

### 重启 `docker` 服务

```bash

systemctl restart docker

```

### 查看 `docker` 服务状态

```bash

systemctl status docker

```

### 设置开机启动 `docker` 服务

```bash

systemctl enable docker

```

## 镜像相关命令

### 搜索镜像

```bash

docker search tomcat

```

搜索结果如下:

![docker-search-result](./assets/docker-search-result.png)

### 拉取镜像

```bash

docker pull tomcat

```

我已经拉取过 `tomcat`,所以这里用拉取 `mysql` 来截个图, 不加 `tag` 的情况下, 默认拉取的就是 `latest`(最新版本) 拉取过程是有进度条的

![docker-pull-1](./assets/docker-pull-1.png)

拉取完成就是下面这样

![docker-pull-2](./assets/docker-pull-2.png)

:::tip

指定版本号, 格式如下:

`docker pull` _镜像名:版本号_

如果不知道 `tag` 有哪些, 可以去 [`Dockerhub`](https://hub.docker.com) 查看

:::

打开网站直接搜索目标镜像, 比如 `tomcat` 就会搜到如下结果:

![dockerhub-search-tomcat](./assets/dockerhub-search-tomcat.png)

点击结果进入详情页就可以查看到 `tag` 相关信息:

![tomcat-supported-tag](./assets/tomcat-supported-tag.png)

### 使用`Dockerfile`构建镜像

```bash

# docker build -t 镜像名:版本号 .  注意最后边的点 `.` 表示当前目录, 别丢了.
docker build -t my_image:1.0 .

```

`Docker` `build` 命令可以使用 `Dockerfile` 来构建镜像。默认情况下，`Dockerfile` 文件位于构建上下文的根目录下，因此 `docker build` 命令会自动读取上下文根路径下名为 `Dockerfile` 的文件。如果 `Dockerfile` 文件不在根目录下，可以使用 `-f` 选项来指定 `Dockerfile` 文件的路径。例如，以下命令将使用 `/path/to/Dockerfile` 文件构建镜像：

```bash

docker build -f /path/to/Dockerfile -t image_name:tag .

```

其中，

- `.` 表示当前目录.
- `-f` , `--file` Name of the Dockerfile (Default is PATH/Dockerfile)
- `-t` , `--tag` Name and optionally a tag in the name:tag format

[docker build [OPTIONS]文档](https://docs.docker.com/engine/reference/commandline/build/#options)

`Dockerfile` 简单列举几个指令:

- `FROM` : 指定基础镜像
- `WORKDIR` : 指定工作目录
- `COPY` : 将文件或者目录从构建上下文复制到容器中(推荐)
- `ADD` : 将文件或者目录从构建上下文复制到容器中,并且会将压缩文件解压缩,支持 `URL`
- `RUN` : 在容器中执行命令
- `CMD` : 容器启动时执行的命令
- `EXPOSE` : 指定要监听的端口以实现与外部通信

举个例子:

```Dockerfile
# nodejs server Dockerfile

# FROM node
# or
FROM node:16

WORKDIR /nodeApp

# COPY <宿主机目录或文件路径> <容器内目录或文件路径>
COPY ./package.json .
# ADD <宿主机目录或文件路径> <容器内目录或文件路径>
# ADD ./package.json .

# shell格式：就像在命令行中输入的Shell脚本命令一样。
RUN npm install

COPY ./src ./server

EXPOSE 8000

CMD ["node", "./server/index.js"]
```

详细了解请查看这篇[纯干货！Docker Dockerfile 指令大全](https://zhuanlan.zhihu.com/p/419175543)

### 查看本地镜像

```bash

docker images

```

该命令将会列出从`Dockerhub`拉取的镜像和你自己使用 `docker build` 构建的镜像列表

![docker-images](./assets/docker-images.png)

查看本地镜像 `ID`

```bash

docker images -q

```

### 删除本地镜像

```bash

docker rmi mysql:5.7

# or

docker rmi 2be84dd575ee

```

:::tip

为了准确删除你的目标镜像, 建议删除有多个版本存在的镜像时, 使用镜像名:版本号, 如果二者镜像 `ID` 不同也可以使用镜像 `ID` 进行删除, 防止误删

:::

删除`tag`为`none`的镜像

```bash

docker rmi `docker images -f "dangling=true" -q`

```

全部删除本地镜像

```bash

docker rmi `docker images -q`

```

解释一下, `docker images -q` 这个命令可以列出全部本地镜像的 `ID`, 相当于把全部镜像 `ID` 传给了`docker rmi` 就实现全部删除效果了.

![docker-images-q](./assets/docker-images-q.png)

![docker-rmi-result](./assets/docker-rmi-result.png)

![container-id](./assets/container-id.png)

:::tip

如上图所示: `Error response from daemon: conflict: unable to delete eb4a57159180 (cannot be forced) - image is being used by running container 8e27f3c57145`

报了个错: 不能删除`ID`为`eb4a57159180`的镜像(是`nginx`镜像), 这个镜像被一个`ID`为`8e27f3c57145`正在运行的容器使用着.

我使用`nginx`镜像启动了一个容器, 此时`nginx`镜像是不可以被删除的, 如果确实想要删除`nginx`, 需要先停止所有使用这个镜像的容器, 并且将这些容器删除, 才可以删除`nginx`镜像

:::

### 导出镜像

```bash
# docker save -o 给导出的镜像压缩包起个文件名 要导出的镜像名:版本号(推荐) 或者 镜像ID也可以
docker save -o image.tar target_image:tag

```

### 导入镜像

```bash
# docker load -i 指定要导入的镜像压缩包文件名
docker load -i image.tar

```

导入成功后就可以使用

```bash
docker images
```

查看一下啦

:::tip
如果用镜像 `ID` 导出的镜像在导入之后是没有名字和`tag`的, 这种情况我们可以使用 `docker tag` 给镜像改名字
:::

```bash
docker tag 镜像ID new_image_name:tag

```

## 容器相关命令

### 创建容器

```bash

docker run -d --name=my_container -p 8080:8080 tomcat:latest

```

`Docker` 创建容器的命令是 `docker run`。以下是一些常用的参数：

- `-d`: 后台运行容器，并返回容器`ID`；
- `-p`: 指定端口映射，格式为：主机(宿主)端口:容器端口；
- `-i`: 以交互模式运行容器，通常与 `-t` 同时使用；
- `-t`: 为容器重新分配一个伪输入终端，通常与 `-i` 同时使用；
- `--name=my_container`: 为容器指定一个名称；
- `--dns 8.8.8.8`: 指定容器使用的`DNS`服务器，默认和宿主一致；
- `--rm`: 退出容器后会自动删除该容器；

你可以根据你的需求来选择相应的参数。最后是使用的镜像名和版本号

:::tip

使用交互模式运行容器时, 会直接进入容器内部, 退出交互模式后, 该容器自动停止运行

:::

### 查看容器列表

```bash
# 查看正在运行的容器列表
docker ps

# 查看最近一次创建的容器
docker ps -l

# 查看正在运行的容器ID列表
docker ps -q

# 查看全部容器(包括已经停止的容器)
docker ps -a

# 查看全部容器ID列表
docker ps -aq

```

查看正在运行的容器列表
![docker-ps](./assets/docker-ps.png)

查看正在运行的容器 `ID` 列表
![docker-ps-q](./assets/docker-ps-q.png)

### 停止运行的容器

```bash
# 使用容器名停止
docker stop my_container

# or
# 使用容器ID停止
docker stop container_id

# 使用容器ID停止多个正在运行的容器
docker stop `docker ps -q`

```

使用容器 `ID` 停止多个正在运行的容器
![docker-stop-q](./assets/docker-stop-q.png)

### 启动已停止的容器

```bash
# 容器名
docker start my_container

# or
# 容器ID
docker start container_id

# 使用容器ID启动多个已停止的容器
docker start `docker ps -aq`

```

使用容器名启动
![docker-start](./assets/docker-start.png)

使用多个容器 `ID` 启动
![docker-start-aq](./assets/docker-start-aq.png)

### 删除容器

```bash
# 用容器名删除
docker rm my_container

# or
# 用容器ID删除
docker rm container_id

# 删除多个未运行的容器, 运行中的无法删除
docker rm `docker ps -aq`

```

![docker-rm-aq](./assets/docker-rm-aq.png)

### 进入容器(正在运行的容器才可以进入)

```bash
# 使用容器名
docker exec -it my_container /bin/bash

# or
# 使用容器ID
docker exec -it container_id /bin/bash

```

进入容器后
![docker-exec-it](./assets/docker-exec-it.png)

### 查看容器信息

```bash
# 容器名
docker inspect my_container

# or
# 容器ID
docker inspect container_id

```

内容很多一张截图放不下, 自己查查看吧
![docker-inspect](./assets/docker-inspect.png)

### 容器与宿主机之间的数据拷贝

- 将容器中目录或文件拷贝到宿主机

```bash
# 将容器中 /app/html 目录拷贝到宿主机 /mnt/ 目录中
docker cp container_id:/app/html /mnt/
# 将容器中 /app/html/index.html 文件拷贝到宿主机 /mnt/dist/ 目录中
docker cp container_id:/app/html/index.html /mnt/dist/
```

- 将宿主机目录或文件拷贝到容器中

```bash
# 将宿主机 /mnt/dist 目录拷贝到容器的 /app 目录中
docker cp /mnt/dist container_id:/app/
# 将宿主机 /mnt/dist/index.html 文件拷贝到容器的 /app/html 目录中
docker cp /mnt/dist/index.html container_id:/app/html/
```

- 将宿主机`/mnt/dist`目录拷贝到容器中, 并重命名为`html`

```bash
# 将宿主机 /mnt/dist 目录拷贝到容器的 /app/ 中重命名为 html
docker cp /mnt/dist container_id:/app/html
# 将宿主机 /mnt/dist/index1.html 文件拷贝到容器的 /app/html/ 中重命名为 index.html
docker cp /mnt/dist/index1.html container_id:/app/html/index.html
```
