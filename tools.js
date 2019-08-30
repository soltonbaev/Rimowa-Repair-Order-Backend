import util from "util";

const inspect = data => util.inspect(data, { showHidden: false, depth: null });

export async function runService(serviceClass, { context = {}, params = {} }) {
  const startTime = Date.now();
  const actionName = serviceClass.name;

  try {
    const result = await new serviceClass({ context: {}, params: {} }).run({
      data: params
    });
    logRequest({
      type: "info",
      actionName,
      params: inspect(params),
      result: inspect(result),
      startTime,
      userId: context.uid
    });

    return result;
  } catch (error) {
    throw Promise.reject(error);
  }
}

export function makeServiceRunner(serviceClass, params = () => ({})) {
  return async function serviceRunner(req, res) {
    const resultPromise = runService(serviceClass, {
      params: params(req, res)
    });
    return renderPromiseAsJson(req, res, resultPromise);
  };
}

export async function renderPromiseAsJson(req, res, promise) {
  try {
    const data = await promise;

    data.status = 1;
    return res.send(data);
  } catch (error) {
    res.status(500).send({
      status: 0,
      error
    });
  }
}

function cloneDeep(data) {
  return JSON.parse(JSON.stringify(data));
}

function logRequest({ type, actionName, params, result, startTime, userId }) {
  defaultLogger(type, {
    service: actionName,
    runtime: Date.now() - startTime,
    params,
    result,
    userId
  });
}

function defaultLogger(type, data) {}
