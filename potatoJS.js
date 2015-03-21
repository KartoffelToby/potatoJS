/*
// Autor: Tobias Haber
// Last Changes: 2.1.15
// 
// jQuery replacement with vanilla JS (because jQuery is overload)
*/


/**
 * O (set . for Classes # for IDs and only the name to get the Object)
 * @param {String} elem
 * @return {Object}
 */
var O = function(elem){
	if(elem.split('#').length === 2){
		return document.getElementById(elem.split('#')[1]);		
	}
	else if(elem.split('.').length === 2){
		return document.getElementsByClassName(elem.split('.')[1]);
	}
	else {
		return document.getElementsByTagName(elem);
	}
};
/**
 * searchId (has that element this ID?)
 * @param {Object} (Object Array!!)
 * @param {String] ID
 * @return {Object} (Retrun the Object with the ID)
 */
Object.prototype.searchId = function(ID){
	var obj = this;
	var result;
	Object.keys(this).forEach(function(elem,index){
		try{
			var Attr = obj[index].attributes;
			if(Attr.id.value === ID){
				result = obj[index];
			}	
		}catch(e){}
	});
	return result;
};
/**
 * addClass
 * @param {Object} (Only one Object!!! or your page is broken)
 * @param {String] className (without .)
 */
Object.prototype.addClass = function(className){
	var that = this;
	if(this.length === undefined){
		return this.classList.add(className);
	}else if(this.length === 1){
		return this[0].classList.add(className);
	}
	Object.keys(this).forEach(function(elem,i) {
		try{
			that[i].classList.add(className);
		}catch(e){}
	});
	return true;
};
/**
 * removeClass
 * @param {Object} (Only one Object!!! or your page is broken)
 * @param {String] className (without .)
 */
Object.prototype.removeClass = function(className){
	var that = this;
	if(this.length === undefined){
		return this.classList.remove(className);
	}else if(this.length === 1){
		return this[0].classList.remove(className);
	}
	Object.keys(this).forEach(function(elem,i) {
		try{
			that[i].classList.remove(className);
		}catch(e){}
	});
	return true;
};
/**
 * toggleClass
 * @param {Object} (Only one Object!!! or your page is broken)
 * @param {String] className (without .)
 */
Object.prototype.toggleClass = function(className){
	var that = this;
	if(this.length === undefined){
		return this.classList.toggle(className);
	}else if(this.length === 1){
		return this[0].classList.toggle(className);
	}
	Object.keys(this).forEach(function(elem,i) {
		try{
			that[i].classList.toggle(className);
		}catch(e){}
	});
	return true;
};
/**
 * hasClass
 * @param {Object} (Only one Object!!! or your page is broken)
 * @param {String] className (without .)
 * @return {Boolean} (Retrun true if elem has class)
 */
Object.prototype.hasClass = function(className){
	return this.classList.contains(className)
};
/**
 * removeClass (Scroll smoothly to that position)
 * @param {Number} (floats are bad)
 */
Number.prototype.smoothScrollTo = function(){
	var that = this;
	var main = function(){
		var loop = that;
		var step = window.scrollY;
		var duration = 900;
		clearInterval(timer);
		if(loop > step){
			scrollToX(step, loop, 0, 1/duration, 20);
		}else{
			if(loop < 300){loop=0;}
			scrollToX(step, loop, 0, 1/duration, 20);
		}
	};
	/**
	 * scrollToX (X because scrollTo is reserved :P)
	 * @param {Number} x1 (start Position in PX)
	 * @param {Number} x2 (end Position in PX)
	 * @param {Number} t (time or duration)
	 * @param {Number} v (kind of speed)
	 * @param {Number} step (only for the function self)
	 */
	scrollToX = function(x1, x2, t, v, step) {
		if (t < 0 || t > 1 || v <= 0) return;
		window.scroll(0,x1 - (x1-x2)*linear(t));
		t += v * step;
		setTimeout(function() {
			scrollToX(x1, x2, t, v, step);
		}, step);
	};
	/**
	 * linear (a child function from scrollToX)
	 * @param {Number} t (time for the linear scale)
	 * @return {Number} (Retrun the linear scale)
	 */
	linear = function(t){
		t--;
		return t*t*t+1;
	};
	return main();
};
/**
 * elemPos
 * @param {Object} (only one object more are not testet yet)
 * @return {Array} (Retrun an Array with Y and X pos [top,left])
 */
Object.prototype.elemPos = function(){
	var elem = this;
	var posY = getTopPos(elem);
	var posX = getLeftPos(elem);
	var pos = [posY,posX];
	return pos;
};
/**
 * cardPos
 * @param {Object} (only one object or Card Overkill)
 * @return {Number} (Retrun the px offset from top with Padding)
 */
Object.prototype.cardPos = function(){
	var elem = this;
	var posY = elem.offsetTop;
	var height = elem.cardSize();
	return (posY)-(height/2+100);
};
/**
 * cardSize
 * @param {Object} (only one object more makes no sense)
 * @return {Number} (Retrun height for this Card in px)
 */
Object.prototype.cardSize = function(){
	var elem = this;
	var size = elem.clientHeight;
	return size;
};
/**
 * getTopPos
 * @param {Object} (only one object more makes no sense)
 * @return {Number} (Retrun Top-Pos for this Card in px relative to Parents)
 */
var getTopPos = function(el) {
    for (var topPos = 0;
        el != null;
        topPos += el.offsetTop, el = el.offsetParent);
    return topPos;
};
/**
 * getLeftPos
 * @param {Object} el (only one object more makes no sense)
 * @return {Number} (Retrun Left-Pos for this Card in px relative to Parents)
 */
var getLeftPos = function(el) {
    for (var leftPos = 0;
        el != null;
        leftPos += el.offsetLeft, el = el.offsetParent);
    return leftPos;
};
/**
 * forceRedraw (this function shut work but Bugs are everywhere)
 */
var forceRedraw = function(){
	var temp = window.scrollY;
	window.scroll(0,temp);
};
