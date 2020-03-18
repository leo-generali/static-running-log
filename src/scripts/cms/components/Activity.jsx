import React from "react";
import { Link } from "react-navi";

const Activity = ({ name, id }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      {name}
      <Link href={`cms/${id}`}>Edit</Link>
    </div>
  );
};

export default Activity;
