module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://localhost:8001',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
    // 它支持webPack-dev-server的所有选项
}
