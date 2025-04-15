import { Modal, Form, Input } from 'antd';
import { useEffect } from 'react';
import { User } from '../types/User';

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (user: User) => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ visible, onClose, user, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...user!, ...values });
      form.resetFields();
    } catch (error) {
      console.error('Erro ao validar o formulário', error);
    }
  };

  return (
    <Modal
      title="Editar Usuário"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Salvar"
      cancelText="Cancelar"
      okButtonProps={{
        style: { backgroundColor: '#52c41a', borderColor: '#52c41a', color: 'white' }
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Insira o nome' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Insira o email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Idade" rules={[{ required: true, message: 'Insira a idade' }]}>
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
