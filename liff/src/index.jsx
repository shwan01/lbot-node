import React from 'react';
import {render} from 'react-dom';
import App from './app';


/**
 * webpackのエントリーポイント
 */
render(
    <App/>,
    document.getElementById('app')
);