define(['jquery','template','util'],function($,template,util){
  // 设置菜单选中
  util.setMenu('/course/add');
  // 获取课程ID
  var csId = util.qs('cs_id',location.search);
  // 根据ID查询课时信息
  $.ajax({
    type : 'get',
    url : '/api/course/lesson',
    data : {cs_id : csId},
    dataType : 'json',
    success : function(data){
      var html = template('lessonTpl',data.result);
      $('#lessonInfo').html(html);
    }
  });
});