import React from "react";
import PropTypes from "prop-types";

//react-icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiChevronsLeft } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";


import "./Pagination.scss";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  //   console.log("currentPage", currentPage);
  //   const dispatch = useDispatch();
  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handleLastPage = () => {
    console.log("totalPages", totalPages);
    onPageChange(totalPages);
  };

  const handlePreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <p>Page {currentPage} of {totalPages}</p>
      <button onClick={handleFirstPage} disabled={currentPage === 1}>
        <FiChevronsLeft size="15px" />
      </button>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        <FaChevronLeft size="13px" />
      </button>
      <span></span>
      <button disabled={currentPage === totalPages} onClick={handleNextPage}>
        <FaChevronRight size="13px" />
      </button>
      <button disabled={currentPage === totalPages} onClick={handleLastPage}>
        <FiChevronsRight  size="15px"/>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage:PropTypes.number,
  totalItems:PropTypes.number,
  itemsPerPage:PropTypes.number,
  onPageChange:PropTypes.number
};

export default Pagination;
