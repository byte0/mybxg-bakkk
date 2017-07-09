define(['jquery','cookie'],function($){
  // 实现登录功能
  $('#btn').click(function(){
      $.ajax({
          type : 'post',
          url : '/api/login',
          data : $('#loginForm').serialize(),
          dataType : 'json',
          success : function(data){
              if(data.code == 200){
                  // 把登录成功的用户信息保存在cookie，方便别的页面获取
                  $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                  // 应该把data中用户登录信息保存到cookie中即可实现页面数据共享
                  location.href = '/index/index';
              }
          }
      });
      return false;
  });
});