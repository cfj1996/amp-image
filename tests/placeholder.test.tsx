import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import Image from '../src';

describe('Placeholder', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Default placeholder', () => {
    const src =
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    const wrapper = mount(<Image src={src} placeholder />);

    expect(wrapper.find('.amp-image-placeholder').get(0)).toBeFalsy();
    expect(wrapper.find('.amp-image-img-placeholder').prop('src')).toBe(src);
  });

  it('Set correct', () => {
    const placeholder = 'placeholder';
    const wrapper = mount(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        placeholder={placeholder}
      />,
    );
    expect(wrapper.find('.amp-image-placeholder').text()).toBe(placeholder);

    act(() => {
      wrapper.find('.amp-image-img').simulate('load');
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find('.amp-image-placeholder').get(0)).toBeUndefined();
  });

  it('Hide placeholder when load from cache', () => {
    const domSpy = spyElementPrototypes(HTMLImageElement, {
      complete: {
        get: () => true,
      },
      naturalWidth: {
        get: () => 1004,
      },
      naturalHeight: {
        get: () => 986,
      },
    });

    const wrapper = mount(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        placeholder={<></>}
      />,
    );

    expect(wrapper.find('.amp-image-placeholder').get(0)).toBeFalsy();

    domSpy.mockRestore();
  });
});
