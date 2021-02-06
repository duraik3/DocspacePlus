import React from "react";
import {Button, Col, Form, Row, Alert} from "react-bootstrap";
import Axios from "axios";
import S3FileUpload from 'react-s3';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';

class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            speakers: [],
            moderators: [],
            channels:[],
            error: false,
            errorMessage: "",
            id: null,
            type:"",
            channelId:"",
            speakerId:"",
            episode : "",
            eventDate : "",
            moderatorId:"",
            videoFile:null,
            videoUrl:"",
            thumbnailFile:null,
            thumbnailUrl:"",
            topic: "",
            description:"",
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleChannelChange = this.handleChannelChange.bind(this);
        this.handleSpeakerChange = this.handleSpeakerChange.bind(this);
        this.handleEpisodeChange = this.handleEpisodeChange.bind(this);
        this.handleEventDateChange = this.handleEventDateChange.bind(this);
        this.handleModeratorChange = this.handleModeratorChange.bind(this);
        this.handleThumbnail =this.handleThumbnail.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.cancel = this.cancel.bind(this);
        this.load = this.load.bind(this);
        this.new = this.new.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleVideo = this.handleVideo.bind(this);
    }

    componentDidMount() {
        Axios.get("/api/user/role/SPEAKER")
            .then((response) => {
                this.setState({
                    speakers: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get speakers");
            });
        Axios.get("/api/user/role/USER")
            .then((response) => {
                this.setState({
                    moderators: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get moderators");
            });

    }

    load(event) {
        this.setState({
            show : true,
            id: event.id,
            type:event.type,
            channelId: (event.channels !==null && event.channels.length > 0 ) ? event.channels[0].id : null,
            speakerId:event.speaker!==null ? event.speaker.id : null,
            episode : event.episode,
            eventDate : new Date(event.eventDate),
            moderatorId:event.moderator !== null ? event.moderator.id : null,
            videoFile:null,
            videoUrl:event.url,
            thumbnailFile:null,
            thumbnailUrl:event.thumbnail,
            topic: event.topic,
            description:event.description,
        });
    }

    new() {
        this.setState({
            show : true,
            id: null,
            type:"",
            channelId:"",
            speakerId:"",
            episode : "",
            eventDate : null,
            moderatorId:"",
            videoFile:null,
            videoUrl:"",
            thumbnailFile:null,
            thumbnailUrl:"",
            topic: "",
            description:"",
        });
    }

    cancel(){
        this.setState({
            show : false
        });
    }

    handleTypeChange(e){
        this.setState({
            type: e.target.value,
        });
        if(e.target.value && e.target.value==="Live") {
            Axios.get("/api/channel/category/Live streaming")
                .then((response) => {
                    this.setState({
                        channels: response.data,
                    });
                })
                .catch((error) => {
                    console.log("Error Get Channels list");
                });
        }else if(e.target.value && e.target.value==="Sourced") {
            Axios.get("/api/channel/category/Docspace originals")
                .then((response) => {
                    this.setState({
                        channels: response.data,
                    });
                })
                .catch((error) => {
                    console.log("Error Get Channels list");
                });
        }
    }

    handleChannelChange(e){
        this.setState({
            channelId: e.target.value,
        });
    }
    handleSpeakerChange(e){
        this.setState({
            speakerId: e.target.value,
        });
    }
    handleEpisodeChange(e){
        this.setState({
            episode: e.target.value,
        });
    }

    handleEventDateChange(e){
        this.setState({
            eventDate: e,
        });
    }

    handleModeratorChange(e){
        this.setState({
            moderatorId: e.target.value,
        });
    }

    handleThumbnail(e) {
        this.setState({
            thumbnailFile: e.target.files[0]
        });
    }
    handleVideo(e){
        this.setState({
            videoFile: e.target.files[0]
        });
    }

    handleTitleChange(e) {
        this.setState({
            topic: e.target.value,
        });
    }

    handleDescriptionChange(e){
        this.setState({
            description: e.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const config = {
            bucketName: 'docspace-thumbnail',
            region: 'us-east-2',
            accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
        };

        let videoUploaded = false;
        let thumbnailUploaded = false;
        if (this.state.videoFile !== null) {
            S3FileUpload.uploadFile(this.state.videoFile, config)
                .then((data) => {
                    console.log("videoFile uploaded to s3 : " + data.location);
                    this.setState({
                        videoUrl: data.location
                    }, () => {
                        videoUploaded = true;
                        this.submitForm(true, thumbnailUploaded)
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        error: true,
                        errorMessage: "upload to S3 failed. catch : " + err.message
                    });
                });
        } else {
            videoUploaded = true;
        }
        if (this.state.thumbnailFile !== null) {
            S3FileUpload.uploadFile(this.state.thumbnailFile, config)
                .then((data) => {
                    console.log("thumbnailFile uploaded to s3 : " + data.location);
                    this.setState({
                        thumbnailUrl: data.location
                    }, () => {
                        thumbnailUploaded = true;
                        this.submitForm(videoUploaded, true)
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        error: true,
                        errorMessage: "upload to S3 failed. catch : " + err.message
                    });
                });
        } else {
            thumbnailUploaded = true;
        }

        if (this.state.videoFile === null && this.state.thumbnailFile === null) {
            this.submitForm(true, true);
        }
    }

    submitForm(videoUploaded, thumbnailUploaded) {
        if (videoUploaded===true && thumbnailUploaded===true) {
            console.log("Submit event to data base ...");

            let payload = {
                id: this.state.id !== null ? this.state.id : null,
                type:this.state.type,
                channelId:this.state.channelId,
                speakerId:this.state.speakerId,
                episode : this.state.episode,
                eventDate : this.state.eventDate ? this.state.eventDate.toISOString() : null,
                moderatorId:this.state.moderatorId,
                url:this.state.videoUrl,
                thumbnail:this.state.thumbnailUrl,
                topic: this.state.topic,
                description:this.state.description,
            };
            Axios({
                method: "post",
                url: "/api/video",
                data: payload,
            })
                .then((response) => {
                    //handle success
                    this.props.reload();
                    this.setState({
                        show :false
                    })
                })
                .catch((error) => {
                    //handle error
                    console.log(error);
                    this.setState({
                        error: true,
                        errorMessage:
                            (error.response && error.response.data)
                                ? error.response.data
                                : error.message,
                    });
                });
        } else {
            return;
        }
    }

    displayError() {
        if (this.state.error) {
            return (<div><br/><Alert variant="danger">{this.state.errorMessage}</Alert></div>);
        }
        return null;
    }

    valid(current){
        let now = moment();
        return current.isAfter( now );
    }


    render() {
        if(this.state.show) {
            return (
                <Form id="new-speaker-form" className="speaker-form">
                    <Row>
                        <Col>
                            <span className="form-title">New Event</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group size="lg" name="type">
                                <Form.Control
                                    as="select"
                                    autoFocus
                                    required
                                    placeholder="Select Event Type"
                                    value={this.state.type}
                                    onChange={this.handleTypeChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Select Event Type*
                                    </option>
                                    <option>Live</option>
                                    <option>Sourced</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group size="lg" controlId="channel" name="channel">
                                <Form.Control
                                    as="select"
                                    autoFocus
                                    value={this.state.channelId ? this.state.channelId : ""}
                                    onChange={this.handleChannelChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Select Channel*
                                    </option>
                                    {this.state.channels.map((channel) => {
                                        return <option value={channel.id}
                                                       key={channel.id}>{channel.title}</option>;
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group size="lg" controlId="speaker" name="speaker">
                                <Form.Control
                                    as="select"
                                    autoFocus
                                    value={this.state.speakerId ? this.state.speakerId : ""}
                                    onChange={this.handleSpeakerChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Select Speaker*
                                    </option>
                                    {this.state.speakers.map((speaker) => {
                                        return <option value={speaker.id}
                                                       key={speaker.id}>{speaker.salutation + " " + speaker.firstName + " " + speaker.lastName}</option>;
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group size="lg" controlId="episode" name="episode">
                                <Form.Control
                                    autoFocus
                                    required
                                    placeholder="Episode No.*"
                                    value={this.state.episode}
                                    onChange={this.handleEpisodeChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group size="lg" controlId="eventDate" name="eventDate">
                                <Datetime inputProps={{placeholder: "Date of the event"}}
                                          value={this.state.eventDate}
                                          onChange={this.handleEventDateChange}
                                          isValidDate={this.valid}/>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.File
                                id="thumbnail"
                                label="Upload Thumbnail"
                                custom
                                onChange={this.handleThumbnail}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group size="lg" controlId="moderator" name="moderator">
                                <Form.Control
                                    as="select"
                                    autoFocus
                                    value={this.state.moderatorId ? this.state.moderatorId : ""}
                                    onChange={this.handleModeratorChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Select Moderator*
                                    </option>
                                    {this.state.moderators.map((moderator) => {
                                        return <option value={moderator.id}
                                                       key={moderator.id}>{moderator.salutation + " " + moderator.firstName + " " + moderator.lastName}</option>;
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.File
                                id="video"
                                label="Upload Video*"
                                custom
                                onChange={this.handleVideo}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group size="lg" controlId="title" name="title">
                                <Form.Control
                                    autoFocus
                                    required
                                    placeholder="Title of the event*"
                                    value={this.state.topic}
                                    onChange={this.handleTitleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group size="lg" controlId="summary" name="summary">
                                <Form.Control as="textarea"
                                              placeholder="Summary of the event*"
                                              value={this.state.description}
                                              onChange={this.handleDescriptionChange} rows={3}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-end">
                            <Button type="submit" onClick={this.handleSubmit}>Save</Button>
                            <Button style={{"margin-left": "10px"}} onClick={this.cancel}>Cancel</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.displayError()}
                        </Col>
                    </Row>
                </Form>
            );
        }else{
            return null;
        }
    }
}

export default EventForm;
