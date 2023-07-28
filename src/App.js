import "./index.css";
import React, { useState } from "react";
import { BsCheckSquareFill } from "react-icons/bs";
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
const targets = [
  { code: 0 },
  { code: 1 },
  { code: 2 },
  { code: 3 },
  { code: 4 },
  { code: 5 },
  { code: 6 },
  { code: 7 },
  { code: 8 },
  { code: 9 },
];

function SudokuGrid() {
  const [selectedColCell, setSelectedColCell] = useState(null);
  const [selectedRowCell, setSelectedRowCell] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);

  const handleColCellClick = (cols, colIndex) => {
    setSelectedColCell(cols);
    console.log("Column index:", colIndex);
  };

  const handleRowCellClick = (rows, rowIndex) => {
    setSelectedRowCell(rows);
    console.log("Row index:", rowIndex);
  };

  const handleTargetClick = (input, targetIndex) => {
    setSelectedTarget(input.code);
    console.log("Target index:", targetIndex);
  };

  


  return (
    <div>
    <div className="max-w-[390px] bg-slate-500 text-center grid grid-cols-11">
      {cols.map((col, colIndex) => (
        <div
          key={colIndex}
          className={`w-9 h-9 border bg-slate-500 cursor-pointer rounded ${
            col === selectedColCell ? 'bg-red-600' : ''
          }`}
          onClick={() => handleColCellClick(col, colIndex)}
        >
          {col.code}
          <div className="mt-3">
            {targets.map((input, targetIndex) => (
              <div
                key={targetIndex}
                className={`max-w-[390px] grid grid-cols-9 w-9 h-9 border-t-0 rounded border-l-0 border cursor-pointer ${
                  targetIndex === selectedTarget ? 'bg-blue-600' : ''
                }`}
                onClick={() => handleTargetClick(input, targetIndex)}
              >
                {input.code}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="max-w-[390px] bg-slate-500 text-center grid grid-rows-11">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`w-9 h-9 border bg-slate-500 cursor-pointer rounded border-r-0 ${
            row === selectedRowCell ? 'bg-red-600' : ''
          }`}
          onClick={() => handleRowCellClick(row, rowIndex)}
        >
          {rows.code}
        </div>
      ))}
    </div>
  </div>
  
  );
}

export default function App() {
  return (
    <div>
      <SudokuGrid />
    </div>
  );
}

// export default function App() {
//   const [selectedCell, setSelectedCell] = useState(null);
//   const [selectedTarget, setSelectedTarget] = useState(null);

//   const handleCellClick = (cols) => {
//     setSelectedCell(cols);
//   };

//   const handleTargetClick = (input) => {
//     setSelectedTarget(input);
//   };

//   return (
//     <>
//       <div className="max-w-[390px]  bg-slate-500 text-center  grid grid-cols-11  ">
//         {col.map((cols, index) => {
//           return (
//             <>
//               <div
//                 key={index}
//                 className={`w-9 h-9 border bg-slate-500 cursor-pointer rounded ${
//                   cols === selectedCell ? "bg-red-600" : ""
//                 }`}
//                 onClick={() => handleCellClick(cols)}
//               >
//                 {cols.code}
//                 <div className="mt-3">
//                   {target.map((input, index) => {console.log('index', index)
//                     return (
//                       <div
//                         key={index}
//                         className={` max-w-[390px] grid grid-cols-9 w-9 h-9 border-t-0 rounded border-l-0 border cursor-pointer ${
//                           input === selectedTarget ? 'bg-green-600' : ""
//                         }`}
//                         onClick={() => handleTargetClick(input)}
//                       >
//                         {input.code}
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </>
//           );
//         })}
//       </div>
//       <div className="max-w-[390px]  bg-slate-500 text-center  grid grid-rows-11  ">
//         {row.map((rows, index) => {
//           return (
//             <>
//               <div
//                 key={index}
//                 className={`w-9 h-9 border bg-slate-500 cursor-pointer rounded border-r-0 ${
//                   rows === selectedCell ? "bg-red-600" : ""
//                 }`}
//                 onClick={() => handleCellClick(rows)}
//               >
//                 {rows.code}
//               </div>
//             </>
//           );
//         })}
//       </div>
//     </>
//   );
// }
