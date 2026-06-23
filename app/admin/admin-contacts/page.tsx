import AdminContactPage from './AdminContactPage';
import { getAllContacts } from '@/controllers/contactController';

export default async function Page() {
  const contacts = await getAllContacts();

  return <AdminContactPage initialContacts={contacts} />;
}
