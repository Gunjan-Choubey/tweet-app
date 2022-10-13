import React from 'react';
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { likingAllTweets, getAllOfTweets, replyingInAllTweets } from '../services/newUser';
import profileImage from '../images/profileImage.jpeg'
import '../css/Welcome.css';
import Moment from 'react-moment';

function Tweets(props) {

  const location = useLocation();

  const [isGetAllTweets, setisGetAllTweets] = useState(false);
  const [tweetsList, setTweetsList] = useState([]);

  const [isGetUserTweets, setisGetUserTweets] = useState(false);
  const [userTweetList, setUserTweetList] = useState(props.tweetsList);

  const [openReplyTextBox, setOpenReplyTextBox] = useState(false);

  const [showLikedUser, setShowLikedUser] = useState(false);

  const [replyingTweetUser, setReplyingTweetUser] = useState("");

  const [tweettext, setTweettext] = useState("");
  const [likedTweetUser, setLikedTweetUser] = useState("");

  const onTweettextChange = (event) => {
    setTweettext(event.target.value)
  }

  const getAllTweets = async () => {
    const response = await getAllOfTweets();
    if (response.length > 0) {
      setisGetAllTweets(true);
      setUserTweetList(response);
      setisGetUserTweets(false);
    }
  }

  //Like Tweet
  const likeTweet = async (loggedInUserDetails) => {
    try {
      const likedTweet = await likingAllTweets(loggedInUserDetails, location.state.name);
      if (likedTweet.length > 0) {
        getAllTweets();
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
    setReplyingTweetUser(replyTweetUser.tweetId)
  }

  //Reply Tweet
  const replyTweet = async (tweettext, replyUsersDetails) => {
    try {
      const repliedTweet = await replyingInAllTweets(tweettext, replyUsersDetails, location.state.name);
      if (repliedTweet.length > 0) {
        getAllTweets();
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

  return (
    <>
      {
        userTweetList && userTweetList.map((item, index) => {
          return <div class="container"> <Card class='my-4' style={{ backgroundColor: "#93e2bb", marginBottom: "20px" }}>
            <Card.Body><div class="container">
              <div class="row">
                <div class="col-xs-12 col-md-4 col-lg-4 bootstrap snippets bootdeys">
                  <div class="widget panel">
                    <div class="panel-body">
                      <h4 class="mb0">Tweet
                        <i class="fa fa-twitter text-info pull-right"></i>
                      </h4>
                      <hr></hr>
                      <div class="list-table d-flex justify-content-between"
                      >
                        <div style={{ marginRight: '10px' }}>
                          <img class="img-circle img-bordered-primary" src={profileImage} alt="" width="65px" height="65px" />
                        </div>
                        <div class="d-flex">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

              {
                showLikedUser && (item.tweetId === likedTweetUser) && <div class="container"><h6>{item.likedTweets && item.likedTweets[0]
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

            </Card.Body>
          </Card>
          </div>
        }
        )}
    </>
  );
}

export default Tweets