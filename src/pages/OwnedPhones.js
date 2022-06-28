import { useTheme } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller
} from "react-virtualized";
import { FixedGrid } from "../Components/Grid/FixedGrid";
import { CustomAppBar } from "../Components/MainLayout/AppBar/CustomAppBar";
import PhoneListItem from "../Components/PhoneItemList";
import { useGetOthersOwnedPhonesQuery } from "../services/users";
import { useAppSelector } from "../store/hooks";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  fixedHeight: false,
  defaultHeight: 15,
});

let maxIndex = 0;

function OwnedPhonesPage({ query }) {
  const [phonesList, setphonesList] = useState([]);
  const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const currentUser = useAppSelector((state) => state.auth);

  let queryResult = useGetOthersOwnedPhonesQuery(
    { round: page, uid: userId }
    // { skip: userId === currentUser.uid }
  );

  const theme = useTheme();
  const listRef = useRef();
  const [ex, setEx] = useState(false);

  const clearCache = (index) => {
    setEx(!ex);
    if (index === 0) {
      cache.clear(0);
    } else {
      cache.clear(index);
    }
  };

  useEffect(() => {
    if (queryResult.data) {
      setphonesList([...queryResult.data, ...phonesList]);
    }
  }, [queryResult.data]);

  if (queryResult.isLoading) {
    return (
      <div>
        {[...Array(2)].map((a, index) => (
          <div>Loading...</div>
        ))}
      </div>
    );
  }

  if (queryResult.error) {
    return (
      <div>
        {queryResult.error.status}
        {queryResult.error.code}
        {queryResult.error.message}
      </div>
    );
  }

  const renderRow = ({ index, key, style, parent }) => {
    if (
      maxIndex !== 0 &&
      !queryResult.isLoading &&
      !queryResult.isFetching &&
      maxIndex === phonesList.length &&
      queryResult.data.length !== 0
    ) {
      maxIndex = 0;
      console.log(page);
      setPage(page + 1);
    }
    maxIndex = Math.max(index, maxIndex);
    return (
      <div key={key}>
        <CellMeasurer
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <div style={{ ...style, direction: theme.direction }}>
            {index >= phonesList.length ? (
              queryResult.data.length === 0 ? (
                <div></div>
              ) : (
                [...Array(1)].map((a, index) => <div>Loading...</div>)
              )
            ) : (
              <PhoneListItem
                id={phonesList[index]._id}
                title={phonesList[index].name}
              />
            )}
          </div>
        </CellMeasurer>
      </div>
    );
  };

  return (
    <CustomAppBar showLabel label="المنتجات الممتلكة" showBackBtn>
      <FixedGrid>
        <div style={{ height: "calc(100vh)", margin: "0 0" }}>
          <AutoSizer>
            {({ height, width }) => {
              return (
                <WindowScroller>
                  {({ height, isScrolling, registerChild, scrollTop }) => (
                    <div ref={registerChild}>
                      <List
                        ref={listRef}
                        autoHeight
                        overscanRowCount={10}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                        width={width}
                        height={height}
                        deferredMeasurementCache={cache}
                        rowHeight={cache.rowHeight}
                        rowCount={phonesList.length + 1}
                        rowRenderer={renderRow}
                      />
                    </div>
                  )}
                </WindowScroller>
              );
            }}
          </AutoSizer>
        </div>
      </FixedGrid>
    </CustomAppBar>
  );
}

export default OwnedPhonesPage;
