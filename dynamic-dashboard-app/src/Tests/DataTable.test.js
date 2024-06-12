import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from '../Components/DataTable';

test('renders elements in the table page', () => {
  render(<DataTable />);
  const tableHeadId = screen.getByText(/ID/i);
  const tableHeadUsername = screen.getByText(/Username/i);
  const newUserform = screen.getByText(/Add New User/i);

  fireEvent.click(getByTest('ID'));

  expect(tableHeadId).toBeInTheDocument();
  expect(tableHeadUsername).toBeInTheDocument();
  expect(newUserform).toBeInTheDocument();
});
