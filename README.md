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

### 获取分类
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

    	<mt-loadmore ：autoFill='true' :top-method="loadTop"  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
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
   this.$refs.muicontent.style.height = document.documentElement.clientHeight +'px';
}
	
```

## 商品详情
### 购买数量【子组件给父组件传值】
   子组件需要做的事：
   自定义一个事件
   this.$emit('事件名',想要传给使用该事件的对象的参数)
	
   父组件需要做的事：
   使用该事件，v-on使用事件即可【和普通事件使用方法一致】，但是不需要传值，只需要在事件对于的函数处理时接受子组件传过来的值即可
### 不相关组件传值
使用自定义事件进行传值【但是要有同一个事件对象】需要找一个通信模块
```
import Vue from 'vue';
//创建Vue实例
let vueObj = new Vue();
//暴露给外部
export default vueObj;

传值的页面
	vueObj.$emit('updateBadge', this.count);
接收值得页面
	 vueObj.$on('updateBadge',(count)=>{
      console.log(count)
   })
```
### 点击加入购物车
#### 小球运动
注意：
transition是监视属性的改变 才会触发函数
使用Vue动画来实现
```
<transition
    v-on:before-enter="beforeEnter"
	v-on:enter="enter"
	v-on:after-enter="afterEnter"
	v-on:after-leave="afterLeave"
>
 	<span v-show='isShow' class="ball">{{ count 	}}</span>
</transition>

对应方法：
	 //动画执行之前
            beforeEnter(el){
                el.style.transform = 'translate(0,0)';
            },
     //动画进入
            enter(el,done){
                //记录距离
                let ballX = el.getBoundingClientRect().left;
                let ballY = el.getBoundingClientRect().top;
                //获取bange距离
                let badgeX = document.querySelector('.mui-badge').getBoundingClientRect().left;
                let badgeY = document.querySelector('.mui-badge').getBoundingClientRect().top;
                

                let X = badgeX - ballX;
                let Y = badgeY - ballY;
                //设置距离
                el.style.transform =`translate(${X}px,${Y}px)`
                done();
            },
   //动画进入完毕
            afterEnter(el){
                //小球消失
                this.isShow = false;
            },
            //动画执行完毕，显示badge才显示数据
            afterLeave: function () {
                vueObj.$emit('bringCount',this.count);
            }
        }
```
#### badge的值改变
通知：app.vue数据将发生了改变
	方法：不相关页面的自定义事件
	vueObj.$emit('bringCount',this.count);

app.vue页面：
created()函数内写该方法

	```js
		vueObj.$on('bringCount',(count)=>{
		console.log(count);
		this.count += count;
		});

	```      

#### 存储在localStorage中

创建单独的模块 localStorageHelp.js
//在addCar的时候set

```
//设置数据
export function setData(json){
    //先检测本地是否有数据，如果有就累加，没有就push
    let data = getData();
    //遍历数组
    let flag = false;
    data.forEach(function(item) {    
        if(item.id == json.id){
            //count就累加
            item.count += json.count;
            flag = true;
        }  
    });
     //但是不可以else
     if(!flag){
        data.push(json);
    }
    //设置数据
    localStorage.setItem('goodslist',JSON.stringify(data));
}
```

## 购物车页面
#### 列表展示
```
获取id，从localStorage中获取

//获取数据
export function getData(){
    //获取到的是字符串，而我们想要对象形式
    return JSON.parse( 	localStorage.getItem('goodslist') || '[]' );
}

```

注意：因为info内没有count属性，所以要从本地获取从count。
要保证索引一致，才能添加属性
【需要做一步排序】
```
//排序this.info 
this.info.sort(function(item1,item2){
	return item1.id - item2.id;
})
```
#### switch 的显示
```
设置为数组，在数据显示的时候，每次都push一个false
//插入数据count
this.info.forEach((item,index)=>{
     item.count = this.data[index].count
	 this.values.push(false);
 })
```
#### 点击删除数据
```
需要做四件事：
	删除本地存储
	删除页面展示的info中的数据
	删除switch所在的values中的值
	通知app.vue的badge的值需要修改【自定义事件】
	app页面再次获取数据

//删除数据
  export function delData(id){
    //查找id
    var data = getData();
    //循环查找数据
    let index = data.findIndex((item)=>{
        return item.id = id;
    })
    data.splice(index,1);
    localStorage.setItem('goodslist',JSON.stringify(data));
}
```
#### 点击加减的时候改变数据
点击的时候，其实就是更新数据，在原来数据的基础上加或者减1
【需要传给本地存储id，加减类型】

number.vue做的事：
	自定义事件（给父组件传值）countChange的时候要传递一个json（包括id，type）

shopcar.vue需要做的事：
	调用countChange事件，
	在该事件触发的时候，调用本地的数据更新
	同时通知app.vue需要更新badge的值【不相关组件传值】
```
nember.vue页面：
 this.type = 'add' ;
//更新localStorage中的数据 要写在modify之前
//否则 此时会造成不同步修改badge的数据
// updateData({id:this.id,type:1});
this.modify();


modify(){
 	this.$emit('countChange',	{id:this.id,count:this.count,type:this.type});
   // console.log(this.count);
}


shopcar页面：

  countChange(obj){
	// console.log('countChange');
	// console.log(obj);
	let num = obj.type === 'add' ? 1 : -1;
	// console.log(num);
	//调用本地存储
       updateData({id:obj.id,type:num});
	//自定义事件通知 app.vue来改变数据  改变badge的值
	vueObj.$emit('uData')
    }


app.vue页面：
//加减号时数据改变
vueObj.$on('uData',()=>{
	// console.log('updateData');
	//localStorage中获取数据
	//调用本地的更新数据
	this.getNum()
})

```
#### 显示总数，总价
```
监视values的改变
watch:{
    'values':function(newVlue){
	let count = 0;
	let totalPrice = 0;
	// 获取值是true的按钮对应的数量 count 
	this.values.forEach((item,index)=>{
	    if(item){
		count += this.info[index].count;
		// console.log(count);
		this.count = count;
		//计算总价
		totalPrice += this.info[index].count * this.info[index].sell_price;
		// console.log(totalPrice);
		this.totalPrice = totalPrice;
	    }
	})
    }
}
```
