import React, {useState} from "react";

export const TweetForm = ({addNewTweet}) => {
    const [tweetContent, setTweetContent] = useState("")

    return <>
        <label htmlFor={"newMsg"}>New tweet</label>
        <textarea id="newMsg" onChange={(e) => setTweetContent(e.target.value)}/>
        <button onClick={() => addNewTweet(tweetContent)}>send</button>
    </>
}
