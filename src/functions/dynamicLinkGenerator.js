import config from "../firebase-config.json";

// webPath is the post type in camel-case
export const generateLink = ({
  webPath,
  postId,
  postType,
  ownerId,
  linkType,
  refCode,
}) => {
  const uriPrefix = process.env.REACT_APP_URI_PREFIX;
  const packageName = process.env.REACT_APP_PACKAGE_NAME;

  const shortLinksApi = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${config.apiKey}`;

  // TODO:
  // const host = "https://" + "urrevs.com";
  const host = "https://urrevstest.netlify.app";

  const webLink = new URL(host + "/" + webPath);

  const androidLink = new URL(host + "/" + webPath);
  // link type is post or refCode
  androidLink.searchParams.append("linkType", linkType);

  if (linkType === "post") {
    webLink.searchParams.append("id", postId);
    androidLink.searchParams.append("id", postId);
    // owner id
    androidLink.searchParams.append("userId", ownerId);
    // postType
    androidLink.searchParams.append("postType", postType);
    androidLink.searchParams.append("postId", postId);
  } else {
    webLink.searchParams.append("refCode", refCode);
    androidLink.searchParams.append("refCode", refCode);
  }

  const requestBody = {
    dynamicLinkInfo: {
      domainUriPrefix: uriPrefix,
      link: androidLink,
      androidInfo: {
        androidPackageName: packageName,
        androidFallbackLink: webLink,
      },
    },
  };

  const getShortLink = async () => {
    let error, data;
    try {
      const res = await fetch(shortLinksApi, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(requestBody),
      });
      data = await res.json();
    } catch (e) {
      error = e;
    }
    return { data: data, error: error };
  };

  return getShortLink;
};
