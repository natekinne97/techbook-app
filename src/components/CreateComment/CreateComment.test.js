import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import CreateComment from "./CreateComment";

describe("CreateComment component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/home"]} initialIndex={0}>
        <Route path="/home" render={() => <CreateComment />} />
      </MemoryRouter>
    );
    expect(wrapper.find(".comment-form")).toHaveLength(1);
  });
});
