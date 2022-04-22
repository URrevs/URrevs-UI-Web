import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
  key: "muiltr",
});

export default function RTL(props) {
  return (
    <CacheProvider value={props.direction === "ltr" ? cacheLtr : cacheRtl}>
      {props.children}
    </CacheProvider>
  );
}
