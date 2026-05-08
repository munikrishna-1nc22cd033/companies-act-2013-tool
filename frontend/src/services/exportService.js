import API from "./api";

export const exportCSV = async () => {
  const res = await API.get("/records/export", {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "data.csv");
  document.body.appendChild(link);
  link.click();
};