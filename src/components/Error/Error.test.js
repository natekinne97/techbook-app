import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import Error from "./Error";

describe("Error component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Route path="/" render={() => <Error err="Something went wrong" />} />
      </MemoryRouter>
    );
    expect(wrapper.find(".red")).toHaveLength(1);
  });
});
