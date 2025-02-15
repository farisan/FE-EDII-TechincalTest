import React, { useEffect, useMemo } from "react";

function Dashboard() {
  const role = useMemo(() => localStorage.getItem('role'),[])
  return (
    <>
      <div
        style={{
          height: "70vh", // Menggunakan viewport height agar memenuhi layar
          width: "100%",
          display: "flex",
          flexDirection: "row", // Bisa dihapus karena default-nya sudah row
          justifyContent: "center", // Tengahkan secara horizontal
          alignItems: "center", // Tengahkan secara vertikal
        }}
      >
        <p>Hallo, {role}</p>
      </div>
    </>
  );
}

export default Dashboard;
