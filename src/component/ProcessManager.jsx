import React, { useState } from "react";
import AddProcess from "./AddProcess";
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonIcon from '@mui/icons-material/Person'
import Person2Icon from '@mui/icons-material/Person2'
import AddIcon from '@mui/icons-material/Add'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { Avatar, CardHeader, Grid } from "@mui/material";
import { style } from "./utils/style";
import Collapsible from 'react-collapsible';
import AddChildProcess from "./AddChildProcess";

const ProcessManager = () => {


    const [currentProcessData, setCurrentProcessData] = useState({})
    const [processesData, setProcessesData] = useState([])

    const [open, setOpen] = React.useState(false)
    const [openChildModal, setOpenChildModal] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpenChildModal = () => setOpenChildModal(true)
  const handleCloseChildModal = () => {
    setOpenChildModal(false)
  }

  console.log(processesData);

    const openAddProcessForm = () => {

    }

    return (

    <div className='container'>
          <Grid container spacing={2}>
             <Grid item xs={4}>
              {processesData.length > 0  ? (
                processesData.map(d => {
                  return (
                    <>
                    <Collapsible trigger={d.name}>
                      {d.childProcess.length > 0 ? d.childProcess.map(childProcess => (
                        <p>{childProcess.name}</p>
                )) : <Button variant="outlined" color="success"
                onClick={handleOpenChildModal}>Add Child Process</Button>}
                    </Collapsible>
                    </>
                  )
                })
              ) : (
                <Card sx={{ maxWidth: 200 }}>
                    <CardHeader title="Add Process"></CardHeader>
                  <CardContent>
                    <Avatar
                      sx={{ m: 1, bgcolor: 'primary.main' }}
                      onClick={handleOpen}
                    >
                      <AddIcon />
                    </Avatar>{' '}
                  </CardContent>
                </Card>
              )}
            </Grid>
            {processesData.length > 0 ?
            <Grid item xs={4}>
            <Card sx={{ maxWidth: 200 }}>
                  <CardContent>
                    <Avatar
                      sx={{ m: 1, bgcolor: 'primary.main' }}
                      onClick={handleOpen}
                    >
                      <AddIcon />
                    </Avatar>{' '}
                  </CardContent>
                </Card>
            </Grid> : <></>
    }
          </Grid>
  
  {/* Modal for Add Process */}
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <AddProcess 
        //   isEdit={isEdit} 
          currentProcessData={currentProcessData} 
          setCurrentProcessData={setCurrentProcessData} 
          processesData={processesData} 
          setProcessesData={setProcessesData} 
          handleClose={handleClose}
           />
        </Box>
      </Fade>
    </Modal>


    {/* Modal for Add Child Process */}
    <Modal
      aria-labelledby='transition-modal-title-child-process'
      aria-describedby='transition-modal-description-child-process'
      open={openChildModal}
      onClose={handleCloseChildModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
    >
      <Fade in={openChildModal}>
        <Box sx={style}>
          <AddChildProcess />
          {/* <AddProcess 
        //   isEdit={isEdit} 
          currentProcessData={currentProcessData} 
          setCurrentProcessData={setCurrentProcessData} 
          processesData={processesData} 
          setProcessesData={setProcessesData} 
          handleClose={handleClose}
           /> */}
        </Box>
      </Fade>
    </Modal>
        </div>
    );

  
}

export default ProcessManager;