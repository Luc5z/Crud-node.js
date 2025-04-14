import { dbPromise } from '../database/connection';
import { User } from '../models/User';

export const createUser = async (user: User) => {
  const { name, email, age } = user;

  try {
    const db = await dbPromise;
    await db.run(
      `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`,
      [name, email, age]
    );

    return { name, email, age };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw new Error("Erro ao criar usuário.");
  }
};


export const getAllUsers = async (): Promise<User[]> => {
  const db = await dbPromise;
  return db.all('SELECT * FROM users');
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  const db = await dbPromise;
  return db.get('SELECT * FROM users WHERE id = ?', id);
};

export const updateUser = async (id: number, user: User) => {
  const db = await dbPromise;
  await db.run(
    'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
    user.name,
    user.email,
    user.age,
    id
  );
};

export const deleteUser = async (id: number) => {
  const db = await dbPromise;
  await db.run('DELETE FROM users WHERE id = ?', id);
};
