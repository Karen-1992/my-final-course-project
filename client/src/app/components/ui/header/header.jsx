import React from "react";
import NavBar from "./navBar";

const Header = () => {
    // const [searchQuery, setSearchQuery] = useState("");
    // const handleSearchQuery = ({ target }) => {
    //     setSearchQuery(target.value);
    // };
    // console.log(searchQuery);
    return (
        <NavBar />
        // <div className="bg-light py-2">
        //     <form className="d-flex py-2">
        //         <input onChange={(e) => handleSearchQuery(e)} className="form-control me-2" type="search" placeholder="Search" />
        //         {/* <button onClick={(e) => handleSearchQuery(e)} className="btn btn-outline-success" type="submit">Search</button> */}
        //     </form>
        // </div>
    );
};

export default Header;
