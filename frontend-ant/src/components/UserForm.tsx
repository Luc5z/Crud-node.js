import { useEffect } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { User } from "../types/User";

interface Props {
  initialValues?: Partial<User>;
  onFinish: (values: any) => void;
}

const UserForm: React.FC<Props> = ({ initialValues, onFinish }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const handleSubmit = (values: any) => {
    onFinish(values);
    form.resetFields();
  };

  return (
    <><Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Nome"
        rules={[
          { required: true, message: "Por favor, insira o nome." },
          { min: 3, message: "O nome deve ter pelo menos 3 caracteres." },
        ]}
      >
        <Input placeholder="Digite o nome" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Por favor, insira o email." },
          { type: "email", message: "Por favor, insira um email válido." },
        ]}
      >
        <Input placeholder="Digite o email" />
      </Form.Item>
      <Form.Item
        name="age"
        label="Idade"
        rules={[
          { required: true, message: "Por favor, insira a idade." },
          { type: "number", min: 0, message: "A idade deve ser um número positivo." },
        ]}
      >
        <InputNumber min={0} style={{ width: "100%" }} placeholder="Digite a idade" />
      </Form.Item><Form.Item>
        
        <Button type="primary" variant="solid" color="green" htmlType="submit">
          Salvar
        </Button>
        
      </Form.Item>
    </Form></>
  );
};

export default UserForm;
