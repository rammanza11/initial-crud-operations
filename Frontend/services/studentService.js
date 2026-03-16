const API_URL = "http://localhost:8080/students";

// helper to get token
const getToken = () => localStorage.getItem("token");

// helper for auth headers
const authHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${getToken()}`
});

// GET
export const getStudents = async () => {
  const response = await fetch(API_URL, {
    headers: authHeaders()
  });
  if (!response.ok) throw new Error("Failed to fetch students");
  return response.json();
};

// CREATE
export const createStudent = async (student) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(student),
  });
  if (!response.ok) throw new Error("Failed to create student");
  return response.json();
};

// DELETE
export const deleteStudent = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });
  if (!response.ok) throw new Error("Failed to delete student");
  return true;
};

// UPDATE
export const updateStudent = async (id, student) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(student),
  });
  if (!response.ok) throw new Error("Failed to update student");
  return response.json();
};
