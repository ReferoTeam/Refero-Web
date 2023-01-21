import { DataGrid, GridActionsCell, GridActionsCellItem, GridColDef, GridColumns, GridRenderCellParams, GridToolbar, GridToolbarContainer, selectedGridRowsCountSelector } from '@mui/x-data-grid'
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { UserContext, useUserContext } from '../contexts/UserContext';
import { Event } from '../types'
import { Button } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

  const columns: GridColumns = [
    { field: 'id', headerName: 'ID', width: 90, editable: false, type: 'string'},
    { field: 'eventname', headerName: 'Event Name', width: 150, editable: true, type: 'string'},
    { field: 'description', headerName: 'Description', width: 150, editable: true, type: 'string'},
    { field: 'location', headerName: 'Location', width: 150, editable: true, type: 'string'},
    { field: 'datetime', headerName: 'Date / Time', width: 150, editable: true, type: 'dateTime', },
    { field: 'duration', headerName: 'Duration', width: 80, editable: true, type: 'number' },
    { field: 'userEmail', headerName: 'Created by ', width: 120, editable: false, type: 'string' },
    { field: 'userCount', headerName: 'RSVPs', width: 90, type: 'number' },
    { field: 'actions', headerName: 'Actions', width: 100, type: 'actions', getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          icon={<EditIcon/>}
          label='Edit'
          className='textPrimary'
          color='inherit'
          onClick={() => {}}
        />,
        <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => {}}
            color="inherit"
          />
      ];
    }}
  ];

export default function Dashboard() {
  const { userData } = useUserContext();
  const [rows, setRows] = useState<any[]>([]);

  function createNewEvent() {
    const newEvent: Event = {
      _id: '',
      eventname: '',
      description: '',
      location: '',
      datetime: new Date(Date.now()),
      duration: 0,
      userEmail: '',
      eventInterests: [''],
      attendingUsers: ['']
    }
    const arr: Event[] = [newEvent]
    const tableData = convertToTable(arr);
    return tableData[0];
  }

  function CustomToolbar() {
    function addEvent() {
      setRows((prevRows) => [...prevRows, createNewEvent()]);
    }

    return (
      <GridToolbarContainer>
        <Button startIcon={<AddIcon/>} onClick={addEvent}>
          Add Event
        </Button>
      </GridToolbarContainer>
    );
  }

  function fetchEvents() {
    if(userData?.email !== '')  {
      const url = 'http://localhost:8000/events/' + userData?.email;
      fetch(url)
      .then((res: Response) => res.json())
      .then((events: Event[]) => setRows(convertToTable(events)))
      .catch(e => console.log(e));
    }
  }

  useEffect(() => {
    fetchEvents();
  });

  return (
    <Box sx={{ height: 400, p: 3 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
    </Box>
  );
}

function convertToTable(eventData: Event[]): any[] {
  let table: any[] = [];
  for(let i=0; i < eventData.length; i++) {
    const { _id, eventname, description, location, datetime, duration, userEmail } = eventData[i];
    let userCount: Number =  eventData[i].attendingUsers.length;
    let obj: any = {
      eventname,
      description,
      location,
      datetime,
      duration,
      userEmail,
      userCount
    }
    obj.id = _id;
    table.push(obj);
  }

  return table;
}