/*获取id*/
function my$(id) {
	return document.getElementById(id);
}

/*文本兼容代码*/
/*设置任意的标签中间的任意文本内容*/
function setInnerText(element, text) {
	//判断浏览器是否支持这个属性
	if(typeof element.textContent == "undefined") { //不支持
		element.innerText = text;
	} else { //支持
		element.textContent = text;
	}
}
/*获取任意标签中间的文本内容*/
function getInnerText(element) {
	if(typeof element.textContent == "undefined") {
		return element.innerText;
	} else {
		return element.textContent;
	}
}

/*兼容代码：获取节点*/
/*获取任意一个父级元素的第一个子级元素*/
function getFirstElementChild(element) {
	if(element.firstElementChild) { //true,支持
		return element.firstElementChild;
	} else {
		var node = element.firstChild; //第一个子节点
		while(node && node.nodeType != 1) {
			node = node.nextSibling;
		}
		return node;
	}
}
/*获取任意一个父级元素的最后一个子级元素*/
function getLastElementChild(element) {
	if(element.lastElementChild) { //true,支持
		return element.lastElementChild;
	} else {
		var node = element.lastChild;
		while(node && node.nodeType != 1) {
			node = node.previousSibling;
		}
		return node;
	}
}
/*兼容代码：为任意的元素绑定任意的事件*/
function addEventListener(element, type, fn) {
	//判断浏览器是否支持这个方法
	if(element.addEventListener) {
		element.addEventListener(type, fn, false);
	} else if(element.attachEvent) {
		element.attachEvent("on" + type, fn);
	} else {
		element["on" + type, fn]
	}
}
/*兼容代码：解绑事件*/
function removeEventListener(element, type, fnname) {
	if(element.removeEventListener) {
		element.removeEventListener(type, fnname, false);
	} else if(element.detachEvent) {
		element.detachEvent(type, fnname);
	} else {
		element["on" + type] = null;
	}
}
/*封装动画函数*/
function animate(element, json, fn) { //element是目标元素，json存放键值对（"属性名"：目标位置）,fn回调函数
	//为了避免多次点击按钮使事件增多导致速度加快，先清理定时器
	clearInterval(element.timeId);
	element.timeId = setInterval(function() {
		var flag = true; //默认为true
		for(var attr in json) { //获取目标当前的位置
			//判断这个属性attr是不是opacity
			if(attr == "opacity") {
				//获取元素的当前透明度，当前的透明度放大100倍
				var current = getStyle(element, attr) * 100;
				//目标的透明度放大100倍
				var target = json[attr] * 100;
				var step = (target - current) / 10;
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				current += step;
				element.style[attr] = current / 100;
			}
			//判断这个属性是不是zIndex
			else if(attr == "zIndex") {
				element.style[attr] = json[attr];
			} else {
				var current = parseInt(getStyle(element, attr)); //数字类型，没有px
				//获取目标位置target
				var target = json[attr]; //键attr的值
				//目标每次移动多少个像素（步数）
				var step = (target - current) / 10;
				//判断如果step>0，就让step向上取整，负数则向下取整
				step = step > 0 ? Math.ceil(step) : Math.floor(step);
				//每次移动后的距离
				current += step;
				element.style[attr] = current + "px";
			}
			if(current != target) {
				flag = false; //未到达
			}
		}
		//判断拿到循环外面，因为如果在循环里面，某一个属性的current和target相等了，仅有它一个到达位置
		//所以在循环外面时判断，所有属性的值都到达目标位置了再清理定时器
		if(flag) { //当前位置到达目标位置了
			clearInterval(element.timeId); //清理定时器
			if(fn) {
				fn(); //如果用户传入回调函数，则执行回调函数
			}
		}
	}, 20);
}
/*兼容代码：获取元素计算后的样式属性值*/
function getStyle(element, attr) {
	return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr];
	//element → my$("dv") , attr → "left"
}