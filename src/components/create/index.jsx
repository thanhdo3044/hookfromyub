import React from "react";
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
import moment from "moment";
import { useDispatch } from "react-redux";
import { filtersReducer } from "../reducer/reducer";
import { useNavigate } from "react-router-dom";

function Create() {
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

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { isGraduate: false },
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const subData = {
        ...data,
        dateOfBirth: moment(data.dateOfBirth).unix(),
      };
      dispatch(filtersReducer.actions.ADD(subData));
      // axiosUser.postAll(subData);
      alert("You have successfully entered!");
      navigate("/");
    } catch (error) {
      console.log("Failed is: ", error);
    }
  };

  const { Title, Text } = Typography;

  return (
    <Layout width="xxl">
      <div style={{ textAlign: "center" }}>
        <Title level={2}> Add Data </Title>
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
        <Form.Item
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input your name",
            },
          ]}
        >
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
          <Radio.Group>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Radio {...field} value="men">
                  Men
                </Radio>
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Radio {...field} value="women">
                  Women
                </Radio>
              )}
            />
          </Radio.Group>
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

export default Create;
