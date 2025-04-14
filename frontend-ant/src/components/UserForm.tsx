import { useEffect } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { User } from "../types/User";

interface Props {
  initialValues?: Partial<User>;
  onFinish: (values: any) => void;
  isEditing?: boolean;
}

const UserForm: React.FC<Props> = ({ initialValues, onFinish, isEditing }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleSubmit = (values: any) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="age" label="Age" rules={[{ required: true }]}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {isEditing ? "Update" : "Save"}
        </Button>
        {isEditing && (
          <Button
            style={{ marginLeft: 8 }}
            onClick={() => form.resetFields()}
            htmlType="button"
          >
            Reset
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default UserForm;
