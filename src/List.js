import React from "react";
import "./list.css";

const List = ({ data, handleSelect, inputVal }) => {
  function getHighlightedText(text, higlight) {
    var parts = text.split(new RegExp(`(${higlight})`, "gi"));
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part.toLowerCase() === higlight?.toLowerCase() ? (
          <b style={{ backgroundColor: "#EDEDED" }}>{part}</b>
        ) : (
          part
        )}
      </React.Fragment>
    ));
  }
  return (
    <div className="list-root">
      {data?.map((object) => (
        <div className="list-element" onClick={() => handleSelect(object)}>
          <div className="image-name-group">
            <img className="list-image" src={object?.avatar} />
            <div className="list-name">
              {getHighlightedText(object?.name, inputVal)}
            </div>
          </div>
          <div className="email-container">
            <div className="list-email">{object?.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
