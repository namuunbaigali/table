import "./index.css";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
const cols = [
  { code: <AiOutlineUser className="m-auto mt-2" /> },
  { code: 99 },
  { code: 98 },
  { code: 97 },
  { code: 96 },
  { code: 95 },
  { code: 94 },
  { code: 93 },
  { code: 92 },
  { code: 91 },
  { code: 90 },
];
const rows = [
  { code: 89 },
  { code: 88 },
  { code: 87 },
  { code: 86 },
  { code: 85 },
  { code: 84 },
  { code: 83 },
  { code: 82 },
  { code: 81 },
  { code: 80 },
];

export default function App() {
  const [selectedColCell, setSelectedColCell] = useState(null);
  const [selectedRowCell, setSelectedRowCell] = useState(null);
  const [clickedCells, setClickedCells] = useState([]);
  const [displayedOption, setDisplayedOption] = useState("");

  const handleColCellClick = (cols, colIndex) => {
    setSelectedColCell(cols);
    console.log("Column index:", colIndex, cols);
  };

  const handleRowCellClick = (rows, rowIndex) => {
    setSelectedRowCell(rows);
    console.log("Row index:", rowIndex, rows);
  };
  const handleCellClick = (rowIndex, colIndex, selectedOption) => {
    const combinedIndex = `${rowIndex}-${colIndex}`;
    console.log("combinedIndex:", combinedIndex, "Selected Option:", selectedOption);
  
    if (clickedCells.length <= 3) {
      const existingCell = clickedCells.find(
        (cell) => cell.combinedIndex === combinedIndex
      );
      console.log("existingCell:", existingCell);
  
      if (existingCell) {
        existingCell.selectedOption = selectedOption;
        setClickedCells([...clickedCells]);
      } else {
        setClickedCells([...clickedCells, { combinedIndex, selectedOption }]);
      }
  
      console.log("clickedCells:", clickedCells);
    } else {
      clickedCells.shift()
    }
  };
  
  const Select = ({ onChange }) => {
    const handleOptionChange = (e) => {
      const selectedOption = e.target.value;
      onChange(selectedOption);
      console.log("selectedOption:::", selectedOption);
    };

    return (
      <select
        size="4"
        className="bg-gray-50 border  border-gray-300 absolute text-[10px] w-14  z-10 text-gray-900 h-30  rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleOptionChange}
        value={displayedOption}
      >
        <option value="XX">XX</option>
        <option value="X">X</option>
        <option value="OO">OO</option>
        <option value="O">O</option>
      </select>
    );
  };

  const handleDisplayOptionChange = (selectedOption) => {
    console.log('displayedOption:',displayedOption)
    setDisplayedOption(selectedOption);
  };

  return (
    <>
      <div className="my-3 mx-4 relative">
        <div className="max-w-[390px] shadow bg-gray-100  text-center grid grid-cols-11">
          {cols.map((col, colIndex) => {
            return (
              <div
                key={colIndex}
                className={`w-9 h-9 border cursor-pointer  rounded ${
                  col === selectedColCell ? "bg-green-400" : ""
                }`}
                onClick={() => handleColCellClick(col, colIndex)}
              >
                {col.code}
                {colIndex === 0 && (
                  <div className="max-w-[390px] bg-gray-100 mt-3 text-center grid grid-rows-11">
                    {rows.map((row, rowIndex) =>
                      rowIndex >= 0 ? (
                        <div
                          key={rowIndex}
                          className={`w-9 h-9 border cursor-pointer  rounded border-r-0 ${
                            row === selectedRowCell ? "bg-green-400" : ""
                          }`}
                          onClick={() => handleRowCellClick(row, rowIndex)}
                        >
                          {row.code}
                        </div>
                      ) : null
                    )}
                  </div>
                )}
                {colIndex > 0 && (
                  <div className="max-w-[390px] mt-3 shadow  grid grid-rows-11">
                    {rows.map((row, rowIndex) =>
                      rowIndex >= 0 ? (
                        <div
                          key={rowIndex}
                          className={`w-9 h-9 border cursor-pointer relative  rounded border-r-0 ${
                            row === selectedRowCell ? "bg-green-200" : ""
                          }`}
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                          {clickedCells.some(
                            (cell) =>
                              cell.combinedIndex === `${rowIndex}-${colIndex}`
                          ) ? (
                            <>
                              {displayedOption}
                              <Select
                                value={displayedOption}
                                onChange={handleDisplayOptionChange}
                              />
                            </>
                          ) : null}
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <span className="absolute top-[430px] flex m-auto">
        <h1 className="ml-5">XX - ............ </h1>
        <h1 className="ml-5">X - ............ </h1>
        <h1 className="ml-5">OO - ............ </h1>
        <h1 className="ml-5">O - ............ </h1>
      </span>
    </>
  );
}
