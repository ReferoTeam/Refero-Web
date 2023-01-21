import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box } from '@mui/system';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authconfig';
import { useEffect, useState } from 'react';
import { GraphData, User } from '../types';
import { TextField } from '@mui/material';

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, editable: false, type: 'string', resizable: true},
    { field: 'eventname', headerName: 'Event Name', width: 150, editable: true, type: 'string'},
    { field: 'description', headerName: 'Description', width: 150, editable: true, type: 'string'},
    { field: 'location', headerName: 'Location', width: 150, editable: true, type: 'string'},
    { field: 'datetime', headerName: 'Date / Time', width: 150, editable: true, type: 'dateTime', },
    { field: 'duration', headerName: 'Duration', width: 80, editable: true, type: 'number' },
    { field: 'userID', headerName: 'Created by ', width: 120, editable: false, type: 'string' },
    { field: 'attendingUsers', headerName: 'RSVPs', width: 90, type: 'number' }
  ];

export default function Dashboard(props: any) {
  const { _id }: User = props;
  const [rows, setRows] = useState<any[]>([]);

  function fetchEvents() {
    //get events with userID == _id
    const url = 'http://localhost:8000/events/' + 'age324';
    fetch(url)
    .then((res: Response) => res.json())
    .then((data) => setRows(convertToTable(data)))
    .catch();
  }


  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Box sx={{ height: 400, p: 3 }}>
          <DataGrid
            rows={rows}
            columns={columns}
          />
    </Box>
  );
}

function convertToTable(eventData: any): any[] {
  let table: any[] = [];
  for(let i=0; i < eventData.length; i++) {
    const { _id, eventname, description, location, datetime, duration, userID } = eventData[i];
    let userCount: Number =  eventData[i].attendingUsers.length;
    let obj: any = {
      eventname,
      description,
      location,
      datetime,
      duration,
      userID,
      userCount
    }
    obj.id = _id;
    table.push(obj);
  }

  return table;
}