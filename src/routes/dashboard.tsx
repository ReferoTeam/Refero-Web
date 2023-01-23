import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';
import { useUserContext } from '../contexts/UserContext';
import { Event, EventData } from '../types'

const initialRows: GridRowsProp = [
  
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const _id = randomId();
    const newEvent: Event = {
      _id,
      eventname: '',
      description: '',
      location: '',
      datetime: new Date(Date.now()),
      duration: 0,
      userEmail: '',
      eventInterests: [] as String[],
      attendingUsers: [] as String[],
    }
    setRows((oldRows) => [...oldRows, newEvent]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [_id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Event
      </Button>
    </GridToolbarContainer>
  );
}

export default function Dashboard() {
  const {userData} = useUserContext();
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  function convertToDataGrid(events: Event[]) { 
    let table: EventData[] = [];
    for(let i=0; i < events.length; i++) {
      const { _id, eventname, description, location, datetime, duration, userEmail } = events[i];
      let userCount: Number =  events[i].attendingUsers.length;
      let event: EventData = {
        _id,
        eventname,
        description,
        location,
        datetime,
        duration,
        userEmail,
        userCount
      }
      table.push(event);
    }

    setRows(table);
  }

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>,
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    fetch('http://localhost:8000/events/delete/' + id, {method: 'DELETE'})
      .then(() => setRows(rows.filter((row) => row._id !== id)))
      .catch((err: Error) => console.log('Error: +' + err));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow: any = { ...newRow, isNew: false, userEmail: userData?.email, userCount: 0 };
    console.log(updatedRow);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRow)
    }
    fetch('http://localhost:8000/events/upsert/' + updatedRow?._id, requestOptions)
    .then((res: Response) => {
      if(JSON.stringify(res) === 'Event Updated') {
        setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
      }
    })
    .catch((err: Error) => {
      console.log(err);
    });
    return updatedRow;
  };

  function fetchEvents() {
    if(userData?.email !== '')  {
      const url = 'http://localhost:8000/events/createdBy/' + userData?.email;
      fetch(url)
      .then((res: Response) => res.json())
      .then((events: Event[]) => convertToDataGrid(events))
      .catch(e => console.log(e));
    }
  }

  useEffect(() => {
   fetchEvents(); 
  }, []);

  const columns: GridColumns = [
    { field: '_id', headerName: 'Event ID', width: 120, editable: false, type: 'string'},
    { field: 'eventname', headerName: 'Event Name', width: 150, editable: true, type: 'string'},
    { field: 'description', headerName: 'Description', width: 200, editable: true, type: 'string'},
    { field: 'location', headerName: 'Location', width: 150, editable: true, type: 'string'},
    { field: 'datetime', headerName: 'Date / Time', width: 200, editable: true, type: 'dateTime', },
    { field: 'duration', headerName: 'Duration', width: 80, editable: true, type: 'number' },
    { field: 'userEmail', headerName: 'Created by ', width: 200, editable: false, type: 'string' },
    { field: 'userCount', headerName: 'RSVPs', width: 70, type: 'number' },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        getRowId={(row) => row._id}
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
        
      />
    </Box>
  );
}
