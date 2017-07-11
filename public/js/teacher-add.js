define(['jquery','template','util','datepicker','language','validate','form'],function($,template,util){
  /*
    添加或者编辑讲师
  */
  // 设置导航菜单选中
  util.setMenu('/teacher/list');
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
        // 绑定表单提交事件
        // $('#addBtn').click(function(){
        //     submitForm('/api/teacher/update');
        // });
        submitForm('/api/teacher/update');
      }
    });
  }else{
    // 添加讲师
    var html = template('teacherTpl',{tc_operate : '添加讲师',tc_gender : 0});
    $('#teacherInfo').html(html);
    // 绑定表单提交事件
    // $('#addBtn').click(function(){
    //     submitForm('/api/teacher/add');
    // });
    submitForm('/api/teacher/add');
  }
  // 实现表单的提交
  function submitForm(url){
    $('#addForm').validate({
      sendForm : false,
      valid : function(){
        // 提交表单
        // submitForm('/api/teacher/add');
        $('#addForm').ajaxSubmit({
          type : 'post',
          url : url,
          dataType : 'json',
          success : function(data){
            if(data.code == 200){
              location.href = '/teacher/list';
            }
          }
        });
      },
      description : {
        tc_name : {
          required : '用户名不能为空'
        },
        tc_pass : {
          required : '密码不能为空',
          pattern : '密码只能是6位数字'
        },
        tc_join_date : {
          required : '入职日期必须选择'
        }
      }
    });
  }
  // function submitForm(url){
  //   $.ajax({
  //     type : 'post',
  //     url : url,
  //     data : $('#addForm').serialize(),
  //     dataType : 'json',
  //     success : function(data){
  //       if(data.code == 200){
  //         location.href = '/teacher/list';
  //       }
  //     }
  //   });
  // }

});
