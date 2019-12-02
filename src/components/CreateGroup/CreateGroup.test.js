import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import CreateGroup from "./CreateGroup";

describe("CreateGroup component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/create-group"]} initialIndex={0}>
        <Route path="/create-group" render={() => <CreateGroup />} />
      </MemoryRouter>
    );
    expect(wrapper.find(".group-container")).toHaveLength(1);
  });
});
