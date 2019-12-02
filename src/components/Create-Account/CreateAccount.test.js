import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import CreateAccount from './CreateAccount';
import { mount } from 'enzyme';

import { Route, Link } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { render, fireEvent } from '@testing-library/react'

// describe.only('Review form component', () => {
//     it('renders without crashing', () => {
//         const div = document.createElement('div');
//         ReactDOM.render(<CreateAccount />, div);
//         ReactDOM.unmountComponentAtNode(div);
//     });

//     it('renders the UI as expected', () => {
//         const tree = renderer
//             .create(<CreateAccount />)
//             .toJSON();
//         expect(tree).toMatchSnapshot();
//     });

//     it('renders the UI as expected with no unreads', () => {
//         const tree = renderer
//             .create(<CreateAccount />)
//             .toJSON();
//         expect(tree).toMatchSnapshot();
//     });
    
// });

const setup = () => {
    const utils = render(<CreateAccount />)
    const password = utils.getByLabelText('password');
    const repeatPassword = utils.getByLabelText('repeat-password');
   
    return {
        password,
        repeatPassword,
        
        ...utils
    }
   
}

describe.only('Renders errors', ()=>{
    // it('if password doesn\'t match show error message', ()=>{
    //     const {password, repeatPassword, error} = setup();
    //     // change password
    //     fireEvent.change(password, {target: {value: 'blah'}});
    //     // change repeat password
    //     fireEvent.change(repeatPassword, {target: {value: 'blah9999999'}});
    //     // check it was changed
    //     expect(password.value).toBe('blah');
    //     expect(repeatPassword.value).toBe("blah9999999");
    //     // check if error is shown
    //     console.log(error);

    // });

    it.only("if password doesn't match show error message", ()=>{
        const handleChange = sinon.spy();
        const wrapper = mount(<CreateAccount/>);
        const password = wrapper.find('#password').getDOMNode();
        const repeatPassword = wrapper.find("#repeat-password") //.getDOMNode(HTMLInputElement);
      
        wrapper.find('#repeat-password').simulate('change', {target: {name: 'repeat-password',value: "blah"}});
    });
});