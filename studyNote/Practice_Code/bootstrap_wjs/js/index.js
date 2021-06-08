/*
* @Author: ASUS
* @Date:   2021-06-06 16:52:03
* @Last Modified by:   ASUS
* @Last Modified time: 2021-06-06 20:03:57
*/

$(function () {
	/*
		字体提示，宝、广
	*/
	$('[data-toggle="tooltip"]').tooltip();
	/*
		标签页导航滑动
	*/
	var ul = $('.wjs_recommand #wrapper_slider ul');
	var lis = ul.find('li');
	var totalWidth = 0;
	console.log(lis);
	lis.each(function (index, ele) {
		// ele是一个元素DOM对象
		totalWidth += $(ele).outerWidth();
	});
	ul.width(totalWidth);

	var myScroll = new IScroll('#wrapper_slider', {
	   	scrollX: true, 
	   	scrollY: false
	});
});