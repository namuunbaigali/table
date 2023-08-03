import "./index.css";
import React, { useEffect, useState } from "react";
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
  const [displayedOption, setDisplayedOption] = useState([]);
  const [lastClickedCell, setLastClickedCell] = useState(null);

  useEffect(() => {
    setLastClickedCell(
      clickedCells.length > 0 ? clickedCells[clickedCells.length - 1] : null
    );
  }, [clickedCells]);

  console.log("lastClickedCell:", lastClickedCell);

  const handleColCellClick = (cols, colIndex) => {
    setSelectedColCell(cols);
    console.log("Column index:", colIndex, cols);
  };

  const handleRowCellClick = (rows, rowIndex) => {
    setSelectedRowCell(rows);
    console.log("Row index:", rowIndex, rows);
  };
  
  const Select = ({ onChange,value }) => {
    const handleOptionChange = (e) => {
      const selectedOption = e.target.value;
      onChange(selectedOption);
      console.log("selectedOption:::",   e.target.value);
      console.log('selectedOption',selectedOption)
    };
    return (
      <select
        size="4"
        className="bg-gray-50 border  border-gray-300 absolute text-[10px] w-12  z-10 text-gray-900 h-30  rounded focus:ring-blue-500 focus:border-blue-500 block  "
        onChange={handleOptionChange}
        value={value}
      >
        <option value="XfX">XX</option>
        <option value="X">X</option>
        <option value="OO">OO</option>
        <option value="O">O</option>
      </select>
    );
  };

  console.log('displayedOption:',displayedOption)


  const handleCellClick = (rowIndex, colIndex, selectedOption) => {
    const combinedIndex = `${rowIndex}-${colIndex}`;
  
    console.log("handleCellClick:", selectedOption);
    console.log(
      "combinedIndex:",
      combinedIndex,
      "Selected Option:",
      selectedOption
    );
  
    const existingCellIndex = clickedCells.findIndex(
      (cell) => cell.combinedIndex === combinedIndex
    );
  
    if (existingCellIndex !== -1) {
      const updatedCells = [...clickedCells];
    console.log('updatedCells:', updatedCells);

      updatedCells[existingCellIndex].selectedOption = selectedOption;
      setClickedCells(updatedCells);
    } else {
      setClickedCells([...clickedCells, { combinedIndex, selectedOption }]);
    }
    console.log("existingCell ", existingCellIndex);
    console.log('clickedCells:', clickedCells);
    console.log('combinedIndex:', combinedIndex);
  };
  
  const handleDisplayOptionChange = (selectedOption) => {
    console.log("selectedOption:", selectedOption);
    setDisplayedOption(selectedOption);
  };

  return (
    <>
      <div className="relative mx-4 my-3">
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
                                value={
                                  lastClickedCell ? lastClickedCell.selectedOption : ""
                                }
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



