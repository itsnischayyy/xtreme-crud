import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Home = () => {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <div className="py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
          <p className="text-lg mb-8">
            Discover amazing content and explore new things.
          </p>
          {currentUser ? (
            <>
              <Link to="/search">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                  Search Vendors
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                  Sign-In
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
