import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import CreateAccount from './CreateAccount';

describe.only('Review form component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CreateAccount />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<CreateAccount />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the UI as expected with no unreads', () => {
        const tree = renderer
            .create(<CreateAccount />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});