import gulp from 'gulp'
import gutil from 'gulp-util'
import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import source from 'vinyl-source-stream'
import eslint from 'gulp-eslint'
import del from 'del'

let isWatch

const scripts = [
  {
    input: ['./src/popup/popup.js'],
    output: 'popup.js',
    dest: './dist/popup'
  },
  {
    input: ['./src/shifts/index.js'],
    output: 'shifts.js',
    dest: './dist/js'
  },
  {
    input: ['./src/spreadsheet/index.js'],
    output: 'spreadsheet.js',
    dest: './dist/js'
  }
]

const manifest = {
  src: './src/manifest.json',
  dest: './dist'
}

const popup = {
  html: {
    src: './src/popup/popup.html',
    dest: './dist/popup'
  },
  css: {
    src: './src/popup/popup.css',
    dest: './dist/popup'
  }
}

function printError(err) {
  gutil.log(gutil.colors.red(err.name))
  console.error(err.stack)
  this.emit('end')
}

function Defer(max, callback) {
  this.max = max
  this.count = 0
  this.callback = callback

  this.exec = () => {
    if (this.max === ++this.count) {
      this.callback()
    }
  }
}

function bundle(bundler, options) {
  const startTime = new Date().getTime()

  return bundler.bundle()
    .on('error', printError)
    .pipe(source(options.output))
    .pipe(gulp.dest(options.dest))
    .on('end', () => {
      const time = (new Date().getTime() - startTime) / 1000
      console.log(`${options.output} was browserified in ${time}s`)
    })
}

function createBundleProp(b, options) {
  const bundler = b

  for (let i = 0; i < options.input.length; i++) {
    if (options.require) {
      bundler.require(options.input[i].require, {
        expose: options.input[i].expose
      })
    }

    else {
      bundler.add(options.input[i])
    }
  }

  return bundler
}

function createBundle(options, d) {
  let bundler = browserify({
    transform: [[babelify, {}]],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: false
  })

  bundler = createBundleProp(bundler, options)

  if (isWatch) {
    bundler = watchify(bundler)
    bundler.on('update', () => {
      bundle(bundler, options)
    })
  }

  return bundle(bundler, options)
}

function createBundles(bundles, defer) {
  bundles.forEach(bundle => {
    createBundle(bundle).on('end', () => {
      defer.exec()
    })
  })
}

gulp.task('scripts', done => {
  const d = new Defer(scripts.length, done)
  isWatch = false
  createBundles(scripts, d)
})

gulp.task('watch-scripts', done => {
  const d = new Defer(scripts.length, done)
  isWatch = true
  createBundles(scripts, d)
})

gulp.task('manifest', () => {
  gulp
    .src(manifest.src)
    .pipe(gulp.dest(manifest.dest))
})

gulp.task('watch-manifest', () => {
  gulp.watch(manifest.src, ['manifest'])
})

gulp.task('popup', () => {
  gulp
    .src(popup.html.src)
    .pipe(gulp.dest(popup.html.dest))

  gulp
    .src(popup.css.src)
    .pipe(gulp.dest(popup.css.dest))
})

gulp.task('watch-popup', () => {
  gulp.watch(popup.html.src, ['popup'])
  gulp.watch(popup.css.src, ['popup'])
})

gulp.task('lint', () => (
  gulp
    .src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
))

gulp.task('watch-lint', () => {
  gulp.watch(['src/**/*.js', '!node_modules/**', '!**/assets/**'], ['lint'])
})

gulp.task('clean', () => del(['dist']))
gulp.task('build', ['popup', 'manifest', 'lint', 'scripts'])
gulp.task('watch', ['watch-popup', 'watch-manifest', 'watch-lint', 'watch-scripts'])
gulp.task('default', ['build'])
