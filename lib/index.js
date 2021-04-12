// 实现这个项目的构建任务

// 引入相关依赖

const { src, dest, parallel, series, watch } = require('gulp')
const del = require('del')
const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
// 创建一个开发服务器
const bs = browserSync.create()

// 获取根目录
const cwd = process.cwd()
let config = {
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'temp',
    public: 'public',
    paths: {
      style: 'assets/styles/*.scss',
      scripts: 'assets/styles/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  }
} // 定义配置文件，这里面可能会有些默认配置

try {
  const loadConfig = require(`${cwd}/page.config.js`) // 获取项目目录中的配置文件
  config = Object.assign({}, config, loadConfig) // 合并config和loadConfig
} catch (err) {
  throw err
}

/* 定义相关构建任务 */

// 定义样式编译任务
const scss = () => {
  return src(config.build.paths.styles, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true })) // 构建任务每次执行后，都reload一次
}

// 定义脚本编译任务
const script = () => {
  return src(config.build.paths.scripts, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true })) // 构建任务每次执行后，都reload一次
}

// 定义html模板编译任务
const html = () => {
  return src(config.build.paths.pages, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.swig({ data: config.data })) // 修改为config中的data
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({ stream: true })) // 构建任务每次执行后，都reload一次
}

// 定义图片编译任务
const image = () => {
  return src(config.build.paths.images, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist))
}

// 定义字体编译任务
const font = () => {
  return src(config.build.paths.fonts, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist))
}

// 定义其他不需要经过编译的任务
const copy = () => {
  return src('**', { base: config.build.public, cwd: config.build.public })
    .pipe(dest(config.build.dist))
}

// 定义清除目录下的文件任务
const clean = () => {
  return del([config.build.dist, config.build.temp])
}

// 清除temp
const cleanTemp = () => {
  return del(config.build.temp)
}

// 初始化开发服务器
const serve = () => {
  // watch监听相关源文件
  watch(config.build.paths.styles, { cwd: config.build.src }, scss)
  watch(config.build.paths.scripts, { cwd: config.build.src }, script)
  watch(config.build.paths.pages, { cwd: config.build.src }, html)
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', copy)
  watch(
    [
      config.build.paths.images,
      config.build.paths.images,
      `${config.build.public}/**`
    ],
    bs.reload
  )

  bs.init({
    notify: false,
    port: 2080,
    // files: 'dist/**',
    server: {
      baseDir: [config.build.dist, config.build.src, config.build.public],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

const useref = () => {
  return src(config.build.paths.pages, { base: config.build.temp, cwd: config.build.temp }) // 读取的是构建后的文件，故是dist下
    .pipe(plugins.useref({ searchPath: [config.build.temp, '.'] })) // 请求的资源路径去哪找
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      collapseWhitespace: true, // 压缩html
      minifyCss: true, // 压缩html文件中的内嵌样式
      minifyJs: true // 压缩html文件中内嵌的js
    })))
    .pipe(dest(config.build.dist))
}

// 因以上任务都是需要编译的任务，且工作过程互相不受影响，故可以并行执行，故将以上5个任务合并成一个并行任务
const compile = parallel(scss, script, html)

// 合并构建任务
const build = series(clean, parallel(series(compile, useref, cleanTemp), copy, image, font))

// 开发构建任务
const develop = series(compile, serve)

// 导出相关任务
module.exports = {
  clean,
  build,
  develop
}
