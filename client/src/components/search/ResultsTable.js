import React from "react";
//import ResultsTableItems from "./ResultsTableItems";
import axios from "axios";

function viewPdf(drawingid) {
  axios
    .get(`http://nat005app/ViPPDFTEST/api/GetPDF/${drawingid}/cogor`)
    .then(res => {
      //Create a Blob from the PDF Stream
      //   const file = new Blob([res.data], {
      //     type: "application/pdf"
      //   });
      var sampleArr = base64ToArrayBuffer(res.data);
      displayByteArray(sampleArr);

      //Build a URL from the file
      //const fileURL = URL.createObjectURL(file);

      //Open the URL on new Window
      //window.open(fileURL);
    })
    .catch(err => {
      console.log(err);
    });
}

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

// function saveByteArray(drwnum, byte) {
//   const blob = new Blob([byte], { type: "application/pdf" });
//   const link = document.createElement("a");
//   link.fileURL = URL.createObjectURL(blob);
//   const fileName = drwnum;
//   link.download = fileName;
//   link.click();
// }

function displayByteArray(byte) {
  const blob = new Blob([byte], { type: "application/pdf" });
  //const link = document.createElement("a");
  const fileURL = URL.createObjectURL(blob);
  window.open(fileURL);
  //const fileName = drwnum;
  //link.download = fileName;
  //link.click();
}

const ResultsTable = props => {
  return (
    <div className="results-table mt-4">
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Document</th>
              <th scope="col">Revision</th>
              <th scope="col">Description</th>
              <th scope="col">Model(s)</th>
            </tr>
          </thead>
          <tbody>
            {props.drawingslist.map(item => {
              return (
                <tr key={item.Id}>
                  <td>{item.Name}</td>
                  <td>{item.Revision}</td>
                  <td>{item.title}</td>
                  <td>{item.Models}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() => viewPdf(item.Id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ResultsTable;
