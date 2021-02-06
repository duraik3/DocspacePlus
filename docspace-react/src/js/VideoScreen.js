import React from "react";
import Header from "./Header";
import Footer from "./components/Footer";
import Video from "./components/Video";
import { useParams } from "react-router-dom";

const VideoScreen = (props) => {
  const { id } = useParams();
  return (
    <div>
      <Header forceLogin={true} />
      <Video
        video={props.location.state ? props.location.state.video : null}
        videoid={props.location.state ? props.location.state.video.id : id}
      />
      <Footer fixed="true" />
    </div>
  );
};

export default VideoScreen;
