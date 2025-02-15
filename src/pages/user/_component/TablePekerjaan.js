import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, message, Modal, Row, Space, Table } from "antd";

import React, { useState } from "react";
import { formatToIDR } from "../../../utils/mataUang";
import { DELETE_JENIS, TAMBAH_PEKERJAAN, UPDATE_PENGALAMAN } from "../../../utils/axios";

function TablePekerjaan({ data = [], reloadData = () => {}, showAdd = true }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isTambah, setIsTambah] = useState(false);
  const [valueTambah, setValueTambah] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [valueEdit, setValueEdit] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [valueDelete, setValueDelete] = useState({});

  const columnsPekerjaan = [
    {
      title: "No",
      render: (text, record, index) => index + 1,
      width: 60,
    },
    {
      title: "Nama Perusahaan",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Posisi Terakhir",
      dataIndex: "posisi",
      key: "posisi",
    },
    {
      title: "Pendapatan Terakhir",
      dataIndex: "pendapatan",
      key: "pendapatan",
      render: (value) => {
        if (value) {
          return formatToIDR(value);
        } else {
          return "-";
        }
      },
    },
    {
      title: "Tahun",
      dataIndex: "tahun",
      key: "tahun",
    },
    {
      title: "Aksi",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setValueEdit(record);
              setIsEdit(true);
            }}
            type="primary"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              setValueDelete(record);
              setIsDelete(true);
            }}
            type="primary"
            danger={true}
          />
        </Space>
      ),
    },
  ];

  const onChangeTambah = (key, value) => {
    setValueTambah((prev) => ({ ...prev, [key]: value }));
  };

  const onSaveTambah = async () => {
    try {
      if (!valueTambah.nama || !valueTambah.posisi || !valueTambah.pendapatan || !valueTambah.tahun) {
        return messageApi.open({
          type: "error",
          content: "Lengkapi Data!",
        });
      }
      const token = localStorage.getItem("token");
      await TAMBAH_PEKERJAAN(token, valueTambah);
      messageApi.open({
        type: "success",
        content: "Data Berhasil di tambah",
      });
      setIsTambah(false);
      setValueTambah({});
      reloadData();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Gagal! update data",
      });
    }
  };

  const onChangeEdit = (key, value) => {
    setValueEdit((prev) => ({ ...prev, [key]: value }));
  };

  const onSaveEdit = async () => {
    try {
      if (!valueEdit?.nama || !valueEdit.posisi || !valueEdit.pendapatan || !valueEdit.tahun) {
        return messageApi.open({
          type: "error",
          content: "Lengkapi Data!",
        });
      }
      const token = localStorage.getItem("token");
      await UPDATE_PENGALAMAN(token, valueEdit);
      messageApi.open({
        type: "success",
        content: "Data Berhasil di update",
      });
      setIsEdit(false);
      setValueEdit({});
      reloadData();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Gagal! update data",
      });
    }
  };

  const onDeleteDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      await DELETE_JENIS("pekerjaan", token, valueDelete.id, valueDelete.biodataId);
      messageApi.open({
        type: "success",
        content: "Berhasil! menghapus data",
      });
      reloadData();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Gagal! menghapus data",
      });
    } finally {
      setIsDelete(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Card
        title="Detail Pekerjaan"
        size="large"
        style={{ width: "100%" }}
        extra={
          showAdd && (
            <Button color="primary" variant="solid" onClick={() => setIsTambah(true)}>
              Tambah
            </Button>
          )
        }
      >
        <Table dataSource={data} columns={columnsPekerjaan} />
      </Card>

      {/* Modal */}
      {isTambah && (
        <Modal
          open={isTambah}
          title="Tambah Data Pekerjaan"
          width={500}
          style={{
            top: 20,
          }}
          footer={[
            <Button
              type="primary"
              danger={true}
              onClick={() => {
                setValueTambah({});
                setIsTambah(false);
              }}
            >
              Batal
            </Button>,
            <Button type="primary" onClick={onSaveTambah}>
              Simpan
            </Button>,
          ]}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
              <p>Nama Perusahaan</p>
              <Input value={valueTambah?.nama} onChange={(e) => onChangeTambah("nama", e.target.value)} />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Posisi</p>
              <Input value={valueTambah?.posisi} onChange={(e) => onChangeTambah("posisi", e.target.value)} />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Pendapatan</p>
              <Input
                name="pendapatan"
                value={valueTambah?.pendapatan}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue) && inputValue.length <= 10) {
                    onChangeTambah("pendapatan", Number(inputValue));
                  }
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Tahun</p>
              <Input
                name="tahun"
                value={valueTambah?.tahun}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
                    onChangeTambah("tahun", Number(inputValue));
                  }
                }}
              />
            </Col>
          </Row>
        </Modal>
      )}

      {isEdit && (
        <Modal
          open={isEdit}
          title="Edit Data Pekerjaan"
          width={500}
          style={{
            top: 20,
          }}
          footer={[
            <Button
              type="primary"
              danger={true}
              onClick={() => {
                setValueEdit({});
                setIsEdit(false);
              }}
            >
              Batal
            </Button>,
            <Button type="primary" onClick={onSaveEdit}>
              Simpan
            </Button>,
          ]}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
              <p>Nama Perusahaan</p>
              <Input value={valueEdit?.nama} onChange={(e) => onChangeEdit("nama", e.target.value)} />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Posisi</p>
              <Input value={valueEdit?.posisi} onChange={(e) => onChangeEdit("posisi", e.target.value)} />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Pendapatan</p>
              <Input
                name="pendapatan"
                value={valueEdit?.pendapatan}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue) && inputValue.length <= 10) {
                    onChangeEdit("pendapatan", Number(inputValue));
                  }
                }}
              />
              {/* <Input value={valueEdit?.pendapatan} onChange={(e) => onChangeEdit("pendapatan", Number(e.target.value))} /> */}
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Tahun</p>
              <Input
                name="tahun"
                value={valueEdit?.tahun}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
                    onChangeEdit("tahun", Number(inputValue));
                  }
                }}
              />
              {/* <Input value={valueEdit?.tahun} onChange={(e) => onChangeEdit("tahun", Number(e.target.value))} /> */}
            </Col>
          </Row>
        </Modal>
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
              onClick={() => {
                setValueDelete({});
                setIsDelete(false);
              }}
            >
              Batal
            </Button>,
            <Button type="primary" onClick={onDeleteDetail}>
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

export default TablePekerjaan;
