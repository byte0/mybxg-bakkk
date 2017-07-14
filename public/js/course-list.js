define(['jquery','template','util'],function($,template,util){
  // 设置菜单选中
  util.setMenu(location.pathname);
  // 获取课程列表数据
  $.ajax({
    type : 'get',
    url : '/api/course',
    dataType : 'json',
    success : function(data){
      var html = template('courseTpl',{list : data.result});
      $('#courseInfo').html(html);
    }
  });

});