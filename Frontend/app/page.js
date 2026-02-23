"use client";
import { useEffect, useState } from "react";
import { getStudents, createStudent, deleteStudent } from "@/services/studentService";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");

  const loadStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };
  
  useEffect(() => {
  loadStudents();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      setLoading(true);
    await createStudent({ name, age: Number(age) });
    await loadStudents();
    setName("");
    setAge("");
    }
    catch(error){
      alert(error.message);
    }finally{
      setLoading(false);
    }
   
  };

  const handledelete = async(e)=>{
    e.preventDefault();

    try{
      setLoading(true);
      await deleteStudent(id);
      await loadStudents();
      setId("");
    }
    catch(error){
      alert(error.message);
    }
    finally{
      setLoading(false);
    }

  }

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Student Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 mr-2"
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button disabled={loading}
        className="bg-blue-500 text-white px-4 py-2">
          {loading ?"Adding...":"Add Student"}
        </button>
      </form>

      <form onSubmit={handledelete} className="mb-6">
        <input
          className="border p-2 mr-2"
          type="number"
          placeholder="Enter Student Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <button disabled={loading}
        className="bg-blue-500 text-white px-4 py-2">
          {loading ?"deleting...":"Delete Student"}
        </button>
      </form>


      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.id}.{student.name} - {student.age}
          </li>
        ))}
      </ul>
    </div>
  );
}