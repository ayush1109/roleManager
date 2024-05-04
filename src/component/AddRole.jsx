import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonIcon from '@mui/icons-material/Person'
import Person2Icon from '@mui/icons-material/Person2'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import { SketchPicker } from 'react-color'
import { v4 as uuidv4 } from 'uuid'
import MultipleValueTextInput from 'react-multivalue-text-input'
import { Chip, FormControl, Input } from '@mui/material'
import { styled } from '@mui/system';

const theme = createTheme()

const FormControlRoot = styled('div')({
  display: "flex",
  alignItems: "center",
  gap: "40px",
  width: "300px",
  flexWrap: "wrap",
  flexDirection: "row",
  border: '0px solid lightgray',
  padding: 4,
  borderRadius: '4px',
  marginTop: '2vh',
  "& .container": {
    gap: "6px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  "& .container span": {
    backgroundColor: "white",
    padding: "4px 6px",
    borderRadius: "4px"
  }
});

const AddRole = ({
  isEdit,
  currentRoleData,
  setCurrentRoleData,
  rolesData,
  setRolesData,
  handleClose
}) => {
  let roleData = {}
  let form

  console.log('---------', currentRoleData)
  const handleSubmit = event => {
    form = event.currentTarget
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    roleData.name = data.get('rolename')
    roleData.icon = data.get('icon')
    roleData.order = rolesData.length;
    roleData.responsibilities = responsibilityValues; 
    roleData.color = selectedColor
    roleData.id = uuidv4()
    setRolesData([...rolesData, roleData])
    handleClose()
  }

  const [selectedColor, setSelectedColor] = useState('#ffffff')
  const [isOpen, setIsOpen] = useState(false)

  const handleColorChange = color => {
    setSelectedColor(color.hex)
  }

  const togglePicker = () => {
    setIsOpen(!isOpen)
  }

    const [responsibilityValues, setResponsibilityValues] = useState([]);
    const [currResponsibilityValue, setCurrResponsibilityValue] = useState("");

    const handleKeyUp = (e) => {
        console.log(e.keyCode);
        if (e.keyCode == 9) {
          if(e.target.value == '') return;
            setResponsibilityValues((oldState) => [...oldState, e.target.value]);
            setCurrResponsibilityValue("");
        }
    };

    const handleChange = (e) => {
        setCurrResponsibilityValue(e.target.value);
  };
  
  const handleDelete = ( item, index) =>{
    let arr = [...responsibilityValues]
    arr.splice(index,1)
    console.log(item)
    setResponsibilityValues(arr)
  }


  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <PersonAddAltIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Add a Role
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name='rolename'
                    fullWidth
                    id='rolename'
                    label='Role Name'
                    autoFocus
                    required
                    defaultValue={isEdit ? currentRoleData.name : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    id='icon'
                    name='icon'
                    helperText='Select Icon.'
                    required
                    defaultValue={isEdit ? currentRoleData.icon : ''}
                    // value={'PersonIcon1'}
                  >
                    <MenuItem key={'PersonIcon1'} value={'PersonIcon1'}>
                      <AccountCircleIcon />
                    </MenuItem>
                    <MenuItem key={'PersonIcon2'} value={'PersonIcon2'}>
                      <PersonIcon />
                    </MenuItem>
                    <MenuItem key={'PersonIcon3'} value={'PersonIcon3'}>
                      <Person2Icon />
                    </MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div
                    onClick={togglePicker}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                  >
                    <p>{isOpen ? "Click here to close color picker" : "Click to select color"}</p>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: selectedColor,
                        borderRadius: '50%'
                      }}
                    ></div>
                  </div>
                  {isOpen && (
                    <SketchPicker
                      color={selectedColor}
                      onChangeComplete={handleColorChange}
                      onClose={togglePicker} // Close the picker when it's closed
                    />
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                <FormControl >
                <TextField
                id='responsiblities'
                helperText="Press TAB to add responsibility"
                label="Responsibilities"
                    value={currResponsibilityValue}
                    variant="standard"
                    onChange={handleChange}
                    onKeyDown={handleKeyUp}
                />
                                  <FormControlRoot>
                   <div className={"container"}>
                    {responsibilityValues.map((item,index) => (
                        <Chip  size="small" onDelete={()=>handleDelete(item,index)} label={item}/>
                    ))}
                </div>
                </FormControlRoot>

            </FormControl>
              
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item sx={12}>
                  <Button
                    type='button'
                    color='error'
                    variant='outlined'
                    sx={{ mt: 3, mb: 2 }}
                    title='cancel'
                    id='cancel'
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item sx={12}>
                  <Button
                    type='submit'
                    fullWidth
                    color='success'
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    title='save'
                    id='btn-submit'
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default AddRole
