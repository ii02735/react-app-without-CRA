const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    /**
     * Il s'agit du fichier d'entrée de l'application, qui doit contenir toutes les importations
     * de nos dépendances / bundles, qui sera ensuite transpilé par webpack.
     *
     * Soit en l'occurrence ici, notre fichier principal contenant notre code JSX.
     *
     * Dans un temps normal, hors-React, nous aurions rédigé les instructions suivantes :
     *
     * const <module> = require('module')
     */

    entry: './src/index.js',

    // Nous devons préciser comment doit être généré les fichiers qui utilisent des bundles (pour une PRODUCTION -> production build)
    output: {
        path: path.join(__dirname, '/dist'), // endroit où le fichier devra être transpilé
        filename: 'bundle.js', // sera le nom du fichier transpilé

    },
    // Informer à webpack, qu'il faudra injecter le fichier bundle.js dans un fichier index.html (ajout d'une instruction <script src...>)
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],

    // On demande à Webpack, quel loader utiliser (quel transpilateur)
    module: {
        rules: [
            {
                test: /.(js|jsx)$/, // n'accepter que les fichiers JS et JSX
                exclude: /node_modules/, // ignorer le dossier node_modules
                use: { // on précise quel loader utiliser
                    loader: 'babel-loader',
                    // On souhaite que Babel puisse accepter dans sa transpilation, la plus récente version de JS (preset-env), et comprendre le JSX (preset-react)
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    }
}

