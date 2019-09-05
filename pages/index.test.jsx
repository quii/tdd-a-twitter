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
