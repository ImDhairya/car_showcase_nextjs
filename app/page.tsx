import {CarCard, CustomFilter, Hero, SearchBar} from "@/components";
import ShowMore from "@/components/ShowMore";
import {fuels, manufacturers, yearsOfProduction} from "@/constants";
import {fetchCars} from "@/utils";
import Image from "next/image";

export default async function Home({searchParams}) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });

  console.log(allCars);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className=" overflow-hidden">
      <Hero />
      <div
        className=" mt-12 padding-x padding-y max-width"
        id="discover"
      >
        <div className=" home__text-container">
          <h1 className=" text-4xl font-extrabold"> Car Catalogue </h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className=" home__filter">
          <SearchBar />
          <div className=" home__filter-container">
            <CustomFilter
              options={fuels}
              title="fuel"
            />
            <CustomFilter
              options={yearsOfProduction}
              title="year"
            />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            {" "}
            <div className=" home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className=" home__error-container">
            <h2 className=" text-black text-xl font-bold">Opps no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
