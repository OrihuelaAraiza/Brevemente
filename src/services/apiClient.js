import { getToken } from "./storage";

const DEFAULT_API_BASE_URL =
  "https://klinia-api.nicebay-2196f468.eastus2.azurecontainerapps.io/api";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/+$/, "");

function isAbsoluteUrl(path) {
  return /^https?:\/\//i.test(path);
}

function appendParams(url, params = {}) {
  const entries = Object.entries(params).filter(([, value]) => {
    return value !== undefined && value !== null && value !== "";
  });

  if (!entries.length) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  const query = new URLSearchParams();

  entries.forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
      return;
    }

    query.set(key, value);
  });

  return `${url}${separator}${query.toString()}`;
}

function buildUrl(path, params) {
  const normalizedPath = String(path || "");
  const url = isAbsoluteUrl(normalizedPath)
    ? normalizedPath
    : `${API_BASE_URL}${normalizedPath.startsWith("/") ? "" : "/"}${normalizedPath}`;

  return appendParams(url, params);
}

async function parseResponse(response, responseType) {
  if (response.status === 204) {
    return null;
  }

  if (responseType === "blob") {
    return { data: await response.blob() };
  }

  if (responseType === "text") {
    return response.text();
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

function getErrorMessage(data, fallback) {
  if (!data) {
    return fallback;
  }

  if (typeof data === "string") {
    return data || fallback;
  }

  return data.message || data.error || data.detail || fallback;
}

export async function request(path, options = {}) {
  const {
    auth = true,
    body,
    headers = {},
    method = "GET",
    params,
    responseType,
    signal,
  } = options;

  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  const init = {
    method: method.toUpperCase(),
    headers: requestHeaders,
    signal,
  };

  if (auth) {
    const token = getToken();

    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  if (body !== undefined && body !== null) {
    if (body instanceof FormData) {
      init.body = body;
    } else if (body instanceof Blob || typeof body === "string") {
      init.body = body;
    } else {
      requestHeaders["Content-Type"] = "application/json";
      init.body = JSON.stringify(body);
    }
  }

  const response = await fetch(buildUrl(path, params), init);
  const data = await parseResponse(response, responseType);

  if (!response.ok) {
    const error = new Error(
      getErrorMessage(data, `Error ${response.status} en la solicitud`)
    );
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  request,
  get: (path, opts) => request(path, { ...(opts || {}), method: "GET" }),
  post: (path, body, opts) =>
    request(path, { ...(opts || {}), method: "POST", body }),
  put: (path, body, opts) =>
    request(path, { ...(opts || {}), method: "PUT", body }),
  patch: (path, body, opts) =>
    request(path, { ...(opts || {}), method: "PATCH", body }),
  del: (path, opts) => request(path, { ...(opts || {}), method: "DELETE" }),
  delete: (path, opts) => request(path, { ...(opts || {}), method: "DELETE" }),
};

export default api;
