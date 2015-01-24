module.exports = function  (grunt) {
	//Grunt的任务和插件配置在grunt.initConfig()方法中配置
	//此配置主要是以任务名称命名的属性，也可以包含其他任意数据。一旦这些代表任意数据的属性与任务所需要的属性相冲突，就将被忽略。
	//此外，由于这本身就是JavaScript，因此你不仅限于使用JSON；你可以在这里使用任何有效的JavaScript。必要的情况下，你甚至可以以编程的方式生成配置。
	grunt.initConfig({
		concat: {
    		// 这里是concat任务的配置信息。
		},
		uglify: {
    		// 这里是uglify任务的配置信息
		},
  		// 任意数据。
  		my_property: 'whatever',
  		my_src_files: ['foo/*.js', 'bar/*.js'],
	});
	//多任务（multi-task）可以通过任意命名的“目标（target）”来定义多个配置。
	grunt.initConfig({
  		concat: {
    			foo: {
      			// foo目标任务的选项和文件
    			},
   	 		bar: {
      			// bar目标任务的选项和文件
    			},
  		},
  		uglify: {
    			bar: {
      			// bar目标任务的选项和文件
    			},
  		},
	});
	//options属性
	//在一个任务配置中，options属性可以用来指定覆盖内置属性的默认值。
	//此外，每一个目标（target）中还可以拥有一个专门针对此目标（target）的options属性。
	//目标（target）级的平options将会覆盖任务级的options。
	//options对象是可选的，如果不需要，可以忽略。
	grunt.initConfig({
  		concat: {
    			options: {
      			// 这里是任务级的Options，覆盖默认值 
    			},
    			foo: {
      				options: {
        				// "foo" 目标的 options可以设置在这里，覆盖掉顶层任务的options
      				},
    			},
    			bar: {
      			//没有设定options的话就用顶层任务的options
    			},
  		},
	});
	//文件操作
	//由于大多的任务都是执行文件操作，Grunt有一个强大的抽象层用于声明任务应该操作哪些文件。
	//这里有好几种定义src-dest(源文件-目标文件)文件映射的方式，均提供了不同程度的描述和控制操作方式。
	//任何一种多任务（multi-task）都能理解下面的格式，所以你只需要选择满足你需求的格式就行。

	//1.简洁格式
	//这种形式允许每个目标对应一个src-dest文件映射。
	//通常情况下它用于只读任务，比如grunt-contrib-jshint，它就只需要一个单一的src属性，而不需要关联的dest选项. 这种格式还支给每个src-dest文件映射指定额外的属性。
	grunt.initConfig({
  		jshint: {
    			foo: {
      			src: ['src/aa.js', 'src/aaa.js']
    			},
  		},
  		concat: {
    			bar: {
      			src: ['src/bb.js', 'src/bbb.js'],
      			dest: 'dest/b.js',
    			},
  		},
	});

	//2.文件对象格式
	//这种形式支持每个目标对应多个src-dest形式的文件映射，属性名就是目标文件，源文件就是它的值(源文件列表则使用数组格式声明)。
	//可以使用这种方式指定数个src-dest文件映射， 但是不能够给每个映射指定附加的属性。
	grunt.initConfig({
  		concat: {
    			foo: {
      				files: {
        				'dest/a.js': ['src/aa.js', 'src/aaa.js'],
        				'dest/a1.js': ['src/aa1.js', 'src/aaa1.js'],
      				},
    			},
    			bar: {
      				files: {
        				'dest/b.js': ['src/bb.js', 'src/bbb.js'],
        				'dest/b1.js': ['src/bb1.js', 'src/bbb1.js'],
      				},
    			},
  		},
	});
	//3.文件数组格式
	//这种形式支持每个目标对应多个src-dest文件映射，同时也允许每个映射拥有额外属性
	grunt.initConfig({
  		concat: {
    			foo: {
      				files: [
        				{src: ['src/aa.js', 'src/aaa.js'], dest: 'dest/a.js'},
        				{src: ['src/aa1.js', 'src/aaa1.js'], dest: 'dest/a1.js'},
      				],
    			},
    			bar: {
      				files: [
        				{src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', nonull: true},
        				{src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', filter: 'isFile'},
      				],
    			},
  		},
	});
	//所有的文件格式都支持src和dest属性，此外"Compact"[简洁]（上1）和"Files Array"[文件数组]格式（上3）还支持一些额外的属性（因此不建议使用上2）：
	//一些额外的文件属性
	//1.filter
	//它通过接受任意一个有效的fs.Stats方法名（http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats）
	grunt.initConfig({
  		clean: {
    			foo: {
      			src: ['tmp/**/*'],
      			filter: 'isFile',
    			},
  		},
	});
	//或者一个函数来匹配src文件路径并根据匹配结果返回true或者false。
	grunt.initConfig({
  		clean: {
    			foo: {
      			src: ['tmp/**/*'],
      			filter: function(filepath) {
        				return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);
      				},
    			},
  		},
	});
	//2.nonull 如果被设置为 true，未匹配的模式也将执行。结合Grunt的--verbore标志, 这个选项可以帮助用来调试文件路径的问题。
	//3.dot 它允许模式模式匹配句点开头的文件名，即使模式并不明确文件名开头部分是否有句点。
	//4.matchBase如果设置这个属性，缺少斜线的模式(意味着模式中不能使用斜线进行文件路径的匹配)将不会匹配包含在斜线中的文件名。 例如，a?b将匹配/xyz/123/acb但不匹配/xyz/acb/123。
	//5.expand 处理动态的src-dest文件映射，更多的信息请查看动态构建文件对象。
	//6.其他的属性将作为匹配项传递给底层的库。 请查看node-glob 和minimatch 文档以获取更多信息。

	//通配符模式
	//通常分别指定所有源文件路径是不切实际的，因此Grunt通过内置支持node-glob 和 minimatch 库来匹配文件名(又叫作globbing)。
	//* 匹配任意数量的字符，但不匹配 /
	//? 匹配单个字符，但不匹配 /
	//** 匹配任意数量的字符，包括 /，只要它是路径中唯一的一部分
	//{} 允许使用一个逗号分割的“或”表达式列表
	//! 在模式的开头用于排除一个匹配模式所匹配的任何文件
	//每个人都需要知道的是：foo/*.js将匹配位于foo/目录下的所有的.js结尾的文件；而foo/**/*js将匹配foo/目录以及其子目录中所有以.js结尾的文件。
	//此外, 为了简化原本复杂的通配符模式，Grunt允许指定一个数组形式的文件路径或者一个通配符模式。
	//所有模式按顺序处理，模式处理的过程中，带有!前缀的模式所匹配的文件将不包含在结果集中。 而且其结果集中的每一项也是唯一的。

	//例如：
	// 指定单个文件：
	{src: 'foo/this.js', dest: ...}
	// 指定一个文件数组：
	{src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'], dest: ...}
	// 使用一个匹配模式：
	{src: 'foo/th*.js', dest: ...}

	// 一个独立的node-glob模式：
	{src: 'foo/{a,b}*.js', dest: ...}
	// 也可以这样编写：
	{src: ['foo/a*.js', 'foo/b*.js'], dest: ...}

	// foo目录中所有的.js文件，按字母顺序排序：
	{src: ['foo/*.js'], dest: ...}
	// 首先是bar.js，接着是剩下的.js文件，并按字母顺序排序：
	{src: ['foo/bar.js', 'foo/*.js'], dest: ...}

	// 除bar.js之外的所有的.js文件，按字母顺序排序：
	{src: ['foo/*.js', '!foo/bar.js'], dest: ...}
	// 按字母顺序排序的所有.js文件，但是bar.js在最后。
	{src: ['foo/*.js', '!foo/bar.js', 'foo/bar.js'], dest: ...}

	// 模板也可以用于文件路径或者匹配模式中：
	{src: ['src/<%= basename %>.js'], dest: 'build/<%= basename %>.min.js'}
	// 它们也可以引用在配置中定义的其他文件列表：
	{src: ['foo/*.js', '<%= jshint.all.src %>'], dest: ...}

	//动态构建文件对象
	//当你希望处理大量的单个文件时，这里有一些附加的属性可以用来动态的构建一个文件列表。
	//这些属性都可以用于Compact和Files Array文件映射格式。

	//expand 设置为true用于启用下面的选项：

	//cwd 所有src指定的匹配都将相对于此处指定的路径（但不包括此路径） 。
	//src 相对于cwd路径的匹配模式。
	//dest 目标文件路径前缀。
	//ext 对于生成的dest路径中所有实际存在文件，均使用这个属性值替换扩展名。
	//flatten 从生成的dest路径中移除所有的路径部分。
	//rename 对每个匹配的src文件调用这个函数(在重命名后缀和移除路径之后)。dest和匹配的src路径将被作为参数传入，此函数应该返回一个新的dest值。 如果相同的dest返回不止一次，那么，每个返回此值的src来源都将被添加到一个数组中作为源列表。
	//在下面的例子中，uglify 任务中的static_mappings和dynamic_mappings两个目标具有相同的src-dest文件映射列表, 这是因为任务运行时Grunt会自动展开dynamic_mappings文件对象为4个单独的静态src-dest文件映射--假设这4个文件能够找到。
	//可以指定任意静态src-dest和动态的src-dest文件映射相互结合。
	grunt.initConfig({
  		uglify: {
    			static_mappings: {
	      			// 静态文件映射
	      			files: [
	        			{src: 'lib/a.js', dest: 'build/a.min.js'},
				{src: 'lib/b.js', dest: 'build/b.min.js'},
				{src: 'lib/subdir/c.js', dest: 'build/subdir/c.min.js'},
				{src: 'lib/subdir/d.js', dest: 'build/subdir/d.min.js'},
	      			],
    			},
    			dynamic_mappings: {
      				// 动态映射文件与上面相同的作用，但是扩展性更大
      				files: [
        					{
          					expand: true,     // Enable dynamic expansion.
          					cwd: 'lib/',      // Src matches are relative to this path.
          					src: ['**/*.js'], // Actual pattern(s) to match.
          					dest: 'build/',   // Destination path prefix.
          					ext: '.min.js',   // Dest filepaths will have this extension.
        					},
      				],
    			},
  		},
	});

	//模板
	//使用<% %>分隔符指定的模板会在任务从它们的配置中读取相应的数据时将自动扩展扫描。
	//模板会被递归的展开，直到配置中不再存在遗留的模板相关的信息(与模板匹配的)。

	//整个配置对象决定了属性上下文(模板中的属性)。此外，在模板中使用grunt以及它的方法都是有效的，例如： <%= grunt.template.today('yyyy-mm-dd') %>。

	//<%= prop.subprop %> 将会自动展开配置信息中的prop.subprop的值，不管是什么类型。
	//像这样的模板不仅可以用来引用字符串值，还可以引用数组或者其他对象类型的值。
	//<% %> 执行任意内联的JavaScript代码。对于控制流或者循环来说是非常有用的。
	grunt.initConfig({
  		concat: {
    			sample: {
      				options: {
        				banner: '/* <%= baz %> */\n',   // '/* abcde */\n'
      				},
      				src: ['<%= qux %>', 'baz/*.js'],  // [['foo/*.js', 'bar/*.js'], 'baz/*.js']
      				dest: 'build/<%= baz %>.js',      // 'build/abcde.js'
    			},
  		},
  		//用于任务配置模板的任意属性
  		foo: 'c',
  		bar: 'b<%= foo %>d', // 'bcd'
  		baz: 'a<%= bar %>e', // 'abcde'
  		qux: ['foo/*.js', 'bar/*.js'],
	});

	//导入外部数据
	//Grunt有grunt.file.readJSON和grunt.file.readYAML两个方法分别用于引入JSON和YAML数据。
	grunt.initConfig({
  		pkg: grunt.file.readJSON('package.json'),
  		uglify: {
    			options: {
      			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    			},
    			dist: {
      			src: 'src/<%= pkg.name %>.js',
      			dest: 'dist/<%= pkg.name %>.min.js'
    			}
 		 }
	});
}