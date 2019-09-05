# TDD a twitter

## Prerequisites

- You can do computer
- You have a working knowledge of TDD
- Node 12

## Goals

- Understand how to break problems down and iterate toward a goal
- Make your real work always feel like those small examples
- Software development should always feel easy! 
- We'll use Next.js for this as we generally make websites with React and all that

## Iterations

### 1. Hello, world

- Depending on your programming language of choice setting up a simple webserver with an automated test can be a bit involved so this first iteration is about setting up our tooling
- `$ npx create-next-app`
- `$ yarn add --dev @testing-library/react @testing-library/jest-dom jest`
- Add `"test": "jest"` to the `scripts` section in your `package.json`
- Add a file `index.test.jsx` inside `pages`
- Add the following code

```javascript
describe("Index", () => {
    it("says hello", () => {
        expect(1).toBe(2)
    })
})
```

Run the test with `yarn test` or press the magic button in your IDE. We want to check the test runs and it fails. 

Assuming it does, fix it and commit your code to source control as we now have a project we can work with

#### Testing our Index component

Change the test file to the following 

````javascript
import React from "react";
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Index from "./index";

describe("index", () => {
    it("displays some insights from thoughtleaders", () => {
        const {getByText} = render(<Index/>);
        expect(getByText('Hello, world')).toBeInTheDocument()
    })
})
````

You'll need to add a `.babelrc` and `jest.config.js` to let jest understand how to work with our JSX

```
// .babelrc
{
  "presets": ["next/babel"]
}

// jest.config.js
module.exports = {
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
}
```

The test should fail. Fix it by changing our `index.js` file

````javascript
import React from 'react'

const Index = () => "Hello, world"

export default Index
````

Our first iteration is done, run it with `yarn dev` and bask in the glory.

## Iteration 2 - Display some hard-coded tweets

The first iteration was easy enough but how do we make a start with our Twitter clone?

We could start architecting all sorts of interesting microservices, monoserverless, jenkins-flow architecture.... or we could try and start with something super simple.

Let's just render some hard-coded messages for now.

### Aggressive descoping

We wont bother with dates, authors or any things like replying or retweeting.  

This will drive us forward and force us to fill out our UI a little and most importantly... is really easy!

### Red

```javascript
import React from "react";
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Index from "./index";

describe("index", () => {
    it("displays some thoughtleading messages", () => {
        const {getByText} = render(<Index/>);
        expect(getByText('Go is the best language')).toBeInTheDocument()
        expect(getByText('Scrum can get in the sea')).toBeInTheDocument()
        expect(getByText('You dont know what CI really means')).toBeInTheDocument()
    })
})
```

### Green

```javascript
import React from 'react'

const Index = () => <ol>
    <li>Go is the best language</li>
    <li>Scrum can get in the sea</li>
    <li>You dont know what CI really means</li>
</ol>

export default Index
```

### Refactor

```javascript
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
```

Separating the data from the presentation feels like the right thing to do here.

## Iteration 3 - Add a tweet

It makes sense that users should be able to add tweets to our website. 

### Aggressive descoping

- No author
- No validation
- No dates
- Just text! 

### Red
```javascript

it('can post new messages', () => {
    const msg = 'i like cats';

    const {getByText, getByLabelText} = render(<Index/>);
    fireEvent.change(getByLabelText('message'), {target: {value: msg}})
    fireEvent.click(getByText('send'))

    expect(getByText(msg)).toBeInTheDocument()
})
```

### Green
```javascript
import React, {useState} from 'react'

const Index = () => {
    const [tweetContent, setTweetContent] = useState("")
    const [tweets, setNewTweets] = useState([
        'Go is the best language',
        'Scrum can get in the sea',
        'You dont know what CI really means',
    ])

    return <>
        <div>
            <label htmlFor={"newMsg"}>New tweet</label>
            <textarea id="newMsg" onChange={(e) => setTweetContent(e.target.value)}/>
            <button onClick={() => {
                setNewTweets(tweets.concat([tweetContent]))
            }}>send
            </button>
        </div>
        < ol>
            {tweets.map(tweet => <li key={tweet}>{tweet}</li>)}
        </ol>
    </>
}

export default Index
```

Yeah it doesn't look great but it's the minimum required to make the test pass and at this stage that's all we're concerned with. 

We can make it nice in the refactor stage

### Refactor

Before refactoring it would be prudent to delete our old test (with the hard-coded data). 

The first test's functionality (listing messages) is now implicitly tested by our second test so we may as well get rid of it. We should only keep hold of tests if they provide us value. This will free us up to remove the hard-coded data from our component too.

Please note I arrived at this code over a number of small changes whilst constantly running my tests to make sure I haven't broken anything

```javascript
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
```

This feels like a decent refactor by separating the concerns of rendering the tweets and inputting new ones

I put the new components in separate files as we're bound to expand upon them soon.
