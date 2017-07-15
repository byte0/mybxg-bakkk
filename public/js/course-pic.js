define(['jquery','template','util','uploadify','jcrop','form'],function($,template,util){
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
      // 模板渲染
      var html = template('pictureTpl',data.result);
      $('#pictureInfo').html(html);

      // 获取封面原始图片
      var pic = $('.preview img');
      var cropInstance = null;//防止产生多个裁切实例

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
          // 初始化图片裁切
          cropImage();
        }
      });

      // 实现图片裁切功能
      function cropImage(){
        // 销毁之前的裁切实例对象
        cropInstance && cropInstance.destroy();
        // 重新创建裁切实例对象
        pic.Jcrop({
          bgColor : 'green',
          aspectRatio : 2
        },function(){
          cropInstance = this;
          // 处理缩略图
          this.initComponent('Thumbnailer', { 
            width: 240, 
            height: 120,
            target : $('.thumb')//自定义缩略图位置
          });
          // 设置选区的样式
          $('.jcrop-thumb').css({
            left : 0,
            top : 0
          });

          // 设置选区相关信息
          // 获取图片的宽度和高度
          var width = this.ui.stage.width;
          var height = this.ui.stage.height;
          // 计算选区的大小(选区左上角到图片左上角的距离，选区的宽度和高度)
          var x = 0,
              y = (height - width / 2) / 2;
              w = width;
              h = width / 2;
          // 创建选区
          this.newSelection();
          this.setSelect([x,y,w,h]);

          // 设置默认选区
          setCropInfo({x:x,y:y,w:w,h:h});

          // 记录选区参数信息
          pic.parent().on('cropend',function(a,b,c){
            setCropInfo(c);
          });
          // 设置裁切参数
          function setCropInfo(c){
            $('#cropInfo input[name="x"]').val(c.x);
            $('#cropInfo input[name="y"]').val(c.y);
            $('#cropInfo input[name="w"]').val(c.w);
            $('#cropInfo input[name="h"]').val(c.h);
          }

        });
      }
      // 绑定图片裁切按钮单击事件
      $('#cropBtn').click(function(){
        var cflag = $(this).attr('data-flag');
        if(cflag){
          // 保存图片(就是把选区参数提交到后台)
          $('#cropInfo').ajaxSubmit({
            type : 'post',
            url : '/api/course/update/picture',
            data : {cs_id : csId},
            dataType : 'json',
            success : function(data){
              if(data.code == 200){
                location.href = '/course/lesson?cs_id=' + data.result.cs_id;
              }
            }
          });
        }else{
          $(this).attr('data-flag','ok');
          $(this).text('保存图片');
          // 裁切图片
          cropImage();
        }
      });
    }
  });
  
});