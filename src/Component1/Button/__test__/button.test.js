import React from "react";
import ReactDom from 'react-dom';
import Button from './../Button';
import { isTSAnyKeyword } from '@babel/types';

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    ReactDom.render(<Button label="Click me please"/>, div)
})

export default Button