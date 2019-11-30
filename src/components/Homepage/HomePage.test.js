import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import HomePage from "./Homepage";

describe("HomePage component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Route path="/" render={() => <HomePage />} />
      </MemoryRouter>
    );
    expect(wrapper.find(".homepage")).toHaveLength(1);
  });
});
