$(document).ready(function(){

	$('.slideA').each(function(){
		var _slideA = $(this),
				_screen = _slideA.find('.photos'),
				slideItem = _screen.find('li'),
				count = slideItem.length,
				imgWidth = slideItem.find('img').width(),
				dots_li = '',
				speed = 600,
				timer = 4000,
				tt = setInterval(autoSlide, timer);
		var index=0, i1=0, i2=1;
		
		for(var i=0; i<count; i++){
			dots_li = dots_li +'<li></li>';
		}
		$('.dots ul').append(dots_li);
		
		slideItem.css('left' , imgWidth);
		slideItem.first().css('left' , 0);
		$('.dots li').first().addClass('active');

		$('.slideArrow.right').click(function(){
			i1 = index % count;
			i2 = (index+1) % count;
			photoSlide();
			index=i2;
		});
		$('.slideArrow.left').click(function(){
			i1 = index % count;
			i2 = (index-1) % count;
			photoSlideRev();
			index = i2;
		});

		slideItem.find('a').focus(function(){
			clearInterval(tt);
			slideItem.css('left', imgWidth);
			$(this).parent().css('left', 0);
			_slideA.off( "mouseenter mouseleave" );
			i2 = $(this).parent().index();
			i1 = i2-1;
			dotActive();
		});

		slideItem.last().add(slideItem.first()).find('a').focusout(function(){
			foProcedure();
		});

		_slideA.hover(
			function(){ clearInterval(tt);},
			function(){	tt = setInterval(autoSlide, timer);}
		);

		function foProcedure(){
			slideItem.css('left', imgWidth);
			slideItem.first().css('left', 0);
			index = 0;
			i2=0;
			dotActive();
			tt = setInterval(autoSlide, timer);
			_slideA.hover(
				function(){ clearInterval(tt);},
				function(){	tt = setInterval(autoSlide, timer);}
			);
		}

		function autoSlide(){
			i1 = index % count;
			i2 = (index+1) % count;
			photoSlide();
			index = i2;
		}
		function photoSlide(){
			slideItem.eq(i1).stop(true,false).animate({'left':imgWidth * -1} , speed,
				function(){
					$(this).css('left', imgWidth)
				});
			slideItem.eq(i2).stop(true,false).animate({'left':0} , speed, dotActive);
		}
		function photoSlideRev(){
			slideItem.eq(i2).css('left', imgWidth * -1).stop().animate({'left':0}, speed, dotActive);
			slideItem.eq(i1).stop().animate({'left':imgWidth} , speed);
		}
		function dotActive(){
			 $('.dots li').removeClass('active').eq(i2).addClass('active');
		}


	});

});