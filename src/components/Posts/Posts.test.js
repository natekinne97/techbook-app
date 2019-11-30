import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import Posts from "./Posts";

describe("Post component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/home"]} initialIndex={0}>
        <Route path="/home" render={() => <Posts />} />
      </MemoryRouter>
    );
    expect(wrapper.find(".post-container")).toHaveLength(1);
  });
});
