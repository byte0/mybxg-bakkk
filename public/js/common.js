define(['jquery','template','nprogress','cookie'],function($,template,nprogress){
  // 控制左侧导航菜单的折叠和显示
  $('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
  });
  // 实现退出功能
  $('#logout').click(function(){
      $.ajax({
          type : 'post',
          url : '/api/logout',
          dataType : 'json',
          success : function(data){
              if(data.code == 200){
                  $.removeCookie('loginInfo',{path:'/'});
                  location.href = '/';
              }
          }
      });
  });
  // 获取登录的用户信息
  var info = $.cookie('loginInfo');
  // 渲染头像信息
  var tpl = '<div class="avatar img-circle">'
            +'    <img src="{{tc_avatar}}">'
            +'</div>'
            +'<h4>{{tc_name}}</h4>';
  var html = template.render(tpl,info?JSON.parse(info):{});
  $('.aside .profile').html(html);
  
  // 验证用户是否登录过
  if(!$.cookie('PHPSESSID') && location.pathname != '/' && location.href != '/login'){
    location.href = '/';
  }

  // 处理顶部加载进度条
  nprogress.start();
  nprogress.done();
  // 处理遮罩效果
  $(document).ajaxStart(function(){
    $('.overlay').show();
  });
  $(document).ajaxStop(function(){
    setTimeout(function(){
      $('.overlay').hide();
    },300);
  });

});

	