import React from "react";
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
import SettingsIcon from '@mui/icons-material/Settings'
import { Chip, FormControl, Input } from '@mui/material'
import { styled } from '@mui/system'

const theme = createTheme()

const AddChildProcess = () => {

    const handleSubmit = event => {
        event.preventDefault()
    }
    return (
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
              <SettingsIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Add a Child Process
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name='childprocessname'
                    fullWidth
                    id='childprocessname'
                    label='Child Process Name'
                    autoFocus
                    required
                  />
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
                    id='btn-submit-process'
                    // onClick={handleClose}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    )
}

export default AddChildProcess;