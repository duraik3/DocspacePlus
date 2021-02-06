import React from "react";
import {Button, Col, Form, Row, Alert} from "react-bootstrap";
import Axios from "axios";
import S3FileUpload from 'react-s3';

class ChannelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            sponsors: [],
            error: false,
            errorMessage: "",
            id: null,
            title: "",
            description:"",
            sponsorId: "",
            category: "",
            banner: "",
            smallBanner: "",
            bannerFile: null,
            smallBannerFile: null,
            bannerUrl: "",
            smallBannerUrl: "",
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSponsorChange = this.handleSponsorChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleBanner = this.handleBanner.bind(this);
        this.handleSmallBanner = this.handleSmallBanner.bind(this);
        this.load = this.load.bind(this);
        this.new = this.new.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    componentDidMount() {
        Axios.get("/api/user/role/USER")
            .then((response) => {
                this.setState({
                    sponsors: response.data,
                });
            })
            .catch((error) => {
                console.log("Error Get sponsors");
            });
    }

    load(channel) {
        this.setState({
            show : true,
            id: channel.id,
            title: channel.title,
            description : channel.description,
            sponsorId: (channel.sponsor!==null && channel.sponsor.id !=null )? channel.sponsor.id.toString() : "",
            category: channel.category,
            banner: channel.banner,
            smallBanner: channel.smallBanner,
            bannerFile: null,
            smallBannerFile: null,
        });
    }

    new() {
        this.setState({
            show : true,
            id: null,
            title: "",
            description:"",
            sponsorId: "",
            category: "",
            banner: "",
            smallBanner: "",
            bannerFile: null,
            smallBannerFile: null,
        });
    }

    cancel(){
        this.setState({
            show : false
        });
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value,
        });
    }
    handleDescriptionChange(e){
        this.setState({
            description: e.target.value,
        });
    }

    handleSponsorChange(e) {
        this.setState({
            sponsorId: e.target.value,
        });
    }

    handleCategoryChange(e) {
        this.setState({
            category: e.target.value,
        });
    }

    handleBanner(e) {
        this.setState({
            bannerFile: e.target.files[0]
        });
    }

    handleSmallBanner(e) {
        this.setState({
            smallBannerFile: e.target.files[0]
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const config = {
            bucketName: 'docspace-channel',
            region: 'us-east-2',
            accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
        };

        let bannerUploaded = false;
        let smallBannerUploaded = false;
        if (this.state.bannerFile !== null) {
            S3FileUpload.uploadFile(this.state.bannerFile, config)
                .then((data) => {
                    this.setState({
                        bannerUrl: data.location
                    }, () => {
                        bannerUploaded = true;
                        this.submitChannel(true, smallBannerUploaded)
                    });
                })
                .catch((err) => {
                    console.log(err)
                });
        } else {
            bannerUploaded = true;
        }
        if (this.state.smallBannerFile !== null) {
            S3FileUpload.uploadFile(this.state.smallBannerFile, config)
                .then((data) => {
                    this.setState({
                        smallBannerUrl: data.location
                    }, () => {
                        smallBannerUploaded = true;
                        this.submitChannel(bannerUploaded, true)
                    });
                })
                .catch((err) => {
                    console.log(err)
                });
        } else {
            smallBannerUploaded = true;
        }

        if (this.state.bannerFile === null && this.state.smallBannerFile === null) {
            this.submitChannel(true, true);
        }
    }

    submitChannel(bannerUploaded, smallBannerUploaded) {
        if (bannerUploaded && smallBannerUploaded) {
            let payload = {
                id: this.state.id !== null ? this.state.id : null,
                title: this.state.title,
                description: this.state.description,
                sponsorId: this.state.sponsorId,
                category: this.state.category,
                banner: this.state.bannerUrl,
                smallBanner: this.state.smallBannerUrl,
            };

            Axios({
                method: "post",
                url: "/api/channel",
                data: payload,
            })
                .then((response) => {
                    //handle success
                    this.props.reload();
                    this.setState({
                        show :false
                    });
                })
                .catch((error) => {
                    //handle error
                    console.log(error);
                    this.setState({
                        error: true,
                        errorMessage:
                            error.response && error.response.data
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


    render() {
        if(this.state.show) {
            return (
                <Form id="new-speaker-form" className="speaker-form">
                    <Row>
                        <Col>
                            <span className="form-title">New Channel</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group size="lg" controlId="name" name="name">
                                <Form.Control
                                    autoFocus
                                    required
                                    placeholder="Name of the channel*"
                                    value={this.state.title}
                                    onChange={this.handleTitleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group size="lg" controlId="sponsor" name="sponsor">
                                <Form.Control
                                    as="select"
                                    autoFocus
                                    value={this.state.sponsorId ? this.state.sponsorId : ""}
                                    onChange={this.handleSponsorChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Select Sponsor*
                                    </option>
                                    {this.state.sponsors.map((sponsor) => {
                                        return <option value={sponsor.id}
                                                       key={sponsor.id}>{sponsor.salutation + " " + sponsor.firstName + " " + sponsor.lastName}</option>;
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group size="lg" name="category">
                                <Form.Control
                                    as="select"
                                    autoFocus
                                    required
                                    placeholder="Select Category"
                                    value={this.state.category ? this.state.category : ""}
                                    onChange={this.handleCategoryChange}
                                >
                                    <option value="" selected disabled hidden>
                                        Select Category*
                                    </option>
                                    <option>Live streaming</option>
                                    <option>Docspace originals</option>
                                    <option>Others</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Form.File
                                id="banner-file"
                                label="Upload Banner"
                                custom
                                onChange={this.handleBanner}
                            />
                        </Col>
                        <Col md={4}>
                            <Form.File
                                id="small-banner-file"
                                label="Landing Banner"
                                custom
                                onChange={this.handleSmallBanner}
                            />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Form.Group size="lg" controlId="summary" name="summary">
                                <Form.Control as="textarea"
                                              placeholder="Description*"
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

export default ChannelForm;
