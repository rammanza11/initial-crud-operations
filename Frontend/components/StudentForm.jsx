"use client";

export default function StudentForm({ onSubmit, editingStudent, loading }) {
  return (
    <div style={{
      background: "#1a1a1f",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14,
      padding: 24,
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Title */}
      <div style={{
        fontSize: 11,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#888",
        marginBottom: 20,
      }}>
        {editingStudent ? "Edit Student" : "Add Student"}
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        const name = e.target.name.value.trim();
        const age = Number(e.target.age.value);
        onSubmit({ name, age });
        if (!editingStudent) e.target.reset();
      }}>

        {/* Name */}
        <div style={{ marginBottom: 16 }}>
          <label style={{
            display: "block",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: 8,
          }}>
            Full Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="e.g. Ram Sharma"
            defaultValue={editingStudent?.name || ""}
            required
            style={{
              width: "100%",
              background: "#222228",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "12px 16px",
              color: "#f0efe8",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        {/* Age */}
        <div style={{ marginBottom: 16 }}>
          <label style={{
            display: "block",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: 8,
          }}>
            Age
          </label>
          <input
            name="age"
            type="number"
            placeholder="e.g. 20"
            defaultValue={editingStudent?.age || ""}
            required
            style={{
              width: "100%",
              background: "#222228",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "12px 16px",
              color: "#f0efe8",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: "#c8f04d",
            color: "#0f0f11",
            border: "none",
            borderRadius: 10,
            padding: 12,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            marginTop: 4,
          }}
        >
          {loading
            ? editingStudent ? "Updating..." : "Adding..."
            : editingStudent ? "Update Student" : "Add Student"}
        </button>

      </form>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>
    </div>
  );
}
