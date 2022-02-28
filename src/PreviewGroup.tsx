import * as React from 'react';
import { useEffect, useState } from 'react';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { ImagePreviewType } from './Image';
import type { PreviewProps } from './Preview';
import Preview from './Preview';

export interface PreviewGroupPreview
  extends Omit<ImagePreviewType, 'icons' | 'mask' | 'maskClassName'> {
  /**
   * If Preview the show img index
   * @default 0
   */
  current?: number;
}

export interface GroupConsumerProps {
  previewPrefixCls?: string;
  icons?: PreviewProps['icons'];
  preview?: boolean | PreviewGroupPreview;
}

interface PreviewObj {
  url?: string;
  getPreviewUrl?: (params?: any) => Promise<string>;
  params?: any;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  onSuccess?: (previewUrl: string) => void;
  onError?: (error: any, reload?: () => void) => void;
  error?: any;
  descComponent?: React.ReactNode;
  canPreview: boolean;
}

export interface GroupConsumerValue extends GroupConsumerProps {
  isPreviewGroup?: boolean;
  previewObjs: Map<number, PreviewObj>;
  setPreviewUrls: React.Dispatch<React.SetStateAction<Map<number, PreviewObj>>>;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  setMousePosition: React.Dispatch<
    React.SetStateAction<null | { x: number; y: number }>
  >;
  registerImage: (id: number, previewObj: PreviewObj) => () => void;
}

/* istanbul ignore next */
export const context = React.createContext<GroupConsumerValue>({
  previewObjs: new Map(),
  setPreviewUrls: () => null,
  current: null,
  setCurrent: () => null,
  setShowPreview: () => null,
  setMousePosition: () => null,
  registerImage: () => () => null,
});

const { Provider } = context;

const Group: React.FC<GroupConsumerProps> = ({
  previewPrefixCls = 'amp-image-preview',
  children,
  icons = {},
  preview,
}) => {
  const {
    visible: previewVisible = undefined,
    onVisibleChange: onPreviewVisibleChange = undefined,
    getContainer = undefined,
    current: currentIndex = 0,
    ...dialogProps
  } = typeof preview === 'object' ? preview : {};
  const [previewObjs, setPreviewObjs] = useState<Map<number, PreviewObj>>(
    new Map(),
  );
  const [current, setCurrent] = useState<number>();
  const [isShowPreview, setShowPreview] = useMergedState(!!previewVisible, {
    value: previewVisible,
    onChange: onPreviewVisibleChange,
  });
  const [mousePosition, setMousePosition] = useState<null | {
    x: number;
    y: number;
  }>(null);
  const isControlled = previewVisible !== undefined;
  const previewUrlsKeys = Array.from(previewObjs.keys());
  const currentControlledKey = previewUrlsKeys[currentIndex];
  const registerImage = (id: number, previewObj: PreviewObj) => {
    const unRegister = () => {
      setPreviewObjs(oldPreviewUrls => {
        const clonePreviewUrls = new Map(oldPreviewUrls);
        const deleteResult = clonePreviewUrls.delete(id);
        return deleteResult ? clonePreviewUrls : oldPreviewUrls;
      });
    };

    setPreviewObjs(oldPreviewUrls => {
      return new Map(oldPreviewUrls).set(id, {
        canPreview: true,
        ...previewObj,
      });
    });

    return unRegister;
  };

  const onPreviewClose = (e: React.SyntheticEvent<Element>) => {
    e.stopPropagation();
    setShowPreview(false);
    setMousePosition(null);
  };

  React.useEffect(() => {
    setCurrent(currentControlledKey);
  }, [currentControlledKey]);

  React.useEffect(() => {
    if (!isShowPreview && isControlled) {
      setCurrent(currentControlledKey);
    }
  }, [currentControlledKey, isControlled, isShowPreview]);

  useEffect(() => {
    const previewObj = previewObjs.get(current);
    console.log('previewObj', current, previewObj);
    if (
      previewObj &&
      !previewObj.url &&
      !previewObj.loading &&
      previewObj.getPreviewUrl
    ) {
      setPreviewObjs(oldPreviewUrls => {
        return new Map(oldPreviewUrls).set(current, {
          ...previewObj,
          loading: true,
        });
      });
      previewObj
        .getPreviewUrl(previewObj.params)
        .then(res => {
          previewObj.onSuccess?.(res);
          setPreviewObjs(oldPreviewUrls => {
            return new Map(oldPreviewUrls).set(current, {
              ...previewObj,
              loading: false,
              url: res,
            });
          });
        })
        .catch(err => {
          setPreviewObjs(oldPreviewUrls => {
            previewObj.onError?.(err, () =>
              previewObj.getPreviewUrl(previewObj.params),
            );
            return new Map(oldPreviewUrls).set(current, {
              ...previewObj,
              loading: false,
            });
          });
        });
    }
  }, [current]);
  const { url, loading, descComponent, loadingComponent } =
    previewObjs.get(current) || {};
  console.log('Provider', current, url, loading);
  return (
    <Provider
      value={{
        isPreviewGroup: true,
        previewObjs,
        setPreviewUrls: setPreviewObjs,
        current,
        setCurrent,
        setShowPreview,
        setMousePosition,
        registerImage,
      }}
    >
      {children}
      <Preview
        aria-hidden={!isShowPreview}
        visible={isShowPreview}
        prefixCls={previewPrefixCls}
        onClose={onPreviewClose}
        mousePosition={mousePosition}
        src={url}
        loading={loading}
        loadingComponent={loadingComponent}
        descComponent={descComponent}
        icons={icons}
        getContainer={getContainer}
        {...dialogProps}
      />
    </Provider>
  );
};

export default Group;
