const processedParams = [];

export const addParams = (key, value) => processedParams.push({ key, value });

export const getParamValue = (key) =>
processedParams.find((command) => command?.key === key)?.value || null;

export const getProcessedParams = () => processedParams;

export const buildParams = () => {
  const [, , , ...rest] = process.argv;
  rest.forEach((arg) => {
    const [key, value] = arg.split(":");
    addParams(key.replace("--", ""), value);
  });
  return processedParams;
};

export default {
  addParams,
  getParamValue,
  getProcessedParams,
  buildParams,
};
