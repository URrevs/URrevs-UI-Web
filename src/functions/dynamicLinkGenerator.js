import config from "../firebase-config.json";

// webPath is the post type in camel-case
export const generateLink = ({
  webPath,
  postId,
  postType,
  ownerId,
  linkType,
}) => {
  const uriPrefix = "https://urevs.page.link";
  const packageName = "com.example.urrevs_ui_mobile";

  const shortLinksApi = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${config.apiKey}`;

  const webLink = new URL("https://urrevstest.netlify.app" + "/" + webPath);
  webLink.searchParams.append("id", postId);

  const androidLink = new URL("https://urrevstest.netlify.app" + "/" + webPath);
  // link type is post or refCode
  androidLink.searchParams.append("linkType", linkType);

  if (linkType === "post") {
    androidLink.searchParams.append("id", postId);
    // owner id
    androidLink.searchParams.append("userId", ownerId);
    // postType
    androidLink.searchParams.append("postType", postType);
    androidLink.searchParams.append("postId", postId);
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
