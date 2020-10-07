import PrismicDOM from 'prismic-dom';

export const getText = data => PrismicDOM.RichText.asText(data);

export const serializer = data =>
  data.map(({ primary, items }) => {
    return {
      src: primary.section_img.url,
      alt: getText(primary.title),
      title: getText(primary.title),
      id: `_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      textTitle: getText(primary.description),

      postContent: items.map(item => ({
        src: item.content_img.url,
        alt: getText(item.content_title),
        title: getText(item.content_title),
        id: `_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        text: getText(item.description_content),
      })),
    };
  });
