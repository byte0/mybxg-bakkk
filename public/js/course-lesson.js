define(['jquery','template','util','bootstrap','validate','form'],function($,template,util){
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
      // 渲染模板
      var html = template('lessonTpl',data.result);
      $('#lessonInfo').html(html);
      // 课时添加事件绑定
      $('#lessonAddBtn').click(function(){
        var html = template('modalTpl',{operate : '课时添加'});
        $('#modalInfo').html(html);
        $('#chapterModal').modal();
        submitForm('/api/course/chapter/add');
      });
      // 处理编辑操作
      $('#lessonInfo .lessonEdit').click(function(){
        var ctId = $(this).attr('data-ctId');
        // 根据课时ID查询详细信息
        $.ajax({
          type : 'get',
          url : '/api/course/chapter/edit',
          data : {ct_id : ctId},
          dataType : 'json',
          success : function(data){
            data.result.operate = '课时编辑';
            var html = template('modalTpl',data.result);
            $('#modalInfo').html(html);
            $('#chapterModal').modal();
            submitForm('/api/course/chapter/modify');
          }
        });
      });
    }
  });
  // 课时表单提交功能
  function submitForm(url){
    // 处理表单提交
    $('#lessonForm').validate({
      sendForm : false,
      valid : function(){
        var isfree = $('#freeFlag:checked').length==1?1:0;
        $(this).ajaxSubmit({
          type : 'post',
          url : url,
          data : {ct_cs_id:csId,ct_is_free:isfree},
          dataType : 'json',
          success : function(data){
            if(data.code == 200){
              location.reload();
            }
          }
        });
      }
    });
  }
});