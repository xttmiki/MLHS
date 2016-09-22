$(function(){

	var $ul = $('.pro_ul');
    var $li_length = $ul.find('li').length;
	var $li_width = $ul.find('li').outerWidth(true);

	
	$('.pageRight').click(function(){
		console.log(1);
		var $ul_left = parseInt($ul.css('left'));
		console.log($ul_left);
		if($ul_left > -($li_length-4) * $li_width){
			$ul.animate({left: $ul_left-$li_width});

		}
	})


	$('.pageLeft').click(function(){
		var $ul_left = parseInt($ul.css('left'));
		console.log($ul_left);
		if($ul_left < 0){
			$ul.animate({left: $ul_left+$li_width });
		}
	})


	//放大镜
	$('.small_img').find('li').mouseover(function(){
		var index = $(this).index()+1;
		$('.bigpic').attr('src','../img/small'+ index + '.jpg');
		$('.showBigPic').find('img').attr('src','../img/small' + index +'.jpg')
	})

	var $bigpic = $('.bigpic');           //展示的图片
	var $showBigPic = $('.showBigPic');			 //放大图的显示区域
	var $bigerPic = $showBigPic.find('img');     //放大图的显示区域
	var $dragPop = $('.dragPop');                 //需放大区域的遮罩层
	var multiple = $showBigPic.width()/$dragPop.width();      //放大区域与遮罩层倍数
	      
	
	//鼠标滑动时放大
	$('.pop').mousemove(function(e){
		$dragPop.css('display','block');
		$showBigPic.css('display','block');
	  	//获取坐标的方法
	  	var iX = e.pageX - $(this).offset().left - $dragPop.width()/2,
	  		iY = e.pageY - $(this).offset().top - $dragPop.height()/2,	
	  		MaxX = $(this).width()-$dragPop.width(),
	  		MaxY = $(this).height()-$dragPop.height();
		//放大区域遮罩层防止跑出图片区域		
	  	iX = iX > 0 ? iX : 0;
	  	iX = iX < MaxX ? iX : MaxX;
	  	iY = iY > 0 ? iY : 0;
	  	iY = iY < MaxY ? iY : MaxY;
	
	   	$dragPop.css({left:iX+'px',top:iY+'px'});	//遮罩层定位
	   	//放大区域的放大显示定位
	   	$bigerPic.css({left:-multiple*iX+'px',top:-multiple*iY+'px'});   
	   	//return false;
	}).mouseout(function(){
	   	$dragPop.hide();
		$showBigPic.hide();
	});
     //显示关闭遮罩层
     var $guide=$('.guide');
     var $hiddenBox=$('.hiddenBox')//获取遮罩层
     var $canvas=$('.canvas');
     var $close=$('.close')
     $guide.on('click',function(){
     	console.log('进来了');
     	 $hiddenBox.css('display','block');
     	 $canvas.css('display','block')
     });
     $close.on('click',function(){
     	 $hiddenBox.css('display','none');
     	 $canvas.css('display','none')
     })
     //倒计时
     $('.djs').daojishi({endTime:'2016/12/22'});
	
	
	
})