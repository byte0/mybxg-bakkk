define(['jquery','template','util'],function($,template,util){
  // 设置导航菜单选中
  util.setMenu('/index/index');
  // 查询用户详细信息
  $.ajax({
    type : 'get',
    url : '/api/teacher/profile',
    dataType : 'json',
    success : function(data){
      var html = template('settingsTpl',data.result);
      $('#settingsInfo').html(html);
    }
  });
});