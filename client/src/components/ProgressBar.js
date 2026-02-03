import React from "react";

const ProgressBar = ({ current, total }) => {
  const percentage = total === 0 ? 0 : Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ fontWeight: 600, marginBottom: "8px" }}>
        Progress: {percentage}%
      </div>
      <div
        style={{
          height: "10px",
          background: "#d9e2ec",
          borderRadius: "999px",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            borderRadius: "999px",
            background: "#2f6fed",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
