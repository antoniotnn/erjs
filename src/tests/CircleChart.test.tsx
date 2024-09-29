import '@testing-library/react'
import {render, screen} from "@testing-library/react";
import CircleChart from "../app/components/CircleChart";


test('mock function', () => {
    const mock = jest.fn();
    mock();
    mock('batata');
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock).toHaveBeenCalledWith('batata');
});

it('renders caption', () => {
    render(<CircleChart size={180} progress={80} caption={'javascript'}/>);
    const caption = screen.getByText('javascript');
    expect(caption).toBeVisible();
});

it ('renders percentage with % char', () => {
    render(<CircleChart size={180} progress={80} caption={'javascript'}/>);
    const percentage = screen.getByText('80%');
    expect(percentage).toBeVisible();
});

it('renders component with correct size', () => {
    render(<CircleChart size={180} progress={80} caption={'javascript'}/>);
    const circleWrapper = screen.getByTestId('svg-wrapper');
    expect(circleWrapper).toHaveStyle({width: '180px', height: '180px'});
});

it('throws an error if progress is greater than 100', () => {
    const spy = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

    expect(() => {
        render(<CircleChart size={180} progress={120} caption={'javascript'}/>)
    }).toThrowError();

    expect(spy).toHaveBeenCalled();
});