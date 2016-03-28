import gulp from 'gulp'
import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import source from 'vinyl-source-stream'
import del from 'del'

let isWatch

const scripts = [
  {
    input: ['./src/shifts/index.js'],
    output: 'shifts.js',
    destination: './dist/js'
  },
  {
    input: ['./src/spreadsheet/index.js'],
    output: 'spreadsheet.js',
    destination: './dist/js'
  }
]

const manifest = {
  src: './src/manifest.json',
  dist: './dist'
}

function Defer(max, callback) {
  this.max = max
  this.count = 0
  this.callback = callback

  this.exec = function() {
    if (this.max === ++this.count) {
      this.callback()
    }
  }
}

function bundle(bundler, options) {
  const startTime = new Date().getTime()

  return bundler.bundle()
    .on('error', err => console.log(err))
    .pipe(source(options.output))
    .pipe(gulp.dest(options.destination))
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

gulp.task('watch', done => {
  const d = new Defer(scripts.length, done)
  isWatch = true
  createBundles(scripts, d)
})

gulp.task('manifest', () => {
  gulp
    .src(manifest.src)
    .pipe(gulp.dest(manifest.dist))
})

gulp.task('build', ['manifest', 'scripts'])
gulp.task('clean', () => del(['dist']))
gulp.task('default', ['build'])
