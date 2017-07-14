define(['jquery','template','util','uploadify'],function($,template,util){
  // 设置导航选中
  util.setMenu('/course/add');
  // 获取课程ID
  var csId = util.qs('cs_id',location.search);
  var type = util.qs('type',location.search);
  // 根据ID查询图片相关信息
  $.ajax({
    type : 'get',
    url : '/api/course/picture',
    data : {cs_id : csId},
    success : function(data){
      if(type == 1){
        data.result.operate = '课程添加';
      }else{
        data.result.operate = '课程编辑';
      }
      var html = template('pictureTpl',data.result);
      $('#pictureInfo').html(html);
      // 处理文件上传操作
      $('#upfile').uploadify({
        width : 80,
        height : 'auto',
        itemTemplate : '<span></span>',
        buttonText : '上传图片',
        buttonClass : 'btn btn-success btn-sm',
        fileObjName : 'cs_cover_original',
        swf : '/public/assets/uploadify/uploadify.swf',
        formData : {cs_id : csId},
        uploader : '/api/uploader/cover',
        onUploadSuccess : function(a,b,c){
          // var obj = eval('('+b+')');
          var obj = JSON.parse(b);
          $('#pictureInfo .preview img').attr('src',obj.result.path);
        }
      });
    }
  });
  
});