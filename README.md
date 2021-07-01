## babel & webpack
---
<a id="top"></a>

### 目錄
- #### [babel](#babel-start)
- #### [webpack](#webpack-start)

---

### <a id="babel-start" href="#top" >babel</a>

#### 1. 介紹
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

#### 2. 使用
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

### <a id="webpack-start" href="#top" >webpack</a>
#### 1. 介紹
- 官網: [webpack](https://webpack.js.org/)
```txt
webpack 是靜態模塊打包器
webpack 處理時，會將所有模塊打包成一或多個文件
```

#### 2. 初始化
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
- 5.編譯
  - npm run webpack
  
#### 3. 核心概念
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
- 2.loader(使用 Babel 作範例)
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
  


