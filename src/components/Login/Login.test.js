import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import Login from "./Login";

describe("Login component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Route path="/" render={() => <Login />} />
      </MemoryRouter>
    );
    expect(wrapper.find(".login-form")).toHaveLength(1);
  });
});
