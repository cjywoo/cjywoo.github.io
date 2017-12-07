---
title: travis-and-hexo
date: 2017-12-06 18:58:46
tags:
---

# 通过hexo创建个人博客，并利用travis进行自动化部署

本篇文章是试创建博客，也是第一篇，主要将我零基础创建博客的过程记录下来。


## 利用hexo创建博客

### 1.博客搭建的准备工作

创建一个工程文件

安装hexo

``` js
npm i -g hexo
npm i -g hexo-cli
```

初始化``hexo ini ``,初始化之后，就可以看到一部分文件
* node_modules：是依赖包
* public：存放的是生成的页面
* scaffolds：命令生成文章等的模板
* source：用命令创建的各种文章
* themes：主题
* \_config.yml：整个博客的配置
* db.json：source解析所得到的
* package.json：项目所需模块项目的配置信息

将代码上传github
修改repo参数
修改``_config.yml``中的配置

```
deploy:
  type: git
  repo: https://github.com/cjywoo/cjywoo.github.io.git
  branch: master
```

回到gitbash中，输入指令进行博客创建

```
hexo clean
hexo generate
hexo server
```

现在博客已经运行在``localhost:4000``了

### 2. 博客的高级配置

后期补充

#### 修改博客主题

#### 增加插件

## 配置travis

利用travis最终达到的效果为
* 写完blog后，直接push到github的master分支，其它的就可以不用管了
* 由于我的.travis.yml配置文件里设置监听的就是master分支，所以会触发webhook
* Travis则会将该项目clone过去，然后按照.travis.yml的设置执行接下来的命令
* 执行完成后，再将编译好的文件们发送到自己的服务器，顺便push到cjywoo.github.blog项目中
* 在cjywoo.github.io中新建一个index.html用来指向cjywoo.github.blog

接下来开始动工

### 生成token
* 点击头像，点``setting``
* 点击``Developer settings``，再点击``Personal access tokens``
* 点击``Generate new token``
* 为``token``去一个名字，勾选``repo``,然后生成
* 生成``token``后，点击复制，并保存

### 配置travis

利用github账号登录Travis,右上角点击同步项目(注意，有时候会切换到私人项目，一个老人，但是我们一般都是开源项目，所以点击切换，看到一个小女孩就对了)

将你需要自动部署的项目开关打开
![travisfirst](/travis-and-hexo/travisfirst.png)

在点击``Build only if .travis.yml is present``
![present](/travis-and-hexo/present.png)

在这里我将变量名称名为``REPO_TOKEN``，放上token，点击Add按钮
![token](/travis-and-hexo/value.png)

在你的项目内新建``.travis.yml``

``` js
# 使用语言
language: node_js
# node版本
node_js: stable
# 设置只监听哪个分支
branches:
  only:
  - master
# 缓存，可以节省集成的时间，这里我用了yarn，如果不用可以删除
cache:
  apt: true
  yarn: true
  directories:
    - node_modules
# tarvis生命周期执行顺序详见官网文档
before_install:
- git config --global user.name "cjywoo"
- git config --global user.email "chenjunyu_woo@126.com"
# 由于使用了yarn，所以需要下载，如不用yarn这两行可以删除
- curl -o- -L https://yarnpkg.com/install.sh | bash
- export PATH=$HOME/.yarn/bin:$PATH
- npm install -g hexo
- npm install -g hexo-cli
install:
# 不用yarn的话这里改成 npm i 即可
- yarn
script:
- hexo clean
- hexo generate
after_success:
- cd ./public
- git init
- git add --all .
- git commit -m "Travis CI Auto Builder"
# 这里的 REPO_TOKEN 即之前在 travis 项目的环境变量里添加的
- git push --quiet --force https://$REPO_TOKEN@github.com/cjywoo/cjywoo.github.blog.git
  master
```

然后利用github工具提交，如果travis里面的build log显示正常即可。
