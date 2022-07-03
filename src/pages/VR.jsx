import React, { useEffect } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export function VR() {
  const [data, setData] = useState([]);

  const getData = (page = 1) =>
    fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`)
      .then((response) => response.json())
      .then((data) => setData(data.data));

  useEffect(() => {
    getData(1);
  }, []);

  console.log(data);
  return (
    <div>
      {data.map((post) => (
        <div>{post.name}</div>
      ))}
    </div>
  );
}
