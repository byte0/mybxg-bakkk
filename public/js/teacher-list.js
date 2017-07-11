define(['jquery','template','util','bootstrap'],function($,template,util){
  /*
    讲师管理
  */
  // 设置导航菜单选中
  util.setMenu(location.pathname);
  // 调用接口获取数据，渲染页面
  $.ajax({
    type : 'get',
    url : '/api/teacher',
    dataType : 'json',
    success : function(data){
      // 渲染数据列表
      var html = template('teacherTpl',{list:data.result});
      $('#teacherInfo').html(html);

      // 实现讲师启用和注销功能
      $('#teacherInfo').find('.switchBtn').click(function(){
        var td = $(this).parent();
        var tcId = td.attr('data-tcId');
        var tcStatus = td.attr('data-tcStatus');
        var that = this;
        $.ajax({
          type : 'post',
          url : '/api/teacher/handle',
          data : {tc_id : tcId,tc_status : tcStatus},
          dataType : 'json',
          success : function(data){
            td.attr('data-tcStatus',data.result.tc_status);
            if(data.result.tc_status == 0){
              $(that).text('注 销');
            }else{
              $(that).text('启 用');
            }
          }
        });
      });
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