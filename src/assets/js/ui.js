const html = document.querySelector('html');
const body = document.querySelector('body');

var Header = {
	init : function(){
		this.collapse();
		this.menu();
		this.alarm();
		this.banner();

		if ($('.page-title').length > 0) {
			$('title').text($('.page-title').text() + ' | knoah');
		}
	},
	collapse: function(e){
		$('.btn-hamburger').on('click', function (e) {
			e.preventDefault();
			$('html').toggleClass('is-collapsed');
		})
		$('aside .dim').on('click', function (e) {
			$('html').toggleClass('is-collapsed');
		})
	},
	// 배너
	banner: function () { 
		$(".banner .close").on("click", function () {
			$('html').addClass("is-fold");
			$('.banner-area').hide();
		 });
	},
	menu: function () {
		$('.btn-my, .btn-more').on('click',function(){
			$('html').removeClass('is-collapsed');
            if (!$('.menu-layer').is(':visible')) {
                $('.menu-layer').addClass('active');
            } else {
                $('.menu-layer').removeClass('active');
                $('.menu-layer .dep1 > li').show().removeClass('open');
            }
		});
		$('.menu-layer .dep1 > li > a').on('click',function(e){
			if($(this).parent('li').hasClass('has-sub')){
				e.preventDefault();
				$(this).parent('li').siblings().hide();
				$(this).parent('li').addClass('open');
			}
		});
		$('.menu-layer .back > a').on('click',function(e){
			e.preventDefault();
			$(this).closest('.has-sub').removeClass('open')
			$('.menu-layer .dep1 > li').show();
        });
		$(document).on('mouseup',function(e){
            e.preventDefault();
			if ($('.btn-my').closest('.position-relative').has(e.target).length === 0 && $('.menu-layer').has(e.target).length === 0) {
				$('.menu-layer').removeClass('active');
                $('.menu-layer .dep1 > li').show().removeClass('open');
			}
		});
		$('.menu-layer .btn-close').on('click',function(e){
			e.preventDefault();
			$('.menu-layer').removeClass('active');
			$('.menu-layer .dep1 > li').show().removeClass('open');
		});
	},
	alarm: function () {
		$('.btn-alarm').on('click',function(){
			$('html').removeClass('is-collapsed');
            if (!$('.alarm-layer').is(':visible')) {
                $('.alarm-layer').addClass('active');
            } else {
                $('.alarm-layer').removeClass('active');
            }
		});
		$(document).on('mouseup',function(e){
			e.preventDefault();
			if ($('.btn-alarm').closest('.position-relative').has(e.target).length === 0 && $('.alarm-layer').has(e.target).length === 0) {
				$('.alarm-layer').removeClass('active');
			}
		});
		$('.alarm-layer .back a').on('click',function(e){
			e.preventDefault();
			$('.alarm-layer').removeClass('active');
		});
	}
}

var Aside = {
	init : function(){
		this.gnb();
	},
	gnb: function () {
		//페이지 타이틀명과 비교하여 활성화
		if ($('.page-title').length > 0) {
			let title = $('.page-title').text();
			$('.gnb .dep1 > li > a').each(function () {
				if ($(this).text() == title) {
					$(this).parents('li').addClass('active');
				}
			});
			$('.gnb-bar .dep1 > li > a').each(function () {
				if ($(this).text() == title) {
					$(this).parents('li').addClass('active');
				}
            });
		}
	}
};

var Common = {
	init: function () {
		this.scrolling();
		this.datePicker();
		this.event();
		window.addEventListener('mousewheel', Common.scrolling);
		window.addEventListener('touchmove', Common.scrolling);
		$(window).scroll(function(){
			Common.scrolling();
		});
	},
	scrolling : function(e){
		var scrollTop = $(window).scrollTop();
		var gnbTop = $('#header').height();
		gnbTop = Number(gnbTop);

		if(scrollTop > 0){
			$('html').addClass('is-scrolled');
		}else{
			$('html').removeClass('is-scrolled');
		}

		//scrollbar bottom check
		if ($('html').hasClass('is-scrolled')) {
			if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
				$('html').addClass('is-bottom');
			}else{
				$('html').removeClass('is-bottom');
			}
		}
	},
	datePicker: function () {
		//datepicker
		var currentDate = new Date();
		$('.form-datepicker:not(.form-datepicker-multi)').datepicker({
			defaultDate: +7,
			changeMonth: true,
			changeYear: true,
			dayNamesMin: [ "S", "M", "T", "W", "T", "F", "S"],
			showOtherMonths: true,
			changeMonth: true,
			changeYear: true,
			dateFormat: "yy-mm-dd",
			gotoCurrent: true,
			beforeShow: function(input, inst) {
				$('#ui-datepicker-div').addClass('datepicker-box');
			},
		}).datepicker('setDate', 'today');
	},
	event: function () {
		$('[data-toggle="tooltip"]').tooltip();

		//custom scroll
		$(".overflow-y-scroll").mCustomScrollbar({
			theme:"dark"
		});

        //모달 중첩 z-index 조정
        $('.modal').on('show.bs.modal', function (e) {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
			$(this).css('z-index', zIndex);
			setTimeout(function() {
				$('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
			}, 0);
		}).on('hidden.bs.modal', function () {
			if ($('.modal:visible').length > 0) {
				setTimeout(function() {
					$(document.body).addClass('modal-open');
				}, 0);
			}
		});

		// 도움말 이미지 on off 
		$(".help-button-area button.btn-toggle").on("click", function () {
			if ( $(this).attr('aria-pressed') == 'true') {
				$("body").find(".help-img").hide();
			} else {
				$("body").find(".help-img").show();
			}
		});
	}
};

var Dropdown = {
	init : function(){
		Dropdown.active();
		//드롭박스 디폴트 텍스트
		$('.dropdown').each(function(e) {
			$(this).attr('data-default',$(this).find('.dropdown-value').text());
		});
	},
	active : function(){
		$('.dropdown').on('click', function(e) {
			var $target = $(this);

			if($target.hasClass('active')){
				$(this).removeClass('active');
			}else{
				//$(".dropdown.active").removeClass('active');
				$(this).addClass('active');
			}
		});
		$('.dropdown-list > div').on('click', function(e) {
			if(!$(this).closest('.dropdown').hasClass('ellipsis')){
				$(this).closest('.dropdown').find('.dropdown-value').text($(this).text());
			}

			if($(this).text() !== $(this).closest('.dropdown').attr('data-default')){
				$(this).closest('.dropdown').find('.dropdown-value').addClass('filled');
				$(this).siblings().removeClass('text-primary');
				if(!$(this).find("a").hasClass('change-num')){
					$(this).addClass('text-primary');
				}

			}else{
				$(this).closest('.dropdown').find('.dropdown-value').removeClass('filled');
			}
		});
		/* $(document).click(function(e) {
			if(!$('.dropdown').has(e.target).length){
				$(".dropdown.active").removeClass('active');
			}
		}); */
	}
};

Header.init();
Aside.init();
Common.init();
Dropdown.init();
