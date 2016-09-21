$(function(){
	//校验用户名
	$('#username').blur(function(){
		var value=$(this).val();
		var telReg=/^1\d{10}$/;
		var emailReg = /^\w+@\w+(\.\w+)+$/ ;
		var $user_check=$('.user_check');
		var $user_info=$('.user_info');
		if(value==''){
			$user_check.css('display','block');
			$user_info.html('用户名不能为空');
		}else if(telReg.test(value)){
			$user_check.css('display','block');
			$user_info.html('手机号正确');
		}else if(emailReg.test(value)){
			$user_check.css('display','block');
			$user_info.html('邮箱正确!');
		}else{
			$user_check.css('display','block');
			$user_info.html('请输入正确的邮箱或手机号！');
		}
	})
	//校验密码
	$('#userPwd').keyup(function(){
		var value=$(this).val();
		var length=value.length;
		//console.log(length);
		var $pwd_check=$('.pwd_check');
		var $pwd_info=$('.pwd_info');
		var $safe=$('.safe');
		var pwdReg=/^\w{6,}$/;
		if(value==''){
			$pwd_info.html('密码不能为空');
			$pwd_check.css('display','block');
		}else if(pwdReg.test(value)){
			$pwd_info.html('');
			$pwd_check.css('display','block');
			if(length>=6&&length<=9){
				$safe.css('display','block');
			 	$safe.find('div').eq(0).addClass('level')
			 	.siblings().removeClass('level');
			}else if(length>9&&length<=12){
				$safe.css('display','block');
				$safe.find('div').eq(1).addClass('level')
			 	.siblings().removeClass('level');
			}else if(length>12){
				$safe.css('display','block');
				$safe.find('div').eq(2).addClass('level')
			 	.siblings().removeClass('level');
			}
			//$pwd_check.css('display','none');
		}else{
			$pwd_info.html('密码长度不能少于六位');
			$pwd_check.css('display','block');
		}

	});
	
	//校验两次密码是否一致
	$('#againPwd').blur(function(){
		var pwd1=$('#userPwd').val();
		var pwd2=$(this).val();
		var $rePwd_info=$('.rePwd_info');
		var $rePwd_check=$('.rePwd_check');
		
		if(pwd2==''){
			$rePwd_info.html('请确认密码');
			$rePwd_check.css('display','block');
		}else if(pwd1!=pwd2){
			$rePwd_info.html('两次输入的密码不一致！');
			$rePwd_check.css('display','block');
		}else if(pwd1==pwd2){
			$rePwd_info.html('');
			$rePwd_check.css('display','none');
		}
	});
	//产生验证码
	var num;
	$('.yzmNmu').click(function(){
		num=parseInt(Math.random()*8900+1000);
        $(this).html(num);
	});
	
	//校验验证码
	$('#yzm').blur(function(){
		var $code_check=$('.code_check');
		var $code_info=$('.code_info');
		var value=$(this).val();
		if(value==''){
			$code_check.css('display','block');
			$code_info.html('验证码不能为空！');
		}else if(value==num){
			$code_check.css('display','none');
			$code_info.html('');
		}else{
			$code_check.css('display','block');
			$code_info.html('您输入的验证码不正确！');
		}
	})
})
