import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import GroupsPage from "./GroupsPage";

describe("GroupsPage component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/group/1"]} initialIndex={0}>
        <Route path="/group/1" render={() => <GroupsPage />} />
      </MemoryRouter>
    );
    expect(wrapper.find(".about-container")).toHaveLength(1);
  });
});
