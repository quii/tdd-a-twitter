import React from "react";

export const TweetList = ({tweets}) => <ol>
    {tweets.map(tweet => <li key={tweet}>{tweet}</li>)}
</ol>
