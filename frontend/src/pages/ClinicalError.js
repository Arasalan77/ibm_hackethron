import React from "react";
import "../css/CaseSummary.css";

const CaseSummary = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No case summary data available.</p>;
  }

  console.log("data", data);
  console.log("data.changes: ", data.changes);

  return (
    <div className="case-summary">
      <h1 className="summary-title">Clinical Error</h1>
      {data.map((page, index) => (
        <div key={index} className="page-section">
          <h2 className="page-title">Page {page.pageNumber}</h2>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Old Value</th>
                <th>New Value</th>
                <th>Rationale</th>
              </tr>
            </thead>
            <tbody>
              {page.changes.map((change, idx) => (
                <tr key={idx}>
                  <td>{change.field}</td>
                  <td>{change.oldValue}</td>
                  <td className="highlight-new">{change.newValue}</td>
                  <td>{change.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CaseSummary;
