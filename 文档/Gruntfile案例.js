module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//concat任务将所有存在于src/目录下以.js结尾的文件合并起来，然后存储在dist目录中，并以项目名来命名。
		concat: {
  			options: {
    				// 定义一个用于插入合并输出文件之间的字符
    				separator: ';'
  			},
  			dist: {
    				// 将要被合并的文件
    				src: ['src/**/*.js'],
    				// 合并后的JS文件的存放位置
    				dest: 'dist/<%= pkg.name %>.js'
  			}
		}

		//配置uglify插件，它的作用是压缩（minify）JavaScript文件
		//这里我们让uglify在dist/目录中创建了一个包含压缩结果的JavaScript文件。注意这里我使用了<%= concat.dist.dest>，因此uglify会自动压缩concat任务中生成的文件。
		uglify: {
  			options: {
    				// 此处定义的banner注释将插入到输出文件的顶部
    				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  			},
  			dist: {
    				files: {
      					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    				}
  			}
		}

		//QUnit插件的设置非常简单。 你只需要给它提供用于测试运行的文件的位置，注意这里的QUnit是运行在HTML文件上的。
		qunit: {
  			files: ['test/**/*.html']
		},

		//JSHint只需要一个文件数组(也就是你需要检测的文件数组)， 然后是一个options对象(这个对象用于重写JSHint提供的默认检测规则)。你可以到JSHint官方文档站点中查看完整的文档。
		jshint: {
  			// 定义被检测的文件
  			files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
  			// 配置JSHint (documented at http://www.jshint.com/docs/)
  			options: {
    				globals: {
      					jQuery: true,
      					console: true,
      					module: true
    				}
 	 		}
		}

		//你可以在命令行使用grunt watch来运行这个任务。当它检测到任何你所指定的文件(在这里我使用了JSHint任务中需要检测的相同的文件)发生变化时，它就会按照你所指定的顺序执行指定的任务(在这里我指定了jshint和qunit任务)。
		watch: {
  			files: ['<%= jshint.files %>'],
  			tasks: ['jshint', 'qunit']
		}
	});

	//最后, 我们还要加载所需要的Grunt插件。 它们应该已经全部通过npm安装好了
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// 在命令行上输入"grunt test"，test task就会被执行。
	grunt.registerTask('test', ['jshint', 'qunit']);

	// 只需在命令行上输入"grunt"，就会执行default task
	grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
}