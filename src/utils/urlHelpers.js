const getFilters = (filters) =>
  typeof filters === 'object' && Object.keys(filters)
    .map(key => {
      if (filters[key]) {
        return `${key}=${filters[key]}`;
      }
    });

const getPagination = (pageNumber, perPage) => {
  const page = pageNumber && `page=${pageNumber}`;
  const amount = perPage && `per-page=${perPage}`;
  return [page, amount].filter(el => el);
};

export const composeUrl = (baseUrl, filters, pageNumber, perPage) => {
  const url = (filters || pageNumber || perPage) ? `${baseUrl}?` : baseUrl;
  return `${url}${
    [...getFilters(filters), ...getPagination(pageNumber, perPage)].join('&')
  }`;
};