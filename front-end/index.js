import React from 'react';
import { render } from 'react-dom';
import './styles.scss';
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
    render(<App />, document.getElementById('root'));
});
