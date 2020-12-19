import { render, screen } from '@testing-library/react';
import FileUploader from "./FileUploader"

test('renders File Uploader Component', () => {
  render(<FileUploader accept={".csv, .xls, .xlsx"} handleFileUpload={() => {}} onSuccess={() => {}} />);
  const addBtn = screen.getByText("Add Data");
  expect(addBtn).toBeInTheDocument();
});
