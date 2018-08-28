import React, { Fragment } from "react";

const ResultsTableItems = props => {
  props.datalist.map(item => {
    return (
      <tr key={item.DocId}>
        <td>{item.Name}</td>
        <td>{item.Revision}</td>
        <td>{item.title}</td>
        <td>{item.Models}</td>
      </tr>
    );
  });
};
// return props.datalist.map((item, i) => {
//   <tr key={i}>
//     <td>{item.DocId}</td>
//     <td>{item.Revision}</td>
//     <td>{item.title}</td>
//   </tr>;
// });

export default ResultsTableItems;
