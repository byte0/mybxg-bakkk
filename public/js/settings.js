define(['jquery','template','util','uploadify','region'],function($,template,util){
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
          // 修改图片的地址
          $('#settingsInfo img').attr('src',b.result.path);
        }
      });
      // 处理省市区三级联动
      $('#region').region({
        url : '/public/assets/jquery-region/region.json'
      });
    }
  });

});