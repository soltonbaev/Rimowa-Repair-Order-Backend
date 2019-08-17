import util from "util";
// import logger from "./logger";
// import Exception from "./services/Exception";

const inspect = data => util.inspect(data, { showHidden: false, depth: null });

const defaultParamsBuilder = () => ({});
const defaultContextBuilder = req =>
  cloneDeep({
    ...(req.user || {}),
    ipAddress: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
    userAgent: req.headers["user-agent"]
  });

export async function runService(serviceClass, { context = {}, params = {} }) {
  const startTime = Date.now();
  const actionName = serviceClass.name;

  try {
    const result = await new serviceClass({
      context
    }).run(params);

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
    throw error;
  }
}

export function makeServiceRunner(
  serviceClass,
  paramsBuilder = defaultParamsBuilder,
  contextBuilder = defaultContextBuilder
) {
  return async function serviceRunner(req, res) {
    const resultPromise = runService(serviceClass, {
      params: paramsBuilder(req, res),
      context: contextBuilder(req, res)
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
      error: {
        code: "SERVER_ERROR",
        message: "Please, contact your system administrator!"
      }
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
