import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getTweetsOfUser, getAllUsers, getUserBySearch, getAllOfTweets, newTweet, likingTweet, replyingToTweet, updatingTheTweet, deletingTheTweet } from '../services/newUser';
import Card from 'react-bootstrap/Card';
import '../css/Welcome.css';
import { useLocation } from "react-router-dom";
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchByUsernameModal from '../modals/SearchByUsernameModal';
import Users from './Users';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Tweets from './Tweets';
import 'react-comments-section/dist/index.css';
import profileImage from '../images/profileImage.jpeg';
import { Fade as Hamburger } from 'hamburger-react';
import Moment from 'react-moment';

function Welcome() {

  let navigate = useNavigate();
  const location = useLocation();

  const dateToFormat = '1976-04-19T12:59-0500';

  const [searchByUsername, setSearchByUsername] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [isGetUserByUsername, setisGetUserByUsername] = useState(false);
  const [userRecord, setUserRecord] = useState([]);

  const [isGetAllTweets, setisGetAllTweets] = useState(false);
  const [tweetsList, setTweetsList] = useState([]);

  const [isGetUsers, setisGetUsers] = useState(false);
  const [usersList, setUsersList] = useState([]);

  const [isGetUserTweets, setisGetUserTweets] = useState(false);
  const [userTweetList, setUserTweetList] = useState([]);

  const [dataForComment, setDataForComment] = useState([]);

  const [openReplyTextBox, setOpenReplyTextBox] = useState(false);

  const [openEditTextBox, setOpenEditTextBox] = useState(false);

  const [openPostTextBox, setOpenPostTextBox] = useState(false);

  const [showLikedUser, setShowLikedUser] = useState(false);

  const [replyingTweetUser, setReplyingTweetUser] = useState("");
  const [likedTweetUser, setLikedTweetUser] = useState("");
  const [updatingTweetUser, setUpdatingTweetUser] = useState("");

  const [tweettext, setTweettext] = useState("");
  const [openHamburger, setOpenHamburger] = useState(false)

  const onTweettextChange = (event) => {
    setTweettext(event.target.value)
  }

  const [tweetupdate, setTweetupdate] = useState("");

  const onTweetupdateChange = (event) => {
    setTweetupdate(event.target.value)
  }

  const [tweetpost, setTweetpost] = useState("");

  const onTweetpostChange = (event) => {
    setTweetpost(event.target.value)
  }

  const getTweets = async () => {
    const response = await getTweetsOfUser(location.state.name);
    console.log(response,"resonse ")
    if (response.length > 0 || response.length===0 ) {
      setisGetUserTweets(true);
      setTweetpost("");
      setUserTweetList(response);
      setDataForComment(response);
      setisGetUsers(false);
      setisGetAllTweets(false);
    }
  }

  useEffect(() => {
    getTweets();
  },
    []);

  const getUsers = async () => {
    const response = await getAllUsers();
    if (response.length > 0) {
      setisGetUsers(true);
      setUsersList(response);
      setisGetUserTweets(false);
      setisGetAllTweets(false);
    }
  }

  const getAllTweets = async () => {
    const response = await getAllOfTweets();
    if (response.length > 0) {
      setisGetAllTweets(true);
      setTweetsList(response);
      setisGetUserTweets(false);
      setisGetUsers(false);
    }
  }

  const getUserByUsername = async () => {
    const response = await getUserBySearch(searchByUsername);
    setOpenModal(true);
    setisGetUserByUsername(true);
    setUserRecord(response);
  }

  const onClickPost = async () => {
    setOpenPostTextBox(true);
  }

  //Post Tweet
  const addTweet = async (tweetpost) => {
    try {
      const newTweetAdded = await newTweet(tweetpost, location.state.name);
      if (newTweetAdded === "Tweet Posted") {
        setTweetpost("");
        getTweets();
        setOpenPostTextBox(false);
        toast.success('Successfully Posted', {
          autoClose: 500
        });
      }

    }
    catch (error) {
    }
  }

  //Like Tweet
  const likeTweet = async (loggedInUserDetails) => {
    try {
      const likedTweet = await likingTweet(loggedInUserDetails);
      if (likedTweet.length > 0) {
        getTweets();
        toast.success('Tweet Liked', {
          autoClose: 1000
        });
      }
    }
    catch (error) {
    }
  }

  const onClickReply = async (replyTweetUser) => {
    setOpenReplyTextBox(true);
    setOpenEditTextBox(false);
    setReplyingTweetUser(replyTweetUser.tweetId)

  }

  //Reply Tweet
  const replyTweet = async (tweettext, replyUsersDetails) => {
    try {
      const repliedTweet = await replyingToTweet(tweettext, replyUsersDetails);
      if (repliedTweet.length > 0) {
        getTweets();
        setOpenReplyTextBox(false);
        toast.success('Successfully replied', {
          autoClose: 1000
        });
      }
    }
    catch (error) {
    }

  }
  const onFocusLike = (likedBy, likedUser) => {
    setShowLikedUser(true);
    setLikedTweetUser(likedUser)
  }

  const onClickEdit = async (UpdateTweetUser) => {
    setOpenReplyTextBox(false);
    setOpenEditTextBox(true);
    setUpdatingTweetUser(UpdateTweetUser.tweetId)
  }

  //Update Tweet
  const updateTweet = async (tweetupdate, updateTweetUsersDetails) => {
    try {
      const updatedTweet = await updatingTheTweet(tweetupdate, updateTweetUsersDetails);
      if (updatedTweet === "Tweet Updated") {
        getTweets();
        setOpenEditTextBox(false);
        toast.success('Successfully Updated', {
          autoClose: 1000
        });
      }
    }
    catch (error) {
    }
  }

  //Delete Tweet
  const deleteTweet = async (deleteTweetOfUser) => {
    try {
      const deletedTweet = await deletingTheTweet(deleteTweetOfUser);
      if (deletedTweet === "Tweet Deleted") {
        getTweets();
        toast.success('Successfully Deleted', {
          autoClose: 1000
        });
      }
    }
    catch (error) {
    }
  }

  const onClicking = () => {
    console.log("Button Clicked")
    navigate("/")
  }

  const searchByUsernameChange = (event) => {
    setSearchByUsername(event.target.value)
  }

  const closeModal = () => setOpenModal(false)

  const saveAndClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      {openModal && <SearchByUsernameModal
        openModal={openModal}
        closeModal={closeModal}
        saveAndClose={saveAndClose}
        userRecord={userRecord}
      />
      }

      <Container>
        <Row>
          <Col>
            <nav class="navbar navbar-light bg-light justify-content-between">
              <h2 class="navbar-brand">Hello <b><i>{location.state.name} !</i></b></h2>
              <div class="d-flex justify-content-center p-3 " >

                <input variant="filled" placeholder="Search by Username" class='form-control'
                  type="text" onChange={searchByUsernameChange} value={searchByUsername
                  } />
                <button class="btn btn-outline-success my-2 my-sm-0"
                  onClick={getUserByUsername} >Search</button>
              </div>
              <Hamburger toggled={openHamburger} toggle={setOpenHamburger} />
            </nav>
            {openHamburger && <div style={{ float: 'right' }}>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div style={{ cursor: 'pointer' }}
                    onClick={onClicking} >Logout</div>
                </li>
                <li class="list-group-item">

                  <div style={{ cursor: 'pointer' }}
                    onClick={getUsers}> All Users
                  </div>
                </li>
                <li class="list-group-item">
                  <div style={{ cursor: 'pointer' }}
                    onClick={getAllTweets}>
                    All Tweets
                  </div>
                </li>

              </ul>
            </div>
            }
          </Col>
        </Row>
      </Container>
      <ToastContainer />

      {
        isGetUserTweets ? <div class="container">
          <form>
            <div class="form-group">
              <textarea maxLength="144" class="form-control status-box" data-testid="tweetPost"  rows="3" placeholder="Enter your tweet here..." value={tweetpost} onChange={onTweetpostChange} ></textarea>
            </div>
          </form>
          <div class="button-group pull-right">
            <p class="counter">144</p>
            <button type="button" data-testid="postTweetButton" class="btn btn-success btn-rounded btn-block btn-lg my-4" onClick={() => addTweet(tweetpost)}
              disabled={!tweetpost} ><i
                class="far fa-clock me-2"></i>Post Tweet</button>
          </div>
        </div> : ""}

      <div>
        {
          openPostTextBox && <div>
            <textarea type="text" onChange={onTweetpostChange} />
            <button type="button" onClick={() => addTweet(tweetpost)}>Submit</button>
          </div>
        }
      </div>

      {
        isGetUserTweets ? userTweetList && userTweetList.map((item, index) => {

          return <div class="container"> <Card style={{ backgroundColor: "#93e2bb", marginBottom: "20px" }}>
            <Card.Body>
              <div class="container">
                <div class="row">
                  <div class="col-xs-12 col-md-4 col-lg-4 bootstrap snippets bootdeys">
                    <div class="widget panel">
                      <div class="panel-body">
                        <h4 class="mb0">Tweet
                          <i class="fa fa-twitter text-info pull-right"></i>
                        </h4>
                        <hr></hr>
                        <div class="list-table
          d-flex justify-content-between"
                        >
                          <div style={{ marginRight: '10px' }}>
                            <img class="img-circle img-bordered-primary" src={profileImage} alt="" width="65px" height="65px" />
                          </div>
                          <div class="text-left" style={{ width: '500px' }}>
                            <h5><b>{item.loginId}</b></h5>
                            <p>{item.tweet}</p>
                          </div>
                          <div class="text-right">
                            <p>
                              <Moment format="DD-MM-YYYY">
                                {item.date_time}
                              </Moment>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <button type="button" class="btn  btn-rounded btn-sm"
                          onMouseOver={() => onFocusLike(item.likedTweets, item.tweetId)} onMouseLeave={() => setShowLikedUser(false)}
                          onClick={() => likeTweet(item)}>{item.likedTweets && item.likedTweets.length}  {""}
                          {item.likedTweets && item.likedTweets.length ? "Likes" : "Like"}
                          <img src="https://img.icons8.com/cute-clipart/64/000000/thumb-up.png" style={{ width: '30px' }} alt="Like" />
                        </button>
                        <button type="button" class="btn btn-outline-dark btn-rounded btn-sm"
                          data-mdb-ripple-color="dark" onClick={() => onClickReply(item)}>Reply</button>
                        <button type="button" class="btn btn-outline-dark btn-rounded btn-sm"
                          data-mdb-ripple-color="dark" onClick={() => onClickEdit(item)}>Edit Tweet</button>
                        <button type="button" class="btn btn-outline-dark btn-rounded btn-sm"
                          data-mdb-ripple-color="dark" onClick={() => deleteTweet(item)}>Delete Tweet</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {
                showLikedUser && (item.tweetId === likedTweetUser) && <div class="container"><h6 style={{ paddingTop: "0px" }}>{item.likedTweets && item.likedTweets[0]
                }</h6>
                </div>
              }
              {
                item.reply === null ? "" :

                  <div class="container">
                    <ul class="list-group">
                      <li class="list-group-item">
                        <p class="nm"> <a href="javascript:void(0);">{item.reply[0]}</a></p>
                        <p class="nm">{item.reply[1]}</p>
                      </li>
                    </ul>
                  </div>
              }

              {
                openReplyTextBox && (item.tweetId === replyingTweetUser) && <div class="container">
                  <form>
                    <div class="form-group">
                      <textarea maxLength="144" class="form-control status-box" rows="3" placeholder="Reply..." onChange={onTweettextChange} ></textarea>
                    </div>
                  </form>
                  <div class="button-group pull-right">
                    <button type="button" class="btn btn-success btn-rounded btn-block btn-lg my-4" onClick={() => replyTweet(tweettext, item)}  ><i
                      class="far fa-clock me-2"></i>Comment</button>
                  </div>
                </div>
              }

              <div>
                {
                  openEditTextBox && (item.tweetId === updatingTweetUser) && <div class="container">
                    <form>
                      <div class="form-group">
                        <textarea maxLength="144" class="form-control status-box" rows="3" defaultValue={item.tweet} onChange={onTweetupdateChange} ></textarea>
                      </div>
                    </form>
                    <div class="button-group pull-right">
                      <button type="button" class="btn btn-success btn-rounded btn-block btn-lg my-4" onClick={() => updateTweet(tweetupdate, item)}  ><i
                        class="far fa-clock me-2"></i>Update</button>
                    </div>
                  </div>
                }
              </div>
            </Card.Body>
          </Card>
          </div>
        }
        ) : ""
      }

      {
        (isGetUsers || isGetAllTweets) && <div class="container">
          <button type="button" class="btn btn-success btn-rounded btn-block btn-lg my-4" value="Back"
            onClick={getTweets} >Back to My Profile</button></div>
      }

      {
        isGetUsers && <Users usersList={usersList} />
      }

      {
        isGetAllTweets && <Tweets tweetsList={tweetsList} />
      }
    </>
  );
}

export default Welcome