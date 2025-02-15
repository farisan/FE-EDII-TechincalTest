import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Card, Col, Input, message, Modal, Row, Select, Space, Table, Tag } from "antd";

import React, { useState } from "react";
import { DELETE_JENIS, TAMBAH_PELATIHAN, UPDATE_PELATIHAN } from "../../../utils/axios";

function TablePelatihan({ data = [], reloadData = () => {}, showAdd = true }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isTambah, setIsTambah] = useState(false);
  const [valueTambah, setValueTambah] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [valueEdit, setValueEdit] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [valueDelete, setValueDelete] = useState({});

  const columnsPelatihan = [
    {
      title: "No",
      render: (text, record, index) => index + 1,
      width: 60,
    },
    {
      title: "Nama Kursus / Pelatihan",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Sertifikat (ada / tidak)",
      dataIndex: "sertifikat",
      key: "sertifikat",
      render: (sertifikat) => {
        if (sertifikat == "ADA") {
          return <Tag color="green">{sertifikat}</Tag>;
        } else {
          return <Tag color="red">{sertifikat}</Tag>;
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
      if (!valueTambah?.nama || !valueTambah?.tahun || !valueTambah?.sertifikat){
        return messageApi.open({
          type: "error",
          content: "Lengkapi Data!",
        });
      }
      const token = localStorage.getItem("token");
      await TAMBAH_PELATIHAN(token, valueTambah);
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
      if (!valueEdit?.nama || !valueEdit?.tahun || !valueEdit?.sertifikat){
        return messageApi.open({
          type: "error",
          content: "Lengkapi Data!",
        });
      }
      const token = localStorage.getItem("token");
      await UPDATE_PELATIHAN(token, valueEdit);
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
      await DELETE_JENIS("pelatihan", token, valueDelete.id, valueDelete.biodataId);
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
        title="Detail Pelatihan"
        size="large"
        style={{ width: "100%" }}
        extra={
          showAdd && <Button color="primary" variant="solid" onClick={() => setIsTambah(true)}>
            Tambah
          </Button>
        }
      >
        <Table dataSource={data} columns={columnsPelatihan} />
      </Card>

      {/* Modal */}
      {isTambah && (
        <Modal
          open={isTambah}
          title="Tambah Data Pelatihan"
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
              <p>Nama Pelatihan</p>
              <Input value={valueTambah?.nama} onChange={(e) => onChangeTambah("nama", e.target.value)} />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Sertifikat (ada / tidak)</p>
              <Select style={{ width: "100%" }} value={valueTambah?.sertifikat} onChange={(e) => onChangeTambah("sertifikat", e)}>
                <Select.Option value="ADA">Ada</Select.Option>
                <Select.Option value="TIDAK">Tidak</Select.Option>
              </Select>
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
              {/* <Input value={valueTambah?.tahun} onChange={(e) => onChangeTambah("tahun", Number(e.target.value))} /> */}
            </Col>
          </Row>
        </Modal>
      )}

      {isEdit && (
        <Modal
          open={isEdit}
          title="Edit Data Pelatihan"
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
              <p>Nama Pelatihan</p>
              <Input value={valueEdit?.nama} onChange={(e) => onChangeEdit("nama", e.target.value)} />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Sertifikat (ada / tidak)</p>
              <Select style={{ width: "100%" }} value={valueEdit?.sertifikat} onChange={(e) => onChangeEdit("sertifikat", e)}>
                <Select.Option value="ADA">Ada</Select.Option>
                <Select.Option value="TIDAK">Tidak</Select.Option>
              </Select>
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

export default TablePelatihan;
