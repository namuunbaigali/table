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
console.log('first', cols.code)
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
  const [lastClickedRow, setLastClickedRow] = useState(null);
  const [lastClickedCol, setLastClickedCol] = useState(null);
  

  const countSelectedValues = () => {
    const columnCounts = Array(cols.length)
      .fill(0)
      .map(() => ({ X: 0, O: 0, XX: 0, OO: 0 }));
    const rowCounts = Array(rows.length)
      .fill(0)
      .map(() => ({ X: 0, O: 0, XX: 0, OO: 0 }));

    clickedCells.forEach((cell) => {
      const [rowIndex, colIndex] = cell.combinedIndex.split("-");
      const selectedValue = cell.selectedOption;

      columnCounts[colIndex][selectedValue]++;
      rowCounts[rowIndex][selectedValue]++;
    });

    return { columnCounts, rowCounts };
  };

  useEffect(() => {
    setLastClickedCell(
      clickedCells.length > 0 ? clickedCells[clickedCells.length - 1] : null
    );
  }, [clickedCells]);

  const handleColCellClick = (colIndex) => {
    setSelectedColCell(colIndex);
    setLastClickedCol(colIndex);

    console.log("selectedColCell:", selectedColCell);
  };

  const handleRowCellClick = (rowIndex) => {
    setSelectedRowCell(rowIndex);
    setLastClickedRow(rowIndex);
    console.log("selectedRowCell:", selectedRowCell);
    console.log("lastClickedRow:", lastClickedRow);
  };

  console.log('cdcc', lastClickedCol.code)

  const handleDisplayOptionChange = (selectedOption) => {
    setDisplayedOption(selectedOption);

    setClickedCells((prevClickedCells) => {
      const updatedCells = [...prevClickedCells];
      const lastCellIndex = prevClickedCells.length - 1;
      if (lastCellIndex >= 0) {
        updatedCells[lastCellIndex].selectedOption = selectedOption;
      }
      return updatedCells;
    });
  };

  const Select = ({ onChange, selectedOption }) => {
    const handleOptionChange = (e) => {
      const selectedOption = e.target.value;
      onChange(selectedOption);
    };
    return (
      <select
        size="4"
        className="bg-gray-50 border  border-gray-300 absolute text-[10px] w-12  z-10 text-gray-900 h-30  rounded focus:ring-blue-500 focus:border-blue-500 block  "
        onChange={handleOptionChange}
        value={selectedOption}
      >
        <option value="XX">XX</option>
        <option value="X">X</option>
        <option value="OO">OO</option>
        <option value="O">O</option>
      </select>
    );
  };

  const handleCellClick = (rowIndex, colIndex, selectedOption) => {
    const combinedIndex = `${rowIndex}-${colIndex}`;
    const existingCellIndex = clickedCells.findIndex(
      (cell) => cell.combinedIndex === combinedIndex
    );

    if (existingCellIndex !== -1) {
      setClickedCells((prevClickedCells) => {
        const updatedCells = [...prevClickedCells];
        updatedCells[existingCellIndex].selectedOption = selectedOption;
        return updatedCells;
      });
    } else {
      setClickedCells((prevClickedCells) => [
        ...prevClickedCells,
        { combinedIndex, selectedOption },
      ]);
    }
  };
 
  const { columnCounts, rowCounts } = countSelectedValues();

  return (
    <>
      <div className="relative mx-4 my-3">
        <div className="max-w-[390px] shadow bg-gray-100  text-center grid grid-cols-11">
          {cols.map((col, colIndex) => {
            return (
              <div
                key={colIndex}
                className={`w-9 h-9 border cursor-pointer rounded ${
                  col === selectedColCell ? "bg-green-400" : ""
                }`}
                onClick={() => handleColCellClick(colIndex)}
              >
                {col.code}
                {colIndex === 0 && (
                  <div className="max-w-[390px] bg-gray-100 mt-3 text-center grid grid-rows-11">
                    {rows.map((row, rowIndex) =>
                      rowIndex >= 0 ? (
                        <div
                          key={rowIndex}
                          className={`w-9 h-9 border cursor-pointer rounded border-r-0 ${
                            row === selectedRowCell ? "bg-green-400" : ""
                          }`}
                          onClick={() => handleRowCellClick(rowIndex)}
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
                          className={`w-9 h-9 border cursor-pointer relative rounded border-r-0 ${
                            row === selectedRowCell ? "bg-green-200" : ""
                          }`}
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                          {clickedCells.map((cell, idx) => {
                            if (
                              cell.combinedIndex === `${rowIndex}-${colIndex}`
                            ) {
                              return (
                                <React.Fragment key={idx}>
                                  {cell.selectedOption}
                                  <Select
                                    onChange={handleDisplayOptionChange}
                                    selectedOption={cell.selectedOption}
                                  />
                                </React.Fragment>
                              );
                            }
                            return null;
                          })}
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
      <div className="absolute top-[430px]  m-auto">
        <h1 className="ml-5">{`XX - ${selectedColCell}- ${
          columnCounts[lastClickedCol]?.code || 0
        } ${selectedRowCell} - ${rowCounts[lastClickedRow]?.code || 0}`}</h1>
        <h1 className="ml-5">{`X - ${selectedColCell} - ${
          columnCounts[lastClickedCol]?.code || 0
        } ${selectedRowCell}- ${rowCounts[lastClickedRow]?.code || 0}`}</h1>
        <h1 className="ml-5">{`OO - ${selectedColCell} - ${
          columnCounts[lastClickedCol]?.code || 0
        } ${selectedRowCell}- ${rowCounts[lastClickedRow]?.code || 0}`}</h1>
        <h1 className="ml-5">{`O - ${selectedColCell} - ${
          columnCounts[lastClickedCol]?.code || 0
        } ${selectedRowCell}- ${rowCounts[lastClickedRow]?.O || 0}`}</h1>
      </div>
    </>
  );
}
