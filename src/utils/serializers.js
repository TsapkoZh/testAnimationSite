import PrismicDOM from 'prismic-dom';

export const getText = data => PrismicDOM.RichText.asText(data);

export const serializer = data =>
  data.map(({ primary, items }) => {
    return {
      mainImg: {
        tablet: primary.section_img.tablet.url,
        mobile: primary.section_img.mobile.url,
        desktop: primary.section_img.url,
      },
      alt: getText(primary.title),
      title: getText(primary.title),
      id: `_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      textTitle: getText(primary.description),

      postContent: items.map(item => ({
        contentImg: {
          tablet: item.content_img.tablet.url,
          mobile: item.content_img.mobile.url,
          desktop: item.content_img.url,
        },
        alt: getText(item.content_title),
        title: getText(item.content_title),
        id: `_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        text: getText(item.description_content),
      })),
    };
  });
