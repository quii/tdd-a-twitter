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
- `$ yarn add --dev @testing-library/react jest`
- Add `"test": "jest"` to the `scripts` section in your `package.json`
- Add a file `index.spec.js` inside `pages`
- Add the following code

```javascript
describe("index", () => {
    it("says hello", () => {
        expect(1).toBe(2)
    })
})
```

Run the test with `yarn test` or press the magic button in your IDE. We want to check the test runs and it fails. 

Assuming it does, fix it and commit your code to source control as we now have a project we can work with

