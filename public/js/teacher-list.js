define(['jquery','template','bootstrap'],function($,template){
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
      // 实现讲师信息预览
      $('#teacherInfo').find('.preview').click(function(){
        var td = $(this).parent();
        var tcId = td.attr('data-tcId');
        console.log(tcId);
        // 获取讲师详细信息
        $.ajax({
          type : 'get',
          url : '/api/teacher/view',
          data : {tc_id : tcId},
          dataType : 'json',
          success : function(data){
            var html = template('modalTpl',data.result);
            $('#modalInfo').html(html);
            $('#teacherModal').modal()  
          }
        });
      });
    }
  });


  
});