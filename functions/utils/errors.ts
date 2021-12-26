export function responseError({ status, statusText, help }: ErrorResponse): Response {
  return new Response(JSON.stringify({ status, statusText, help }, null, 2), {
    status,
  });
}

export const chapterNameNotFound = {
  status: 502,
  statusText: "Can't fetch chapter without name parameter",
  help: 'add parameter by extends API call endpoint with ?name=xxxxx',
};
export const chapterNovelNotFound = {
  status: 502,
  statusText: "Can't fetch chapter without novel parameter",
  help: 'add parameter by extends API call endpoint with ?novel=xxxxx',
};
export const chaptersStreamedNotFound = {
  status: 502,
  statusText: 'Chapters to be streamed not found.',
  help: 'add parameter by extends API call an arrray, like ?chaptersStreamed=[1,2,3]',
};

/** NOVEL ERROR */
export const novelNameNotFound = {
  status: 502,
  statusText: "Can't fetch novel without name parameter",
  help: 'add parameter by extends API call endpoint with ?name=xxxxx',
};
