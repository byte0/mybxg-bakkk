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
    uploadify : 'uploadify/jquery.uploadify.min',
    region : 'jquery-region/jquery.region',
    editor : 'ckeditor/ckeditor',
    jcrop : 'jcrop/js/Jcrop',
    nprogress : 'nprogress/nprogress',
    common : '../js/common',
    login : '../js/login',
    teacher_list : '../js/teacher-list',
    teacher_add : '../js/teacher-add',
    util : '../js/util',
    index : '../js/index',
    settings : '../js/settings',
    course_list : '../js/course-list',
    course_add : '../js/course-add',
    course_basic : '../js/course-basic',
    course_pic : '../js/course-pic',
    course_lesson : '../js/course-lesson'
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
    },
    uploadify : {
      deps : ['jquery']
    },
    editor : {
      exports : 'CKEDITOR'
    },
    jcrop : {
      deps : ['jquery']
    }
  }
});