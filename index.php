<?php 
  // 后端路由（分发URL请求）
  $pathname = 'index';
  $filename = 'index';

  // var_dump($_SERVER);
  if(isset($_SERVER['PATH_INFO'])){
    // 包含路径
    $urlpath = $_SERVER['PATH_INFO'];
    // 去掉字符串中第一个字符
    $str = substr($urlpath,'1');
    // 分割字符串（和js中split类似）
    $arr = explode('/',$str);
    if(count($arr) == 2){
      // 合理的路径
      $pathname = $arr[0];
      $filename = $arr[1];
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