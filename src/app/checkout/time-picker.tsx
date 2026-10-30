"use client";

import { useState } from "react";

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
const minutes = ["00", "15", "30", "45"];

interface TimeRangePickerProps {
  startValue?: string;
  endValue?: string;
  onStartChange?: (time: string) => void;
  onEndChange?: (time: string) => void;
}

export default function TimeRangePicker({ startValue = "09:00", endValue = "10:00", onStartChange, onEndChange }: TimeRangePickerProps) {
  const [startHour, setStartHour] = useState(startValue.split(":")[0]);
  const [startMin, setStartMin] = useState(startValue.split(":")[1] || "00");
  const [endHour, setEndHour] = useState(endValue.split(":")[0]);
  const [endMin, setEndMin] = useState(endValue.split(":")[1] || "00");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <div style={{ fontSize: "13px", color: "#666", marginBottom: "8px", fontWeight: 600 }}>Departure Time</div>
        <div style={{ display: "flex", gap: "12px", padding: "16px", background: "#f9f9f9", borderRadius: "12px", justifyContent: "center", alignItems: "center" }}>
          <select
            value={startHour}
            onChange={(e) => {
              setStartHour(e.target.value);
              if (onStartChange) onStartChange(`${e.target.value}:${startMin}`);
            }}
            style={{ padding: "12px 20px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ddd", background: "white", cursor: "pointer" }}
          >
            {hours.map((h) => (<option key={h} value={h}>{h}</option>))}
          </select>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>:</div>
          <select
            value={startMin}
            onChange={(e) => {
              setStartMin(e.target.value);
              if (onStartChange) onStartChange(`${startHour}:${e.target.value}`);
            }}
            style={{ padding: "12px 20px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ddd", background: "white", cursor: "pointer" }}
          >
            {minutes.map((m) => (<option key={m} value={m}>{m}</option>))}
          </select>
        </div>
      </div>
    </div>
  );
}
