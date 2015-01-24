//任务是Grunt的面包和奶油。就像你常用的工具，如： jshint 或 nodeunit。每当运行Grunt时, 你可以为其指定一个或多个任务, 这些任务用于告诉Grunt你想要它做什么事情。
module.exports = function(grunt) {
  //2. 项目和任务配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  //如果指定了一个任务列表，新任务将是这一个或多个指定任务的别名。当运行此 "任务别名" 时，在 taskList 中指定的每个任务都会按照其出现的顺序依次执行。taskList参数必须时一个任务数组。
  grunt.registerTask(taskName, [description, ] taskList);
  //下面的任务别名案例中定义了一个 'default' 任务，如果运行Grunt时没有指定任何任务，它将自动执行'jshint'、'qunit'、'concat' 和 'uglify' 任务。
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  //还可以给任务指定参数。在下面的案例中，别名 "dist" 将执行 "concat" 和 "uglify" 两个任务，并且它们都带有一个 "dist" 参数：
  grunt.registerTask('dist', ['concat:dist', 'uglify:dist']);

  //多任务
  //如果指定了一个任务列表，新任务将是这一个或多个指定任务的别名。当运行此 "任务别名" 时，在 taskList 中指定的每个任务都会按照其出现的顺序依次执行。taskList参数必须时一个任务数组。
  //大部分的contrib任务(主要是指官方提供的任务)，包括grunt-contrib-jshint插件的jshint任务，以及grunt-contrib-concat插件的concat任务都是多任务形式的。
  grunt.registerMultiTask(taskName, [description, ] taskFunction)

  //多任务例子
  grunt.initConfig({
  log: {
    foo: [1, 2, 3],
    bar: 'hello world',
    baz: false
  }
});

grunt.registerMultiTask('log', 'Log stuff.', function() {
  grunt.log.writeln(this.target + ': ' + this.data);
});

//"基本" 任务
//当一个基本任务执行时，Grunt并不会检查配置和环境 -- 它仅仅执行指定的任务函数，并传递任何使用冒号分割的参数作为函数的参数。
grunt.registerTask(taskName, [description, ] taskFunction)
//下面的案例中，如果执行 grunt foo:testing:123，将输出日志 foo, testing 123。 如果执行这个任务时不传递参数，只是执行 grunt foo，那么将输出日志 foo, no args。
grunt.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
  if (arguments.length === 0) {
    grunt.log.writeln(this.name + ", no args");
  } else {
    grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
  }
});

//自定义任务
//1.在一个任务内部，你可以执行其他的任务。
grunt.registerTask('foo', 'My "foo" task.', function() {
  // Enqueue "bar" and "baz" tasks, to run after "foo" finishes, in-order.
  grunt.task.run('bar', 'baz');
  // Or:
  grunt.task.run(['bar', 'baz']);
});

//2.任务也可以是异步的。
grunt.registerTask('asyncfoo', 'My "asyncfoo" task.', function() {
  // Force task into async mode and grab a handle to the "done" function.
  var done = this.async();
  // Run some sync stuff.
  grunt.log.writeln('Processing task...');
  // And some async stuff.
  setTimeout(function() {
    grunt.log.writeln('All done!');
    done();
  }, 1000);
});

//任务也可以访问它们自身名称和参数。
grunt.registerTask('foo', 'My "foo" task.', function(a, b) {
  grunt.log.writeln(this.name, a, b);
});

//当任务失败时，所有后续任务都将终止，除非指定 --force 。
grunt.registerTask('foo', 'My "foo" task.', function() {
  if (failureOfSomeKind) {
    grunt.log.error('This is an error message.');
  }

  // 如果这个任务出现错误则返回false
  if (ifErrors) { return false; }

  grunt.log.writeln('This is the success message');
});

//任务还可以依赖于其他任务的成功执行。注意 grunt.task.requires 并不会真正的运行其他任务，它仅仅检查其它任务是否已经执行，并且没有失败。
grunt.registerTask('foo', 'My "foo" task.', function() {
  return false;
});
grunt.registerTask('bar', 'My "bar" task.', function() {
  // 如果"foo"任务运行失败或者没有运行则任务失败。
  grunt.task.requires('foo');
  // 如果"foo"任务运行成功则执行这里的代码。
  grunt.log.writeln('Hello, world.');
});
// 用法：
// grunt foo bar
//   没有输出，因为"foo"失败。
// grunt bar
//   没有输出，因为"foo"从未运行。

//如果任务需要的配置属性不存在，其也可能失败。
grunt.registerTask('foo', 'My "foo" task.', function() {
  // 如果缺少"meta.name"配置属性则任务失败。
  grunt.config.requires('meta.name');
  // 如果缺少"mata.name"配置属性则任务同样失败。
  grunt.config.requires(['meta', 'name']);
  // 根据情况记录日志。
  grunt.log.writeln('This will only log if meta.name is defined in the config.');
});

//任务还可以访问配置属性。
grunt.registerTask('foo', 'My "foo" task.', function() {
  // 记录属性值，如果属性未定义（undefined）则返回null。
  grunt.log.writeln('The meta.name property is: ' + grunt.config('meta.name'));
  // 同样的记录属性值，如果属性未定义（undefined）则返回null。
  grunt.log.writeln('The meta.name property is: ' + grunt.config(['meta', 'name']));
});

};