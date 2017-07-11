require.config({
  baseUrl : '/public/assets',
  paths : {
    jquery : 'jquery/jquery.min',
    template : 'artTemplate/template-web',
    cookie : 'jquery-cookie/jquery.cookie',
    bootstrap : 'bootstrap/js/bootstrap.min',
    datepicker : 'bootstrap-datepicker/js/bootstrap-datepicker.min',
    language : 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
    validate : 'validate/jquery-validate.min',
    form : 'jquery-form/jquery.form',
    common : '../js/common',
    login : '../js/login',
    teacher_list : '../js/teacher-list',
    teacher_add : '../js/teacher-add',
    util : '../js/util',
    index : '../js/index'
  },
  shim : {
    bootstrap : {
      deps : ['jquery']
    },
    language : {
      deps : ['jquery','datepicker']
    },
    validate : {
      deps : ['jquery']
    }
  }
});