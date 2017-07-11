require.config({
  baseUrl : '/public/assets',
  paths : {
    jquery : 'jquery/jquery.min',
    template : 'artTemplate/template-web',
    cookie : 'jquery-cookie/jquery.cookie',
    bootstrap : 'bootstrap/js/bootstrap.min',
    common : '../js/common',
    login : '../js/login',
    teacher_list : '../js/teacher-list',
    teacher_add : '../js/teacher-add',
    util : '../js/util'
  },
  shim : {
    bootstrap : {
      deps : ['jquery']
    }
  }
});