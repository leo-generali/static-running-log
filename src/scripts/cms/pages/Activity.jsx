import React from "react";

const Activity = props => {
  return (
    <section>
      {Object.keys(props).map(key => (
        <h1>{key}</h1>
      ))}
    </section>
  );
};

export default Activity;
