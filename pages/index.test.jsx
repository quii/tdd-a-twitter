import React from "react";
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Index from "./index";

describe("index", () => {
    it('can post new messages', () => {
        const msg = 'i like cats';

        const {getByText, getByLabelText} = render(<Index/>);
        fireEvent.change(getByLabelText('New tweet'), {target: {value: msg}})
        fireEvent.click(getByText('send'))

        expect(getByText(msg)).toBeInTheDocument()
    })
})
