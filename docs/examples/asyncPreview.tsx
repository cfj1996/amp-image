import * as React from 'react';
import Image from 'amp-image';
import '../../assets/index.less';
const icons = {
  desc: <span>详</span>,
  rotateLeft: <span>左旋</span>,
  rotateRight: <span>右旋</span>,
  zoomIn: <span>扩</span>,
  zoomOut: <span>缩</span>,
  close: <span>关</span>,
  left: <span>《</span>,
  right: <span>》</span>,
};
function getAsyncImage(str: string): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('str', str);
      if (str === '1') {
        resolve(require('./images/img1.jpeg'));
      } else if (str === '2') {
        resolve(require('./images/img2.jpeg'));
      } else if (str === '3') {
        resolve(require('./images/img3.jpeg'));
      } else {
        resolve(require('./images/img4.jpeg'));
      }
    }, 1000);
  });
}

export default function AsyncPreview() {
  return (
    <div>
      <Image.PreviewGroup icons={icons}>
        <Image
          src={require('./images/img1-s.png')}
          width={100}
          preview={{
            loadingComponent: <h1 style={{ color: 'red' }}>加载中111</h1>,
            getPreviewUrl: getAsyncImage,
            descComponent: <h1 className={'descTitle'}>title 1</h1>,
            params: '1',
          }}
        />
        <Image
          src={require('./images/img2-s.png')}
          width={100}
          isHide={true}
          preview={{
            loadingComponent: <h1 style={{ color: 'red' }}>加载中222</h1>,
            getPreviewUrl: getAsyncImage,
            descComponent: <h1 className={'descTitle'}>title 2</h1>,
            params: '2',
          }}
        />
        <Image
          src={require('./images/img3-s.png')}
          width={100}
          preview={{
            loadingComponent: <h1 style={{ color: 'red' }}>加载中333</h1>,
            getPreviewUrl: getAsyncImage,
            descComponent: <h1 className={'descTitle'}>title 3</h1>,
            params: '3',
          }}
        />
        <Image
          src={require('./images/img4-s.png')}
          width={100}
          isHide={true}
          preview={{
            loadingComponent: <h1 style={{ color: 'red' }}>加载中444</h1>,
            getPreviewUrl: getAsyncImage,
            descComponent: <h1 className={'descTitle'}>title 4</h1>,
            params: '4',
          }}
        />
      </Image.PreviewGroup>
    </div>
  );
}
