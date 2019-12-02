import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import Account from "./Account";

describe("Account component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/account"]} initialIndex={0}>
        <Route path="/account" render={() => <Account />} />
      </MemoryRouter>
    );
    expect(wrapper.find('.basic')).toHaveLength(1);
  });



});
