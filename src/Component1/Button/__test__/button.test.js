import React from "react";
import ReactDom from 'react-dom';
import Button from './../Button';
import { isTSAnyKeyword } from '@babel/types';
import { shallow } from 'enzyme'

it('renders without crashing', ()=>{
    const div = document.createElement('div');
    const comp = shallow(<Button label="Click me please"/>)
})

export default Button