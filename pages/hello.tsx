import React, { useState, useEffect, useRef, useMemo } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/Md";
import Image from "next/image";

const Table = ({ columns, wines, input, currentPage, sortNclearColumns }) => {
  const headingRef = useRef();
  const [filter, setFilter] = useState("");
  return (
    <div>
      <h3>Hello</h3>
      <table
        style={{ border: "1px solid black" }}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-gray-50">
          <tr>
            {columns.map(({ heading, label }) => {
              return (
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 hover:text-gray-900 uppercase tracking-wider cursor-pointer topper"
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

        <tbody className="bg-white divide-y divide-gray-200">
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
                            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 availability_row"
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
                            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800
                                                    availability_row_na
                                                    "
                          >
                            Not Available
                          </td>
                        );
                      } else if (column.heading === "name") {
                        return (
                          <td className="name_row" key={column.label}>
                            <img
                              src={wine["thumbnail"]}
                              alt=""
                              width="111"
                              height="166"
                              loading="lazy"
                            />
                            {/* <Image
    //   loader={myLoader}
      src={wine["thumbnail"]}
      alt="Picture of the author"
      width={120}
      height={100}
    />  */}
                            <span
                              className="name_heading
                                                    text-gray-600
                                                    "
                            >
                              {wine[column.heading]}
                            </span>
                          </td>
                        );
                      }

                      return (
                        <td
                          key={wine[column.heading]}
                          className="p-8 text-gray-900 text-gray-600"
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
      </table>
    </div>
  );
};

export default Table;
