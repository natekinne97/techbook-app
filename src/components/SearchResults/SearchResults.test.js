import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { MemoryRouter } from "react-router";
import SearchResults from "./SearchResults";

describe("Post component", () => {
  it("Renders without crashing", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/home"]} initialIndex={0}>
        <Route path="/home" render={() => <SearchResults />} />
      </MemoryRouter>
    );
    expect(wrapper.find(".search-results")).toHaveLength(1);
  });
});
