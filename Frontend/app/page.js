"use client";
import { useEffect, useState } from "react";
import {
  getStudents, createStudent,
  deleteStudent, updateStudent
} from "@/services/studentService";
import { logout } from "@/services/authService";
import LoginForm from "@/components/LoginForm";
import StudentForm from "@/components/StudentForm";
import StudentList from "@/components/StudentList";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [token, setToken] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
    setChecking(false);
  }, []);

  useEffect(() => {
    if (token) loadStudents();
  }, [token]);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      if (error.message.includes("401") ||
          error.message.includes("403")) {
        handleLogout();
      } else {
        alert(error.message);
      }
    }
  };

  const handleSubmit = async (studentData) => {
    try {
      setLoading(true);
      if (editingStudent) {
        await updateStudent(editingStudent.id, studentData);
        setEditingStudent(null);
      } else {
        await createStudent(studentData);
      }
      await loadStudents();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteStudent(id);
      await loadStudents();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setToken(null);
    setStudents([]);
  };

  // ⏳ Checking localStorage
  if (checking) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0f0f11",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#888",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
      }}>
        Loading...
      </div>
    );
  }

  // 🔐 No token → Login
  if (!token) {
    return <LoginForm onLogin={setToken} />;
  }

  // 📊 Stats helpers
  const ages = students.map(s => s.age);
  const avgAge = ages.length
    ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length)
    : 0;
  const youngest = ages.length ? Math.min(...ages) : 0;

  // ✅ Dashboard
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f11",
      fontFamily: "'DM Sans', sans-serif",
      color: "#f0efe8",
    }}>

      {/* Topbar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 32px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "#1a1a1f",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 22,
          letterSpacing: -0.5,
        }}>
          Student<span style={{ color: "#c8f04d" }}>.</span>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 8,
            padding: "7px 14px",
            color: "#888",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            cursor: "pointer",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "#ff5c5c";
            e.currentTarget.style.color = "#ff5c5c";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
            e.currentTarget.style.color = "#888";
          }}
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div style={{
        padding: 32,
        maxWidth: 900,
        margin: "0 auto",
      }}>

        {/* Stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 32,
        }}>
          {[
            { label: "Total Students", value: students.length, accent: true },
            { label: "Average Age", value: avgAge },
            { label: "Youngest", value: youngest },
          ].map((stat, i) => (
            <div key={i} style={{
              background: "#1a1a1f",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: "20px 24px",
            }}>
              <div style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#888",
                marginBottom: 8,
              }}>
                {stat.label}
              </div>
              <div style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 32,
                color: stat.accent ? "#c8f04d" : "#f0efe8",
                lineHeight: 1,
              }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: 24,
          alignItems: "start",
        }}>
          <StudentForm
            key={editingStudent ? editingStudent.id : 'new'}
            onSubmit={handleSubmit}
            editingStudent={editingStudent}
            loading={loading}
          />
          <StudentList
            students={students}
            onEdit={setEditingStudent}
            onDelete={handleDelete}
          />
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
    </div>
  );
}
