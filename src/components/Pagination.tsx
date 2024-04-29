import React, { useEffect, useRef } from "react";

interface CustomProps {
  onSetCurrentCursor: () => void;
  onFetchData: () => void;
  currentCursor: string;
  nextCursor: string;
  dataList: any[];
  reachMaxLimit: boolean;
}

const Pagination = ({
  onSetCurrentCursor,
  onFetchData,
  currentCursor,
  nextCursor,
  dataList,
  reachMaxLimit,
  children,
}: React.PropsWithChildren<CustomProps>) => {
  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        onSetCurrentCursor();
      }
    }
  };
  useEffect(() => {
    console.log('Getting recalled');
    if (!reachMaxLimit && nextCursor === currentCursor) {
      onFetchData();
    }
  }, [currentCursor, reachMaxLimit, nextCursor]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onScroll, listInnerRef, dataList });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

export default Pagination;
