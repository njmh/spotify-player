
export default function getQueryStringParam(key: string, defaultValue: string | null = null, queryString: string = window.location.search): string | null {
  const queryStringParams = new URLSearchParams(queryString);
  if (queryStringParams.has(key)) {
    return queryStringParams.get(key);
  } else {
    return defaultValue;
  }
}
