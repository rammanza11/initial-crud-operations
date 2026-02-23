const API_URL = "http://localhost:8080/students";

export const getStudents = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createStudent = async (student) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  if(!response.ok){
    throw new Error("Failed to create student");
  }

  return response.json();
};

export const deleteStudent=async(id)=>{
  const response=await fetch(`${API_URL}/${id}`,{
    method: "DELETE",
  });

  if(!response.ok){
    throw new Error("Not Deleted Error")
  }
  
  return true;
}