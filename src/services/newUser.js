import axios from 'axios';

//Registering a New User
const newUser = async (newUser) => {
  const response = await axios.post('http://localhost:9092/api/v1.0/tweets/register', newUser);
  return response.data;
}

//Password Reset
const passwordReset = async (forgotP) => {
  const response = await axios.get(`http://localhost:9092/api/v1.0/tweets/${forgotP.username}/forgot`, {
    params: {
      password: forgotP.password
    }
  })
  return response.data;
}

//Login
const loginD = async (loginD) => {
  const response = await axios.get(`http://localhost:9092/api/v1.0/tweets/login`, {
    params: {
      username: loginD.username,
      password: loginD.password
    }
  })
  return response.data;
}

//Get the tweets of User
const getTweetsOfUser = async (username) => {
  const response = await axios.get(`http://localhost:9092/api/v1.0/tweets/username`, {
    params: {
      username: username
    }
  });
  return response.data;
}

//Get all the users
const getAllUsers = async () => {
  const response = await axios.get(`http://localhost:9092/api/v1.0/tweets/users/all`);
  return response.data;
}

//Search a user by username
const getUserBySearch = async (username) => {
  const response = await axios.get(`http://localhost:9092/api/v1.0/tweets/user/search/`, {
    params: {
      username: username
    }
  });
  return response.data;
}

//Get all the tweets
const getAllOfTweets = async () => {
  const response = await axios.get(`http://localhost:9092/api/v1.0/tweets/all`);
  return response.data;
}

//Post Tweet : TweetDTO tweetText (input param)
const newTweet = async (tweetpost, name) => {
  const response = await axios.post(`http://localhost:9092/api/v1.0/tweets/${name}/add`, {
    tweet: tweetpost
  });
  return response.data;
}

//Like Tweet
const likingTweet = async (loggedInUserDetails) => {
  const response = await axios.put(`http://localhost:9092/api/v1.0/tweets/${loggedInUserDetails.loginId}/like/${loggedInUserDetails.tweetId}`);
  return response.data;
}

const likingAllTweets = async (loggedInUserDetails, name) => {
  const response = await axios.put(`http://localhost:9092/api/v1.0/tweets/${name}/like/${loggedInUserDetails.tweetId}`);
  return response.data;
}

//Reply Tweet : TweetDTO tweetText (input param)
const replyingToTweet = async (tweettext, replyUsersDetails) => {
  const response = await axios.post(`http://localhost:9092/api/v1.0/tweets/${replyUsersDetails.loginId}/reply/${replyUsersDetails.tweetId}`, {
    tweet: tweettext
  });
  return response.data;
}

const replyingInAllTweets = async (tweettext, replyUsersDetails, name) => {
  const response = await axios.post(`http://localhost:9092/api/v1.0/tweets/${name}/reply/${replyUsersDetails.tweetId}`, {
    tweet: tweettext
  });
  return response.data;
}

//Update Tweet : TweetDTO tweetText (input param)
const updatingTheTweet = async (tweetupdate, updateTweetUsersDetails) => {
  const response = await axios.put(`http://localhost:9092/api/v1.0/tweets/${updateTweetUsersDetails.loginId}/update/${updateTweetUsersDetails.tweetId}`, {
    tweet: tweetupdate
  });
  return response.data;
}

//Delete Tweet
const deletingTheTweet = async (deleteTweetOfUser) => {
  const response = await axios.delete(`http://localhost:9092/api/v1.0/tweets/${deleteTweetOfUser.loginId}/delete/${deleteTweetOfUser.tweetId}`);
  return response.data;
}

export { newUser, passwordReset, loginD, getTweetsOfUser, getAllUsers, getUserBySearch, getAllOfTweets, newTweet, likingTweet, replyingInAllTweets, replyingToTweet, likingAllTweets, updatingTheTweet, deletingTheTweet }