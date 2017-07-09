define(['jquery','template'],function($,template){
  /*
    讲师管理
  */
  // 调用接口获取数据，渲染页面
  $.ajax({
    type : 'get',
    url : '/api/teacher',
    dataType : 'json',
    success : function(data){
      var html = template('teacherTpl',{list:data.result});
      $('#teacherInfo').html(html);
    }
  });
  
});