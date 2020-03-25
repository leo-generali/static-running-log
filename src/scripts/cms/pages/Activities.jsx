import React from "react";
import ActivityLink from "../components/ActivityLink";
import { useCurrentRoute } from "react-navi";

const Activities = () => {
  const route = useCurrentRoute();
  const data = route.data;
  const activities = Object.values(data).sort((activityA, activityB) => {
    const dateA = Date.parse(activityA.start_date_local);
    const dateB = Date.parse(activityB.start_date_local);
    return dateB - dateA;
  });

  return (
    <React.Fragment>
      <section className="grid gap-4 grid-cols-2">
        {activities.map(activity => (
          <div
            key={activity.id}
            className="p-4 bg-white rounded shadow col-span-2"
          >
            <ActivityLink {...activity} />
          </div>
        ))}
      </section>
    </React.Fragment>
  );
};

export default Activities;
