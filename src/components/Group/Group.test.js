import React from "react";
import { mount } from "enzyme";
import { Route, Link } from "react-router-dom";
import { MemoryRouter } from "react-router";
import Group from './Group';

describe('Group component', ()=>{
    it('Renders without crashing', ()=>{
        const wrapper = mount(
          <MemoryRouter initialEntries={["/home"]} initialIndex={0}>
            <Route path="/" render={() => <Group />} />
          </MemoryRouter>
        );
       

        expect(wrapper);
        
    });
});