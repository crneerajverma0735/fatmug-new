import React, { useEffect } from "react";
import Welcome from "./Welcome";
import { connect } from "react-redux";
import { fetchALLArticle } from "../../actions/article";

const Home = ({ allArticle, fetchALLArticle }) => {
  useEffect(() => {
    fetchALLArticle();
  }, [fetchALLArticle]);
  return (
    <div>
      <Welcome article={allArticle} />
      {/* <Slideshow />
      <Section /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  allArticle: state.article.allArticle,
});

export default connect(mapStateToProps, { fetchALLArticle })(Home);
