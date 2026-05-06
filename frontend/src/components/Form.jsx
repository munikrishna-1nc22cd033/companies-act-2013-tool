import { useState } from "react";
import api from "../services/api";

function Form({ refresh }) {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      if (!name) return;

      await api.post("/create", {
        companyName: name
      });

      setName("");
      refresh();
    } catch (err) {
      console.log("POST Error:", err);
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Company Name"
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}

export default Form;