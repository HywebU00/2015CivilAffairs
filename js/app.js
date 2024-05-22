$(document).ready(function() {

	$('html').removeClass('no-js');
	
	var ww = $( window ).width();
	if(ww<=1000){ $('#aU').focus();}

	//字級
	var fontSize = $('.fontSize'),
			fontSizeA = fontSize.find('a');
	
	fontSizeA.focus(function(){
		fontSize.height(90);
		fontSizeA.css('display','block');
		$(this).keydown(function(e){
			if(e.which == 13) {
				$(this).addClass('here').parent().siblings().children('a').removeClass('here');
			}
		});
	});	
	fontSize.find('li').last().find('a').focusout(function(){
		fontSize.height(28);
		fontSizeA.not('.here').css('display','none');
	});


	//固定版頭
	var hh = $('.header').outerHeight(true),
			menuH = $('.header .menu2p').outerHeight(),
			navH = $('.navi').height(),
			oneWeekH = $('.oneWeek').outerHeight(true),
			hhh = hh+oneWeekH;
	
	$(window).scroll(function() {
		if (ww>1000 && $(this).scrollTop() > hh-menuH ){
			$('.header').addClass('fixed');
			$('.center').css('margin-top', menuH );
		} else if ( ww<=1000 && $(this).scrollTop() > 0 ){
			$('.header').addClass('fixed');
			$('.navi , .center').css('margin-top', hh);
			$('.navi').next('.center').css('margin-top', 0);
		} else {
			$('.header').removeClass('fixed');
			$('.navi , .center').css('margin-top', 0);
		}
	});

	//顯示行動版查詢
	$('.searchCtrl').find('a').click(function(e){
		var searchTop;
		if(ww>800){searchTop=0;} else {searchTop=hh;};
		$('.search').css('top' , searchTop ).slideToggle('fast');
		$('.searchCtrl').toggleClass('close');
		e.preventDefault();
	});

	
	//header 選單 , side bar 選單
	var _menu = $('.header .menu , .header .menu2p'),
			_megaMenu = $('.header .megaMenu>ul');

	_menu.find('li').has('ul').addClass('hasChild');
	_megaMenu.find('li').has('ul').addClass('hasChild');

	var liHasChild = _menu.find('li.hasChild'),
			subMenuWidth = liHasChild.first().children('ul').outerWidth();

	//複製所需區塊到.sidebar
  var _sidebar = $('.sidebar');
  _menu.clone().prependTo(_sidebar);
	_megaMenu.parent().clone().prependTo(_sidebar);

	$( '<ul class="navigation"></ul>' ).prependTo(_sidebar);
	$('.header .navigation').find('li:contains(兒童版), li:contains(English)').clone().prependTo('.sidebar .navigation');

	_sidebar.find('.megaMenu').addClass('menu');
	_sidebar.find('.menu2p').addClass('menu').removeClass('menu2p');
	_sidebar.find('.menu').find('li.hasChild>a').attr("href", "#");
	_sidebar.find('.menu').find('li.hasChild>a').click(function(){
		$(this).next().slideToggle();
		$(this).parent().toggleClass('closeThis');
	});

	//兩段式選單
	var _menu2p = $('.header .menu2p'),
			_liTopLevel = _menu2p.children('ul').children('li'),
			topLiLength = _liTopLevel.length,
			_menuMoreCtrl = $('.menuMoreCtrl');

	if ( topLiLength > 6) {
		var hiddenMenu = _liTopLevel.slice(5).hide();
		_menu2p.after('<div class="menuMore"><ul></ul></div>');
		$('.menuMore>ul').append(hiddenMenu);
	} else {
		_menuMoreCtrl.hide();
	}

	var menuMore = $('.menuMore');
	menuMore.css('top','hh');
	_menuMoreCtrl.mouseover(
		function(){menuMore.stop().slideDown('fast');}
	)
	_menuMoreCtrl.click(
		function(){menuMore.stop().slideToggle('fast');}
	)
	_menuMoreCtrl.focus(
		function(){menuMore.stop().slideToggle('fast');}
	)	
	$(menuMore).mouseleave(
		function(){menuMore.stop().fadeOut('fast');}
	)
	$(menuMore).find('li:last>a').focusout(
		function(){menuMore.stop().fadeOut('fast');}
	)

	liHasChild.hover(
		function(){
			var _showing = $(this).children('ul');
			_showing.stop().fadeIn(200);
			showingMenu(_showing);
		},
		function(){$(this).children('ul').stop().fadeOut(200);}
	);

	liHasChild.keyup(
		function(){
			var _showing = $(this).children('ul');
			_showing.show();
			showingMenu(_showing);
			$(this).siblings().focus(function(){$(this).hide();});
	});

	function showingMenu(_showing){
		var  showingOffset = _showing.offset().left;
		if (showingOffset+subMenuWidth > ww) {
			_showing.css({left: -1*subMenuWidth+5, top:5});
		}
	}

	_menu.find('li').keyup(	
		function(){$(this).siblings().children('ul').hide();}
	);
	_menu.find('li:last>a').focusout(
		function(){_menu.find('li ul').hide();}
	);


	//巨型選單 megaMenu
	_megaMenu.children('li.hasChild').hover(
		function(){$(this).children().stop().fadeIn(200);},
		function(){$(this).children('ul').stop().fadeOut(200);}
	);
	_megaMenu.children('li.hasChild').keyup(
		function(){
			$(this).children().show();
			$(this).siblings().focus(function(){
				$(this).hide()
			});
		});
	_megaMenu.children('li').keyup(	
		function(){
			$(this).siblings().children('ul').hide();
		});
	$('.header .megaMenu li:last>a').focusout(
	function(){
		$('.header .megaMenu li ul').hide();
	})

	//產生遮罩
	$( '.main' ).append( '<div class="overlay"></div>' );
  var _overlay = $('.overlay');

	//隱藏式側欄
  function showSidebar(){
      _sidebar.css({'margin-left':0,'transition':'.5s'});
      _overlay.show(0, function(){
          _overlay.fadeTo('500', 0.5);
      });   
  }
  function hideSidebar(){
      _sidebar.css('margin-left', _sidebar.width() * -1 + 'px');
      _overlay.fadeTo('500', 0, function(){
          _overlay.hide();
      });
  }

  var _sidebarClose = $('.sidebarClose'),
  		_sidebarCtrl = $('.sidebarCtrl');	
	_overlay.parent().css('min-height', 'inherit');

  _sidebar.css('margin-left', _sidebar.width() * -1 + 'px');
  _sidebarCtrl.click(function() {				
      if (_overlay.is(':visible')) {
          hideSidebar();
      } else {
          showSidebar();
      }
  });
  _overlay.add(_sidebarClose).click(function() {
      hideSidebar();
  });






	//公版頁籤
	var tabIndex = 0;
	$('.tabContainer > section').css('position', 'absolute').hide();
	$('.tabContainer').click(function() {
		$(this).siblings().removeClass('here').find('section').hide();
		$(this).addClass('here').find('section').show();
	});
	$('.tabContainer>h2>a').focus(function() {
		$(this).parents('.tabContainer').siblings().removeClass('here').find('section').hide();
		$(this).parents('.tabContainer').addClass('here').find('section').show();
	});

	$('.news').find(".tabContainer:eq(0)").click();



	//頁籤
	$('.tabs').find('.active').next('.tabContent').show();
	
    var _tabset = $('.tabSet'),
    		tabwidth = _tabset.width(),
    		_tabItem = _tabset.find('h2>a'),
	      tabItemHeight = _tabItem.innerHeight(),
    		_tabContent = $('.tabContent'),
        wwSmall = 800;//視窗寬度小於等於這個數值，頁籤垂直排列。需配合css調整。

	_tabContent.css('top' , tabItemHeight );

	_tabset.each(function(){//各別處理每個頁籤組
		var tabContentHeight = $(this).find('.active').next(_tabContent).innerHeight(),
		    tabItemLength = $(this).find('h2').length,
        tabItemWidth = tabwidth / tabItemLength;            
		
		$(this).height(tabContentHeight + tabItemHeight);
		$(this).find(_tabItem).innerWidth(tabItemWidth);
        if(ww > wwSmall){
            $(this).find('.tabs>h2:last-of-type').css({position:"absolute", top:"0", right:"0"});
            $(this).find('.tabs>h2:last-of-type>a').css({width:tabItemWidth+1});
        }
	});

	_tabItem.focus(tabs);
	_tabItem.click(tabs);
	
	function tabs(e){
        var _aParent = $(this).parent(),
             tvp = _aParent.parents('.tabSet').offset(),
             tabIndex = _aParent.index()/2,
             scollDistance = tvp.top + tabItemHeight*tabIndex - hh;

        if(ww <= wwSmall){
            _aParent.siblings('h2').removeClass('active').next(_tabContent).slideUp();
            _aParent.addClass('active').next().slideDown();
            $("html,body").stop(true,false).animate({scrollTop:scollDistance});
        } else {
            _aParent.siblings('h2').removeClass('active').next(_tabContent).css("display","none");
            _aParent.addClass('active').next(_tabContent).css("display","block");            
        }

		tabContentHeight = _aParent.next().innerHeight();
		_aParent.parents('.tabSet').height(tabContentHeight + tabItemHeight);
    e.preventDefault();
	}

	//主題卡左右切換
	var _shiftBlock = $('.themeSlide'),
		_shiftLine = _shiftBlock.find('ul'),
		_shiftItem = _shiftBlock.find('li'),
		_shiftRight = $('.theme').find('button.right'),
		_shiftLeft = $('.theme').find('button.left'),
		shiftItemWidth = _shiftItem.outerWidth(true),
		themeLeft = 0,
		indicater_li ='',
		totalLength = _shiftItem.length,
		showLength;
	if ( ww>=1000 ) {
		showLength = 5;
	} else {
		showLength = parseInt((ww-60)/shiftItemWidth);
	}
	for(var i=0; i<totalLength; i++){
		indicater_li = indicater_li +'<li></li>';
	}
	$('.indicater').append(indicater_li);

	var inBegin = 0, inEnd = showLength;
	$('.indicater>li').slice(inBegin,inEnd).addClass('on')

	_shiftBlock.width(shiftItemWidth*showLength);	
	_shiftLine.width(shiftItemWidth*totalLength);
	_shiftLeft.hide();
	if(totalLength <=  showLength){_shiftRight.hide()}
	
	_shiftRight.click(function(){
		themeLeft = themeLeft - shiftItemWidth;
		inBegin++;inEnd++;
		$('.indicater>li').removeClass().slice(inBegin,inEnd).addClass('on');
		_shiftLine.stop().animate({left: themeLeft}, 400);
		
		if (themeLeft != 0){
			_shiftLeft.fadeIn();
		}
		if (themeLeft == shiftItemWidth*(totalLength-showLength)*-1){
			_shiftRight.fadeOut();
		}
	});
	_shiftLeft.click(function(){
		inBegin--;inEnd--;
		$('.indicater>li').removeClass().slice(inBegin,inEnd).addClass('on')
		themeLeft = themeLeft + shiftItemWidth;
		_shiftLine.stop().animate({left: themeLeft}, 400);
		if(themeLeft == 0){
			_shiftLeft.fadeOut();
		}
		if (themeLeft != shiftItemWidth*(totalLength-showLength)*-1){
			_shiftRight.fadeIn();
		}
	});

	//gotop
	_goTop = $('.goTop');
	_goTop.click(function(e){
		$("html,body").stop(true,false).animate({scrollTop:0},700, function(){
			$('.goCenter').focus();
		});
		e.preventDefault();

	});
	$(window).scroll(function() {
		if ( $(this).scrollTop() > 250){
			_goTop.fadeIn("fast");
		} else {
			_goTop.stop().fadeOut("fast");
		}
	});

	// // Fatfooter, qrCode 開合
	// $(function(){
	// 	$('.fatfootCtrl input').click(function(){
	// 		$(this).toggleClass('close');
	// 		$('footer>nav').toggleClass('close');
	// 		$('.qrcode, .director').slideToggle();
	// 		$('footer>nav>ul>li>ul').slideToggle(function(){
	// 			$(this).toggleClass('close');
	// 		});
	// 	});
	// });

	// ---------- 2024 無障礙修改 ---------- //
	// Fatfooter, qrCode 開合 
	var _footer = $('footer.footer');
	var _fatfootCtrlBtn = _footer.find('button.btn-fatfooter').text('控制按鈕');
	var _footerNav = _footer.find('nav');
	var _footerNavSlide = _footer.find('nav>ul>li>ul');
	var _footerQrcode = _footer.find('.qrcode');

	if ( _footerNavSlide.first().is(':visible') ) {
			_fatfootCtrlBtn.removeClass('close').attr('aria-expanded', true);
	} else {
			_fatfootCtrlBtn.addClass('close').attr('aria-expanded', false);
	}

	_fatfootCtrlBtn.click(function () {
		if (_footerNavSlide.first().is(':visible')) {
			_footerNavSlide.add(_footerQrcode).stop().slideUp(400);
			_fatfootCtrlBtn.addClass('close').attr('aria-expanded', false);
			_footerNav.addClass('close');
		} else {
			_footerNavSlide.add(_footerQrcode).stop().slideDown(400);
			_fatfootCtrlBtn.removeClass('close').attr('aria-expanded', true);
			_footerNav.removeClass('close');
		}
	})


	// ---------- 2024/5 無障礙修改 ---------- //
	// 分頁顯示筆數 select 元件加 aria-label 屬性（2024 無障礙修改）
	$('.page').find('select').attr('aria-label', '每頁顯示筆數');


	// 小廣告輪播，水平
	$('.adBlockH').each(function(){

		var _adSlide = $(this),
				_showBox = _adSlide.find('.adSlide'),
				_adSlideItem = _showBox.find('li'),
				_adSlideGroup = _adSlideItem.parent(),
				itemWidth = _adSlideItem.outerWidth(true),
				count = _adSlideItem.length,
				_arrowLeft = _adSlide.find('.arbtn.left'),
				_arrowRight = _adSlide.find('.arbtn.right'),
				_pauseArea = _adSlideGroup.add(_arrowLeft).add(_arrowRight);
				speed = 600,
				timer = 4000,
				showItem = 5;

		_arrowLeft.add(_arrowRight).css('top', _showBox.position().top + _showBox.innerHeight()*.5);
		_adSlideGroup.width(itemWidth*count);

		if(count>showItem){
			var	autoAdSlide = setInterval(slideForward, timer);
			var i = 0;

			_pauseArea.hover(
				function(){ clearInterval(autoAdSlide);},
				function(){	autoAdSlide = setInterval(slideForward, timer);}
			);

			_arrowRight.click(function(){	slideForward();	});
			_arrowLeft.click(function(){ slideBackward();	});

			_arrowRight.add(_arrowLeft).add(_adSlideItem.find('a')).focus(function(){
				clearInterval(autoAdSlide);
				_pauseArea.off("mouseenter mouseleave");
			});

			_arrowRight.keyup(function(e){
				if(e.which==39){slideForward();}
			});
			_arrowLeft.keyup(function(e){
				if(e.which==37){slideBackward();}
			});

			_arrowLeft.blur(function(){
				if( !_adSlideItem.find('a').is(':focus') ){slideRestart();}
			});
			_arrowRight.blur(function(){
				if( !_adSlideItem.find('a').is(':focus') ){slideRestart();}
			});
			
		} else {
			_arrowLeft.add(_arrowRight).hide();
			_adSlideGroup.css({'left': '50%', 'margin-left': -.5*_adSlideGroup.width()});			
		}

		function slideForward(){
			_adSlideGroup.stop(true,true).animate({'left': -1*itemWidth}, speed, 
				function(){
					_adSlideItem.eq(i).appendTo(_adSlideGroup);
					_adSlideGroup.css('left',0);
					i = (i+1)%count;
				});
		}
		function slideBackward(){
			i = (i-1)%count;
			_adSlideItem.eq(i).prependTo(_adSlideGroup);
			_adSlideGroup.css('left', -1*itemWidth );
			_adSlideGroup.stop(true,true).animate({'left': 0}, speed);
		}
		function slideRestart(){
			autoAdSlide = setInterval(slideForward, timer);
			_pauseArea.hover(
				function(){ clearInterval(autoAdSlide);},
				function(){	autoAdSlide = setInterval(slideForward, timer);}
			);			
		}
	});



	// 資料大類開合
	if(ww<=800){
		var _category = $('.category');
	
		_category.append('<button class="cateCtrl"></button>');
		_category.prepend('<div class="cateNow"></div>');
		$('.cateNow').text(_category.find('li.here > a').text());
	
		$('.cateCtrl').click(function(){
			$(this).toggleClass('close');
				_category.find('ul').slideToggle('fast');
			});
			_category.find('li>a').click(function(){
				$('.cateNow').empty().text($(this).text());
				$(this).parent().addClass('here').siblings().removeClass('here');
				 _category.find('ul').slideToggle('fast');
				 $('.cateCtrl').toggleClass('close');
		});
	}
	
	// 影片縮圖寬高
	vh = $('.thumbnail.videos .image>img').width() *.67;
	$('.thumbnail.videos .image>img').css('height' , vh);
	$('.thumbnail.videos .play').css('height' , vh);

	//首頁大圖輪播參數
	$('.adloop').slick({
		accessibility:true,
		focusOnSelect: true,
		autoplay:true,
		dots:true,
		autoplaySpeed: 4000,
		speed: 700
	});
    //首頁大圖輪播下方dot tab移動時,無障礙人工檢測要求,按enter鍵需能直接連結圖檔網址
    $( ".slick-dots li button" ).keypress(function(e) {
            var txt = $(e.target).text();
            var achr = $(".slick-slide[data-slick-index="+txt+"] a");
            window.open(achr.attr('href'));
    });
       

	//拍片景點
	var _photoThumb = $('.photoThumb').find('li'),
		_photoShow = $('.photoShow').find('li'),
		photoCount = _photoThumb.length,
		duration = 3000,
		tt = setInterval(autoShow, duration);

	_photoThumb.first().addClass('active');
	_photoShow.first().show();

	$('.photoShow').after('<div class="ppause"></div>');
	var ppCtrl = $('.ppause');
	if(ww <= 600){
		var hini = _photoShow.first().height();
		$('.photoShow').height(hini);
		
		ppCtrl.click(function(){
			$(this).toggleClass('pplay')
			if (ppCtrl.hasClass('pplay')) {
				clearInterval(tt);
			} else {
				tt = setInterval(autoShow, duration);
			}
		})
	};

	_photoShow.append('<span class="photoCount"></span>');
	$('.photoShow').append('<div class="btn prev"></div><div class="btn next"></div>');

	for(n=1; n<=photoCount; n++){
		_photoShow.eq(n-1).find('.photoCount').text( n + '/' + photoCount);
	}

	var i = 0;
	var _btnNext = $('.photoShow').find('.next'),
		_btnPrev = $('.photoShow').find('.prev');

	_btnNext.click(function(){i = (i+1) % photoCount;showPhoto();});
	_btnPrev.click(function(){i = (i-1) % photoCount;showPhoto();});

	_photoThumb.find('a').click(function(){
		i = $(this).parent('li').index();
		showPhoto();
	});
	_photoThumb.find('a').focus(function(){
		clearInterval(tt);
		i = $(this).parent('li').index();
		showPhoto();
	});

	_photoThumb.last().focusout(function(){
        tt = setInterval(autoShow, duration);
    });

	$('.photoShow, .photoThumb li').hover(
		function(){clearInterval(tt);},
		function(){
			if ( !(ppCtrl.hasClass('pplay')) ) {
				tt = setInterval(autoShow, duration);
			}
		}
	);
	function autoShow(){
		i = (i+1) % photoCount;
		showPhoto();
	}
	function showPhoto(){
		_photoThumb.eq(i).addClass('active').siblings().removeClass('active');
		_photoShow.eq(i).fadeIn().siblings().fadeOut();
		if(ww <= 600){
			var	photoHeight = _photoShow.eq(i).height();
			$('.photoShow').animate({height:photoHeight});
		}
	}


	//照片內容頁參數
	$('.photoSlide').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  dots: false,
	  arrows: false,
	  fade: false,
	  asNavFor: '.slider-nav'
	});
	$('.photoNav').slick({
	  slidesToShow: 5,
	  slidesToScroll: 1,
	  asNavFor: '.photoSlide',
	  dots: false,
	  centerMode: false,
	  focusOnSelect: true
	  });


	//分享
	var _share = $('.share');

	$('.shareThis').click(function(){
		_share.show();
		_overlay.show().fadeTo('300', 0.5);
	});

	var svt;
	_share.append('<span class="after">《</span>');
	_share.find('.after').hide();
	_share.find('h1').wrap('<a href="#"></a>');

	function miniShare(){
		_share.find('.after').show();
		_share.stop(true, true).animate({ width:"1.1em"}, 600).find('ul').stop(true, true).slideUp(600);
	}
	function showShare(){
		_share.find('.after').hide();
		_share.stop(true, true).animate({ width:"48px"},300).find('ul').stop(true, true).slideDown(300);
	}

	if (ww > 1000) {
		svt = setTimeout(miniShare , 2000);		
		_share.hover(showShare,miniShare);
		_share.children('a').focusin(showShare);
		_share.find('li').last().children('a').focusout(miniShare);
	}
	if (ww <= 1000 ) {
		clearTimeout(svt);
		_share.find('ul').append( '<li class="close">離開</li>' );
		_share.find('li').click(function(){
			_share.hide();
			_overlay.fadeTo('300', 0, function(){$(this).hide();});
		});
		_overlay.click(function() {
			_share.hide();
		});
	}


  	//彈出訊息
	$('.popMessage').before('<div class="popMask"></div>');
	$('.popMask, .popMessage').show();
	$('.popMask, .closePop').click(function(){
		$('.popMask, .popMessage, .closePop').hide(300);
		$('.accesskey').find('a[accesskey="U"]').focus();
	})
	$('.closePop').focus(function(){
		$('.popMask, .popMessage, .closePop').hide(300);
	})

	
  	//機關通訊錄：機關階層
	$('.orgTree>ul>li:has(ul)').addClass('hasChild');
	$('.orgTree li.hasChild>ul').before('<span><a href="#">展開</a></span>');
	$('.orgTree li.hasChild').children('span').click(function(){
		$(this).toggleClass('close').siblings('ul').slideToggle();
		if ($(this).hasClass('close')) {
			$(this).find('a').text('收合');
		} else {
			$(this).find('a').text('展開');
		}
	});
	$('.orgTree>ul').append('<li></li>');

	if (ww < 700 ) {
		$('.list, .thumbnail').jscroll({
			contentSelector: '.list, .thumbnail'
		});
	}






	rwdTable();
	
});
