import React from 'react'

const Index = () => {
    const tweets = [
        'Go is the best language',
        'Scrum can get in the sea',
        'You dont know what CI really means',
    ]

    return (<ol>
        {tweets.map(tweet => <li>{tweet}</li>)}
    </ol>)
}

export default Index
