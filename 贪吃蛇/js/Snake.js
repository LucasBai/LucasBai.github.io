			//自调用函数---小蛇
			(function(){
				//存放小蛇的每个身体部分
				var elements = [];
				//小蛇的构造函数
				function Snake(width,height,direction){
					//小蛇每个部分的宽和高
					this.width = width || 20;
					this.height = height || 20;
					//小蛇的身体
					this.body = [
					{x:3,y:2,color:"red"},//头
					{x:2,y:2,color:"orange"},//身体
					{x:1,y:2,color:"orange"}//身体
					];
					//小蛇的方向
					this.direction = direction || "right";
				}
				//为原型添加方法---小蛇的初始化
				Snake.prototype.init = function(map){
					//先删除小蛇
					remove();
					//循环遍历创建div
					for (var i = 0;i < this.body.length; i++) {
						//数组中的每个元素都是一个对象
						var obj = this.body[i];
						//创建div
						var div = document.createElement("div");
						//把div加入到map地图中
						map.appendChild(div);
						//设置div的样式
						div.style.position = "absolute";
						div.style.width = this.width + "px";
						div.style.height = this.height + "px";
						div.style.left = obj.x * this.width + "px"; //横坐标
						div.style.top = obj.y * this.height + "px"; //纵坐标
						div.style.backgroundColor = obj.color; //背景颜色
						//方向
						
						//把div加入到elements数组中---目的是为了删除
						elements.push(div);
					}
				};
				
				//私有的函数---删除小蛇
				function remove(){
					//获取数组
					var i = elements.length - 1;
					for (;i >= 0; i--) {
						var ele = elements[i];
						//从map地图上删除这个div
						ele.parentNode.removeChild(ele);
						elements.splice(i,1);
					}
				}
				
				//为原型添加方法---小蛇移动
				Snake.prototype.move = function(food,map){
					var i = this.body.length - 1; //2
					for (;i > 0; i--) {
						this.body[i].x = this.body[i-1].x;
						this.body[i].y = this.body[i-1].y;
					}
					//判断方向---改变蛇头的坐标方向
					switch(this.direction){
						case "right" : this.body[0].x += 1;break;
						case "left" : this.body[0].x -= 1;break;
						case "top" : this.body[0].y -= 1;break;
						case "bottom" : this.body[0].y += 1;break;
					}
					//小蛇有没有吃到食物---蛇头坐标和食物坐标一致
					var headX = this.body[0].x * this.width;
					var headY = this.body[0].y * this.height;
					//判断蛇头坐标和食物的坐标是否相同
					if(headX == food.x && headY == food.y){
						//获取小蛇最后的尾巴
						var last = this.body[this.body.length - 1];
						//把最后的蛇尾重新复制一份，加入到body中
						this.body.push({x:last.x,y:last.y,color:last.color});
						//把食物删除，重新初始化食物
						food.init(map);
					}
				};
				
				//把Snake暴露给window---外部可以访问
				window.Snake = Snake;
			}());
			