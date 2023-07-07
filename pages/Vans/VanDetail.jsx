import React from "react";
import { Link, useLocation, useLoaderData } from "react-router-dom";
import { requireAuth } from "../../utils";

export const loader = async ({ params }) => {
  await requireAuth();
  const response = await fetch(`/api/vans/${params.id}`);
  const data = await response.json();
  return data.vans;
};

export default function VanDetail() {
  const location = useLocation();
  const van = useLoaderData();

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>

      <div className="van-detail">
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          <span>${van.price}</span>/day
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
    </div>
  );
}
