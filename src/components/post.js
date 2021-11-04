import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
          color="secondary"
        >
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Post = ({setRefresh}) => {

  const [title, setTitle] = React.useState();
  const [username, setUsername] = React.useState();
  const [content, setContent] = React.useState();
  const [picture, setPicture] = React.useState();

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleContent = (event) => {
    setContent(event.target.value);
  };
  const handlePicture = (event) => {
    setPicture(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = async() => {
    var data = {
      title:title,
      username:username,
      content:content,
      picture:picture
    }
    await fetch(
      'https://my-app.alizainamirali.workers.dev/posts', {method: 'POST', body: JSON.stringify(data)}
    );
    
    setRefresh(true);
    setOpen(false);
    setTitle("");
    setUsername("");
    setContent("");
    setPicture("");
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
  
    <div style = {{marginLeft: 20}}>
      <Button variant = "contained" color="secondary" onClick={handleClickOpen}>
        Create Post
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" color="secondary" onClose={handleClose}>
          Create Post
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <div>
          <TextField
            id="title"
            label="Title"
            color="secondary"
            multiline
            maxRows={2}
            value={title}
            onChange={handleTitle}
            style = {{margin: 3}}
            InputLabelProps={{className: "textfield__text"}}
          focused/>
          <TextField
            text = "pink"
            id="username"
            label="Username"
            color="secondary"
            multiline
            maxRows={2}
            value={username}
            onChange={handleUsername}
            style = {{margin: 3}}
            focused
          />
            <TextField
              id="content"
              label="Content"
              color="secondary"
              multiline
              rows={4}
              value = {content}
              onChange={handleContent}
              style = {{margin: 3}}
              focused
            />
            <TextField
              id="picture"
              label="Picture Url"
              color="secondary"
              multiline
              rows={4}
              value = {picture}
              onChange={handlePicture}
              style = {{margin: 3}}
              focused
            />
        </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handlePost} color="secondary">
            Submit Post
          </Button>
        </DialogActions>
      </BootstrapDialog>
      </div>
    </Box>
  );
}
export default Post;