define(['jquery','template','util','editor','uploadify','region','datepicker','language','validate','form'],function($,template,util,CKEDITOR){
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
      // 处理文件上传
      $('#upfile').uploadify({
        width : 120,
        height : 120,
        buttonText : '',
        fileObjName : 'tc_avatar',
        swf : '/public/assets/uploadify/uploadify.swf',
        uploader : '/api/uploader/avatar',
        onUploadSuccess : function(a,b,c){
          var obj = JSON.parse(b);
          // 修改图片的地址
          $('#settingsInfo img').attr('src',obj.result.path);
        }
      });
      // 处理省市区三级联动
      $('#region').region({
        url : '/public/assets/jquery-region/region.json'
      });
      // 处理富文本
      CKEDITOR.replace('editor',{
        toolbarGroups : [
          { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
          { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
          { name: 'others', groups: [ 'others' ] },
          { name: 'about', groups: [ 'about' ] }
        ]
      });
      // 处理表单验证和提交
      $('#settingsForm').validate({
        sendForm : false,
        valid : function(){
          // 处理富文本内容更新
          for(var instance in CKEDITOR.instances){
            CKEDITOR.instances[instance].updateElement();
          }
          // 处理籍贯信息
          var p = $('#p option:selected').text();
          var c = $('#c option:selected').text();
          var d = $('#d option:selected').text();
          var hometown = p + '|' + c + '|' + d;
          // 处理表单提交
          $(this).ajaxSubmit({
            type : 'post',
            url : '/api/teacher/modify',
            data : {tc_hometown : hometown},
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

});