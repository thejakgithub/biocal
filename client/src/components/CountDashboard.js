import React from "react";

export default function CountDashboard({title,count}) {
  return (
    <>
      <div
        className="alert alert-primary  text-center fs-5"
        style={{ width: "15rem", height: "5.5rem" }}
      >
        {title}<p>{count}</p>
      </div>
    </>
  );
}
