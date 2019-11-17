import React from 'react';

import {mount} from 'enzyme';
import {Route, Link} from 'react-router-dom';
import {MemoryRouter} from 'react-router';
import PrivateRoute from '../../routes/private';
import Menu from './Menu';

import Search from '../Search/Search';

describe.only('Menu component', ()=>{
    
    it('renders without crashing', () => {
        const wrapper = mount(
          <MemoryRouter initialEntries={["/"]} initialIndex={0}>
            <Route path="/" render={() => <Menu />} />
          </MemoryRouter>
        );
        
        expect(wrapper.find(<li></li>));
        expect(wrapper.find(Search)).toHaveLength(1);
        expect(
          wrapper.find(
            <li>
              <Link to="/">Logout</Link>
            </li>
          )
        );
    });

    // checks if items are loaded 
    it('doesnt render the burger component when not logged in', ()=>{
         const wrapper = mount(
           <MemoryRouter initialEntries={["/"]} initialIndex={0}>
             <Route path="/" render={() => <Menu />} />
           </MemoryRouter>
         );
            
         expect(wrapper.find(".mobile-menu-items")).toHaveLength(0);
         expect(wrapper.find(".desktop-menu-items")).toHaveLength(0);

    });

    it("doesnt render the burger component when not logged in", () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={["/"]} initialIndex={0}>
            <PrivateRoute path='/home' component={Menu}/>
        </MemoryRouter>
      );
      expect(wrapper.find(".mobile-menu-items")).toHaveLength(0);
      expect(wrapper.find(".desktop-menu-items")).toHaveLength(0);
    });

});