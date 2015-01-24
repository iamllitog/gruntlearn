//Gruntfile由以下几部分构成：

//1. "wrapper" 函数
//2. 项目与任务配置
//3. 加载grunt插件和任务
//4. 自定义任务

//1. "wrapper" 函数
	//每一份 Gruntfile （和grunt插件）都遵循同样的格式，你所书写的Grunt代码必须放在此函数内：
module.exports = function(grunt) {

//2. 项目和任务配置
  grunt.initConfig({
    //grunt.file.readJSON('package.json') 将存储在package.json文件中的JSON元数据引入到grunt config中。
    pkg: grunt.file.readJSON('package.json'),
    //grunt-contrib-uglify 插件中的uglify 任务要求它的配置被指定在一个同名属性中。在这里有一个例子, 我们指定了一个banner选项(用于在文件顶部生成一个注释)，紧接着是一个单一的名为build的uglify目标，用于将一个js文件压缩为一个目标文件。
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify']);

};