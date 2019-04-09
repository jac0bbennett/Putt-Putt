import React from "react";
import ResultItem from "./resultItem";

const ResultList = props => {
  return (
    <div className="gencontainer resultlist" style={{ paddingBottom: "0" }}>
      {props.isLoaded ? (
        <button
          className="flatbut floatright"
          style={{ marginTop: "20px" }}
          onClick={() =>
            props.handleShowModal("newresultform", {
              participants: props.participants
            })
          }
        >
          <i className="material-icons" style={{ fontSize: "12pt" }}>
            add
          </i>
          <span className="icolab">New</span>
        </button>
      ) : null}
      <h1>Results</h1>
      {props.results.length > 0 ? (
        <React.Fragment>
          <div className="spaced-header">
            <h2>Winner</h2>
            <h2>#</h2>
            <h2>When</h2>
          </div>
          {props.results
            .slice(0)
            .reverse()
            .map((result, index) => (
              <ResultItem
                key={index}
                result={result}
                participants={props.participants}
                expand={() =>
                  props.handleShowModal(
                    "fullresult",
                    {
                      result: result,
                      participants: props.participants,
                      i: index,
                      reset: true
                    },
                    true
                  )
                }
              />
            ))}
        </React.Fragment>
      ) : props.isLoaded ? (
        <center>
          <h3>None yet.</h3>
        </center>
      ) : (
        <center>
          <div className="loadingicon" style={{ marginBottom: "20px" }} />
        </center>
      )}
    </div>
  );
};

export default ResultList;
