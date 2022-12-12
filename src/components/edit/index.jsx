import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Typography,
  Layout,
  DatePicker,
  Select,
} from "antd";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import axiosUser from "../../api/axiosUser";

function Edits() {
  const { id } = useParams();
  const navigate = useNavigate();

  const schema = yup
    .object()
    .shape({
      firstName: yup.string().required("First Name is a required field"),
      lastName: yup.string().required("Last Name is a required field"),
      address: yup.string().required("Address is a required field"),
      phone: yup.number().required("Phone is a required field"),
      dateOfBirth: yup.date().required("Date of birth is a required field"),
      gender: yup.string().required("Gender is a required field"),
      isGraduate: yup.boolean(),
      school: yup.string().required("School is a required field"),
    })
    .required();

  useEffect(() => {
    try {
      const userGet = async () => {
        const response = await axiosUser.getFirst(id);
        const subDataGet = {
          ...response.data,
          dateOfBirth: dayjs.unix(response.data.dateOfBirth),
        };
        reset({
          firstName: subDataGet.firstName,
          lastName: subDataGet.lastName,
          address: subDataGet.address,
          phone: subDataGet.phone,
          dateOfBirth: subDataGet.dateOfBirth,
          gender: subDataGet.gender,
          isGraduate: subDataGet.isGraduate,
          school: subDataGet.school,
        });
      };
      userGet();
    } catch (error) {
      console.log(error);
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    try {
      const subData = {
        ...data,
        dateOfBirth: dayjs(data.dateOfBirth).unix(),
      };
      const userGet = async () => {
        const response = await axiosUser.getFirst(id);
        if (
          response.data.firstName === subData.firstName &&
          response.data.lastName === subData.lastName &&
          response.data.address === subData.address &&
          response.data.phone === subData.phone &&
          response.data.gender === subData.gender &&
          response.data.isGraduate === subData.isGraduate &&
          response.data.school === subData.school &&
          response.data.dateOfBirth === subData.dateOfBirth
        ) {
          alert("Date does not change");
        } else {
          await axiosUser.pulAll(id, subData);
          alert("You have successfully entered!");
          navigate("/");
        }
      };
      userGet();
    } catch (error) {
      console.log("Failed is: ", error);
    }
  };
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { Title, Text } = Typography;

  return (
    <Layout width="xxl">
      <div style={{ textAlign: "center" }}>
        <Title level={2}> Edit Data </Title>
      </div>
      <Form
        onFinish={handleSubmit(onSubmit)}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
      >
        <Form.Item label="First Name">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input {...field} status={errors.firstName ? "error" : ""} />
            )}
          />
          <Text type="danger">{errors.firstName?.message}</Text>
        </Form.Item>

        <Form.Item label="Last Name">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input {...field} status={errors.lastName ? "error" : ""} />
            )}
          />
          <Text type="danger">{errors.lastName?.message}</Text>
        </Form.Item>

        <Form.Item label="Address">
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input {...field} status={errors.address ? "error" : ""} />
            )}
          />
          <Text type="danger">{errors.address?.message}</Text>
        </Form.Item>
        <Form.Item label="Phone">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                type="number"
                {...field}
                status={errors.phone ? "error" : ""}
              />
            )}
          />
          <Text type="danger">{errors.phone?.message}</Text>
        </Form.Item>
        <Form.Item label="Date Of Birth">
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                status={errors.dateOfBirth ? "error" : ""}
              />
            )}
          />
          <br />
          <Text type="danger">{errors.dateOfBirth?.message}</Text>
        </Form.Item>

        <Form.Item label="Gender">
          <Controller
            control={control}
            name="gender"
            render={({ field }) => {
              return (
                <Radio.Group {...field}>
                  <Radio value={"men"}>Men</Radio>
                  <Radio value={"women"}>Women</Radio>
                </Radio.Group>
              );
            }}
          />
          <br />
          <Text type="danger">{errors.firstName?.message}</Text>
        </Form.Item>

        <Form.Item label="Graduate">
          <Controller
            name="isGraduate"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Checkbox {...field} checked={watch("isGraduate")}>
                Graduate
              </Checkbox>
            )}
          />
          <Text type="danger">{errors.isGraduate?.message}</Text>
        </Form.Item>

        <Form.Item label="School">
          <Controller
            name="school"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                status={errors.school ? "error" : ""}
                options={[
                  { value: "Dai Hoc 1", label: "Dai Hoc 1" },
                  { value: "Dai Hoc 2", label: "Dai Hoc 2" },
                  { value: "Dai Hoc 3", label: "Dai Hoc 3" },
                ]}
              />
            )}
          />
          <Text type="danger">{errors.school?.message}</Text>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 14,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ width: "20%" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default Edits;
