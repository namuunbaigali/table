import "./index.css";
import React from 'react';

const col = [
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
const row = [
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
function App() {
  return (
    <div className=" border bg-blue-100  m-auto">
      <div className="bg-red-900 text-center">ds</div>
      <div className="text-center  bg-black">sds</div>
      {row.map((rows) => {
        return <div className="grid grid-flow-row border ">{rows.code}</div>;
      })}
      {col.map((cols) => {
        return <div className="grid grid-flow-col bg-red-900 border text-center ">{cols.code}</div>;
      })}
    </div>
//  <section className="py-20 bg-blueGray-50">
//    <div className="container mx-auto">
//      <div className="bg-white  py-4 rounded shadow">
//        <table className="w-full">
//          <thead>
//            <tr className="text-xs">
//              <th className="pb-4 font-normal text-left">empty</th>
//              {row.map((rows) => {
//                return <th className=" font-normal">{rows.code}</th>;
//              })}
//            </tr>
//          </thead>
//          <tbody>
//            <tr className="bg-blueGray-100">
//              {col.map((cols) => {
//                return (
//                  <>
//                    <td className="">
//                      {cols.code}
//                    </td>
//                    <td className="">
//                      <svg
//                        className="w-2 h-2  text-red-600"
//                        fill="none"
//                        stroke="currentColor"
//                        viewbox="0 0 24 24"
//                        xmlns="http:www.w3.org/2000/svg"
//                      >
//                        <path
//                          stroke-linecap="round"
//                          stroke-linejoin="round"
//                          stroke-width="2"
//                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                        ></path>
//                      </svg>
//                    </td>
//                  </>
//                );
//              })}
//            </tr>

//            <td className="px-6 py-4">
//              <svg
//                className="w-6 h-6  text-green-600"
//                fill="none"
//                stroke="currentColor"
//                viewbox="0 0 24 24"
//                xmlns="http:www.w3.org/2000/svg"
//              >
//                <path
//                  stroke-linecap="round"
//                  stroke-linejoin="round"
//                  stroke-width="2"
//                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                ></path>
//              </svg>
//            </td>
//          </tbody>
//        </table>
//      </div>
//    </div>
//  </section>
  );
}

export default App;
