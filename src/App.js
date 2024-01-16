import { useEffect, useRef, useState } from "react";
import "./App.css";
import ChipComponent from "./ChipComponent";
import { data } from "./Data";
import List from "./List";

function App() {
  const [inputVal, setInputVal] = useState();
  const [matchingOptions, setMatchingOptions] = useState();
  const [allOptions, setAlloptions] = useState(data);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [toggleModal, setToggleModal] = useState(true);
  const [chipToBeDeleted, setChipToBeDeleted] = useState(false);
  const [deleteChip, setDeleteChip] = useState();

  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const handleClickAway = (e) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target) &&
      !inputRef.current.contains(e.target)
    ) {
      setToggleModal(false);
      setChipToBeDeleted(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickAway);
    return () => {
      document.removeEventListener("click", handleClickAway);
    };
  }, []);

  const handleOnChange = (e) => {
    setChipToBeDeleted(false);
    if (e.target.value.length > 0) {
      setMatchingOptions(
        allOptions.filter((object) =>
          object?.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setToggleModal(true);
    } else {
      setMatchingOptions([]);
      setToggleModal(false);
    }
    setInputVal(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (inputVal === "" && e.key === "Backspace" && !chipToBeDeleted) {
      setChipToBeDeleted(true);
    } else if (chipToBeDeleted && e.key === "Backspace") {
      setChipToBeDeleted(false);
      handleClose(deleteChip);
    }
  };

  const handleSelect = (selectedOption) => {
    setSelectedOptions([...selectedOptions, selectedOption]);
    setAlloptions(
      allOptions.filter((object) => object?.id !== selectedOption?.id)
    );
    setMatchingOptions(
      matchingOptions.filter((object) => object?.id !== selectedOption?.id)
    );
    setInputVal("");
    inputRef.current.focus();
  };

  const handleClose = (selectedOption) => {
    setSelectedOptions(
      selectedOptions.filter((object) => object?.id !== selectedOption?.id)
    );
    setAlloptions([...allOptions, selectedOption]);
    if (
      selectedOption?.name.toLowerCase().includes(inputVal.toLowerCase()) &&
      inputVal?.length > 0
    ) {
      setMatchingOptions([...matchingOptions, selectedOption]);
    }
  };

  return (
    <div className="app">
      <ChipComponent
        selectedOptions={selectedOptions}
        handleClose={handleClose}
        isFocused={isFocused}
        chipToBeDeleted={chipToBeDeleted}
        setDeleteChip={setDeleteChip}
      />
      <div className="input-list-group">
        <input
          ref={inputRef}
          value={inputVal}
          onChange={handleOnChange}
          className="input-root"
          placeholder="Type here"
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            setToggleModal(true);
          }}
          autoFocus
          onBlur={() => setIsFocused(false)}
        />
        <div
          ref={modalRef}
          style={{
            display: !toggleModal || inputVal?.length <= 0 ? "none" : "flex",
          }}
        >
          <List
            data={matchingOptions}
            handleSelect={handleSelect}
            inputVal={inputVal}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
