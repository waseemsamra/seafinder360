"use client";

import { useState } from "react";

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const minutes = ["00", "15", "30", "45"];

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
}

export default function TimePicker({ value = "09:00", onChange }: TimePickerProps) {
  const [selectedHour, setSelectedHour] = useState(value.split(":")[0]);
  const [selectedMinute, setSelectedMinute] = useState(value.split(":")[1] || "00");

  const handleChange = (h: string, m: string) => {
    const time = `${h}:${m}`;
    if (onChange) onChange(time);
  };

  return (
    <div style={{ display: "flex", gap: "12px", padding: "20px", background: "#f9f9f9", borderRadius: "12px", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <div style={{ fontSize: "12px", color: "#666", fontWeight: 600 }}>Hour</div>
        <select
          value={selectedHour}
          onChange={(e) => {
            setSelectedHour(e.target.value);
            handleChange(e.target.value, selectedMinute);
          }}
          style={{ padding: "12px 20px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ddd", background: "white", cursor: "pointer" }}
        >
          {hours.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>
      <div style={{ fontSize: "24px", fontWeight: "bold", paddingTop: "20px" }}>:</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <div style={{ fontSize: "12px", color: "#666", fontWeight: 600 }}>Minute</div>
        <select
          value={selectedMinute}
          onChange={(e) => {
            setSelectedMinute(e.target.value);
            handleChange(selectedHour, e.target.value);
          }}
          style={{ padding: "12px 20px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ddd", background: "white", cursor: "pointer" }}
        >
          {minutes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
