import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ListingItem from "../components/ListingItem";
import "./Loading.css";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl,
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      e.preventDefault();
      const newSearchTerm = e.target.value;
      setSidebardata({ ...sidebardata, searchTerm: newSearchTerm });
      
      const urlParams = new URLSearchParams();
      urlParams.set("searchTerm", newSearchTerm); // Use the updated searchTerm here
      
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // Function to clear the search and reset the listings
  const handleClear = () => {
    if (sidebardata.searchTerm) {
      setSidebardata({ searchTerm: "" });
      setListings([]);
      setPageNumber(0);
      navigate("/search");
    }
  };

  const pageCount = Math.ceil(listings.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayListings = listings.slice(
    pageNumber * itemsPerPage,
    (pageNumber + 1) * itemsPerPage
  );

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
            <button
              type="button"
              className="bg-gray-300 text-gray-700 p-3 rounded-lg uppercase hover:opacity-95"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>

        <div className="p-7 flex flex-wrap gap-4">
          {!loading && displayListings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}

          {!loading &&
            displayListings &&
            displayListings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>

        {loading && (
          <div id="page">
            <div id="container">
              <div id="ring2"></div>
              <div id="ring2"></div>
              <div id="ring2"></div>
              <div id="ring2"></div>
              <div id="h3">loading</div>
            </div>
          </div>
        )}

        {/* Render pagination */}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center mb-8 space-x-4"}
          activeClassName={"bg-slate-700 text-white px-4 py-2 rounded-full"}
          previousClassName={"border rounded-full px-4 py-2 hover:bg-gray-200"}
          nextClassName={"border rounded-full px-4 py-2 hover:bg-gray-200"}
          pageClassName={"border rounded-full px-4 py-2 hover:bg-gray-200"}
          breakClassName={"border rounded-full px-4 py-2 hover:bg-gray-200"}
        />
      </div>
    </div>
  );
}
