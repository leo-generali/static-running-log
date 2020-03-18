import React from "react";
import Activity from "../components/Activity";
import { useCurrentRoute } from "react-navi";

const Activities = () => {
  const route = useCurrentRoute();
  const data = route.data;
  const activities = Object.values(data).sort((activityA, activityB) => {
    const dateA = Date.parse(activityA.start_date_local);
    const dateB = Date.parse(activityA.start_date_local);
    return dateA - dateB;
  });

  return (
    <section className="grid gap-4 mt-8">
      {activities.map(activity => (
        <Activity key={activity.id} {...activity} />
      ))}
    </section>
  );
};

export default Activities;
