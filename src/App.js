import "./index.css";
import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GoTriangleRight } from "react-icons/go";

const cols = [
  { code: "№" },
  // { code: <AiOutlineCheckCircle className="m-auto mt-2" /> },
  { code: 1 },
  { code: 2 },
  { code: 3 },
  { code: 4 },
  { code: 5 },
  { code: 6 },
  { code: 7 },
  { code: 8 },
  { code: 9 },
  { code: 10 },{ code: 11 },{ code: 12 },{ code: 13 },{ code: 14 },{ code: 15 },{ code: 16 },{ code: 17 },{ code: 18 },{ code:19  },{ code:20 },
];
const rows = [
  { code: 11 },
  { code: 12 },
  { code: 13 },
  { code: 14 },
  { code: 15 },
  { code: 16 },
  { code: 17 },
  { code: 18 },
  { code: 19 },
  { code: 20 },{ code: 21 },{ code: 22 },{ code: 23 },{ code: 24 },{ code: 25 },{ code: 26 },{ code: 27 },{ code: 28 },{ code:29  },{ code:30 },
];

const values = [
  { name: "Харилцан түдгэлзэл тэмдэг", label: "ii", countKey: "ii" },
  { name: "Дан түдгэлзэл", label: "i", countKey: "i" },
  { name: "Харилцан татгалзал тэмдэг", label: "XX", countKey: "XX" },
  { name: "Дан татгалзал", label: "X", countKey: "X" },
  { name: "Харилцан сонголтын тэмдэг", label: "OO", countKey: "OO" },
  { name: "Дан сонголт", label: "O", countKey: "O" },
];

export default function App() {
  const [selectedColCell, setSelectedColCell] = useState(null);
  const [selectedRowCell, setSelectedRowCell] = useState(null);
  const [clickedCells, setClickedCells] = useState([]);
  const [displayedOption, setDisplayedOption] = useState([]);
  const [lastClickedCell, setLastClickedCell] = useState(null);
  const [lastClickedRow, setLastClickedRow] = useState(null);
  const [lastClickedCol, setLastClickedCol] = useState(null);
  const [clickedCellIndex, setClickedCellIndex] = useState(null);

  const countSelectedValues = () => {
    const columnCounts = Array(cols.length)
      .fill(0)
      .map(() => ({ X: 0, O: 0, XX: 0, OO: 0,ii:0,i:0 }));
    const rowCounts = Array(rows.length)
      .fill(0)
      .map(() => ({ X: 0, O: 0, XX: 0, OO: 0,ii:0,i:0  }));

    clickedCells.forEach((cell) => {
      const [rowIndex, colIndex] = cell.combinedIndex.split("-");
      const selectedValue = cell.selectedOption;

      if (
        rowIndex >= 0 &&
        rowIndex < rows.length &&
        colIndex >= 0 &&
        colIndex < cols.length
      ) {
        if (columnCounts[colIndex][selectedValue] !== colIndex) {
          columnCounts[colIndex][selectedValue]++;
        }
        if (rowCounts[rowIndex][selectedValue] !== rowIndex) {
          rowCounts[rowIndex][selectedValue]++;
        }
      }
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

  };

  const handleRowCellClick = (rowIndex) => {
    setSelectedRowCell(rowIndex);
    setLastClickedRow(rowIndex);
    setLastClickedCol(selectedColCell);
  };

  
  const handleDisplayOptionChange = (selectedOption) => {
    setDisplayedOption(selectedOption);
  
    setClickedCells((prevClickedCells) => {
      const updatedCells = [...prevClickedCells];
      const lastCellIndex = prevClickedCells.length - 1;
      if (lastCellIndex >= 0) {
        updatedCells[lastCellIndex].selectedOption = selectedOption;
  
        updatedCells[lastCellIndex].selectedOptionClass = `bg-${selectedOption}`;
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
      <div>
        <select
          size="6"
          className={`bg-gray-50 border border-gray-300 absolute text-[10px] w-16 z-10 text-center text-gray-900 h-24 rounded focus:ring-blue-500 focus:border-blue-500 block ${
            selectedOption ? "hidden" : ""
          }`}
          onChange={handleOptionChange}
          value={selectedOption}
          disabled={selectedOption}
        >
          <option value=" " className="bg-gray-200"> </option>
          <option value="ii">ii</option>
          <option value="i">i</option>
          <option value="XX">XX</option>
          <option value="X">X</option>
          <option value="OO">OO</option>
          <option value="O">O</option>
        </select>
      </div>
    );
  };

  const handleCellClick = (rowIndex, colIndex, selectedOption) => {
    const combinedIndex = `${rowIndex}-${colIndex}`;

    setClickedCellIndex(combinedIndex);

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
        <table className="max-w-[800px] shadow bg-gray-100 text-center">
          <thead>
            <tr>
              {cols.map((col, colIndex) => (
                <th
                  key={colIndex}
                  className={`w-9 h-9 border cursor-pointer rounded ${
                    col === selectedColCell ? "bg-green-400" : ""
                  } ${colIndex === lastClickedCol ? "bg-blue-200" : ""}`}
                  onClick={() => handleColCellClick(colIndex)}
                >
                  {col.code}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {cols.map((col, colIndex) => {
                  if (colIndex === 0) {
                    return (
                      <td
                        key={colIndex}
                        className={`w-9 h-9 border cursor-pointer rounded ${
                          row === selectedRowCell ? "bg-green-400" : ""
                        } ${rowIndex === lastClickedRow ? "bg-blue-200" : ""}`}
                        onClick={() => handleRowCellClick(rowIndex)}
                      >
                        {row.code}
                      </td>
                    );
                  } else {
                    return (
                      <td
                      key={colIndex}
                      className={`w-9 h-9 border cursor-pointer relative rounded border-r-0 ${
                        row === selectedRowCell ? "bg-green-200" : ""
                      } ${`${rowIndex}-${colIndex}` === clickedCellIndex ? "bg-gray-300" : ""} ${
                        clickedCells.find((cell) => cell.combinedIndex === `${rowIndex}-${colIndex}`)
                          ?.selectedOptionClass || ""
                      }`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    >
                      {clickedCells.map((cell, idx) => {
                        if (cell.combinedIndex === `${rowIndex}-${colIndex}`) {
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
                    </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute top-[780px] m-auto ">
        <>
          {values.map((item, index) => (
            <h1 key={index} className="ml-4  flex my-3 ">
              <p className="border text-gray-900 rounded-lg p-2 flex">
                {item.name}
                {"   "}
                <p className="text-red-600 pl-3">{item.label}</p>
              </p>
              <GoTriangleRight className="my-3" />
              <div className="border rounded-lg  p-2 ">
                <span className="text-red-600">
                  {cols[lastClickedCol]?.code}
                </span>
                {`: `}
                <span className="column-count">
                  {columnCounts[lastClickedCol]?.[item.countKey] || 0}
                </span>
                {` `}
              </div>

              <div className="border p-2 rounded-lg ">
                <span className="text-red-600">
                  {rows[selectedRowCell]?.code}
                </span>
                {`: `}
                <span className="row-count">
                  {rowCounts[lastClickedRow]?.[item.countKey] || 0}
                </span>
              </div>
            </h1>
          ))}
        </>
      </div>
    </>
  );
}
