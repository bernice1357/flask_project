const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@as': '@/assets',
        '@c': '@/components',
        '@v': '@/views',
        '@l': '@/layout',
        '@img': '@/assets/img',
        '@fonts': '@/assets/fonts',
        '@css': '@/assets/css',
        '@mixins': '@/mixins',
        '@js': '@/assets/js',
        '@api': '@/api',
        '@router': '@/router',
        '@mock': '@/mock',
        '@app': '@/app',
      },
    }
  }
})
