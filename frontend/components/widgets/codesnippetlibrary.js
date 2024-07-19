// src/components/widgets/CodeSnippetLibrary.js
import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, makeStyles } from '@material-ui/core';
import { Code, FileCopy, Add } from '@material-ui/icons';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  listItem: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
  },
  codePreview: {
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
    maxHeight: '100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const CodeSnippetLibrary = () => {
  const classes = useStyles();
  const [snippets, setSnippets] = useState([
    { id: 1, name: 'HTML5 Boilerplate', language: 'HTML', code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>' },
    { id: 2, name: 'React Function Component', language: 'JavaScript', code: 'import React from "react";\n\nconst ComponentName = () => {\n  return (\n    <div>\n      \n    </div>\n  );\n};\n\nexport default ComponentName;' },
    { id: 3, name: 'SQL Create Table', language: 'SQL', code: 'CREATE TABLE table_name (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  column1 VARCHAR(255),\n  column2 INT,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newSnippet, setNewSnippet] = useState({ name: '', language: '', code: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSnippetChange = (field) => (event) => {
    setNewSnippet({ ...newSnippet, [field]: event.target.value });
  };

  const handleAddSnippet = () => {
    if (newSnippet.name && newSnippet.language && newSnippet.code) {
      setSnippets([...snippets, { ...newSnippet, id: snippets.length + 1 }]);
      setNewSnippet({ name: '', language: '', code: '' });
      handleCloseDialog();
      setSnackbar({ open: true, message: 'Snippet added successfully!', severity: 'success' });
    } else {
      setSnackbar({ open: true, message: 'Please fill all fields!', severity: 'error' });
    }
  };

  const handleCopySnippet = (code) => {
    navigator.clipboard.writeText(code);
    setSnackbar({ open: true, message: 'Snippet copied to clipboard!', severity: 'success' });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        Code Snippet Library
      </Typography>
      <List>
        {snippets.map((snippet) => (
          <ListItem key={snippet.id} className={classes.listItem}>
            <ListItemText
              primary={snippet.name}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {snippet.language}
                  </Typography>
                  <pre className={classes.codePreview}>{snippet.code}</pre>
                </>
              }
            />
            <Button
              startIcon={<FileCopy />}
              onClick={() => handleCopySnippet(snippet.code)}
            >
              Copy
            </Button>
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleOpenDialog}
        className={classes.addButton}
      >
        Add New Snippet
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Snippet</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Snippet Name"
            value={newSnippet.name}
            onChange={handleSnippetChange('name')}
            fullWidth
          />
          <TextField
            label="Language"
            value={newSnippet.language}
            onChange={handleSnippetChange('language')}
            fullWidth
          />
          <TextField
            label="Code"
            value={newSnippet.code}
            onChange={handleSnippetChange('code')}
            multiline
            rows={4}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSnippet} color="primary" variant="contained">
            Add Snippet
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default CodeSnippetLibrary;
