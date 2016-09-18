
## 初始化项目
`npm install -g express-generator` 初始化一个express项目  

//方法一：
`express blog` 创建一个命名为blog的应用（默认模版引擎jade【已经改名为pug，但是有些坑没填好，所以还是用jade】）。

//方法二：
`express -e blog` 创建一个命名为blog的应用,使用模版引擎ejs。

如果不知道express后面的参数，可以使用命令  
`express -h`获取帮助