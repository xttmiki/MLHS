$(function(){
 /*<div class="product_list">
				
		<!--<div class="product">
			<a href="" class="product_img">
			  <img src="../img/bag1.jpg" />
			</a>
			<div class="product_des">
				<a>Tory Burch</a>
				<a>酒红色圆形装饰扣单肩包</a>
				<p>
					<span class="xprice">￥2,640</span>
					<span class="yprice">￥5,280</span>
				</p>
	
			</div>
		</div>
	</div>*/
	
	     	$('<div/>').load('head.html',function(){
				$(this).insertBefore('.baglist');
			   });
		   $('<div/>').load('footer2.html',function(){
			$(this).insertAfter('.baglist');
		       });
	    //倒计时
	   
	    $('.down_time').daojishi({endTime:'2016/9/22'});
		// 全局配置
			function aJax(){
				$.ajax({
				url:'../../bag.json',
				//data:{pageNo:pageNum},
				dataType:'json',
				success:function(res){
					console.log(res);
					
					var $product_list=$('.product_list');
					var $product;
					
					$.each(res,function(idx,item){
						 $product=$('<div/>').addClass('product');
						var $a=$('<a/>').addClass('product_img');
						var $img=$('<img/>');
						$img.attr("src",item.img).appendTo($a);
						$a.appendTo($product)
						var $des=$('<div/>').addClass('product_des');
						//var title=item.title;
					    $('<a/>').html(item.title).appendTo($des);
						$('<a/>').html(item.content).appendTo($des); 
						var $p=$('<p/>');
						$('<span/>').addClass('xprice').html(item.xprice).appendTo($p);
						$('<span/>').addClass('yprice').html(item.yprice).appendTo($p);
						$p.appendTo($des);
						$des.appendTo($product);
						$product_list.append($product);
					});
	
				 }
				
			  });
			}
			
            // 页面一加载就请求服务器的数据
			aJax();
            $(window).on('scroll',function(){
				var scrollTop = $(window).scrollTop();

				// 懒加载：滚动《快到底部》的时候再加载
				if(scrollTop >= $(document).height() - $(window).height() - 100){
				

					aJax();
				}
			});

			// 手动触发滚动事件
			$(window).trigger('scroll');
         
	
})
