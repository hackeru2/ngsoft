import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import Tasks from "./Tasks";
import Pagination from "./Pagination";
import MyContextProvider from "../../../MyContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
function Example() {
    const [totalPages, setTotalPages] = useState(1);
    return (
        <div className="container">
            <ToastContainer />
            <MyContextProvider>
                <Tasks setTotalPages={setTotalPages} />
                <Pagination totalPages={totalPages} />
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
