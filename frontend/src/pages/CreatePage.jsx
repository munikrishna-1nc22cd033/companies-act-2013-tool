import { useState } from "react";
import { createRecord } from "../services/recordService";

export default function CreatePage() {
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = async () => {
    await createRecord({ companyName });
    alert("Created!");
  };

  return (
    <div>
      <h2>Create</h2>
      <input onChange={(e) => setCompanyName(e.target.value)} />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}