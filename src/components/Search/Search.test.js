import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import Search from "./Search";

describe("Post component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/home"]} initialIndex={0}>
        <Route path="/home" render={() => <Search />} />
      </MemoryRouter>
    );
    expect(wrapper.find("form")).toHaveLength(1);
  });
});
