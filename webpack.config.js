var path=require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-yu-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var SpritesmithPlugin = require('yu-spritesmith');

module.exports={
	entry:{
        polyfill:'babel-polyfill',
		index:"./src/js/index.js"
	},
    watch:true,
    output:{
        path: path.resolve(__dirname,'src'), //往src下输出
        publicPath: "/",//webpack-server-dev下，跟path使用必需为/,不然坑B
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    devtool: 'inline-source-map',
    externals: {
        jquery: "jQuery"
    },
    module: {
        loaders: [	//加载器
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style", "css-loader?-minimize!postcss!less") //不用rem
            },
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=es2015,presets[]=stage-0'
            },
            {
                test: /\.css$/, 
                loader:ExtractTextPlugin.extract("style", "css-loader?-minimize") //不用rem
            },
            {
                test: /\.html$/, 
                loader: "html" 
            },
            {
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=8192&name=./img/[name].[ext]'
            },
            { 
                test: require.resolve('createjs-easeljs'),
                loader: 'imports?this=>window!exports?window.createjs' 
            }
            // {
            //     test: /\.json$/, 
            //     loader: 'json-loader'
            // }
        ]
    },
    postcss: [autoprefixer],
    plugins:[
   
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/img/sprites'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/img/sprite.png'),
                css: [
                    [
                        path.resolve(__dirname, 'src/img/sprite.json'), {
                            format: 'json_texture'
                        }
                    ],
                    [
                        path.resolve(__dirname, 'src/css/sprite.less'), {
                            format: 'handlebars_based_template'
                        }
                    ]
                ]
            },
            apiOptions: {
                cssImageRef: "../img/sprite.png"
            },
            customTemplates: {
              
                'handlebars_based_template': path.resolve(__dirname, 'rem.template.handlebars')
            },
        }),

        // new webpack.HotModuleReplacementPlugin(),//generate update.json
    	new webpack.ProvidePlugin({	//加载jq
            $: 'jquery'
        }),

    	new ExtractTextPlugin("css/[name].css"),	//单独使用style标签加载css并设置其路径

        

    	new HtmlWebpackPlugin({						//根据模板插入css/js等生成最终HTML
    		// favicon:'./src/img/favicon.ico', //favicon路径
			filename:'index.html',	//生成的html存放路径
			template:'./src/index.html',	//html模板路径
			inject:true,	//允许插件修改哪些内容，包括head与body
			// hash:true,	//为静态资源生成hash值
            // heads:['response'],
            blockFile:"./src/view/statistics.html",
            headBlockFile:"./src/view/loading.html"
		}),

      

        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ],

    // resolve: {
    //     // Add bower_components as a modules root
    //     modulesDirectories: ['node_modules', 'bower_components']
    // },
    devServer:{
    	contentBase:'./src',
        disableHostCheck: true
    }
};
