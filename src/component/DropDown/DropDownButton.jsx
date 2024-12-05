import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
//react-icons
import { MdExpandLess, MdExpandMore } from "react-icons/md";
// import { MdExpandMore } from "react-icons/md";

// Styles
import './DropDownButton.scss'

const DropDownButton = ({ content, options, onSelect, showicon = false }) => {
  const dropdownRef = useRef();
  const [optionsBoxVisible, setOptionsBoxVisible] = useState(false);
  console.log(showicon);
  const handleClick = () => {
    setOptionsBoxVisible(!optionsBoxVisible);
  };

  const handleSelect = (option) => {
    onSelect(option.label);
    setOptionsBoxVisible(false);
  };

  const getDropdownOptions = () => {
    return options.map((option) => (
      <div className="selection-container" key={option.id} onClick={() => handleSelect(option)}>
        {option.icon}
        {option.label}
      </div>
    ));
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOptionsBoxVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-button" ref={dropdownRef}>
      <div id="drop-box" onClick={handleClick}>
        <span>{content}</span> 
        <span>{optionsBoxVisible && showicon ? <MdExpandLess /> : <MdExpandMore />}</span>
      </div>
      {optionsBoxVisible && <div className="dropdown-container">{getDropdownOptions()}</div>}
    </div>
  );
};

DropDownButton.propTypes = {
  content: PropTypes.node.isRequired, // `node` covers anything that can be rendered, including elements or strings.
  options: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      label: PropTypes.string.isRequired,
      to: PropTypes.string // Assuming `to` is optional
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  showicon: PropTypes.bool
};
export default DropDownButton;
