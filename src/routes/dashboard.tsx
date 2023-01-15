import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box } from '@mui/system';

  const rows = [
    { id: 1 }
    //fetch data into here
  ];

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90},
  ];

export default function Dashboard() {

  return (
    <Box sx={{ height: 400, width: '100%'}}>
          <DataGrid
            rows={rows}
            columns={columns}
          />
    </Box>
  );
}