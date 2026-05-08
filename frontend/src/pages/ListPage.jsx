import { useEffect, useState } from "react";
import { getAll } from "../services/recordService";

export default function ListPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAll().then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Records</h2>
      {data.map((item) => (
        <div key={item.id}>
          {item.companyName} - {item.status}
        </div>
      ))}
    </div>
  );
}