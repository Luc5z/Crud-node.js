import { Modal, Form, Input } from "antd";
import { useEffect } from "react";
import { User } from "../types/User";

interface ViewUserModalProps {
  visible: boolean;
  onClose: () => void;
  user: User | null;
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({
  visible,
  onClose,
  user,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [user, form]);

  return (
    <Modal
      title="Detalhes do Usuário"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Nome" name="name">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Idade" name="age">
          <Input type="number" readOnly />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewUserModal;
