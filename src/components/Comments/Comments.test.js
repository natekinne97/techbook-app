import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import Comments from "./Comments";

describe("Comments component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/home"]} initialIndex={0}>
        <Route path="/home" render={() => <Comments />} />
      </MemoryRouter>
    );
    expect(wrapper.find(".comments-container")).toHaveLength(1);
  });
});
