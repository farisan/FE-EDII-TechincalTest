import { Button, Card, Col, DatePicker, Input, message, Modal, Row, Select, Tag, Typography } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { UPDATE_BIODATA } from "../../../utils/axios";
import { formatToIDR } from "../../../utils/mataUang";

const { Text } = Typography;

const renderItem = (label, value, isTag = false, tagColor = "blue") => (
  <Col span={8} style={{ marginBottom: 16 }}>
    <Text strong>{label}:</Text>
    <br />
    {isTag ? <Tag color={tagColor}>{value}</Tag> : <Text>{value || "Tidak tersedia"}</Text>}
  </Col>
);

function ViewBiodata({ data = {}, reloadData = () => {} }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [isEdit, setIsEdit] = useState(false);
  const [valueEdit, setValueEdit] = useState({});

  const handleShowEdit = (show) => {
    delete data.pekerjaan;
    delete data.pelatihan;
    delete data.pendidikan;
    setIsEdit(show);
    setValueEdit(data);
  };

  const handleChange = (key, value) => {
    setValueEdit((prev) => ({ ...prev, [key]: value }));
  };

  const onSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await UPDATE_BIODATA(token, valueEdit);
      messageApi.open({
        type: "success",
        content: "Berhasil! update data",
      });
      reloadData();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Berhasil! menghapus data",
      });
    } finally {
      setIsEdit(false);
      setValueEdit({});
    }
  };

  return (
    <>
      {contextHolder}
      <Card
        title="Detail Data Diri"
        size="large"
        style={{ width: "100%" }}
        extra={
          <Button color="primary" variant="solid" onClick={() => handleShowEdit(true)}>
            Ubah
          </Button>
        }
      >
        {/* Row 1 */}
        <Row gutter={[16, 16]}>
          {renderItem("Nama", data.username)}
          {renderItem("Email", data.email)}
          {renderItem("Role", data.role, true, data.role === "admin" ? "blue" : "green")}
        </Row>

        {/* Row 2 */}
        <Row gutter={[16, 16]}>
          {renderItem("Status Akun", data.isActive ? "Aktif" : "Nonaktif", true, data.isActive ? "green" : "red")}
          {renderItem("Posisi", data.posisi)}
          {renderItem("Ekspektasi Gaji", formatToIDR(data.expectSalary))}
        </Row>

        {/* Row 3 */}
        <Row gutter={[16, 16]}>
          {renderItem("Agama", data.agama)}
          {renderItem("Nomor Telepon", data.noTelp)}
          {renderItem("Alamat Tinggal", data.alamatTinggal)}
          {renderItem("Ketersediaan", data.ketersediaan)}
          {renderItem("Nomor Darurat", data.noDarurat)}
          {renderItem("Tempat, Tanggal Lahir", data.ttl)}
          {renderItem("Jenis Kelamin", data.jenisKelamin)}
          {renderItem("Agama", data.agama)}
          {renderItem("Golongan Darah", data.golonganDarah)}
          {renderItem("Status", data.status)}
          {renderItem("Skill", data.skill)}
          {renderItem("Nomor KTP", data.noKtp)}
          {renderItem("Alamat KTP", data.alamatKtp)}
        </Row>
      </Card>

      <Modal
        open={isEdit}
        title="Edit Data Diri"
        width={1000}
        style={{
          top: 20,
        }}
        footer={[
          <Button type="primary" danger={true} onClick={() => handleShowEdit(false)}>
            Batal
          </Button>,
          <Button type="primary" onClick={onSaveEdit}>
            Simpan
          </Button>,
        ]}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <p>Email</p>
            <Input name="email" value={valueEdit?.email} disabled />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Password</p>
            <Input.Password name="password" value={valueEdit?.password} disabled />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Role</p>
            <Input name="role" value={valueEdit?.role} disabled />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Username</p>
            <Input name="username" value={valueEdit?.username} onChange={(e) => handleChange("username", e.target.value)} />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Agama</p>
            <Select name="agama" style={{ width: "100%" }} value={valueEdit?.agama} onChange={(e) => handleChange("agama", e)}>
              <Select.Option value="islam">Islam</Select.Option>
              <Select.Option value="kristen">kristen</Select.Option>
              <Select.Option value="buddha">Buddha</Select.Option>
              <Select.Option value="hindu">Hindu</Select.Option>
              <Select.Option value="atheis">Atheis</Select.Option>
              <Select.Option value="kongucu">Kongucu</Select.Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>No Telfon</p>
            <Input
              name="noTelp"
              value={valueEdit?.noTelp}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^\d*$/.test(inputValue) && inputValue.length <= 13) {
                  handleChange("noTelp", inputValue);
                }
              }}
            />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>No Darurat</p>
            <Input
              name="noDarurat"
              value={valueEdit?.noDarurat}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^\d*$/.test(inputValue) && inputValue.length <= 13) {
                  handleChange("noDarurat", inputValue);
                }
              }}
            />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Tanggal Lahir</p>
            <DatePicker name="ttl" format="YYYY-MM-DD" style={{ width: "100%" }} value={valueEdit?.ttl ? dayjs(valueEdit?.ttl) : null} onChange={(date, dateString) => handleChange("ttl", dateString)} />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Jenis Kelamin</p>
            <Select name="jenisKelamin" style={{ width: "100%" }} value={valueEdit?.jenisKelamin} onChange={(e) => handleChange("jenisKelamin", e)}>
              <Select.Option value="pria">Pria</Select.Option>
              <Select.Option value="perempuan">Perempuan</Select.Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>No KTP</p>
            <Input
              name="noKtp"
              value={valueEdit?.noKtp}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^\d*$/.test(inputValue) && inputValue.length <= 16) {
                  handleChange("noKtp", inputValue);
                }
              }}
            />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Alamat KTP</p>
            <Input.TextArea name="alamatKtp" value={valueEdit?.alamatKtp} onChange={(e) => handleChange("alamatKtp", e.target.value)} />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Alamat Tinggal</p>
            <Input.TextArea name="alamatTinggal" value={valueEdit?.alamatTinggal} onChange={(e) => handleChange("alamatTinggal", e.target.value)} />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Golongan Darah</p>
            <Select name="golonganDarah" style={{ width: "100%" }} value={valueEdit?.golonganDarah} onChange={(e) => handleChange("golonganDarah", e)}>
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="AB">AB</Select.Option>
              <Select.Option value="O">O</Select.Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Status</p>
            <Select name="status" style={{ width: "100%" }} value={valueEdit?.status} onChange={(e) => handleChange("status", e)}>
              <Select.Option value="bekerja">Bekerja</Select.Option>
              <Select.Option value="tidak bekerja">Tidak Bekerja</Select.Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Skill</p>
            <Input name="skill" value={valueEdit?.skill} onChange={(e) => handleChange("skill", e.target.value)} />
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Ketersediaan</p>
            <Select name="ketersediaan" style={{ width: "100%" }} value={valueEdit?.ketersediaan} onChange={(e) => handleChange("ketersediaan", e)}>
              <Select.Option value="siap">Siap</Select.Option>
              <Select.Option value="tidak siap">Tidak Siap</Select.Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Posisi</p>
            <Select name="posisi" style={{ width: "100%" }} value={valueEdit?.posisi} onChange={(e) => handleChange("posisi", e)}>
              <Select.Option value="FRONTEND">Frontend Developer</Select.Option>
              <Select.Option value="BACKEND">Backend Developer</Select.Option>
              <Select.Option value="FULLSTACK">Fullstack Developer</Select.Option>
            </Select>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <p>Gaji yang diharapkan</p>
            <Input
              name="expectSalary"
              value={valueEdit?.expectSalary}
              onChange={(e) => {
                const inputValue = e.target.value;

                // Hanya izinkan angka (dan kosong) serta batasi maksimal 20 karakter
                if (/^\d*$/.test(inputValue) && inputValue.length <= 10) {
                  handleChange("expectSalary", Number(inputValue));
                }
              }}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default ViewBiodata;
