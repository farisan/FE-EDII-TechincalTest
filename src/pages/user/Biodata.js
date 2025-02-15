import { message, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { PROFILE } from "../../utils/axios";
import TablePekerjaan from "./_component/TablePekerjaan";
import TablePendidikan from "./_component/TablePendidikan";
import TablePelatihan from "./_component/TablePelatihan";
import ViewBiodata from "./_component/ViewBiodata";

function Biodata({propsAdmin = false}) {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});

  const getUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await PROFILE(token);
      setProfile(response.data.data);
      messageApi.open({
        type: "success",
        content: 'Berhasil! mengambil data terbaru',
      });
    } catch (error) {
      message.error("error mendapatkan data user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {contextHolder}
      <Skeleton loading={loading}>
        <ViewBiodata data={profile || []} reloadData={() => getUser()} />

        <br />
        <br />

        {profile.role !== "admin" && (
          <>
            <TablePekerjaan data={profile?.pekerjaan || []} reloadData={() => getUser()} />

            <br />
            <br />

            <TablePendidikan data={profile?.pendidikan || []} reloadData={() => getUser()} />

            <br />
            <br />

            <TablePelatihan data={profile?.pelatihan || []} reloadData={() => getUser()} />
          </>
        )}
      </Skeleton>
    </>
  );
}

export default Biodata;
