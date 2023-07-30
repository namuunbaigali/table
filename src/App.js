import "./index.css";
import React, { useState } from "react";
import { BsPatchCheck,BsPatchExclamation } from "react-icons/bs";
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

  const handleCellClick = (rowIndex, colIndex) => {
    const combinedIndex = `${rowIndex}-${colIndex}`;
    console.log("combinedIndex:", combinedIndex);
    if (clickedCells.includes(combinedIndex)) {
      setClickedCells(clickedCells.filter((cell) => cell !== combinedIndex));
    } else {
      setClickedCells([...clickedCells, combinedIndex]);
    }
  };

  const handleColCellClick = (cols, colIndex) => {
    setSelectedColCell(cols);
    console.log("Column index:", colIndex, cols);
  };

  const handleRowCellClick = (rows, rowIndex) => {
    setSelectedRowCell(rows);
    console.log("Row index:", rowIndex, rows);
  };

  return (
    <>
      <div className="max-w-[390px] bg-slate-500 text-center grid grid-cols-11">
        {cols.map((col, colIndex) => {
          return (
            <div
              key={colIndex}
              className={`w-9 h-9 border bg-slate-500 cursor-pointer  rounded ${
                col === selectedColCell ? "bg-red-600" : ""
              }`}
              onClick={() => handleColCellClick(col, colIndex)}
            >
              {col.code}
              {colIndex === 0 && (
                <div className="max-w-[390px] mt-3 bg-slate-500 text-center grid grid-rows-11">
                  {rows.map((row, rowIndex) =>
                    rowIndex >= 0 ? (
                      <div
                        key={rowIndex}
                        className={`w-9 h-9 border bg-slate-500 cursor-pointer  rounded border-r-0 ${
                          row === selectedRowCell ? "bg-red-600" : ""
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
                <div className="max-w-[390px] mt-3 bg-slate-500  grid grid-rows-11">
                  {rows.map((row, rowIndex) =>
                    rowIndex >= 0 ? (
                      <div
                        key={rowIndex}
                        className={`w-9 h-9 border bg-slate-500 cursor-pointer  rounded border-r-0 ${
                          row === selectedRowCell ? "bg-red-600" : ""
                        }`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                      >
                        {clickedCells.includes(`${rowIndex}-${colIndex}`) && (
                          <BsPatchCheck className=" m-auto mt-2" />
                        )}
                        {/* {clickedCells.includes(`${rowIndex}-${colIndex}`) && (
                          <BsPatchExclamation className=" m-auto mt-2" />
                        )} */}
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
