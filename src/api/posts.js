import Prismic from 'prismic-javascript';

export const fetchData = () =>
  Prismic.getApi('https://afinity.cdn.prismic.io/api/v2').then(api => {
    return api.query(Prismic.Predicates.at('document.type', 'home'));
  });
