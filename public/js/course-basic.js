define(['jquery','template','util','editor','validate','form'],function($,template,util,CKEDITOR){
  // 设置菜单选中
  util.setMenu('/course/add');
  // 获取课程ID
  var csId = util.qs('cs_id',location.search);
  // 获取操作类型
  var type = util.qs('type',location.search);
  // 根据课程id查询课程对应的信息
  $.ajax({
    type : 'get',
    url : '/api/course/basic',
    data : {cs_id : csId},
    dataType : 'json',
    success : function(data){
      if(!type){
        // 编辑
        data.result.operate = '课程编辑';
      }else{
        // 添加
        data.result.operate = '课程添加';
      }
      // 渲染模块
      var html = template('courseTpl',data.result);
      $('#courseInfo').html(html);
      // 处理分类的二级联动
      $('#firstType').change(function(){
        $.ajax({
          type : 'get',
          url : '/api/category/child',
          data : {cg_id : $(this).val()},
          dataType : 'json',
          success : function(data){
            var tpl = '<option value="">清选择二级分类</option>'
                      + '{{each list}}'
                      + '<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>'
                      + '{{/each}}';
            var html = template.render(tpl,{list : data.result});
            // var render = template.compile(tpl);
            // var html = render({list : data.result});
            $('#secondType').html(html);
          }
        });
      });
      // 处理富文本
      CKEDITOR.replace('editor');
      // 处理表单提交
      $('#basicForm').validate({
        sendForm : false,
        valid : function(){
          // 处理富文本编辑操作
          for(var instance in CKEDITOR.instances){
            CKEDITOR.instances[instance].updateElement();
          }
          // 提交表单
          $(this).ajaxSubmit({
            type : 'post',
            url : '/api/course/update/basic',
            data : {cs_id : csId},
            success : function(data){
              if(data.code == 200){
                location.href = '/course/picture?cs_id=' + data.result.cs_id + '&type=' + type;
              }
            }
          });
        }
      });
    }
  });
  
  
});