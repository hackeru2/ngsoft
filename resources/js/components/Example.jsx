import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Tasks from "./Tasks";
import Pagination from "./Pagination";
import MyContextProvider from "../../../MyContextProvider";
// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
function Example() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Initialize with 1 page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // You may want to fetch data for the new page here or update your component state.
    };
    return (
        <div className="container">
            <MyContextProvider>
                <Tasks
                    setTotalPages={setTotalPages}
                    currentPage={currentPage}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                {/* <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">
                            I'm an example component!
                        </div>
                    </div>
                </div>
            </div> */}
            </MyContextProvider>
        </div>
    );
}

export default Example;

if (document.getElementById("example")) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <Example />
        </React.StrictMode>
    );
}
