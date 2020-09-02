
export default function getQueryStringParams(queryString: string = window.location.search): {[key: string]: string} {
  const queryStringParams = new URLSearchParams(queryString);
  let params = {};
  queryStringParams.forEach((value: string, key: string) => {
    params[key] = value;
  });
  return params;
}
