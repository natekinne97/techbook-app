import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import Friends from "./Friends";

describe("Friends component", () => {
    it("Renders without crashing", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/Account"]} initialIndex={0}>
                <Route path="/home" render={() => <Friends />} />
            </MemoryRouter>
        );
        expect(wrapper.find(".friends")).toHaveLength(1);
    });
});