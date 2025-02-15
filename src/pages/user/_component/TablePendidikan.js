import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, message, Modal, Row, Select, Space, Table } from "antd";

import React, { useState } from "react";
import { formatToIDR } from "../../../utils/mataUang";
import { DELETE_JENIS, TAMBAH_PENDIDIKAN, UPDATE_PENDIDIKAN } from "../../../utils/axios";

function TablePendidikan({ data = [], reloadData = () => {}, showAdd = true }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isTambah, setIsTambah] = useState(false);
  const [valueTambah, setValueTambah] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [valueEdit, setValueEdit] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const [valueDelete, setValueDelete] = useState({});

  const columnsPendidikan = [
    {
      title: "No",
      render: (text, record, index) => index + 1,
      width: 60,
    },
    {
      title: "Gelar",
      dataIndex: "gelar",
      key: "gelar",
    },
    {
      title: "Nama Institusi Akademik",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Jurusan",
      dataIndex: "jurusan",
      key: "jurusan",
    },
    {
      title: "Tahun Lulus",
      dataIndex: "tahunLulus",
      key: "tahunLulus",
    },
    {
      title: "Nilai / IPK",
      dataIndex: "ipk",
      key: "ipk",
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
      if (!valueTambah?.nama || !valueTambah.jurusan || !valueTambah.gelar || !valueTambah.ipk || !valueTambah.tahunLulus) {
        return messageApi.open({
          type: "error",
          content: "Lengkapi Data!",
        });
      }
      const token = localStorage.getItem("token");
      await TAMBAH_PENDIDIKAN(token, valueTambah);
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
      if (!valueEdit?.nama || !valueEdit.jurusan || !valueEdit.gelar || !valueEdit.ipk || !valueEdit.tahunLulus) {
        return messageApi.open({
          type: "error",
          content: "Lengkapi Data!",
        });
      }
      const token = localStorage.getItem("token");
      await UPDATE_PENDIDIKAN(token, valueEdit);
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
      await DELETE_JENIS("pendidikan", token, valueDelete.id, valueDelete.biodataId);
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
        title="Detail Pendidikan"
        size="large"
        style={{ width: "100%" }}
        extra={
          showAdd && <Button color="primary" variant="solid" onClick={() => setIsTambah(true)}>
            Tambah
          </Button>
        }
      >
        <Table dataSource={data} columns={columnsPendidikan} />
      </Card>

      {/* Modal */}
      {isTambah && (
        <Modal
          open={isTambah}
          title="Tambah Data Pendidikan"
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
              <p>Nama Pendidikan</p>
              <Input value={valueTambah?.nama} onChange={(e) => onChangeTambah("nama", e.target.value)} />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Jurusan</p>
              <Input value={valueTambah?.jurusan} onChange={(e) => onChangeTambah("jurusan", e.target.value)} />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Gelar</p>
              {/* <Input value={valueTambah?.gelar} onChange={(e) => onChangeTambah("gelar", e.target.value)} /> */}
              <Select style={{ width: "100%" }} value={valueEdit?.gelar} onChange={(e) => onChangeTambah("gelar", e)}>
                <Select.Option value="SD">SD</Select.Option>
                <Select.Option value="SMP">SMP</Select.Option>
                <Select.Option value="SMA">SMA</Select.Option>
                <Select.Option value="D1">D1</Select.Option>
                <Select.Option value="D2">D2</Select.Option>
                <Select.Option value="D3">D3</Select.Option>
                <Select.Option Value="D4/S1">D4 / S1</Select.Option>
                <Select.Option value="S2">S2</Select.Option>
                <Select.Option value="S3">S3</Select.Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Ipk / Nilai</p>
              <Input
                name="ipk"
                value={valueTambah?.ipk}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
                    onChangeTambah("ipk", Number(inputValue));
                  }
                }}
              />
              {/* <Input value={valueTambah?.ipk} onChange={(e) => onChangeTambah("ipk", Number(e.target.value))} /> */}
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Tahun</p>
              <Input
                name="tahunLulus"
                value={valueTambah?.tahunLulus}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
                    onChangeTambah("tahunLulus", Number(inputValue));
                  }
                }}
              />
              {/* <Input value={valueTambah?.tahunLulus} onChange={(e) => onChangeTambah("tahunLulus", Number(e.target.value))} /> */}
            </Col>
          </Row>
        </Modal>
      )}

      {isEdit && (
        <Modal
          open={isEdit}
          title="Edit Data Pendidikan"
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
              <p>Nama Pendidikan</p>
              <Input value={valueEdit?.nama} onChange={(e) => onChangeEdit("nama", e.target.value)} />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Jurusan</p>
              <Input value={valueEdit?.jurusan} onChange={(e) => onChangeEdit("jurusan", e.target.value)} />
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Gelar</p>
              {/* <Input value={valueEdit?.gelar} onChange={(e) => onChangeEdit("gelar", e.target.value)} /> */}
              <Select style={{ width: "100%" }} value={valueEdit?.gelar} onChange={(e) => onChangeEdit("gelar", e)}>
                <Select.Option value="SD">SD</Select.Option>
                <Select.Option value="SMP">SMP</Select.Option>
                <Select.Option value="SMA">SMA</Select.Option>
                <Select.Option value="D1">D1</Select.Option>
                <Select.Option value="D2">D2</Select.Option>
                <Select.Option value="D3">D3</Select.Option>
                <Select.Option Value="D4/S1">D4 / S1</Select.Option>
                <Select.Option value="S2">S2</Select.Option>
                <Select.Option value="S3">S3</Select.Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Ipk / Nilai</p>
              <Input
                name="ipk"
                value={valueEdit?.ipk}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
                    onChangeEdit("ipk", Number(inputValue));
                  }
                }}
              />
              {/* <Input value={valueEdit?.ipk} onChange={(e) => onChangeEdit("ipk", Number(e.target.value))} /> */}
            </Col>
            <Col xs={24} sm={24} md={24}>
              <p>Tahun</p>
              <Input
                name="tahunLulus"
                value={valueEdit?.tahunLulus}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue) && inputValue.length <= 4) {
                    onChangeEdit("tahunLulus", Number(inputValue));
                  }
                }}
              />
              {/* <Input value={valueEdit?.tahunLulus} onChange={(e) => onChangeEdit("tahunLulus", Number(e.target.value))} /> */}
            </Col>
          </Row>
        </Modal>
      )}

      {isDelete && (
        <Modal
          open={isDelete}
          title="Hapus Data Pendidikan"
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

export default TablePendidikan;
