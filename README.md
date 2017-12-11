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
### 发表评论
    发表新闻注意：因为发表评论是对象的形式，
	而cors的请求头分为两种，
	一种是简单cors请求【post/get/head】
	一种是非简单cors请求【请求头是application/json格式，form-data】
    >
    注意：
	当我们使用axios发送请求时，
	① 如果我们发送的是对象形式的数据，
	axios会自动帮我们转换为application/json格式
	② 如果我们发送的是字符串
	axios会帮我们转换为application/x-www-form/data格式
	而我们这次使用的后台接口，只支持application/x-www-form/data格式，所以要发送字符串
	如果是较长的字符串拼接，可以使用JSON.stringify方法进项转化

    且要想达到发表的数据在第一条存在，使用unshift方法
    >
### 加载更多
    点击时显示下一页，注意：要使用数组的concat方法进项连接数组，这样才能保证显示第二页数据时第一页数据也在
## 图片分享
    ###获取分类
    去掉滚动条方法
    ```css
        ::-webkit-scrollbar{
            display:none;
        }
    ```
## 图片详情页面
    使用Vue-Preview 实现图片的放大效果
    ```js
        this.picInfo.forEach(function(item){
            item.h = 400;
            item.w = 600;
        })
    ```
## 全局阻拦器
    使用mint-ui中的indicator.open()方法去全局进行拦截
	写在实例化Vue对象的created(）函数内
    ```js
     created(){
        // Add a request interceptor
        this.axios.interceptors.request.use((config)=> {
            // Do something before request is sent
            this.$indicator.open('加载中...');
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
        
        // Add a response interceptor
        this.axios.interceptors.response.use( (response) =>{
            // Do something with response data
            this.$indicator.close();
            return response;
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
    }
    ```
## 代码重构
    -将路由规则写在router.js文件
    -将插件引入写在plugins.j文件
	-将过滤器放在filters.js文件
## 抽离组件
    -轮播图组件
    -评论组件

## 页面后退
    -判断是否需要显示后退按钮
        -使用$route.path来判断路径
        -使用watch监视$route的变化
        -使用$router.back()实现后退功能
        -为了实现刷新之后【地址没有改变，不触发watch】也能出现后退按钮，需要在改变的页面已创建就判断
    ```js
        created(){
          this.judgePath(this.$route.path)
       },
        methods:{
           goBack(){
               this.$router.back()
           },
           judgePath(path){
               let arr = ['/home','/menber','/shopcar','/search'];
               if(arr.indexOf(path) ==-1){
                   this.isShow = true;
               }else{
                   this.isShow = false;
               }
           }
        },
        watch:{
           '$route':function(newValue){
               this.judgePath(newValue.path);
           }
        }
    ```
## 生成title标签
    使用路由对象的afterEach方法
    ```js
        router.afterEach((to, from) => {
            document.title = to.meta.title
        })
    ```
## 商品购买
    ### 上拉加载更多  
    使用mint-ui的loadmore组件
    调用的页面需要做的事：
	引用标签
	```html
    <mt-loadmore ：autoFill='true' :top-method="loadTop" 	:bottom-method="loadBottom" 	:bottom-all-loaded="allLoaded" 	ref="loadmore">
	</mt-loadmore>
    ```
	解析：
		：top-method是下拉加载更多的方法
		：bottom-method 是上滑加载更多的方法
		：bottom-all-loaded  是否全部加载完毕
		：autoFill 自动填满整个容器

		ref :可以找到使用该标签的DOM 元素
			Vue实例.$refs.$refs的值  就能获取到对应的值


    ```js
    loadBottom() {
    ...// 加载更多数据
    this.allLoaded = true;// 若数据已全部获取完毕
    this.$refs.loadmore.onBottomLoaded();
    }
    ```

    注意：
	① 要想实现上滑加载更多，就需要去掉index.html页面的<DOCTYPE HTML> 这句话
	② 想要实现，上拉时获取数据时，显示“加载中”的文字，就要把this.$refs.loadmore.onTopLoaded();
	写在获取完数据之后
	而不是写在getInfo（）函数之后，因为这是异步操作，会瞬间解析完该函数名
	③ 不想难滑动：
		解决难滑动的问题，因为距离70才能加载
         而我们的大盒子，和列表的距离差不多，需要实现，大盒子和容器一样大，列表大一些，这样列表滑动到容器底部时，已经是最后一条数据，就可以再过70px就能获取下一页数据

		且要写在数据渲染完毕，来设置容器的高度
		写在created之内，没有用
        ```js
		mounted(){ 			
            this.$refs.muicontent.style.height = 			document.documentElement.clientHeight +'px';
        }
        ```	
## 商品详情
    ### 购买数量【子组件给父组件传值】
    子组件需要做的事：
	自定义一个事件
	this.$emit('事件名',想要传给使用该事件的对象的参数)
	
    父组件需要做的事：
	使用该事件，v-on使用事件即可【和普通事件使用方法一致】，但是不需要传值，只需要在事件对于的函数处理时接受子组件传过来的值即可
    
