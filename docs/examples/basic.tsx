import * as React from 'react';
import Image from 'amp-image';
import '../../assets/index.less';

export default function Base() {
  return (
    <div>
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        width={200}
        style={{
          marginRight: 24,
        }}
        onClick={() => {
          console.log('click');
        }}
        preview={{
          onVisibleChange: visible => {
            console.log('visible', visible);
          },
          descComponent: (
            <div
              style={{
                width: '100px',
                height: '100px',
                border: '1px solid red',
                color: 'red',
              }}
            >
              这是详情
            </div>
          ),
        }}
      />
    </div>
  );
}
