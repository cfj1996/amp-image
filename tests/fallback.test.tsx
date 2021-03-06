import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Image from '../src';

describe('Fallback', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const fallback =
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

  it('Fallback correct', () => {
    const wrapper = mount(<Image src="abc" fallback={fallback} />);

    act(() => {
      wrapper.find('.amp-image-img').simulate('error');
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find('.amp-image-img').prop('src')).toBe(fallback);

    act(() => {
      wrapper.find('.amp-image').simulate('click');
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find('.amp-image-preview').get(0)).toBeFalsy();
  });

  it('should not show preview', () => {
    const wrapper = mount(<Image src="abc" fallback={fallback} />);

    act(() => {
      wrapper.find('.amp-image-img').simulate('error');
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find('.amp-image-mask')).toHaveLength(0);
  });

  it('With onError', () => {
    const onErrorMock = jest.fn();
    const wrapper = mount(<Image src="abc" onError={onErrorMock} />);

    act(() => {
      wrapper.find('.amp-image-img').simulate('error');
      jest.runAllTimers();
      wrapper.update();
    });

    expect(onErrorMock).toHaveBeenCalledTimes(1);
  });

  it('should change image, not error', () => {
    const wrapper = mount(
      <Image
        width={200}
        src="error"
        fallback="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />,
    );
    act(() => {
      wrapper.find('.amp-image-img').simulate('error');
      wrapper.setProps({
        src: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NZuwQp_vcIQAAAAAAAAAAABkARQnAQ',
      });
      jest.runAllTimers();
      wrapper.update();
    });
    expect(wrapper.find('.amp-image-img').prop('src')).toBe(
      'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*NZuwQp_vcIQAAAAAAAAAAABkARQnAQ',
    );
  });
});
