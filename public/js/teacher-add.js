define(['jquery','template','util'],function($,template,util){
  /*
    添加或者编辑讲师
  */
  // 获取讲师id
  var tcId = util.qs('tc_id',location.search);
  if(tcId){
    // 编辑讲师-步骤一：根据id查询要编辑的讲师信息
    $.ajax({
      type : 'get',
      url : '/api/teacher/edit',
      data : {tc_id : tcId},
      dataType : 'json',
      success : function(data){
        data.result.tc_operate = '编辑讲师';
        var html = template('teacherTpl',data.result);
        $('#teacherInfo').html(html);
      }
    });
  }else{
    // 添加讲师
    var html = template('teacherTpl',{tc_operate : '添加讲师',tc_gender : 0});
    $('#teacherInfo').html(html);
  }
  
  // 绑定表单提交事件
  $('#addBtn').click(function(){
    $.ajax({
      type : 'post',
      url : '/api/teacher/add',
      data : $('#addForm').serialize(),
      dataType : 'json',
      success : function(data){
        if(data.code == 200){
          location.href = '/teacher/list';
        }
      }
    });
  });

});
