import React from "react";
import { useCurrentRoute } from "react-navi";

const Activity = () => {
  const route = useCurrentRoute();
  const data = route.data;

  return (
    <section className="grid gap-4 mt-8">
      <h1>{...data}</h1>
    </section>
  );
};

export default Activity;
