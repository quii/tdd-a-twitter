import React, {useState} from 'react'

const Index = () => {
    const [tweets, setNewTweets] = useState([])

    const addNewTweet = (tweet) => setNewTweets(tweets.concat([tweet]))

    return <>
        <TweetForm addNewTweet={addNewTweet}/>
        <TweetList tweets={tweets}/>
    </>
}

const TweetList = ({tweets}) => <ol>
    {tweets.map(tweet => <li key={tweet}>{tweet}</li>)}
</ol>

const TweetForm = ({addNewTweet}) => {
    const [tweetContent, setTweetContent] = useState("")

    return <>
        <label htmlFor={"newMsg"}>New tweet</label>
        <textarea id="newMsg" onChange={(e) => setTweetContent(e.target.value)}/>
        <button onClick={() => addNewTweet(tweetContent)}>send</button>
    </>
}


export default Index
