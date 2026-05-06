import { useEffect, useState } from "react";
import api from "../services/api";
import Form from "../components/Form";

function ListPage() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      const res = await api.get("/all");
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("API Error:", err);
      setData([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // DELETE
  const deleteItem = async (id) => {
    try {
      await api.delete(`/delete/${id}`);
      loadData();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  // UPDATE
  const updateItem = async () => {
    try {
      await api.put(`/update/${editId}`, {
        companyName: editName
      });
      setEditId(null);
      setEditName("");
      loadData();
    } catch (err) {
      console.log("Update Error:", err);
    }
  };

  // SEARCH FILTER
  const filteredData = data.filter((item) =>
    item?.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Company List</h1>

      <Form refresh={loadData} />

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredData.length === 0 ? (
        <p>No Data Available</p>
      ) : (
        filteredData.map((item, index) => (
          <div key={index} style={{ border: "1px solid black", margin: "5px", padding: "5px" }}>
            
            {editId === item.id ? (
              <div>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={updateItem}>Save</button>
              </div>
            ) : (
              <div>
                {item?.companyName || "No Name"}

                <button onClick={() => {
                  setEditId(item.id);
                  setEditName(item.companyName);
                }}>
                  Edit
                </button>

                <button onClick={() => deleteItem(item.id)}>
                  Delete
                </button>
              </div>
            )}

          </div>
        ))
      )}
    </div>
  );
}

export default ListPage;