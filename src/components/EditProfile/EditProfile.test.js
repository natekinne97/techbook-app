import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import EditProfile from "./EditProfile";

describe("EditProfile component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/edit-profile"]} initialIndex={0}>
        <Route path="/edit-profile" render={() => <EditProfile />} />
      </MemoryRouter>
    );
    expect(wrapper.find(".account-edit")).toHaveLength(1);
  });
});
