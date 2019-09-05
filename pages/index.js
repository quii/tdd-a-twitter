import React, {useState} from 'react'
import {TweetList} from "./TweetList";
import {TweetForm} from "./TweetForm";

const Index = () => {
    const [tweets, setNewTweets] = useState([])
    const addNewTweet = (tweet) => setNewTweets(tweets.concat([tweet]))

    return <>
        <TweetForm addNewTweet={addNewTweet}/>
        <TweetList tweets={tweets}/>
    </>
}


export default Index
