const AUTH_URL = "http://localhost:8080/auth";

export const login = async (username, password) => {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error("Login failed");
  const token = await response.text();
  localStorage.setItem("token", token); // save token
  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};