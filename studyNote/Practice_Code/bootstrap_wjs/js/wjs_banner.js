/*
* @Author: ASUS
* @Date:   2021-06-05 14:57:32
* @Last Modified by:   ASUS
* @Last Modified time: 2021-06-05 16:29:49
*/
$(function () {
	$('.wjs_banner .carousel').carousel({
		 interval: 2000
	})

	$(window).resize(function () {
		var extraSmallScrrenWidth = 768;
		var items = $('.wjs_banner .item');
		var screenWidth = $(window).width();
		// console.log(screenWidth);
		if (screenWidth < extraSmallScrrenWidth) {
			items.each(function (index, value) {
				$(this).html('<a href="javascript:void(0);" class="mobile_link"><img src='+ $(this).data('mobileImgSrc') +' alt=""></a>');
			});

		} else {
			items.each(function (index, value) {
				$(this).html('<a href="javascript:void(0)" style="background-image: url('+ $(this).data('pcImgSrc') +');" class="pc_link"></a>');
				/*
					如果字符串在拼接的时候，有的字符不能直接拼进去，那么可以采用创建元素方式，然后给他设置样式可以尝试
				*/
			});
		}
	}).trigger('resize');
	// jquery没有封装touch事件，只能采用原生的js
	var carouselInner = $('.wjs_banner .carousel-inner').get(0);
	var startX = 0, enX = 0;
	carouselInner.addEventListener('touchstart', function (e) {
		startX = e.targetTouches[0].clientX;
	});
	carouselInner.addEventListener('touchend', function (e) {
		endX = e.changedTouches[0].clientX;
		var result = endX - startX;
		// 滑动超过 100 才有效
		if (Math.abs(result) > 100) {
			if (result < 0) {
				// 下一张
				console.log('下一张');
				$('.wjs_banner .carousel').carousel('next');
			} else if (result > 0) {
				// 上一张
				console.log('上一张');
				$('.wjs_banner .carousel').carousel('prev');

			}
		}
		
	});

});