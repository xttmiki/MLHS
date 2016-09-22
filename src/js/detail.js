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
	
	//购买商品数量
	
	var $quantity=$('#quantity');
	var count=$quantity.val();
	$('.add').click(function(){
		count++;
		$quantity.val(count);
	});
	$('.reduce').click(function(){
		if(count>=2){
			count--;
			$quantity.val(count);
		}else{
			count=1;
		}
	});
	
	
	
	//购买商品
	$('.buy_btn').on('click',function(){
		var $brand=$('.detail_logo').html().trim();//获取商标
		var $name=$('.name').html();//获取商品名称
		var $price=$('.xj').html();//获取商品价格
		var $img=$('.choose_img').find('img').attr('src');//获取图片路径
		var $quantity=$('#quantity').val();//获取购买数量
		//console.log($brand,$name,$xj,$img,$quantity);
		var proObj={};
		proObj.brand=$brand;
		proObj.name=$name;
		proObj.price=$price;
		proObj.img=$img;
		proObj.quantity=$quantity;
		
		//现取cookie
		var data= getCookie("prolist");
		if(data){
			data = JSON.parse(data);
		}else{
			data = [];
		}
		data.push(proObj);
		
		var pro=JSON.stringify(data);
		console.log(pro);
		addCookie('prolist', pro, 7);
		//getPro=JSON.parse(getCookie("prolist"));
		//console.log(getPro);
		
	});
	
	/*
	<ul>
  	    <li style="width:380px;height:107px" class="content_left">
  	      <a>
  	       <img src="../img/bag5.jpg">
  	      </a>
  	      <div class="pro_title_info">
  	      	<strong>Tory Burch</strong>
  	      	<span>深蓝色花朵珠片装饰手提肩包</span>
  	      </div>
  	    </li>
  	    <li>¥ 2690.00</li>
  	    <li>
         	<div class="number_choose">
                <span class="number_reduce">-</span>
                <span class="quantity_number"><input readonly="readonly" value="1"></span>
                <span class="number_increase">+</span>
            </div>
    	</li>
    	<li></li>
    	<li class="xiaoji">¥ 2690.00</li>
    	<li><img src="../css/img/delete.png" class="delete"/></li>
    </ul>*/
   //把商品加入购物车
   var $shop_content=$('.shop_content');
   var getPro = getCookie("prolist");
   console.log(getPro)
   var totalMoney=0;//计算总价格
   if(getPro){
   	$.each(JSON.parse(getPro),function(idx,item){
	   	var money=item.quantity*2690;
	   	totalMoney+=money;
	   	//console.log(arguments);
	   	var $ul=$('<ul/>');
	    var $li1=$('<li/>').css({'width':380,'height':107}).addClass('content_left');
	    var $a=$('<a/>');
	    $a.appendTo($li1);
	    $('<img/>').attr("src",item.img).appendTo($a);
	   	var $div1=$('<div/>').addClass('pro_title_info');
	    $('<strong/>').html(item.brand).appendTo($div1);
	    $('<span/>').html(item.name).appendTo($div1);
	    $div1.appendTo($li1);
	    $li1.appendTo($ul);
	    
	    var $li2=$('<li/>').html(item.price).appendTo($ul);
	   	
	   	var $li3=$('<li/>');
	   	var $div2=$('<div/>').addClass('number_choose');
	   	var $span1=$('<span/>').addClass('number_reduce').html('-');
	   	var $span2=$('<span/>').addClass('quantity_number');
	    $('<input/>').attr('value',item.quantity).appendTo($span2);
	   	var $span3=$('<span/>').addClass('number_increase').html('+');
	   	$span1.appendTo($div2);
	   	$span2.appendTo($div2);
	   	$span3.appendTo($div2);
	   	$div2.appendTo($li3);
	   	$li3.appendTo($ul);
	   	
	   	$('<li/>').appendTo($ul);//第四个li
	   	
	   	
	   	var $li5=$('<li/>').html(money);
	   	$li5.appendTo($ul);
	   	
	   	var $li6=$('<li/>');
	   	$('<img/>').attr('src','../css/img/delete.png').addClass('delete').appendTo($li6);
	    $li6.appendTo($ul);
	    $ul.appendTo($shop_content);
	  
	   });
	   $('.money').html(totalMoney);
   }
   
   //把商品从购物车中移除
   
   $shop_content.on('click','.delete',function(){
   	 var idx=$(this).parent().parent().index();
   	 $(this).closest('ul').remove();
   	 var data = JSON.parse(getCookie("prolist"));
   	 data.splice(idx,1);
   	 var pro=JSON.stringify(data);
	 addCookie('prolist',pro,7);
   	 
   	 
   	 //console.log(idx,deletePro);
   });
   
   
})