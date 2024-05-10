export function applyPagination(documents, page, rowsPerPage) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

export function applyPaginationForObject(obj, page, rowsPerPage) {
  const entries = Object.entries(obj);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedEntries = entries.slice(startIndex, endIndex);
  const paginatedObject = Object.fromEntries(paginatedEntries);

  return paginatedObject;
}
