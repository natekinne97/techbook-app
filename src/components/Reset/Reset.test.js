import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Reset from './Reset';

describe.only('Review form component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Reset />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders the UI as expected', () => {
        const tree = renderer
            .create(<Reset />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the UI as expected with no unreads', () => {
        const tree = renderer
            .create(<Reset />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});