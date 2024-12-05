import axios from "axios";
import { useEffect, useState } from "react";
import "./app.css";

// company logo
import logo from "./asset/Brand Logo.svg";

// icons
import { CiLocationOn } from "react-icons/ci";
import { IoWifiOutline } from "react-icons/io5";
import { IoCloudOutline } from "react-icons/io5";
import { AiOutlineDatabase } from "react-icons/ai";
import { RiResetRightFill } from "react-icons/ri";

// components
import DropDownButton from "./component/DropDown/DropDownButton";
import Search from "./component/Search/Search.jsx";
import TableComponent from "./component/Table/TableComponent.jsx";
import Pagination from "./component/pagination/Paginations.jsx";
import Circle from "./component/circle/Circle.js";


function App() {
  const [cameras, setCameras] = useState([]);  //to fetch and set the data in this state
  const [filteredData, setFilteredData] = useState([]); // filtered data to be stored in this
  const [currentPage, setCurrentPage] = useState(1);  
  const [itemsPerPage] = useState(10); // Number of items per page
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(""); // Example: filter by status or location
  const [error, setError] = useState(null);
  const [location, setLocation] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const options = [{ label: "Active" }, { label: "Inactive" }];


  // Table Structure 
  const TableStructure = [
    {
      id: "id",
      label: "",
      content: (id) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(id)}
          onChange={(e) => handleRowSelection(e, id)}
        />
      ),
    },
    {
      id: "name",
      label: "Name",
    },
    {
      id: "health",
      label: "Health",
      content: (health) =>
        health ? (
          <div className="health-column">
            <div className="box">
              <IoCloudOutline color="#343434" />{" "}
              <Circle
                percentage={75}
                size={20}
                color={`${health.cloud === "A" ? "green" : "orange"}`}
                backgroundColor="#e0e8fc"
                text={health.cloud}
              />
            </div>
            <div className="box">
              <AiOutlineDatabase color="#343434" />{" "}
              <Circle
                percentage={75}
                size={20}
                color={`${health.device === "A" ? "green" : "orange"}`}
                backgroundColor="#e0e8fc"
                text={health.device}
              />
            </div>
          </div>
        ) : (
          "N/A"
        ),
    },
    { id: "location", label: "Location" },
    {
      id: "recorder",
      label: "Recorder",
      content: (recorder) => (recorder ? recorder : "N/A"),
    },
    { id: "tasks", label: "Tasks" },
    {
      id: "status",
      label: "Status",
      content: (status, id) => (
        <div className="status-column">
           <span onClick={() => toggleStatus(id, status)} className={`status-label ${status}`}>{status}</span>

        </div>
      ),
    },
    { id: "actions", label: "Actions" },
  ];

  // Fetch data on InitialRender
  useEffect(() => {
    fetchCameras();
  }, []);

  // function to fetch Data from API
  const fetchCameras = async () => {
    try {
      const response = await axios.get(
        "https://api-app-staging.wobot.ai/app/v1/fetch/cameras",
        {
          headers: {
            Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy",
          },
        }
      );
      console.log(response.data.data);
      setCameras(response.data.data);
      setFilteredData(response.data.data); // Set initial filtered data

      const uniqueLocations = Array.from(
        new Set(response.data.data.map((item) => item.location))
      ).map((location) => ({
        label: location,
      }));

      setLocation(uniqueLocations);
    } catch (err) {
      console.error("Error fetching cameras:", err);
      setError(err.message);
    }
  };

  // function to Toggle Status of each row
  const toggleStatus = (id, currentStatus) => {
    console.log(id,filter)
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    axios
      .put(
        `https://api-app-staging.wobot.ai/app/v1/update/camera/status`,
        {id:id, status: newStatus },
        {
          headers: {
            Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy", // Your token here
          },
        }
      )
      .then((response) => {
        fetchCameras()
        setCameras((prevCameras) =>
          prevCameras.map((camera) =>
            camera.id === id ? { ...camera, status: newStatus } : camera
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };
  
  // selection of rows to perform delete operation
  const handleRowSelection = (e, id) => {
    console.log(id);
    if (e.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((selectedId) => selectedId !== id));
    }
  };

  // function to delete the rows
  const handleDeleteRows = () => {
    const updatedCameras = cameras.filter(
      (camera) => !selectedRows.includes(camera.id)
    );
    setCameras(updatedCameras);
    setFilteredData(updatedCameras);
    setSelectedRows([]);
  };
  
  //  function to Handle the search feature
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = cameras.filter((camera) =>
      camera.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  // function to handle the dropdown filter for status
  const handleFilter = (value) => {
    setFilter(value);
    const filtered = cameras.filter(
      (camera) => camera.status.toLowerCase() === value.toLowerCase()
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page
  };
  
  // function to handle the dropdown filter for location
  const handleLocationFilter = (value) => {
    setFilter(value);
    const filtered = cameras.filter(
      (camera) => camera.location.toLowerCase() === value.toLowerCase()
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page
  };
   
  // to pass paginated data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleResetFilter = () => {
    setFilter("");

    setFilteredData(cameras);
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <header>
        <img src={logo} alt="Brand Logo" />
      </header>
      <div className="heading-search-section">
        <div className="heading">
          <h3>Cameras</h3>
          <p>Manage Your Cameras Here</p>
        </div>
        <div className="search-bar">
          <Search
            placeholder="Search cameras..."
            value={searchTerm}
            onSearch={handleSearch}
          />
        </div>
      </div>
      <div className="main">
        <div className="filter">
          <DropDownButton
            content={
              <>
                <CiLocationOn /> <p>Location</p>{" "}
              </>
            }
            options={location}
            onSelect={handleLocationFilter}
          />
          <DropDownButton
            content={
              <>
                <IoWifiOutline /> <p>Location</p>{" "}
              </>
            }
            options={options}
            onSelect={handleFilter}
          />
          <button className="delete" onClick={handleDeleteRows}>
            Delete
          </button>
          <button onClick={handleResetFilter}>
            {" "}
            <RiResetRightFill style={{ marginRight: "2px" }} /> Reset
          </button>
        </div>
        <div className="table">
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <TableComponent data={paginatedData} structure={TableStructure} />
          )}
        </div>
        <div className="pagination-section">
          <Pagination
            currentPage={currentPage}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
