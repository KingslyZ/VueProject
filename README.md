# VueProject
Vue项目
## 首页
    -九宫格的获取
        -使用axios中的方法来获取数据
        _axios不是Vue的插件，axios既支持Vue的数据获取，也支持node的数据获取
        _axios的使用需要，绑定到Vue的原型上
        _vue-resourse是Vue的插件，使用方法是Vue.use(VueResourse)
    -轮播图的获取
        -使用axios发送请求
## 新闻资讯
    -获取新闻列表
    -点击每条新闻跳转到详情页【需要携带id进行跳转】
## 评论列表
    发表新闻注意：因为发表评论是对象的形式，
	而cors的请求头分为两种，
	一种是简单cors请求【post/get/head】
	一种是非简单cors请求【请求头是application/json格式，form-data】
    ```
        注意：
	当我们使用axios发送请求时，
	① 如果我们发送的是对象形式的数据，
	axios会自动帮我们转换为application/json格式
	② 如果我们发送的是字符串
	axios会帮我们转换为application/x-www-form/data格式
	而我们这次使用的后台接口，只支持application/x-www-form/data格式，所以要发送字符串
	如果是较长的字符串拼接，可以使用JSON.stringify方法进项转化

    ```
## 加载更多

	