## Module & Babel & Webpack <a id="user-content-top"></a>

| 目錄列表 |
|:--|
| [Module](#user-content-module-start) |
| [Babel](#user-content-babel-start) |
| [Webpack](#user-content-webpack-start) |

---
### <a id="module-start" href="#user-content-top" >Module</a>

#### 說明
- 模塊的定義
  - 局部作用域的代碼塊
- 模塊主要解決問題分析
  - 將功能切分模塊化
  - 消除全局變量
  - 模塊加載的順序

#### 使用方法
##### 使用 script tag 加載 module
```html
<script src="./your.js" type="module"></script>
```
##### 導出與導入
- 導出與導入可分開存在
- 被導入的 module 都會先執行一次
  - 重複導入多次也只會執行一次
- 使用方式
```js
/* 
1. 使用 export default 導出導入
一個 module 只能有一個 export default
使用 export default 導出則導入時可以隨意命名
*/
// 導出
export default { test:'test' };
// 導入
import m from './module.js'

/* 
2. 一般導出導入
非 export default 不能随意命名
使用一般導出必須命名否則導入無法呼叫
*/
// 導出
export const age = 18;
// 導入
import { age } from './module.js';

/*
3. 複數導出導入
導入時不用按照順序但要同名
*/
// 導出
function fn() {}
class className {}
const age = 18;
export { fn, className, age };
// 導入
import {age, fn, className} from './module.js'

/*
4. 導出導入使用別名
*/
// 導出
export { fn as func, className, age };
// 導入
import { func, age, className as Person } from './module.js';

/*
5. 整體導入
*/
// 導出
function fn() {}
class className {}
const age = 18;
export { fn, className };
export default age;
// 導入
import * as test from './module.js'
// export default 可藉由 test.default 取得
console.log(test.default.age)
// 一般導出取值方式
console.log(test.className)

/*
6. 同時導入
export default 必須在最前面就導入
*/
// 導出
function fn() {}
class className {}
const age = 18;
export { fn, className };
export default age;
// 導入
import age, { func, className } from './module.js';

/*
7. 導入與導出的複合寫法
若用複合寫法導出的無法在當前模塊使用
*/
// 導出
const age = 18;
export { age };
// 導入
export { age } from './module.js';
// 等於(但無法在當前模塊使用)
import { age } from './module.js';
export { age };
```

##### 細節注意事項
- 1.模塊js內的this為undefined，一般js內的this為window
- 2.import語句只能在最頂層，執行時其他代碼都未執行
- 3.若要在代碼執行時導入則使用 import()
```js
if (PC) {
  let pcModule = await import('pc.js');
  // 取得 export default
  console.log(pcModule.default)
} else if (Mobile) {
  import('mobile.js').then((result)=>{
    // 取得 export default
    console.log(result.default)
  }).catch();
}
```

---
### <a id="babel-start" href="#user-content-top" >Babel</a>

#### 介紹
- 官網: [babel](https://babeljs.io/)
- 線上編譯: [babel-online](https://babeljs.io/repl)
```txt
Babel 是 JavaScript 的編譯器
用來將 ES6 的代碼，轉換成 ES6 之前的代碼

但對於 ES6 新增的 API，如 Set、Map、Promise 等全局對象
及一些定義在全局對像上的方法（比如 Object.assign/Array.from）
都不能直接編譯，需要藉助其它的模塊
Babel 一般需配合 Webpack 來編譯模塊語法
```
<br>

#### 使用
- 1.安裝node: [node](https://nodejs.org/en/)
  - 可以透過指令檢查是否安裝成功 
  ```txt
  檢查 node 版本: node -v
  檢查 npm 版本: npm -v
  ```
- 2.初始化項目(生成 package.json ): npm init
- 3.安装 Babel(寫入package.json)
  ```txt
  npm install --save-dev @babel/core @babel/cli
  npm install --save-dev @babel/core@7.11.0 @babel/cli@7.10.5
  ```
- 4.編譯 ES6
  - 1.Babel 配置文件
  ```txt
  配置轉譯包:
  npm install @babel/preset-env@7.11.0 --save-dev
  創建配置文件 .babelrc 並配置:
  {"presets": ["@babel/preset-env"]}
  ```
  - 2.在 package.json 文件中 scripts 添加 babel 的命令
  ```txt
  兩句指令相等(-d = --out-dir = 輸出目錄)
  babel src -d dist
  babel src --out-dir dist
  ```
  - 3.執行 npm run build 即可編譯使用babel
--- 
### <a id="webpack-start" href="#user-content-top" >Webpack</a>
#### 介紹
- 官網: [webpack](https://webpack.js.org/)
```txt
webpack 是靜態模塊打包器
webpack 處理時，會將所有模塊打包成一或多個文件
```
<br>

#### 初始化
- 1.安裝node: [node](https://nodejs.org/en/)
  - 可以透過指令檢查是否安裝成功 
  ```txt
  檢查 node 版本: node -v
  檢查 npm 版本: npm -v
  ```
- 2.初始化項目(生成 package.json ): npm init
- 3.安装 webpack(寫入package.json)
  ```txt
  npm install --save-dev webpack-cli@3.3.12 webpack@4.44.1
  ```
- 4.配置 webpack
  - 1.創建  webpack.config.js 檔案
  ```javascript
  const path = require('path');
  // mode: 'development' 代表單純編譯不混淆不壓縮(不寫則默認混淆並壓縮)
  // entry: 代表需要編譯的檔案路徑
  // output: 輸出路徑(建立dist資料夾並新增編譯完成的文件 bundle.js)
  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    }
  };
  ```
  - 2.在 package.json 文件中 scripts 添加 webpack 的命令
  ```txt
  兩句指令相等
  (預設指向 webpack.config.js 若要改其他名字則可用 --config)
  "webpack": "webpack --config webpack.config.js" 
  "webpack": "webpack" 
  ```
- 5.編譯執行
  - npm run webpack

<br>

#### 核心概念
- 1.entry & output
```js
// entry
// 單入口
entry: './src/index.js',
// 多入口
entry: {
  main: './src/index.js',
  search: './src/search.js'
},

// output
// 若只有單入口
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js'
}

// 若有多入口
// [name] 會比對取得多入口的名字:比如在entry 裡面定義 search入口 則會輸出search.js
// [name] 若只有單入口則預設為 main.js
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].js'
}
```
- 2.loader(使用 Babel 做參考)
  - loader官網: [loader](https://www.webpackjs.com/loaders/)
  - 使用目的: loader 讓 webpack 能夠去處理那些非 JS 文件的模塊
  - 1.安裝 babel-loader (讓webpack能使用Babel)
  ```txt
  npm install --save-dev babel-loader@8.1.0
  ```
  - 2.安装 Babel
  ```txt
  npm install --save-dev @babel/core@7.11.0 @babel/preset-env@7.11.0
  ```
  - 3.配置 babel-loader (在 webpack.config.js 新增)
  ```js
  module: {
    rules: [
      {
        test: /\.js$/, // 使用正則表達式讓webpack尋找.js的程式
        exclude: /node_modules/, // 排除node_modules資料夾內的js檔案
        loader: 'babel-loader' //使用babel-loader編譯成es5
      }
    ]
  }
  ```
  - 4.引入 core-js
  ```txt
  安裝 core
  npm install --save-dev core-js@3.6.5
  於需要編譯的js檔加入
  import "core-js/stable"
  ```
  - 5.進行編譯與打包
  ```txt
  npm run webpack
  ```
- 3.plugins(使用 html插件 做參考)
  - 使用目的: 讓webpack可以執行更廣泛的任務
  - 1.安裝 html 插件
  ```txt
  npm install --save-dev html-webpack-plugin@4.3.0
  ```
  - 2.配置 html插件
  ```js
  // 於 webpack.config.js 在頂部新增 
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  ```
  - 3.插件配置
  ```js
  plugins: [
    // 設定增加需要顯示的頁面
    new HtmlWebpackPlugin({
      // 原資料檔案
      template: './index.html',
      // 輸出檔案名
      filename: 'index.html',
      // 設定需要的資源(entry)
      chunks: ['index'],
      minify: {
        // 删除 html 中的註釋
        removeComments: true,
        // 删除 html 中的空格
        collapseWhitespace: true,
        // 删除 html 標籤的雙引號
        removeAttributeQuotes: true,
        // 將 html 文件內的 css 壓縮
        minifyCSS: true,
        // 將 html 文件內的 js 壓縮
        minifyJS: true
      }
    })
  ]
  ```
  - 4.進行編譯與打包
  ```txt
  npm run webpack
  ```
<br>

#### 一些應用
##### 處理 css 文件
- 1.加入 css-loader
```txt
npm install --save-dev css-loader
```
- 2.於要引入的js檔案頂部加入 import './your.css';
- 3.接下來有兩種方式處理css文件
  - 1.於html文件加入style區塊
    - 1.安裝 style-loader
    ```txt
    npm install --save-dev style-loader
    ```
    - 2.在 webpack.config 新增css規則
    ```js
    module: {
      rules: [
        {
          test: /\.css$/,
          // 若有多個loader則用use,會從最後一個往前使用loader
          // css-loader 會先抓取js的css檔並透過style-loader在html檔生成style標籤
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html'
      })
    ]
    ```
  - 2.使用 link 方式導入 css
    - 1.安裝 mini-css-extract-plugin
    ```txt
    npm install --save-dev mini-css-extract-plugin
    ```
    - 2.在 webpack.config 新增css規則
    ```js
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    module: {
      rules: [
        {
          test: /\.css$/,
          // 若有多個loader則用use,注意這邊會從最後一個往前使用loader
          // css-loader 會先將js的css檔抓取並透過MiniCssExtractPlugin.loader在html檔使用link引入css檔
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css' // 這邊會再輸出目錄在創建 css 資料夾並放入 css檔案(預設為main.css)
      })
    ]
    ```
<br/>

##### 處理 css 與 js 圖片
- 1.安裝file-loader
```txt
npm install --save-dev file-loader
```
- 2.新增 webpack.config 規則
```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
      // file-loader 會把 css 裡面引入的圖片路徑換掉成輸出後的檔名
      // 注意:若圖片不在同目錄則需要自己設定publicPath路徑
      // 因需要將圖片設置在 img 資料夾讓css抓取圖片,所以須用此方式並設定publicPath回上一層
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        'css-loader'
      ]
    },
    // 設定 file-loader:在輸出資料夾創建img資料夾並保留原檔名與副檔名
    {
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]'
        }
      }
    }
  ]
},
plugins: [
  new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html'
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].css'
  })
]
```
- 3.加載 js 本地圖片
```js
// 在 js 加入該行即可
// file-loader 會自動解析將裡面的圖片複製到 file-loader 設定的資料夾裡面
import img from './img/logo.png';
```
<br/>

##### 處理 html 圖片
- 1.安裝 html-withimg-loader
```txt
npm install --save-dev html-withimg-loader
```
- 2.新增 webpack.config 規則
```js
module: {
  rules: [
    {
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]',
          // 因 webpack 將 require() 調用解析為：{ default: module } 所以要設為 false
          esModule: false
        }
      }
    },
    {
      test: /\.(htm|html)$/,
      loader: 'html-withimg-loader'
    }
  ]
},
```
<br/>

##### 使用 url-loader 處理圖片
- 1.安裝 url-loader
```txt
因 url-loader 會用到 file-loader 所以一併安裝
npm install --save-dev file-loader
npm install --save-dev url-loader
```
- 2.新增 webpack.config 規則
```js
// 若原本有 file-loader 則 直接替換成 url-loader 即可
// url-loader 會讀取圖片大小，若小於limit的大小則轉化成base64格式融入文檔中
// 當圖片大小超過limit則會改調用 file-loader 將圖片複製到指定路徑
module: {
  rules: [
    {
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: 'img/[name].[ext]',
          esModule: false,
          limit: 3000
        }
      }
    }
  ]
}
```
<br/>

##### 使用 webpack-dev-server 搭建開發環境
- 1.安裝 webpack-dev-server
```txt
npm install --save-dev webpack-dev-server
```
- 2.在 package.json 內 script 新增
```js
//   若使用 npm run dev 則開啟 server，在打包完成後自動打開 chrome 來查看結果
//   webpack-dev-server 只要存檔就會自動打包在內存並開啟指定的瀏覽器進行刷新
"scripts": {
  "dev": "webpack-dev-server --open chrome"
},
```
- 備註
>webpack-dev-server 在 webpack.config.js 有默認設定\
若要改變則新增 devServer:{} 自行設定\
[devServer 詳細設定參考](https://www.webpackjs.com/configuration/dev-server/)
