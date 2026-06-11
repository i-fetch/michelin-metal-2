import InquiriesPage from './InquiriesPage'
import { getAllInquiries } from '@/controllers/inquiryController';

export default async function Page() {
  const inquiries = await getAllInquiries();
  return <InquiriesPage initialInquiries={inquiries} />;
}
