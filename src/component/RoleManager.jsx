import { Avatar, CardHeader, Grid } from '@mui/material'
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
import React, { useEffect, useRef, useState } from 'react'
import AddRole from './AddRole'
import { ListManager } from 'react-beautiful-dnd-grid'
import { style } from './utils/style'

const RoleManager = () => {
  // let data = [];
  const [rolesData, setRolesData] = useState([])
  const [open, setOpen] = React.useState(false)
  const [isEdit, setIsEdit] = React.useState(false)
  const [currentRoleData, setCurrentRoleData] = useState({})
  const [selectedColor, setSelectedColor] = useState('#000000')

  useEffect(() => {
      console.log(currentRoleData);
  }, [currentRoleData])

  const handleOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
    setIsEdit(false)
    setSelectedColor('#000000')
  }

  const reorderList = (sourceIndex, destinationIndex) => {
    console.log(sourceIndex, destinationIndex);
    if (destinationIndex === sourceIndex) {
      return;
    }

    if (destinationIndex === 0) {
      rolesData[sourceIndex].order = rolesData[0].order - 1;
      setRolesData(sortList());
      return;
    }

    if (destinationIndex === rolesData.length - 1) {
      rolesData[sourceIndex].order = rolesData[rolesData.length - 1].order + 1;
      setRolesData(sortList());
      return;
    }

    if (destinationIndex < sourceIndex) {
      rolesData[sourceIndex].order =
        (rolesData[destinationIndex].order + rolesData[destinationIndex - 1].order) / 2;
      setRolesData(sortList());
      return;
    }

    rolesData[sourceIndex].order =
      (rolesData[destinationIndex].order + rolesData[destinationIndex + 1].order) / 2;
      setRolesData(sortList());
  };

  function sortList() {
    return rolesData.slice().sort((first, second) => first.order - second.order);
  }
  
  const ListElement = props => {
    return (
    <Card sx={{ maxWidth: 200 }} style={{margin: '1vw'}}>
      {/* <CardHeader title="wedfwef"></CardHeader> */}
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.item.name}
        </Typography>
        <Avatar sx={{ m: 1, bgcolor: props.item.color }}>
          {props.item.icon === "PersonIcon1" ? <AccountCircleIcon /> : props.item.icon === "Person2Icon" ? <PersonIcon /> : <Person2Icon />}
          {/* <Person2Icon /> */}
        </Avatar>
      </CardContent>
      <CardContent>
        <Typography gutterBottom variant='h6' component='div'>
          {'Responsibilities'}
        </Typography>
        <Grid container spacing={2}>
        {props.item.responsibilities.map(res => (
          <Grid item xs={12}>
          *{res}
          </Grid>
        ))}
        </Grid>
        
      </CardContent>
      <CardActions>
        <Button
          size='small'
          onClick={() => {
            setCurrentRoleData(rolesData.filter(({ id }) => id === props.item.id)[0])
            setIsEdit(true)
            handleOpen()
          }}
        >
          Edit
        </Button>
        <Button
          size='small'
          onClick={() => {
            setRolesData(rolesData.filter(({ id }) => id !== props.item.id))
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  )}

  return (
    <>
      <ListManager
        items={rolesData}
        direction='horizontal'
        maxItems={4}
        render={item => <ListElement item={item} />}
        onDragEnd={reorderList}
      />

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
            <AddRole
              isEdit={isEdit}
              currentRoleData={currentRoleData}
              setCurrentRoleData={setCurrentRoleData}
              rolesData={rolesData}
              setRolesData={setRolesData}
              handleClose={handleClose}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </Box>
        </Fade>
      </Modal>

      <Card sx={{ maxWidth: 200 }}>
        <CardHeader title="Add Role"></CardHeader>
                <CardContent>
                  <Avatar
                    sx={{ m: 1, bgcolor: 'primary.main' }}
                    onClick={handleOpen}
                  >
                    <AddIcon />
                  </Avatar>{' '}
                </CardContent>
              </Card>
    </>
  )

  //   return (
  //     <div className='container'>
  //       <Grid container spacing={2}>
  //         <Grid item xs={4}>
  //           {rolesData.length > 0  ? (
  //             rolesData.map(d => {
  //               return (
  //                 <>
  //                 <Draggable onDrag={onDrag} onStop={onStop}>
  // <Card sx={{ maxWidth: 200 }}>
  //   <CardContent>
  //     <Typography gutterBottom variant='h5' component='div'>
  //       {d.name}
  //     </Typography>
  //     <Avatar sx={{ m: 1, bgcolor: d.color }}>
  //       <Person2Icon />
  //     </Avatar>
  //   </CardContent>
  //   <CardActions>
  //     <Button size='small' onClick={() => {
  //       setCurrentRoleData(rolesData.filter(({id}) => id === d.id)[0])
  //       setRolesData(rolesData.filter(({id}) => id !== d.id))
  //       setIsEdit(true)
  //       handleOpen();
  //     }}>Edit</Button>
  //     <Button size='small' onClick={() => {
  //       setRolesData(rolesData.filter(({id}) => id !== d.id))
  //     }}>Delete</Button>
  //   </CardActions>
  // </Card>
  //                 </Draggable>
  //                 </>
  //               )
  //             })
  //           ) : (
  //             <Card sx={{ maxWidth: 200 }}>
  //               <CardContent>
  //                 <Avatar
  //                   sx={{ m: 1, bgcolor: 'primary.main' }}
  //                   onClick={handleOpen}
  //                 >
  //                   <AddIcon />
  //                 </Avatar>{' '}
  //               </CardContent>
  //             </Card>
  //           )}
  //         </Grid>
  //         {rolesData.length > 0 ?
  //         <Grid item xs={4}>
          // <Card sx={{ maxWidth: 200 }}>
          //       <CardContent>
          //         <Avatar
          //           sx={{ m: 1, bgcolor: 'primary.main' }}
          //           onClick={handleOpen}
          //         >
          //           <AddIcon />
          //         </Avatar>{' '}
          //       </CardContent>
          //     </Card>
  //         </Grid> : <></>
  // }
  //       </Grid>

  // <Modal
  //   aria-labelledby='transition-modal-title'
  //   aria-describedby='transition-modal-description'
  //   open={open}
  //   onClose={handleClose}
  //   closeAfterTransition
  //   slots={{ backdrop: Backdrop }}
  //   slotProps={{
  //     backdrop: {
  //       timeout: 500
  //     }
  //   }}
  // >
  //   <Fade in={open}>
  //     <Box sx={style}>
  //       <AddRole isEdit={isEdit} currentRoleData={currentRoleData} setCurrentRoleData={setCurrentRoleData} rolesData={rolesData} setRolesData={setRolesData} handleClose={handleClose} />
  //     </Box>
  //   </Fade>
  // </Modal>
  //     </div>
  //   )
}

export default RoleManager
