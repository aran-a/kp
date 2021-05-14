var obj = obj || {};
;(function(obj, $, window, document, undefined) {
	'use strict';
	var $window = $(window),
		$document = $(document),
		$html = $document.find('html'),
		$body = $document.find('body'),
		$wrap = $body.find('#wrap')
			.append('<div class="dimmed"></div>'),
		$header = $wrap.find('#header'),
		$headerInner = $header.find('.inner'),
		$logo = $header.find('h1'),
		$gnb = $header.find('#gnb'),
		$content = $body.find('#content'),
		$footer = $body.find('#footer'),
		windowWidth = $window.width(),
		windowHeight = $window.height(),
		windowScrollTop = $window.scrollTop(),
		windowScrollLeft = $window.scrollLeft(),
		currentClass = 'current',
		activeClass = 'active',
		mobileWidth = 940, // 960 - padding
		aniSpeed = 200;
	//deviceCheck
	function deviceCheck() {
		var filter = "win16|win32|win64|mac|macintel";
		if ( navigator.platform ) {
			if ( filter.indexOf( navigator.platform.toLowerCase() ) < 0 ) {
				$html.addClass('mob')
			} else {
				$html.addClass('pc')
			}
		}
	}
	deviceCheck();
	//mobileCheck
	function mobileCheck(){
		var width_size = window.innerWidth;
		if ( width_size < mobileWidth ) {
			$html.addClass('mob');
			$html.removeClass('pc');
		} else {
			$html.addClass('pc');
			$html.removeClass('mob');
		}
	}
	mobileCheck();
	// 데이트피커
	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		showOtherMonths: true,
		showMonthAfterYear:true,
		yearSuffix: "년",
		showOn: "both",
		buttonImage: "/pc/images/common/img_date.png",
		buttonImageOnly: true,
		buttonText: "선택",
		minDate: "-240d",
		maxDate: "-1d",
		prevText: '이전 달',
		nextText: '다음 달',
		dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월','6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	});
	$(".date-wrap input").datepicker();
	// Skip To Content
	obj.skipToContent = function() {
		var $skipNaviBtn = $body.find('a.skip-content'),
			tgId = $skipNaviBtn.attr('href');
		if ( !$skipNaviBtn.length ) return false;
		if ( !$content.length ) $skipNaviBtn.hide();
		$skipNaviBtn.on('click', function(e) {
			e.preventDefault();
			$(tgId).attr('tabindex', 0).focus().on('keydown', function(e) {
				if ( e.keyCode === 9 ) $(this).removeAttr('tabindex');
			});
		});
	};
	obj.skipToContent();
	// Document tile
	obj.documentTitle = function(){
		var $conTitle = $content.find('.heading-depth01 .title')
				.filter(':visible:first'),
			conTitleValue = $conTitle.text(),
			docTitle = $document.attr('title');
		( !$conTitle.length )
			? $document.attr('title', docTitle)
			: $document.attr('title', conTitleValue + ' | ' + docTitle);
	};
	obj.documentTitle();
	// Disable invalid alert
	obj.disableInvalid = function() {
		var $requiredEl = $content.find('[required]');
		if ( !$requiredEl.length ) return false;
		$requiredEl.on('invalid', function(e) {
			e.preventDefault();
		});
	};
	// button alert
	obj.btnAlert = function() {
		var $btn = $content.find('.button.button-alert'),
			$btnIcon = $content.find('.button-tooltip');
		$btn.on('click', function(e){
			e.preventDefault();
			var $this = $(this);
			$this.addClass(activeClass);
			setTimeout(function() {
				$this.removeClass(activeClass);
			}, 2000);
		});
		$btnIcon.on('click', function(e){
			e.preventDefault();
			var $this = $(this);
			$this.toggleClass(activeClass);
		});
	};
	obj.btnAlert();
	// tab content
	obj.tabContent = function() {
		var $tab = $('.tab-wrap'),
			$tabList = $tab.find('.tab > li'),
			$tabTarget = $tabList.find('> a');
		if ( !$tab.length ) return false;
		$tabTarget.on('click', function(e){
			e.preventDefault();
			var $this = $(this),
				myID = $this.attr('href'),
				$myList = $this.parent('li'),
				$tabWrap = $this.closest('.tab-wrap'),
				$container = $tabWrap.find('.tab-container'),
				$tabContent = $tabWrap.find('> .tab-container .tab-content'),
				tabContHeight = $(myID).innerHeight();
			if ( !$this.closest('li').hasClass('active') ) {
				$tabContent.hide();
				$myList.addClass('active').siblings('li').removeClass('active');
				$(myID).show();
			} else {
				return;
			}
		});
	};
	obj.tabContent();
	// checkbox input  disabled
	obj.checkInp = function () {
		var $checkInp = $content.find('.check-inp'),
			$checkTg = $content.find('.check-tg');
		if ( !$checkInp.length ) return false;
		$checkInp.change(function(){
			var $this = $(this);
			if ( $this.prop('checked')) {
				$checkTg.removeAttr( 'disabled')
				$checkTg.removeAttr( 'placeholder')
			} else {
				$checkTg.attr( 'disabled', 'disabled')
				$checkTg.attr( 'placeholder', '기타 선택 시 입력 가능')
			}
		});
	};
	obj.checkInp();
	// checkbox all
	obj.checkboxAll = function() {
		var $checkAll = $('.checkAll');
		$checkAll.change(function () {
			var $this = $(this),
				checked = $this.prop('checked'),
				myData = $this.data('group');
			$('input[data-group="' + myData + '"]').prop('checked', checked);
		});
		var checkBox = $('.checkbox').find('input').not('.checkAll');
		checkBox.change(function () {
			var $this = $(this),
				myData = $this.data('trigger'),
				boxLength = $('input[data-trigger="' + myData + '"]').length,
				checkedLength = $('input[data-trigger="' + myData + '"]:checked').length,
				selectAll = (boxLength == checkedLength);
			$('input[data-group="' + myData + '"].checkAll').prop('checked', selectAll);
		});
	}
	obj.checkboxAll();
	// auto Height
	obj.autoHeight = function() {
		var boxheight = $content.find('.col-preview .box').outerHeight(),
			boxheightInner = $content.find('.col-preview .box').height(),
			$tgBox = $content.find('.col-html .box'),
			$tgTextbox =$tgBox.find('.textarea-wrap'),
			btnMargin =$tgBox.find('.button-wrap').outerHeight(true);
		if ( windowWidth > mobileWidth ) {
			$tgBox.css('height', boxheight);
			$tgTextbox.css('height', boxheightInner - btnMargin);
		} else {
			$tgBox.removeAttr('style');
			$tgTextbox.removeAttr('style');
		}
	};
	obj.autoHeight();
	// card js
	obj.cardJs = function() {
		var $card = $content.find('.card-js'),
			$btn = $card.find('.card-top a'),
			$cardTg = $card.find('.card-cont'),
			txt = $btn.find('span');
		$btn.off('click').on('click', function(e) {
			var $this = $(this);
			e.preventDefault();
			$this.find('.icon').add($card).toggleClass(activeClass);
			$cardTg.stop().slideToggle();
			if ( $card.hasClass(activeClass)) {
				txt.text('닫기');
			} else {
				txt.text('전체보기');
			}
		});
	};
	obj.cardJs();
	// layer open
	obj.layerOpen = function(e,s) {
		$("."+e).fadeIn().addClass("on");
		$("body, html").css({"overflow":"hidden"});
		$("."+e).find(".layer-inner").css({width:s+"px"});
		//$(window).resize(function(){
		//	$("."+e).find(".layer-inner").css({width:s+"px"});
		//}).resize();
		obj.layerSlide();
	}
	// layer cloase
	obj.layerClose = function(t){
		$(t).closest(".layer-inner").parent().fadeOut().removeClass("on");
		$("body, html").removeAttr('style');
	}
	// accordion
	obj.accordion = function() {
		var $acc = $content.find('.accordion'),
			$accBody = $acc.find('.acc-body'),
			$btn = $accBody.find('> a'),
			$accCont = $accBody.find('.acc-cont');
		$btn.on('click', function(e) {
			var $this = $(this);
			e.preventDefault();
			if( !$this.closest($accBody).hasClass(activeClass)) {
				// all close
				$this.closest($acc).find($accBody).removeClass(activeClass);
				$this.closest($acc).find($accCont).stop().slideUp(aniSpeed);
				// open
				$this.siblings($accCont).stop().slideDown(aniSpeed);
				$this.closest($accBody).addClass(activeClass);
			} else {
				$this.closest($accBody).removeClass(activeClass);
				$this.closest($acc).find($accCont).stop().slideUp(aniSpeed);
			}
		});
	};
	obj.accordion();
	// emailDomain
	obj.emailDomain = function() {
		var $selectWrap = $content.find('.select-domail'),
			$select = $selectWrap.find('select'),
			$tgInput = $selectWrap.next('.input-domain');
		$select.on('change', function() {
			var $this = $(this),
				valTxt = $select.val();
			if ( valTxt == '직접입력') {
				$tgInput.removeAttr('disabled');
				$tgInput.val('');
			} else {
				$tgInput.attr('disabled', 'disabled');
				$tgInput.val(valTxt);
			}
		});
	};
	obj.emailDomain();
	// input file
	obj.inputFile = function() {
		var fileTarget = $('.file-box .upload-hidden');
		fileTarget.on('change', function(){
			if( this.files[0] == undefined ) { // cancle
				return;
			}
			if ( window.FileReader ) { // modern browser
				var filename = $(this)[0].files[0].name;
				$(this).siblings('.upload-name').val(filename);
			} else { // old ie
				var filename = $(this).val().split('/').pop().split('\\').pop();
				$(this).siblings('.upload-name').val(filename);
			}
		});
	};
	obj.inputFile();
	// date search
	obj.dateSearch = function() {
		var $dateSearch = $body.find('.date-search'),
			$radio = $dateSearch.find('.radio input'),
			$radioDate = $dateSearch.find('.radio-date'),
			$tgDate = $dateSearch.find('.date-wrap'),
			$inpWrap = $dateSearch.find('.inp-wrap');
		if ( !$dateSearch.length ) return false;
		$radio.on('change', function() {
			if ( $radioDate.prop('checked')) {
				$tgDate.show();
				$inpWrap.hide();
			} else {
				$inpWrap.show();
				$tgDate.hide();
			}
		});
	};
	obj.dateSearch();
	// table sorting
	obj.tableSorting = function() {
		var $btnSorting = $body.find('.table .btn-sorting'),
			ascClass = 'ascending',
			dscClass = 'descending';
		if ( !$btnSorting.length ) return false;
		$btnSorting.on('click', function() {
			var $this = $(this);
			if ( !$this.hasClass(ascClass)) {
				$btnSorting.removeClass(dscClass);
				$btnSorting.removeClass(ascClass);
				$this.removeClass(dscClass);
				$this.addClass(ascClass);
			} else if ( $this.hasClass(ascClass)) {
				$btnSorting.removeClass(dscClass);
				$btnSorting.removeClass(ascClass);
				$this.removeClass(ascClass);
				$this.addClass(dscClass);
			}
		});
	};
	obj.tableSorting();
	// main tab active reset
	obj.mainEfReset = function() {
		var $mainSorting = $content.find('.prd-sorting a'),
			$mainEfArea = $content.find('.main-ef');
		if ( !$mainSorting.length ) return false;
		$mainSorting.on('click', function(e) {
			e.preventDefault();
			if ( $mainEfArea.hasClass(activeClass) ) {
				$mainEfArea.removeClass(activeClass);
			}
		});
	};
	obj.mainEfReset();
	//main Slide
	obj.mainSlide = function() {
		var $mainSlide = $content.find('.main-ef .swiper-container'),
			$mainEfArea = $content.find('.main-ef'),
			$check = $mainEfArea.find('.swiper-slide .check'),
			$tgInput = $content.find('.url-form .input');
		if ( !$mainSlide.length ) return false;
		var	swiper = new Swiper( $mainSlide , {
			observer: true,
			observeParents: true,
			centeredSlides: true,
			spaceBetween: 30,
			slidesPerView: 'auto',
			loop: true,
			breakpoints: {
				720: {
					spaceBetween: 15,
				}
			},
			on: { // slideChange setTransition
				slideChange: function () {
					$check.removeClass(activeClass);
					$tgInput.removeClass(activeClass);
					$mainEfArea.removeClass(activeClass);
					$tgInput.val('');
				},
			}
		});
		$(document).on('click', '.main-ef .swiper-slide-active', function(e){
			var activeImg = $(this).find('.img-area img').attr("src"),
				$bounceImg = $content.find('.ef-bounce img'),
				$tgCheck = $(this).find('.check');
				$tgInput = $content.find('.url-form .input');
			e.preventDefault();
			$mainEfArea.addClass(activeClass);
			$tgCheck.addClass(activeClass);
			$tgInput.addClass(activeClass);
			$bounceImg.attr("src", activeImg);
			setTimeout(function(){
				makeUrlForMain($(this).attr("goodsNo"));
			},2000)
		});
	}
	obj.mainSlide();
	// main layer
	obj.layerSlide = function() {
		var $layerSlide = $body.find('.layerPop-guide .swiper-container');
		if ( !$layerSlide.length ) return false;
		var	swiper = new Swiper( $layerSlide , {
			effect: 'fade',
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			loop : true,
			loopAdditionalSlides : 1,
			autoplay : {
				delay : 2000,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			allowTouchMove : false,
			speed : 500
		});
	}
	//obj.layerSlide();
	//header
	obj.header = {
		tgEl: {
			lockScrollClass: 'LS',
		},
		init: function(){
			var tgEl = obj.header.tgEl;
			tgEl.$header = $header;
			tgEl.$gnb = $gnb;
			tgEl.$gnbBg = tgEl.$header.find('.gnb-bg');
			tgEl.$gnbList = $gnb.find('.gnb-list');
			tgEl.$gnb1Depth = tgEl.$gnbList.find('> li > a');
			tgEl.$gnb2Depth = tgEl.$gnbList.find('.item > ul > li > a');
			tgEl.$subMenu = tgEl.$gnb1Depth.next('.item');
			tgEl.$mobBtn = tgEl.$header.find('.btn-mob-open');
			tgEl.$mobBtnClose = tgEl.$header.find('.btn-mob-close');
			tgEl.$mypageWrap = tgEl.$header.find('.mypage-wrap');
			tgEl.$btnMypage = tgEl.$mypageWrap.find('.btn');
			tgEl.$mypageItem = tgEl.$mypageWrap.find('.my-item');
			obj.header.mouseInOut();
			obj.header.subMenu();
			obj.header.myPage();
			obj.header.dimmed();
			if ( windowWidth < mobileWidth ) {
				obj.header.mobileMenu();
			}
			obj.header.reset();
		},
		mouseInOut : function(){
			var tgEl = obj.header.tgEl;
			tgEl.$header.off().on('mouseenter', function(){
				if ( !$html.hasClass('mob') ) {
					tgEl.$header.addClass('over');
				}
			});
			tgEl.$gnb1Depth.parent().off().on('mouseleave', function(){
				if ( !$html.hasClass('mob') ) {
					tgEl.$header.removeClass('over');
					tgEl.$subMenu.hide();
					tgEl.$mypageWrap.removeClass(activeClass);
				}
			})
		},
		subMenu : function(){
			var tgEl = obj.header.tgEl;
			if ( windowWidth > mobileWidth ) {
				//PC
				tgEl.$gnb1Depth.off('click').on({
					'focusin mouseenter' : function(){
						var $this = $(this),
							$item = $this.next('.item');
						tgEl.$subMenu.hide();
						$item.show();
					}
				});
				tgEl.$gnb1Depth.not('.home > a').off('click').on({
					'click' : function(e){
						e.preventDefault();
					}
				});
			} else {
				//MOB
				tgEl.$gnbList.find('li a').each(function(){
					if ( $(this).next().length < 1 ) {
						$(this).addClass('no-submenu');
					}
				})
				tgEl.$gnb1Depth.not('.home').off('focusin mouseenter').on({
					'click' : function(e){
						e.preventDefault();
					}
				});
				tgEl.$subMenu.show();
			}
		},
		mobileMenu : function(){
			var tgEl = obj.header.tgEl;
			tgEl.$mobBtn.off().on({
				'click' : function(){
					tgEl.$header.addClass('mob-menu-open');
					$html.addClass(tgEl.lockScrollClass);
					$('.dimmed').show();
					tgEl.$mypageWrap.removeClass(activeClass);
				}
			});
			tgEl.$mobBtnClose.off().on({
				'click' : function(){
					tgEl.$header.removeClass('mob-menu-open');
					$html.removeClass(tgEl.lockScrollClass);
					$('.dimmed').hide();
					obj.header.reset();
				}
			});
		},
		reset : function() {
			var tgEl = obj.header.tgEl;
			tgEl.$header.removeClass('mob-menu-open');
			tgEl.$gnbList.find('a').removeClass(activeClass);
			$html.removeClass(tgEl.lockScrollClass);
			$html.find('.dimmed').hide();
			tgEl.$mypageWrap.removeClass(activeClass);
			if ( windowWidth > mobileWidth ) {
				//pc
				tgEl.$subMenu.hide();
			}
		},
		gnbBg : function(height){
			var tgEl = obj.header.tgEl;
			tgEl.$gnbBg.show().css('height', height + 5);
		},
		myPage : function() {
			var tgEl = obj.header.tgEl;
			if ( windowWidth > mobileWidth ) {
				//pc
				tgEl.$btnMypage.off('click').on({
					'focusin mouseenter' : function(){
						tgEl.$mypageWrap.addClass(activeClass);
					}
				});
				tgEl.$btnMypage.parent().off('click').on({
					'mouseleave' : function(){
						tgEl.$mypageWrap.removeClass(activeClass);
					}
				});
			} else {
				//mob
				tgEl.$btnMypage.off('focusin mouseenter').on({
					'click' : function(e){
						e.stopImmediatePropagation();
						tgEl.$mypageWrap.toggleClass(activeClass);
					}
				});
				tgEl.$mypageItem.off('mouseleave').on({
					'click' : function(){
						tgEl.$mypageWrap.removeClass(activeClass);
					}
				});
				$(document).mouseup(function (e){
				  if( tgEl.$mypageWrap.hasClass(activeClass) ){
					tgEl.$mypageWrap.removeClass(activeClass);
				  }
				});
			}
		},
		dimmed : function () {
			var tgEl = obj.header.tgEl;
			$(document).on('click', '.dimmed', function(){
				tgEl.$header.removeClass('mob-menu-open');
				$html.removeClass(tgEl.lockScrollClass);
				$(this).hide();
				obj.header.reset();
			});
		}
	};
	obj.header.init();
	$window.on({
		'resize' : function() {
			windowWidth = $window.width();
			windowHeight = $window.height();
			mobileCheck();
			obj.autoHeight();
			obj.header.init();
			obj.mainSlide();
			//console.log('re');
		},
		'scroll' : function() {
			windowScrollTop = $window.scrollTop();
		},
		'DOMContentLoaded' : function(){
			mobileCheck();
		},
		'load' : function() {
			//obj.fixedHeader.init();
		},
	});
})(obj, jQuery, window, document);