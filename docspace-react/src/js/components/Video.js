import { Player, ControlBar, BigPlayButton } from "video-react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../css/video.css";
import { connect } from "react-redux";
import React from "react";
import { Row, Col } from "react-bootstrap";
import HLSSource from "./HLSSource";
import { openLogin } from "../../actions/userActions";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import 'video-react/dist/video-react.css'

const axios = require("axios");

export class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      questions: null,
      feedbacksvg: "/images/feedback.svg",
      showFeedback: false,
      showShare: false,
      comment: "",
      uservideomap: {
        heart: false,
        speaker_rating: 0,
        content_rating: 0,
        usefullness_rating: 0,
      },
      video: {
        url: "",
        episode: 0,
        thumbnail: "",
        countReviews: 0,
        averageRating: 2,
        moderator: null,
        speaker: {
          image: "",
        },
      },
    };
    this.submitFeedback = this.submitFeedback.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.starsClick = this.starsClick.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.heartClick = this.heartClick.bind(this);
    this.watchLater = this.watchLater.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onEnded = this.onEnded.bind(this);
  }

  onPlay(evt) {
    axios
      .get(
        "/api/videoevents/play/" +
          this.state.video.id +
          "/" +
          new Date().getTime()
      )
      .catch((error) => {
        console.log(error.response);
      });
  }
  onPause(evt) {
    axios
      .get(
        "/api/videoevents/pause/" +
          this.state.video.id +
          "/" +
          new Date().getTime()
      )
      .catch((error) => {
        console.log(error.response);
      });
  }
  onEnded(evt) {
    axios
      .get(
        "/api/videoevents/ended/" +
          this.state.video.id +
          "/" +
          new Date().getTime()
      )
      .catch((error) => {
        console.log(error.response);
      });
  }

  watchLater() {
    axios
      .get("/api/watchlater/" + this.state.video.id)
      .then((response) => {
        this.setState({ showFeedback: false });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  handleCommentChange(e) {
    this.setState({ comment: e.target.value });
  }
  handleQuestionChange(e) {
    this.setState({ question: e.target.value });
  }

  submitFeedback(event) {
    event.preventDefault();
    axios({
      method: "post",
      url:
        "/api/uservideomap/review/" +
        this.state.video.id +
        "/" +
        this.state.uservideomap.speaker_rating +
        "/" +
        this.state.uservideomap.content_rating +
        "/" +
        this.state.uservideomap.usefullness_rating,
      data: JSON.stringify({ comment: this.state.comment }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        this.setState({ showFeedback: false });
        axios
          .get("/api/video/" + this.props.videoid)
          .then((response) => {
            // handle success
            console.log("Received data: " + JSON.stringify(response.data));
            this.setState({ video: response.data });
            if (response.data.status === "Upcoming") {
              this.setState({ feedbacksvg: "/images/feedbackgrey.svg" });
            }
            this.setState({ comment: "" });
          })
          .catch((error) =>
            console.error("Could not load video information" + error.response)
          );
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  submitQuestion(event) {
    event.preventDefault();
    let data = {
      question: this.state.question,
    };
    axios({
      method: "post",
      url: "/api/question/" + this.state.video.id,
      data: data,
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        this.setState({ question: "" });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  starsClick(id, index) {
    let newState = Object.assign({}, this.state);
    newState.uservideomap[id + "_rating"] = index + 1;
    this.setState(newState);
  }

  componentDidMount() {
    axios
      .get("/api/user/current")
      .then((response) => {})
      .catch((error) => {
        this.props.dispatch(openLogin());
      });

    let videoId;
    if (!this.props.video) {
      videoId = this.props.videoid;
    } else {
      videoId = this.props.video.id;
    }
    axios
      .get("/api/video/" + videoId)
      .then((response) => {
        this.setState({
          video: response.data,
        });

        if (response.data.status === "Upcoming") {
          this.setState({ feedbacksvg: "/images/feedbackgrey.svg" });
        }
      })
      .catch((error) =>
        console.error("Could not load video information" + error.response)
      );
    axios
      .get("/api/question/" + videoId)
      .then((response) => {
        this.setState({
          questions: response.data,
        });
      })
      .catch((error) =>
        console.error("Could not load questions" + error.response)
      );

    axios
      .get("/api/uservideomap/" + this.props.videoid)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.setState({ uservideomap: response.data });
      })
      .catch((error) =>
        console.error(
          "Could not load user video information: " + JSON.stringify(error)
        )
      );
  }

  heartClick() {
    console.log("Video status: " + this.state.video.status);
    let newState = Object.assign({}, this.state);
    newState.uservideomap.heart = !this.state.uservideomap.heart;
    this.setState(newState);
    axios
      .get(
        "/api/uservideomap/heart/" +
          this.state.video.id +
          "/" +
          this.state.uservideomap.heart
      )
      .catch((error) =>
        console.log("Could not change heart state: " + error.response)
      );
  }

  render() {
    let description;
    if (
      this.props.user === null ||
      this.state.video.moderator === null ||
      this.state.video.moderator.id !== this.props.user.id
    ) {
      description = (
        <p className="card-text" style={{ fontSize: "14px" }}>
          <strong style={{ fontSize: "20px" }}>Summary of the Video</strong>
          <br />
          {this.state.video.description}
        </p>
      );
    } else if (this.state.questions) {
      description = []
      this.state.questions.map((item) => {
        description.push((<p>{item.user.salutation + ' ' + item.user.firstName + ' ' + item.user.lastName + ': ' + item.question}</p>))
      });
    }

    return (
      <div className="video-page-container">
        <Modal
          contentClassName="share-modal"
          centered="true"
          show={this.state.showShare}
          onHide={() => this.setState({ showShare: false })}
          keyboard={false}
        >
          <Modal.Header bsPrefix="share-modal-header">
            <Modal.Title className="w-100">
              <h5>Share</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            bsPrefix="share-modal-body"
            className="d-flex justify-content-center share-button-box"
          >
            <FacebookShareButton url={window.location.href}>
              <FacebookIcon round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href}>
              <TwitterIcon round={true} />
            </TwitterShareButton>
            <LinkedinShareButton url={window.location.href}>
              <LinkedinIcon round={true} />
            </LinkedinShareButton>
            <EmailShareButton url={window.location.href}>
              <EmailIcon round={true} />
            </EmailShareButton>
            <WhatsappShareButton url={window.location.href}>
              <WhatsappIcon round={true} />
            </WhatsappShareButton>
            <RedditShareButton url={window.location.href}>
              <RedditIcon round={true} />
            </RedditShareButton>
          </Modal.Body>
        </Modal>
        <Modal
          contentClassName="feedback-modal"
          centered="true"
          show={this.state.showFeedback}
          onHide={() => this.setState({ showFeedback: false })}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton bsPrefix="feedback-modal-header">
            <Modal.Title className="w-100">
              <h3>Feedback</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body bsPrefix="feedback-modal-body">
            <Form onSubmit={this.submitFeedback}>
              <Form.Group controlId="speaker">
                <div className="d-flex justify-content-center">
                  {[...Array(5)].map((x, i) => (
                    <img
                      onClick={() => {
                        this.starsClick("speaker", i);
                      }}
                      key={"speaker" + i}
                      id={"speaker" + i}
                      src={
                        i < this.state.uservideomap["speaker_rating"]
                          ? "/images/starfill.svg"
                          : "/images/star.svg"
                      }
                      width="20px"
                      height="20px"
                      alt=""
                      className="mx-1"
                    />
                  ))}
                </div>
                <p
                  className="d-flex justify-content-center"
                  style={{ fontWeight: "500", fontSize: "20px" }}
                >
                  Speakers
                </p>
              </Form.Group>
              <Form.Group controlId="content">
                <div className="d-flex justify-content-center">
                  {[...Array(5)].map((x, i) => (
                    <img
                      onClick={() => {
                        this.starsClick("content", i);
                      }}
                      key={"content" + i}
                      id={"content" + i}
                      src={
                        i < this.state.uservideomap["content_rating"]
                          ? "/images/starfill.svg"
                          : "/images/star.svg"
                      }
                      width="20px"
                      height="20px"
                      alt=""
                      className="mx-1"
                    />
                  ))}
                </div>
                <p
                  className="d-flex justify-content-center"
                  style={{ fontWeight: "500", fontSize: "20px" }}
                >
                  Content
                </p>
              </Form.Group>
              <Form.Group controlId="usefullness">
                <div className="d-flex justify-content-center">
                  {[...Array(5)].map((x, i) => (
                    <img
                      onClick={() => {
                        this.starsClick("usefullness", i);
                      }}
                      key={"usefullness" + i}
                      id={"usefullness" + i}
                      src={
                        i < this.state.uservideomap["usefullness_rating"]
                          ? "/images/starfill.svg"
                          : "/images/star.svg"
                      }
                      width="20px"
                      height="20px"
                      alt=""
                      className="mx-1"
                    />
                  ))}
                </div>
                <p
                  className="d-flex justify-content-center"
                  style={{ fontWeight: "500", fontSize: "20px" }}
                >
                  Usefullness in practice
                </p>
              </Form.Group>
              <Form.Group controlId="comment">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Post your comments"
                  onChange={this.handleCommentChange}
                />
              </Form.Group>
              <Button block size="lg" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Row>
          <p style={{ color: "white" }}>
            Home /{" "}
            {this.state.video.channels &&
              this.state.video.channels.length > 0 &&
              this.state.video.channels[0].title}{" "}
            / Episode
            {" " + this.state.video.episode}
          </p>
        </Row>
        {this.state.video.channels && this.state.video.channels.length > 0 && (
          <Row
            style={{
              height: "80px",
            }}
            className="my-3 rounded-pill"
          >
            <img
              className="d-block w-100"
              src={this.state.video.channels[0].smallBanner}
              alt={this.state.video.channels[0].title}
            />
          </Row>
        )}
        <Row>
          <Col className="col-auto mr-auto">
            <div className="video-player-container">
              <Player
                className="video-player"
                fluid={false}
                width={746}
                height={420}
                videoId="videoID"
                poster={this.state.video.thumbnail}
                style={{ borderRadius: "25px" }}
                onPlay={this.onPlay}
                onPause={this.onPause}
                onEnded={this.onEnded}
              >
                {this.state.video.status !== "Published" ? (
                  <HLSSource isVideoChild src={this.state.video.url} />
                ) : (
                  <source src={this.state.video.url} />
                )}

                <ControlBar autoHide={false} className="video-control-bar" />
                <BigPlayButton position="center" />
              </Player>
            </div>
          </Col>
          <Col>
            <div
              className="card"
              style={{
                backgroundColor: "#0E2432",
                color: "white",
                height: "420px",
                borderRadius: "20px",
              }}
            >
              <div className="card-body" style={{overflowY: "auto"}}>
                <h5
                  className="card-title"
                  style={{ fontWeight: "600", fontSize: "24px" }}
                >
                  {this.state.video.topic}
                </h5>
                <div className="row justify-content-between">
                  {this.state.video.status === "Published" && (
                    <div className="col-auto">
                      <h6 className="text-muted" style={{ display: "flex" }}>
                        Published: Sep. 2020 | 01.00 Hrs
                      </h6>
                    </div>
                  )}
                  {this.state.video.status === "Published" && (
                    <div className="col-auto">
                      <img
                        key={"starfill0"}
                        src={
                          this.state.video.averageRating >= 1
                            ? "/images/starfill.svg"
                            : "/images/star.svg"
                        }
                        width="15px"
                        height="15px"
                        alt=""
                      />
                      <img
                        key={"starfill1"}
                        src={
                          this.state.video.averageRating >= 2
                            ? "/images/starfill.svg"
                            : "/images/star.svg"
                        }
                        width="15px"
                        height="15px"
                        alt=""
                      />
                      <img
                        key={"starfill2"}
                        src={
                          this.state.video.averageRating >= 3
                            ? "/images/starfill.svg"
                            : "/images/star.svg"
                        }
                        width="15px"
                        height="15px"
                        alt=""
                      />
                      <img
                        key={"starfill3"}
                        src={
                          this.state.video.averageRating >= 4
                            ? "/images/starfill.svg"
                            : "/images/star.svg"
                        }
                        width="15px"
                        height="15px"
                        alt=""
                      />
                      <img
                        key={"starfill4"}
                        src={
                          this.state.video.averageRating >= 5
                            ? "/images/starfill.svg"
                            : "/images/star.svg"
                        }
                        width="15px"
                        height="15px"
                        alt=""
                      />
                      <p className="text-muted">
                        {this.state.video.countReviews} review(s)
                      </p>
                    </div>
                  )}
                  <div className="col-auto">
                    <button
                      className="btn btn-outline-success btn-sm"
                      style={{ color: "#59dcb7", borderRadius: "15px" }}
                      onClick={this.watchLater}
                    >
                      Watch later +
                    </button>
                  </div>
                </div>
                <hr
                  style={{
                    color: "#59dcb7",
                    height: "2px",
                    backgroundColor: "#59dcb7",
                  }}
                />
                {description}
                { (this.props.user === null || this.state.video.moderator === null || this.state.video.moderator.id !== this.props.user.id) && (
                <div className="row justify-content-between" style={{position: "absolute", bottom: "0px", width: "100%", paddingRight: "20px"}}>
                  <div className="col">
                    <img
                      onClick={this.heartClick}
                      src={
                        this.state.uservideomap.heart
                          ? "/images/heartfill.svg"
                          : "/images/heart.svg"
                      }
                      width="30px"
                      height="30px"
                      alt=""
                    />
                    <p style={{ textAlign: "left" }} className="video-icon">
                      Like
                    </p>
                  </div>
                  <div className="col">
                    <img
                      style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        display: "block",
                      }}
                      onClick={() => this.setState({ showShare: true })}
                      src="/images/share.svg"
                      width="30px"
                      height="30px"
                      alt=""
                    />{" "}
                    <p style={{ textAlign: "center" }} className="video-icon">
                      Share
                    </p>
                  </div>
                  <div className="col">
                    <img
                      style={{
                        marginLeft: "auto",
                        marginRight: "10px",
                        display: "block",
                      }}
                      onClick={() => {
                        if (this.state.video.status !== "Upcoming")
                          this.setState({ showFeedback: true });
                      }}
                      src={this.state.feedbacksvg}
                      width="30px"
                      height="30px"
                      alt=""
                    />{" "}
                    <p
                      style={{ textAlign: "right" }}
                      className={
                        this.state.video.status === "Upcoming"
                          ? "video-icon-disabled"
                          : "video-icon"
                      }
                    >
                      Feedback
                    </p>
                  </div>
                </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      { this.state.video.speaker !== null && (
        <div
          className="card speaker-container"
          style={{
            backgroundColor: "#0E2432",
            color: "white",
            borderRadius: "20px",
          }}
        >
          <div className="card-body">
            <Row>
              <div className="col-auto" height="77px" width="77px">
                <img
                  className="rounded-circle"
                  src={this.state.video.speaker.image}
                  height="77px"
                  width="77px"
                  alt="Speaker"
                  style={{ backgroundColor: "white" }}
                />
              </div>
              <div className="col-auto">
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "25px",
                    color: "white",
                  }}
                >
                  {this.state.video.speaker.firstName +
                    " " +
                    this.state.video.speaker.lastName}
                </p>
                <p
                  style={{
                    fontWeight: "600",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  {this.state.video.speaker.credentials}
                </p>
              </div>
            </Row>
            <Row
              style={{ fontWeight: "400", fontSize: "15px", color: "white" }}
            >
              <Col>{this.state.video.speaker.biography}</Col>
            </Row>
            { (this.props.user === null || this.state.video.moderator === null || this.state.video.moderator.id !== this.props.user.id) && (
            <Form onSubmit={this.submitQuestion} style={{visibility: this.state.video.status === "Live" ? "visible" : "hidden"}}>
              <Form.Group controlId="question-textarea">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ask a question"
                  style={{ backgroundColor: "#00212b", color: "white" }}
                  onChange={this.handleQuestionChange}
                  value={this.state.question}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <button
                  id="question-button"
                  block
                  size="lg"
                  type="submit"
                  className="btn btn-outline-success btn-lg"
                  style={{
                    color: "#59dcb7",
                    borderRadius: "15px",
                  }}
                >
                  Post
                </button>
              </div>
            </Form>
            )}
          </div>
        </div>
      )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    showLogin: state.userReducer.showLogin,
    user: state.userReducer.user,
  };
}

export default connect(mapStateToProps)(Video);
