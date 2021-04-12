#!/usr/bin/env node

process.argv.push('--gulpfile')
process.argv.push(require.resolve('../lib/index.js')) // 告知以相对当前文件的路径去查找gulpfile.js文件
process.argv.push('--cwd')
process.argv.push(process.cwd())
// 引入命令文件
const cli = require('gulp/bin/gulp.js')
// 执行命令文件
cli()
