//自调用函数---游戏对象
			(function(){
				//游戏的构造函数
				function Game(map){
					this.food = new Food();
					this.snake = new Snake();
					this.map = map;
					that = this;
				}
				Game.prototype.init = function(){
					//初始化游戏
					this.food.init(this.map);
					this.snake.init(this.map);
					//调用自动移动小蛇的方法
					this.runSnake(this.food,this.map);
					//调用按键的方法
					this.bindKey();
				};
				//添加原型方法---设置小蛇可以自动的移动
				Game.prototype.runSnake = function(food,map){
					//自动移动
					var timeId = setInterval(function(){
						//此时的this是window						
						//移动小蛇
						this.snake.move(food,map);
						//初始化小蛇
						this.snake.init(map);
						//横坐标的最大值
						var maxX = this.map.offsetWidth / this.snake.width;
						//纵坐标的最大值
						var maxY = this.map.offsetHeight / this.snake.height;
						//蛇头的坐标
						var headX = this.snake.body[0].x;
						var headY = this.snake.body[0].y;
						if(headX < 0 || headX >= maxX){
							//撞墙了
							clearInterval(timeId);
							alert("游戏结束！");
						}
						if(headY < 0 || headY >= maxY){
							//撞墙了
							clearInterval(timeId);
							alert("游戏结束！");
						}
					}.bind(that),150);
				};
				
				//添加原型方法---设置用户按键，改变小蛇移动的方向===bind绑定
				Game.prototype.bindKey = function(){
					//获取用户的按键，改变小蛇的方向
					document.addEventListener("keydown",function(e){
						//这里的this是触发keydown的事件的对象---document
						//获取按键的值
						switch(e.keyCode){
							case 37 : this.snake.direction = "left";break;
							case 38 : this.snake.direction = "top";break;
							case 39 : this.snake.direction = "right";break;
							case 40 : this.snake.direction = "bottom";break;
						}
					}.bind(that),false);
				};
				
				
				//把Game暴露给window，外部可以访问Game对象
				window.Game = Game;
			}());