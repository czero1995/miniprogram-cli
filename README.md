## 小程序开发现状:

1. 开发工具不好使用(无法热更新，编译缓慢)；
2. 无法使用css预处理语言(Sass、Less)，有些IDE的插件可以监听编译，但不同编辑器需要额外安装；
3. 无法使用工程化(图片自动压缩，文件监听编译等)；
4.编码繁琐(创建一个页面，需要新建4个文件(.wxml、.js、.json、.wxss),每次新建都需要新建4次或者复制文件比较浪费时间)；
5.团队多人协作，代码风格、使用的编辑器不一致；

## 技术选型：

在进行小程序项目启动，进行技术选型的时候，对市场上多个小程序框架进行了考虑:

	uni-app、mpVue、wepy、taro、 kbone

团队成员mpvue、wepy、uni-app都有实际的项目经验,且根据Github上的star数还有issue,最后决定回到到使用原生开发。

### 原因:
虽然框架有些很成熟，有工程化和跨端的解决方案，也有实际的上线项目，但考虑到后续一些支撑性的问题(维护，文档，坑等)，在github上看了issue，有些已经没在维护了。

想着让项目持续迭代，不受第三方框架限制，保持稳健，最后决定使用原生，跟着官方的迭代升级，自己维护，引入前端工程化的思想，提高繁琐的流程以及开发效率。

## 引入工程化

基于Webpack4.x,自定义Webpack配置

1. scss编译为wxss：定义全局变量,使用公共的样式文件,提高css开发效率和可维护性；

2. 自动压缩图片资源 : 小程序对包大小有限制，压缩图片大小可以减少空间，加快页面加载；普通的图片压缩需要将图片上传到在线图片压缩网站，压缩完再保存下来，效率比较低。现在执行命令就可以自动压缩图片。

## 代码规范

1. eslint: 能在js运行前就识别一些基础的语法错误，减少不必要的小问题，提高调试效率；

2. husky、line-staged、prettier: 统一团队代码规范: 当执行代码提交到git仓库时，会将已改动文件的代码格式化统一规范的代码风格;


## 命令行创建页面和组件模板

1. 小程序每次新建页面或者组件，需要依赖4个文件(.wxml,.js,.wxss,.json)。只需要执行npm run create命令，会提示选择创建页面还是组件，选择完成输入页面或者组件的名字，会自动生成4个模板文件(.wxml,.js,json,.scss)到对应的目录

## 引入jest单元测试

1. 生成测试覆盖率

## 项目结构

    app -> 小程序程序的入口，使用微信开发者工具制定app目录
    cli -> 生pages和components的模板脚手架
    img -> 图片资源原文件
    .eslintignore
    .eslintrc.js
    .gitignore(忽略wxss的提交，多人和做改动，容易有冲突，将scss文件传到服务器就好了)
    .prettierrc.js(代码格式化风格配置)
    babel.config.js
    jest.config.js(单元测试配置文件)
    webpack.compress.js(指定入口图片资源文件，将图片压缩编译到小程序的资源目录)
    webpack.config.js -> (工程化入口文件,指定入口scss文件，监听文件变化，自动将scss编译为wxss)
    项目使用的包文件
    webpack、babel、eslint: 转换、规范js
    chalk: console.log打印彩色颜色
    scss、css-loader: 编译scss
    figlet: 控制台显示字体样式
    husky,line-staged,prettier: 代码格式化相关
    jest、miniprogram-simulate: 单元测试
    
## 项目运行

. 安装依赖

    npm install 或 yarn install

. 编译scss

    npm run dev

. 压缩图片

    npm run img

. 单元测试

    npm run test(生成测试报告)
    npm run test:watch(监听测试文件改动--开发环境下使用)



## 其他思考

工程化的初衷就是为了减少重复性的操作，提高编码的效率和乐趣。

JavaScript是弱类型语言，好处是灵活，坏处是太灵活(多人协作，维护别人写的代码就是很痛苦了)。

项目最主要的是稳健，可高度自定义拓展，不拘束于版本和地上那方，特别多人协作的团队，工程化能给团队带来更多的收益，后续也会考虑将TypeScript、Docker等其他好的方案引入项目。
