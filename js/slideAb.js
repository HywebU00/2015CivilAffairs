$(document).ready(function(){

	$('.slideA').each(function(){
		var _slideA = $(this),
				_screen = _slideA.find('.photos'),
				slideItem = _screen.find('li'),
				count = slideItem.length,
				imgWidth = slideItem.find('img').width(),
				dots_li = '',
				speed = 600,
				timer = 2000,
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
			index = 0;
			i1= 0;
			_slideA.off( "mouseenter mouseleave" );
			_screen.css('overflow','visible');

			// slideItem.css('left', imgWidth).find('img').css('width', 1);
			slideItem.css('left', imgWidth);


			slideItem.css('left', imgWidth);
			$(this).parent('li').css('left', 0).find('img').css('width', imgWidth);
			i2 = $(this).parent().index();
			dotActive();

			$(this).keyup(function(event){
			
				if(!event.shiftKey && i2 == count-1){
					$(this).focusout(function(){
						slideItem.not(i2).css('left', imgWidth ).find('img').css('width', imgWidth);
						slideItem.eq(i2).css('left', 0 ).stop(true,false).animate({'left':imgWidth * -1} , speed, function(){
							$(this).css('left', imgWidth)
						});
						slideItem.eq(0).stop(true,true).animate({'left':0}, speed, function(){
							index = 0;
							_screen.css('overflow','hidden');
							slideItem.find('img').css('width', imgWidth);

							tt = setInterval(autoSlide, timer);
						});					
					});
				}

				if(event.shiftKey && i2 == 0){
					$(this).focusout(function(){
						slideItem.not(i2).css('left', imgWidth ).find('img').css('width', imgWidth);
						slideItem.eq(i2).css('left', 0 ).stop(true,false).animate({'left':imgWidth * -1} , speed, function(){
							$(this).css('left', imgWidth);
						});

						slideItem.eq(1).stop(true,false).animate({'left':0} , speed, function(){
							index = 1;

							_screen.css('overflow','hidden');
							slideItem.find('img').css('width', imgWidth);

							// tt = setInterval(autoSlide, timer);
						});					

					});
				} 
			});



		});




		_slideA.hover(
			function(){ clearInterval(tt);},
			function(){	tt = setInterval(autoSlide, timer);}
		);

		function autoSlide(){
			i1 = index % count;
			i2 = (index+1) % count;
			photoSlide();
			index = i2;
		}
		function photoSlide(){
			slideItem.eq(i1).stop(true,true).animate({'left':imgWidth * -1} , speed,
				function(){
					$(this).css('left', imgWidth);
				});
			slideItem.eq(i2).stop(true,true).animate({'left':0} , speed, dotActive);
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