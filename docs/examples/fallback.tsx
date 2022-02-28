import * as React from 'react';
import Image from 'amp-image';
import '../../assets/index.less';

export default function Base() {
  return (
    <Image
      preview={{ mask: 'preview!' }}
      src="error1"
      fallback="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      width={200}
    />
  );
}
