import PropTypes from "prop-types";

// react-icons
import { IoIosSearch } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

// Styles
import "./Search.scss";

const Search = ({ placeholder, value, onSearch }) => {

  return (
    <div className="input-container">
      {!value && <div className="search-icon">
        <IoIosSearch />
      </div>}
      <input className="search-input" type="text" value={value} placeholder={placeholder} onChange={(e)=> onSearch(e.target.value)} />
      {value && (
        <div className="clear-icon" onClick={()=> onSearch("")}>
          <IoIosClose />
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  placeholder:PropTypes.string,
  value: PropTypes.string, 
  onSearch: PropTypes.func, 
};

export default Search;
