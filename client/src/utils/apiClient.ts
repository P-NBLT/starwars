const apiUrl: string = process.env.REACT_APP_API_URL || "http://localhost:8000";
console.log("apiUrl", apiUrl);
type ApiClientPayload = {
  data?: any;
  signal?: AbortSignal;
  headers?: any;
};

export async function apiClient(
  endpoint: string,
  { data, signal, headers }: ApiClientPayload = {}
) {
  const config: RequestInit = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    signal: signal || undefined,
    headers: {
      ...(data && { ...headers, "Content-Type": "application/json" }),
    },
    credentials: "include",
  };

  const response = await fetch(`${apiUrl}${endpoint}`, config);

  var json = await response.json();
  if (response.status === 403) {
    return { status: response.status, message: json.message };
  } else if (response.ok) {
    return { ...json };
  } else {
    console.log("REJECT", json);
    return Promise.reject({ json, status: response.status });
  }
}
