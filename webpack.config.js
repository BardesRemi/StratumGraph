const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path              = require('path');
const webpack           = require('webpack');
const htmlPlugin        = require('html-webpack-plugin');
const openBrowserPlugin = require('open-browser-webpack-plugin');
const dashboardPlugin   = require('webpack-dashboard/plugin');
const autoprefixer      = require('autoprefixer');

const PATHS = {
  app: path.join(__dirname, 'src'),
  images:path.join(__dirname,'src/assets/'),
  build: path.join(__dirname, 'docs')
};

const options = {
  host:'129.175.157.111',
  port:'1666'
};

let ws = require("ws");
var fs = require('fs');

let wsServer = new ws.Server({port:9000}) 

wsServer.on('connection', function (myws, req){
  console.log("ws connected")
  //console.log(req);

  myws.on('message', function (msg, type){
    console.log("LE CLIENT ME DIT : "+msg);
    if (msg=='coucou'){
      let idselected =0;
      while (fs.existsSync("expe/expe"+idselected+".json"))
        idselected++;

      myws.send("bonjour " +idselected)
    }else if (msg.slice(0,2)=="[[") {
      console.log(msg)
      let arr = eval(msg.slice(0,msg.indexOf(']]')+2));
      let id  = msg.slice(msg.indexOf(']]')+2)
      console.log(id)

      fs.appendFile('expe/expe'+id+'.json', JSON.stringify(arr, null, 2), function (err) {
        if (err) throw err;
        console.log('Saved!');
      }); 
    }
  })

});

  console.log("server listening")

module.exports = {
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.[hash].js'
  },
  devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host,
      port: options.port
    },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015']
        }
      },
     /* {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss'],
        include:PATHS.app
      },*/
      {
            test:/\.(s*)css$/,
            loader: 'file',
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader','sass-loader']
            })
        },

      {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: '[path][name].[ext]'
        }
      },
    ]
  },
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ]
      }),
    ];
  },
  plugins:[
    new dashboardPlugin(),
    new webpack.HotModuleReplacementPlugin({
        multiStep: true
    }),
    new htmlPlugin({
      template:path.join(PATHS.app,'index.html'),
      inject:'body'
    }),
    /*new openBrowserPlugin({
      url: `http://${options.host}:${options.port}`
    })*/
  ]
};

