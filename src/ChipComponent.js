import React from "react";
import "./chipComponent.css";
const ChipComponent = ({
  selectedOptions,
  handleClose,
  isFocused,
  chipToBeDeleted,
  setDeleteChip,
}) => {
  return (
    <div
      className="chip-group-root"
      style={{
        borderBottom: isFocused
          ? "2px solid #4e9ad4"
          : "2px solid rgb(191, 189, 189)",
      }}
    >
      {selectedOptions &&
        selectedOptions.map((object, key) => (
          <div
            className="chip-root"
            style={{
              border:
                key === selectedOptions?.length - 1 && chipToBeDeleted
                  ? "1px solid red"
                  : "none",
            }}
          >
            {key === selectedOptions?.length - 1 &&
              chipToBeDeleted &&
              setDeleteChip(object)}
            <img className="chip-image" src={object?.avatar} />
            <div className="chip-name-icon-group">
              <div className="chip-name">{object?.name}</div>
              <div className="close-icon" onClick={() => handleClose(object)}>
                x
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChipComponent;
