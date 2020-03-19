import React from "react";
import Activity from "../components/Activity";
import { useCurrentRoute } from "react-navi";

const scrapeDataFromStrava = () => {
  console.log("scraping data");
};

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
      <section className="grid gap-4 mt-8 grid-cols-2">
        <div className="p-4 bg-white rounded shadow">
          <div className="flex items-center">
            <button
              onClick={scrapeDataFromStrava}
              className="py-1 px-2 bg-strava text-white rounded transition duration-100 hover:bg-orange-700 "
            >
              Update Data
            </button>
            <p className="ml-auto">Get latest info from Strava</p>
          </div>
        </div>
        {activities.map(activity => (
          <div
            key={activity.id}
            className="p-4 bg-white rounded shadow col-span-2"
          >
            <Activity {...activity} />
          </div>
        ))}
      </section>
    </React.Fragment>
  );
};

export default Activities;
