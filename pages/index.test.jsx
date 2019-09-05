import React from "react";
import {render} from '@testing-library/react'
import Index from "./index";

describe("index", () => {
    it("says hello", () => {
        const {getByText} = render(<Index/>);
        expect(getByText('Hello, world')).toBeDefined()
    })
})
