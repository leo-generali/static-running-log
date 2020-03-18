import React from "react";

const ActivityEdit = props => {
  return (
    <section>
      {Object.keys(props).map(key => (
        <h1>{key}</h1>
      ))}
    </section>
  );
};

export default ActivityEdit;
