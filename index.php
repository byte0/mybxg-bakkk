<?php 
  // 后端路由（分发URL请求）
  $pathname = 'index';//views下面文件夹的名称
  $filename = 'index';//文件夹下面文件名称（不包括文件后缀）

  // var_dump($_SERVER);
  if(isset($_SERVER['PATH_INFO'])){
    // 包含路径 /teacher/list
    $urlpath = $_SERVER['PATH_INFO'];
    // 去掉字符串中第一个字符 teacher/list
    $str = substr($urlpath,'1');
    // 分割字符串（和js中split类似）
    $arr = explode('/',$str);
    if(count($arr) == 2){
      // 合理的路径
      $pathname = $arr[0];
      $filename = $arr[1];
    }else{
      $filename = 'login';
    }
  }else{
    // 不包含路径
    $filename = 'login';
  }
  
  // 根据路由导航页面
  // $urlpath = '/teacher/list';


  // ./views/teacher/list.html
  // ./views/teacher/add.html
  // ./views/course/list.html
  // 把参数指定的URL对应的文件内容嵌入到当前位置
  include('./views/'.$pathname.'/'.$filename.'.html');
 ?>