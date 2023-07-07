import React from "react";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";
import { getVans } from "../../api";
import { requireAuth } from "../../utils";

export async function loader() {
  await requireAuth();
  const data = getVans();
  return data;
}

// BRISEMO:
// 1) Brisemo vans useState zato sto dobijamo podatke iz loadera
// 2) Brisemo error state zato sto cemo ovoj ili parent ruti proslediti error komponentnu
// na koju ce se app rutirati u slucaju greske (mozemo i da ostanemo na istoj ruti i prikazemo gresku ako zelimo)
// 3) Brisemo loading state zato sto se ruta ne menja dok ne dobije sve podatke potrebne komponentama
// 4) Brisemo useEffect jer fetchujemo podatke u loaderu

//DODAJEMO:
// 1) Dodajemo loader funkciju koju eksportujemo. Tu loader funkciju importujemo tamo gde definisemo rutu koja renderuje
// ovu komponentnu i prosledjujemo toj ruti loader prop koji uzima nasu eksportovanu loader funkciju kao vrednost.
// Ta loader funkcija se poziva kada odemo na path rute
// 2) Dodajemo useLoaderData hook, on nam vraca podatke koji su returnovani u nasoj loader funkciji.
// 3) stavljamo podatke koje vraca useLoaderData() u neku varijablu i mozemo da koristimo dalje te vrednosti
export default function Vans() {
  const vans = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  const displayedVans = typeFilter ? vans.filter((van) => van.type === typeFilter) : vans;

  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{
          search: `?${searchParams.toString()}`,
          type: typeFilter,
        }}
      >
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`}
        >
          Rugged
        </button>

        {typeFilter ? (
          <button onClick={() => handleFilterChange("type", null)} className="van-type clear-filters">
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
