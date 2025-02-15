import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Input, message, Modal, Row, Skeleton, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { ALL_USER, PROFILE, SEARCH_USER, SOFT_DELETE_ACCOUNT } from "../../utils/axios";
import ViewBiodata from "../user/_component/ViewBiodata";
import TablePekerjaan from "../user/_component/TablePekerjaan";
import TablePendidikan from "../user/_component/TablePendidikan";
import TablePelatihan from "../user/_component/TablePelatihan";
import dayjs from "dayjs";

function DataUser() {
  const [messageApi, contextHolder] = message.useMessage();
  const [dataUser, setDataUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [idSelectDelete, setIdSelectDelete] = useState(null);
  const [selectRow, setSelectRow] = useState({});
  const [search, setSearch] = useState({})

  const columns = [
    {
      title: "No",
      render: (text, record, index) => index + 1,
      width: 60,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Nama",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "ttl",
      key: "ttl",
    },
    {
      title: "Posisi",
      dataIndex: "posisi",
      key: "posisi",
      render: (value) => <Tag color={value === "FULLSTACK" ? "blue" : value === "FRONTEND" ? "green" : "purple"}>{value}</Tag>,
    },
    {
      title: "Status Akun",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => <Tag color={isActive ? "green" : "red"}>{isActive ? "Aktif" : "Tidak Aktif"}</Tag>,
    },
    {
      title: "Aksi",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => {
              setSelectRow(record);
              setIsDetail(true);
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              setIsDelete(true);
              setIdSelectDelete(record.id);
            }}
            type="primary"
            danger={true}
          />
        </Space>
      ),
    },
  ];

  const allUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await ALL_USER(token);
      setDataUser(response.data.data);
      messageApi.success("Berhasil! mendapatkan data");
    } catch (error) {
      messageApi.error("Gagal! mendapatkan data");
    } finally {
      setLoading(false);
      setIsDetail(false);
    }
  };

  const searchUser = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token");
      const response = await SEARCH_USER(token, search);
      if (response?.length < 1) {
        setDataUser([])
        message.info('Data tidak ditemukan');
        return
      } else {
        setDataUser(response.data.data)
      }
    } catch (error) {
      message.error("Gagal! data tidak ada");
    } finally {
      setLoading(false)
      setIsDetail(false)
    }
  };


  useEffect(() => {
    allUser();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await SOFT_DELETE_ACCOUNT(token, idSelectDelete);
      messageApi.success("Berhasil! menghapus data");
      allUser();
    } catch (error) {
      messageApi.error("Gagal! menghapus data");
    } finally {
      setIdSelectDelete(null);
      setIsDelete(false);
    }
  };

  const handleSearch = (key, value) => {
    setSearch((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <>
      {contextHolder}
      <Skeleton loading={loading}>
        <Card title="Semua Data User" size="large" style={{ width: "100%" }}>
          <Row gutter={[5,5]}>
            <Col>
              <p>Name</p>
              <Input value={search.username} onChange={(e) => handleSearch('username', e.target.value)} placeholder="Masukan username" />
            </Col>
            <Col>
              <p>Tanggal Lahir</p>
              <DatePicker name="ttl" format="YYYY-MM-DD" style={{ width: "100%" }} value={search?.ttl ? dayjs(search?.ttl) : null} onChange={(date, dateString) => handleSearch("ttl", dateString)} />
            </Col>
            <Col>
              <p>Posisi yang dilamar</p>
              <Input value={search.posisi} onChange={(e) => handleSearch('posisi', e.target.value)} placeholder="Masukan posisi yang di cari" />
            </Col>
            <Col>
              <p style={{color:'white'}}>.</p>
              <Button type="primary" onClick={searchUser}>Cari</Button>
            </Col>
            <Col>
              <p style={{color:'white'}}>.</p>
              <Button type="primary" danger={true} onClick={allUser}>Hapus Pencarian</Button>
            </Col>
          </Row>
          <br />
          <br />
          <Table dataSource={dataUser} columns={columns} />
        </Card>
      </Skeleton>

      <br />

      {isDetail && (
        <Skeleton loading={!isDetail}>
          <Card
            title="Detail User"
            size="large"
            style={{ width: "100%", backgroundColor: "#A7C7E7" }}
            extra={
              <Button
                color="primary"
                danger={true}
                variant="filled"
                onClick={() => {
                  setSelectRow({});
                  setIsDetail(false);
                }}
              >
                Tutup
              </Button>
            }
          >
            <ViewBiodata data={selectRow || []} showAdd={false} reloadData={() => allUser()} />

            <br />
            <br />
            <TablePekerjaan data={selectRow?.pekerjaan || []} showAdd={false} reloadData={() => allUser()} />

            <br />
            <br />

            <TablePendidikan data={selectRow?.pendidikan || []} showAdd={false} reloadData={() => allUser()} />

            <br />
            <br />

            <TablePelatihan data={selectRow?.pelatihan || []} showAdd={false} reloadData={() => allUser()} />
          </Card>
        </Skeleton>
      )}

      {isDelete && (
        <Modal
          open={isDelete}
          title="Hapus Data Pekerjaan"
          width={500}
          style={{
            top: 20,
          }}
          footer={[
            <Button
              type="primary"
              danger={true}
              // onClick={() => {
              //   setValueDelete({});
              //   setIsDelete(false);
              // }}
            >
              Batal
            </Button>,
            <Button type="primary" onClick={handleDeleteUser}>
              Ya Hapus
            </Button>,
          ]}
        >
          <p>
            <span style={{ color: "red" }}>*</span>Apakah kamu yakin ingin menghapus data ini ?
          </p>
        </Modal>
      )}
    </>
  );
}

export default DataUser;
