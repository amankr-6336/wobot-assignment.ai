import PropTypes from "prop-types";
import { RiErrorWarningLine } from "react-icons/ri";
import { LuBan } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import "./Table.scss";

const TableComponent = ({ data = [], structure }) => {
  
  const formatValue = (value) => {
    if (typeof value === "string") {
      return value
        .replace(/_/g, " ") 
        .replace(/\b\w/g, (char) => char.toUpperCase()); 
    }

    return value;
  };

  const renderStatusDot = (status) => {
    return (
      <span
        className={`status-dot ${status === "Online" ? "online" : "offline"}`}
      ></span>
    );
  };

  const renderAction = (status) => {
    return status === "Active" ? <LuBan /> : <FaRegCheckCircle />;
  };


  const renderWarningIcon = (hasWarning) => {
    return hasWarning ? <RiErrorWarningLine className="warning-icon" /> : null;
  };

  const headers = structure.map((item) => ({
    id: item.id,
    label: item.label,
  }));

  return (
    <div className="table-bordered">
      <table>
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th key={`${header.label}${index}`}>{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {structure.map(({ id, content }) => (
                  <td key={id}>
                
                    {id === "name" ? (
                      <div className="camera-name">
                      
                        {renderStatusDot(row.current_status)}
                        {formatValue(row[id])}
                        {renderWarningIcon(row.hasWarning)}
                      </div>
                    ) : 
                    id === "actions" ? (
                      renderAction(row.status)
                    ) : content ? (
                      content(row[id], row.id) 
                    ) : (
                      formatValue(row[id]) 
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="no-data">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

TableComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  structure: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.func,
    })
  ).isRequired,
};

export default TableComponent;
