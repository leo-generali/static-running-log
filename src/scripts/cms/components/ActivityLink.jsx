import React from "react";
import { Link } from "react-navi";

const ActivityLink = ({ name, id }) => {
  return (
    <React.Fragment>
      <p className="text-bold">{name}</p>
      <Link
        href={`/cms/${id}`}
        className="text-indigo-400  underline hover:text-indigo-600"
      >
        Edit
      </Link>
    </React.Fragment>
  );
};

export default ActivityLink;
