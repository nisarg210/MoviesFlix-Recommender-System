import React from "react";
import MovieGrid from "../components/movie-grid/MovieGrid";
import PageHeader from "../components/page-header/PageHeader";

const Wishlist = () => {
  return (
    <div>
      <PageHeader>
        Wishlist
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category="wishlist" />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
