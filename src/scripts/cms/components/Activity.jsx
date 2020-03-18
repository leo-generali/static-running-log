import React from "react";
import { Link } from "react-navi";

const Activity = ({ name, id }) => {
  return (
    <div className="p-4 bg-white rounded shadow">
      <p className="text-bold">{name}</p>
      <Link
        href={`/cms/${id}`}
        className="text-indigo-400  underline hover:text-indigo-600"
      >
        Edit
      </Link>
    </div>
  );
};

export default Activity;
