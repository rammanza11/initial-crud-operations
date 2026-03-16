"use client";

export default function StudentList({ students, onEdit, onDelete }) {

  if (students.length === 0) {
    return (
      <div style={{
        background: "#1a1a1f",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        padding: "48px 24px",
        textAlign: "center",
        color: "#888",
        fontSize: 13,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        No students yet — add one!
      </div>
    );
  }

  return (
    <div style={{
      background: "#1a1a1f",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14,
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Header */}
      <div style={{
        padding: "18px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        fontSize: 11,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#888",
      }}>
        Students — {students.length} total
      </div>

      {/* Rows */}
      {students.map((student, index) => (
        <div
          key={student.id}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 24px",
            borderBottom: index === students.length - 1
              ? "none"
              : "1px solid rgba(255,255,255,0.07)",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#222228"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >

          {/* Number badge */}
          <div style={{
            width: 28, height: 28,
            background: "#222228",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            color: "#888",
            marginRight: 14,
            flexShrink: 0,
          }}>
            {index + 1}
          </div>

          {/* Student info */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#f0efe8",
            }}>
              {student.name}
            </div>
            <div style={{
              fontSize: 12,
              color: "#888",
              marginTop: 2,
            }}>
              {student.age} years old
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => onEdit(student)}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 7,
                padding: "5px 12px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#888",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#7b61ff";
                e.currentTarget.style.color = "#7b61ff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.color = "#888";
              }}
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(student.id)}
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 7,
                padding: "5px 12px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#888",
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
              Delete
            </button>
          </div>

        </div>
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
    </div>
  );
}