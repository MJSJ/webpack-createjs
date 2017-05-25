# webpack-h5
### webpack h5制作模板

* **es6**
* **spritesheet movieclip soundjs**
* **less**
* **htmltemplate**

# get started
* **npm start** 在本地8080端口起测试服务,引用的所有文件都在内存，不在硬盘上，更新速度飞快
* **npm run build** 在硬盘上生成online.config.js中指定的ROOT文件夹，直接发布ROOT包即可

# 说明


### 目录结构

```
.
├── online.config.js          # 上线配置文件，运行npm run online
├── webpack.config.js         # 开发配置文件,npm run dev
├── rem.template.handlebars   # 雪碧图生成模板
└── src
    ├── css
	|   ├── preset.less       # 可放全局less样式，比如.abs()
	|   ├── index.less        # 页面主要样式
	|   ├── loading.less      # loading
	|   └── sprite.less       # 雪碧图生成的样式
	|
	├── img
	|   ├── sprites               # 所有需要生成雪图的都可放在这
	|   |	├── a.png             
        |   |   └── b.png   
        |   |       
	|   └── sprite.png            #webpack执行后会把sprites中的图片生成一张雪碧图sprite.png
	|
	├── js                    # 以下面方式解藕
	|   |── index.js          # 引导index.js
	|   |── game.js           # createjs游戏js
	|   |── dom.js            # 游戏外的js
	|   └── load.js           # 预加载js
	|
	├── index.html            # 主html,不用在里面写loading,自适应,统计的代码
	|
	└── view
		├── cover.html        # h5封面html，与下面的loading.html不一样，是在index.js中动态加载的
		├── loading.html      # loading板块的代码，含有自适应、预加载代码
		└── statistics.html   # 所有的统计代码块

```

### 功能

#### 编写

参考上面目录结构
* 编写游戏的只专注game.js
* 编写h5外壳的专注于cover.html和game.js
* load.js配合loading.html；统一使用createjs自带的preload.js
* statistics.html指统计代码的模块，跟loading一样会插入到index.html中，不过是插在body结束标签前，

****
#### 自适应

* 通过viewport设置为设计图上的宽度，比如640
* 所有的布局都按照设计图上来，dom和canvas
	

****		

#### 雪碧图


* 将需要拼接的雪碧图放在img/sprites文件夹下，运行npm run dev后会自动生成sprite.png和sprite.less
* 此后sprites文件夹下的的文件变换会自动更改上述文件，意味着切下一张小图后，可以直接在less中引用，**且不用在less里写图的宽高，地址**
****
#### base64图片处理
* 在js中加载的小图会自动转成base64

****

---------------------------------------

### 编写代码
* **所有代码均在src下编写**
* **集成有ES6开发环境**


### 上线
在online.config.js中有如下代码

	var ROOT = "yursile/fuckdd/"
	
	output:{
        path: path.join(__dirname,ROOT),
        publicPath: "http://news.sohu.com/upload/"+ROOT,
        filename: "js/[name].js",
        chunkFilename: "js/[id].chunk.js"
    },

* **path:**  会在根目录生成ROOT中指定的目录结构，直接打包上传ROOT目录，(例子中会生成yursile目录)

	如需要index.html单独提出来，直接发布index.html即可，**不用再换里面链接**
* **publicPath**  会把所有的链接地址替换成线上的地址

****
	
## 关于[hmtl-yu-plugin](https://github.com/yursile/html-yu-plugin)

这个工具可以动态生成css,js甚至html代码块。在webpack plugin配置如下：
```javascript
new HtmlWebpackPlugin({           
    filename:'/view/index.html',  
	template:'src/view/index.html', 
	inject:true,  //this value must be true
	heads:['response'],  //将chunck为response的js放在头部
    blockFile:"./src/view/statistics.html", //把这个目录下的代码块放到body结束标签之前，  通常放统计代码
    headBlockFile:"./src/view/loading.html",  //把这个目录下的代码块放到body开始标签之后，通常放loading
	replaceUrl:DOMAIN + ROOT    //替换index.html中的线上地址
})
```


#### Author *@yursile*