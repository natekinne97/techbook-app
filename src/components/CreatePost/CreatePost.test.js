import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import CreatePost from "./CreatePost";

describe("CreatePost component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/home"]} initialIndex={0}>
        <Route path="/home" render={() => <CreatePost />} />
      </MemoryRouter>
    );
    expect(wrapper.find(".create-post")).toHaveLength(1);
  });
});
