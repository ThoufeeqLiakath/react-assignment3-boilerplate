import Footer from '../Components/footer/Footer';
import React from 'react';
import {render,unmountComponentAtNode} from 'react-dom';
import { act } from 'react-dom/test-utils';
// import {useHistory} from 'react-router-dom';

// please add your test cases here

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})
// it('h6 is available',() => {
//     act(() => {
//         render(<Footer />,container);
//         const title = container.querySelector('h6');
//         expect(title).toBeInTheDocument();
//     })
// })
// it('h6 has MuiTypography-h6',() => {
//     act(() => {
//         render(<Footer />,container);
//         const title = container.querySelector('h6');
//         expect(title).toHaveClass('MuiTypography-h6')
//     })
// })
it('h6 should have text CopyRight',() => {
    act(() => {
        render(<Footer />, container);
        const h6 =  container.querySelector('h6');
        expect(h6.textContent).toBe('@copyright to Cognizant')
    })
})

// it('header available',() => {
//     act(() => {
//         render(<Footer />, container);
//         const header =  container.querySelector('header');
//         expect(header).toBeInTheDocument()
//     })
// })


// it('div available',() => {
//     act(() => {
//         render(<Footer />, container);
//         const div =  container.querySelector('div');
//         expect(div).toBeInTheDocument()
//     })
// })
// please add your test cases here
export default Footer;