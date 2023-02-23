# Création d'une application React sans Create React App (CRA)

Rappel : Create React App est une CLI de Facebook / Meta permettant de créer une application React en un **minimum d'étapes**.

L'avantage permet d'obtenir une application opérationnelle rapidement.

**Les désavantages :**

- Compliqué de mettre en place un build custom
- Utilise de l'abstraction, ce qui peut être complexe

Le **principal avantage** de ne pas passer par CRA, c'est de **mieux maîtriser les composants qu'on utilise**.


# Les dépendances nécessaires pour créer une application React

- React
- React-Dom : permet de faire la relation entre *React* et le ***DOM*** (rappel : effectue une représentation sous une arboresence d'un document HTML)

- Babel : permet de transpiler du ES6 / ECMA Script 2015 (et +) en un code plus compatible avec les navigateurs

- Webpack : qui permet de centraliser les bundles que nous allons utiliser (important pour Babel). Il va invoquer plusieurs bundles, pour produire ensuite des fichiers codifiés.

- Babel-loader : il s'agit d'un loader de babel. Soit une dépendance spéciale qui permet de dicter à webpack, comment utiliser le transpilateur Babel des **types de fichiers pour ensuite les transpiler en d'autres formats**. Il est possible d'utiliser Babel manuellement, mais l'intérêt d'utiliser Webpack, permet de simplifier cette gestion.

Il existe d'autres loaders :

- sass-loader : conversion de sass en css
- etc. 

## Les commandes

```
npm i react
npm i react-dom

npm i -D webpack
npm i -D webpack-cli # permet de manipuler plus facilement webpack
npm i -D webpack-dev-server # permet d'obtenir un CLI permettant d'exécuter un serveur de développement (live-reload)

npm i -D @babel/core # le noyau du transpilateur Babel
npm i -D babel-loader

npm i -D @babel/preset-react # permet à Babel d'interpréter pour ensuite transpiler du JSX

npm i -D @babel/preset-env # permet d'utiliser la dernière version de JS

npm i -D html-webpack-plugin # simplifie l'ajout de nos bundles de webpack, dans notre fichier index.html

### Créer le fichier de configuration webpack

Le fichier de configuration de webpack explique justement comment webpack doit fonctionner.

```sh
touch webpack.config.js
```

Le fichier doit **exporter un module** : 

```js

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
```

Il faut créer des fichiers  :

- Fichier index.html

```sh
touch src/index.html
```

- Fichier index.js : 

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

- Fichier App.jsx

```jsx
import React, { Component } from 'react';

class App extends Component {
     
    render() {
       
       return (
       	   <div>
       	       <h1>Hello world!</h1>
       	   </div>
       )
    }
}

export default App;
```

- Modifier le fichier package.json, pour demander à `webpack-dev-server` de se lancer.
  - `--open` : permet de préciser qu'on souhaite **ouvrir un nouvel onglet**.
  - `--hot`  : permet de déplacer des modules si nécessaire, sans redémarrer toute l'application

```json
{
  "scripts": {
    "start": "webpack-dev-server --mode development --open --hot"
  } 
}
```

- Pour le passage en **production** : 
Rappel, c'est cette commande qui va remplir le dossier `dist` que nous avons précisé en `output` dans `webpack.config.js`.

```json
{
  "scripts": {
    "start": "webpack-dev-server --mode development --open --hot",
    "build": "webpack --mode production"
  } 
}
```
