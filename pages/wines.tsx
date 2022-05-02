import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { stringifyQuery } from "next/dist/server/server-route-utils";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { dataFetcher, sortColumns } from "../src/utils/helperFunctions";
import { winesList } from "../src/utils/types";
import Table from "../src/components/Table"
import Pagination from "../src/components/Pagination"
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/Fa";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/Md";

const Wines: NextPage<{ winesList: winesList[] }> = ({ winesList }) => {
  const [wines, setwines] = useState(winesList);
  const [filter, setFilter] = useState("");
  const [input, setInput] = useState("");
  //   const [isSSR, setIsSSR] = useState(true);
  const [currentPage, setcurrentPage] = useState(1);
  const headingRef = useRef();
  let wineLength = useMemo(() => wines.length, [wines]);
  let totalPages = useMemo(() => Math.ceil(wineLength / 3), [wines.length]);

  const columns = [
    { heading: "sku", label: "SKU" },
    { heading: "name", label: "Name" },
    { heading: "price", label: "CA$" },
    { heading: "available", label: "Availability", truthy: true },
  ];

  /**************** #fetchdata-> fetch data on initial render ********************/
  //   useEffect(() => {
  //     (async () => {
  //       let data = await dataFetcher("http://localhost:3000/api/wines");
  //       setwines(data);
  //     })();
  //   }, []);

  //   useEffect(() => {
  //     setIsSSR(false);
  //   }, []);

  const searchWines = (e) => {
    // console.log(inputRef.current.value)
    setInput(e.target.value);
  };

  const sortNclearColumns = (heading: string, str: string) => {
    sortColumns(wines, heading, str);
    setcurrentPage(1);
  };

  return (
    <div>
      <h3>Wines</h3>
      <div className="p-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
            onChange={searchWines}
          />
        </div>
      </div>

      {/* <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            {columns.map(({ heading, label }) => {
              return (
                <th
                  className="topper"
                  ref={headingRef}
                  key={heading}
                  style={{
                    border: "1px solid black",
                    padding: "10px 60px",
                  }}
                >
                  <span
                    onClick={() => {
                      sortNclearColumns(heading, "asc");
                      setFilter(`${heading}-asc`);
                    }}
                    style={{ cursor: "pointer" }}
                    className={`${
                      filter === `${heading}-asc`
                        ? filter
                        : `${heading}-inactive`
                    }`}
                  >
                    <MdArrowDropUp />
                  </span>
                  <span
                    onClick={() => {
                      sortNclearColumns(heading, "desc");
                      setFilter(`${heading}-desc`);
                    }}
                    style={{ cursor: "pointer" }}
                    className={`${
                      filter === `${heading}-desc`
                        ? filter
                        : `${heading}-inactive`
                    }`}
                  >
                    <MdArrowDropDown />
                  </span>
                  &nbsp;
                  {label}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {wines.length > 0 &&
            wines
              .filter((wine) => {
                if (wine === "") {
                  return wine;
                } else if (
                  wine.name
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .includes(input)
                ) {
                  // console.log(wine.name)

                  return wine;
                }
              })
              .slice((currentPage - 1) * 3, currentPage * 3)
              .map((wine) => {
                return (
                  <tr key={wine.sku}>
                    {columns.map((column, i) => {
                      if (column.truthy) {
                        return wine[column.heading] ? (
                          <td
                            key={wine[column.heading]}
                            style={{
                              border: "1px solid black",
                              padding: "10px 40px",
                            }}
                          >
                            Available
                          </td>
                        ) : (
                          <td
                            key={wine[column.heading]}
                            style={{
                              border: "1px solid black",
                              padding: "10px 40px",
                            }}
                          >
                            Not Available
                          </td>
                        );
                      }

                      return (
                        <td
                          key={wine[column.heading]}
                          style={{
                            border: "1px solid black",
                            padding: "10px 40px",
                          }}
                        >
                          {wine[column.heading]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
        </tbody>
      </table> */}
      <Table columns={columns} wines={wines} currentPage={currentPage} input={input} sortNclearColumns={sortNclearColumns} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        wineLength={wineLength}
        setcurrentPage={setcurrentPage}
       />
      {/* <div className="buttons">
        <button disabled={currentPage === 1} onClick={() => setcurrentPage(1)}>
          First
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => {
            setcurrentPage(currentPage > 1 ? currentPage - 1 : 1);
          }}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setcurrentPage(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
        >
          Next
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setcurrentPage(totalPages)}
        >
          Last
        </button>
      </div>

      <p>
        Pages {currentPage} of {totalPages}
      </p> */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // interface winesList {
  //     sku: number;
  //     name: string;
  //     price: number;
  //     available: boolean;
  //     thumbnail: string
  // }

  // const dataFetcher = async (url:string) => {
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     return data;
  // }

  let winesList: winesList[] = await dataFetcher(
    "http://localhost:3000/api/wines"
  );

  return {
    props: {
      winesList,
    },
  };
};

export default Wines;
