import { render, fireEvent, wait } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import Application from './App';
import { renderIntoDocument } from 'react-dom/test-utils';


const data = [
    { fname: "lalit", lname: "dhiman", pnumber: "1234567890" },
    { fname: "lalit", lname: "kumar", pnumber: "1234567899" },
];

const setupFname = () => {
    const utils = render(<Application data={data} />)
    const input = utils.getByLabelText('firstName')
    return {
      input,
      ...utils
    }
  }

  const setupLname = () => {
    const utils = render(<Application data={data} />)
    const input = utils.getByLabelText('lastName')
    return {
      input,
      ...utils
    }
  }

  const setupNumber = () => {
    const utils = render(<Application data={data} />)
    const input = utils.getByLabelText('phoneNumber')
    return {
      input,
      ...utils
    }
  }

  const setUpForm = () => {
    const utils = render(<Application data={data} />)
    const form = utils.getByLabelText('formContact')
    return {
      form,
      ...utils
    }
  }


it('Should render Form', () => {
    const { getByTestId } = render(<Application data={data} />);
    const elem = getByTestId('formContact');
    expect(elem.className).toBe("formContact");
});
it('Should render Button in Form', () => {
    const { getByTestId } = render(<Application data={data} />);
    const elem = getByTestId('addContactButton');
    expect(elem.className).toBe("addContactButton");
});



it('Should check if first name is render', () => {
    const { getByTestId } = render(<Application data={data} />);
    const elem = getByTestId('firstName');
    expect(elem).toBeTruthy();
});
it('Should check if last name is render', () => {
    const { getByTestId } = render(<Application data={data} />);
    const elem = getByTestId('lastName');
    expect(elem).toBeTruthy();
});
it('Should check if phone number is render', () => {
    const { getByTestId } = render(<Application data={data} />);
    const elem = getByTestId('phoneNumber');
    expect(elem).toBeTruthy()
});

test('Should accept text in First name input', () => {
    const { input } = setupFname()
    fireEvent.change(input, { target: { value: 'Lalit' } })
    expect(input.value).toBe('Lalit')
  })

  test('Should accept text in Last name input', () => {
    const { input } = setupLname()
    fireEvent.change(input, { target: { value: 'Dhiman' } })
    expect(input.value).toBe('Dhiman')
  })

  test('Should accept Number in Phone Number input', () => {
    const { input } = setupNumber()
    fireEvent.change(input, { target: { value: 1 } })
    expect(input.value).toBe("1")
  })
  test('Should accept 10 characters in input', () => {
    const { input } = setupNumber();
    fireEvent.change(input, { target: { maxlength: "10" } })
    expect(input.maxlength).toBe("10");
  })