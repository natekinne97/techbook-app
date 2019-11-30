import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import PostFeed from "./PostFeed";

describe("PostFeed component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/home"]} initialIndex={0}>
        <Route path="/home" render={() => <PostFeed />} />
      </MemoryRouter>
    );
    expect(wrapper.find(".post-feed-page")).toHaveLength(1);
  });
});
