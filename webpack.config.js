const path=require('path');
const HtmlWebpackPlugin= require('html-webpack-plugin');

module.exports={
    mode:'development',
    entry:{
        bundle:path.resolve(__dirname,'src/js/index.js')
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        assetModuleFilename: 'images/[hash][ext][query]',
    },
    devServer:{
        static:path.resolve(__dirname,'dist'),
        port:3000,
        open:true,
        hot:true
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template: path.resolve(__dirname,'src/indexTemplate.html')
        })
    ]
}