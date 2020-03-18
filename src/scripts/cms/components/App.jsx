import React from "react";
import { Router, View } from "react-navi";
import { mount, route } from "navi";

import activities from "../../../../db/activities";
import Activities from "../pages/Activities";
import ActivityEdit from "../pages/ActivityEdit";

const routes = mount({
  "/cms/": route({
    getData: () => activities,
    view: <Activities />
  }),

  "/cms/:id": route(req => {
    const { id } = req.params;
    const activity = activities.find(activity => activity.id == id);

    return {
      view: <ActivityEdit {...activity} />
    };
  })
});

const App = () => {
  return (
    <Router routes={routes}>
      <View />
    </Router>
  );
};

export default App;
