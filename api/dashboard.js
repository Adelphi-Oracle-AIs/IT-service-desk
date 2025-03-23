// Dashboard.js - Main dashboard component for IT Service Desk
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Grid, Paper, Typography, Button, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip, CircularProgress,
  AppBar, Toolbar, IconButton, Menu, MenuItem, Drawer,
  List, ListItem, ListItemIcon, ListItemText, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, FormControl, InputLabel
} from '@material-ui/core';
import { 
  Add as AddIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Create as CreateIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';

// Status color mapping
const statusColors = {
  'open': '#3f51b5',       // Blue
  'in-progress': '#ff9800', // Orange
  'pending': '#9c27b0',    // Purple
  'resolved': '#4caf50',   // Green
  'closed': '#9e9e9e'      // Grey
};

// Priority color mapping
const priorityColors = {
  'low': '#8bc34a',        // Light Green
  'medium': '#ffeb3b',     // Yellow
  'high': '#ff9800',       // Orange
  'critical': '#f44336'    // Red
};

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
    createdByMe: false,
    assignedToMe: false
  });
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'software',
    priority: 'medium'
  });

  // Fetch user data and tickets on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check authentication status
        const authResponse = await axios.get('/api/auth/status');
        
        if (authResponse.data.authenticated) {
          setUser(authResponse.data.user);
          fetchTickets();
        } else {
          // Redirect to login if not authenticated
          window.location.href = '/auth/github';
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch tickets with applied filters
  const fetchTickets = async () => {
    setLoading(true);
    try {
      // Build query parameters based on filters
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.category) params.append('category', filters.category);
      if (filters.createdByMe) params.append('createdByMe', 'true');
      if (filters.assignedToMe) params.append('assignedToMe', 'true');

      const response = await axios.get(`/api/tickets?${params.toString()}`);
      setTickets(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setError('Failed to load tickets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle applying filters
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Handle new ticket form changes
  const handleNewTicketChange = (field, value) => {
    setNewTicket(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle creating a new ticket
  const handleCreateTicket = async () => {
    try {
      await axios.post('/api/tickets', newTicket);
      setCreateDialogOpen(false);
      // Reset form
      setNewTicket({
        title: '',
        description: '',
        category: 'software',
        priority: 'medium'
      });
      // Refresh ticket list
      fetchTickets();
    } catch (error) {
      console.error('Error creating ticket:', error);
      setError('Failed to create ticket. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="dashboard">
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            IT Service Desk
          </Typography>
          {user && (
            <div className="user-info">
              <img 
                src={user.avatar_url} 
                alt={`${user.login}'s avatar`}
                style={{ height: 30, width: 30, borderRadius: '50%', marginRight: 10 }}
              />
              <Typography variant="subtitle1">
                {user.login}
              </Typography>
            </div>
          )}
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div style={{ width: 250 }}>
          <List>
            <ListItem button onClick={() => setDrawerOpen(false)}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => { setCreateDialogOpen(true); setDrawerOpen(false); }}>
              <ListItemIcon><CreateIcon /></ListItemIcon>
              <ListItemText primary="Create Ticket" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="My Tickets" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      {/* Main Content */}
      <Container maxWidth="lg" style={{ marginTop: 20 }}>
        {/* Header */}
        <Grid container spacing={3} alignItems="center" style={{ marginBottom: 20 }}>
          <Grid item xs={8}>
            <Typography variant="h4">Tickets</Typography>
          </Grid>
          <Grid item xs={4} container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setCreateDialogOpen(true)}
            >
              New Ticket
            </Button>
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper style={{ padding: '15px', marginBottom: 20 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="subtitle1">
                <FilterIcon style={{ verticalAlign: 'middle', marginRight: 5 }} />
                Filters:
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  label="Status"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                  label="Priority"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  label="Category"
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="hardware">Hardware</MenuItem>
                  <MenuItem value="software">Software</MenuItem>
                  <MenuItem value="network">Network</MenuItem>
                  <MenuItem value="security">Security</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={fetchTickets}
                startIcon={<RefreshIcon />}
              >
                Apply Filters
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Tickets Table */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 50 }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Paper style={{ padding: 20, textAlign: 'center' }}>
            <Typography color="error">{error}</Typography>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={fetchTickets}
              style={{ marginTop: 15 }}
            >
              Retry
            </Button>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Created By</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Typography variant="subtitle1">No tickets found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  tickets.map((ticket) => (
                    <TableRow key={ticket._id} hover>
                      <TableCell>{ticket._id.substring(ticket._id.length - 6)}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.category}</TableCell>
                      <TableCell>
                        <Chip
                          label={ticket.status}
                          style={{
                            backgroundColor: statusColors[ticket.status],
                            color: 'white'
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={ticket.priority}
                          style={{
                            backgroundColor: priorityColors[ticket.priority],
                            color: ticket.priority === 'medium' || ticket.priority === 'low' ? 'black' : 'white'
                          }}
                        />
                      </TableCell>
                      <TableCell>{ticket.createdBy.username}</TableCell>
                      <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={() => {
                            // Navigate to ticket details page
                            window.location.href = `/tickets/${ticket._id}`;
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

      {/* Create Ticket Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Create New Ticket</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={newTicket.title}
                onChange={(e) => handleNewTicketChange('title', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={newTicket.description}
                onChange={(e) => handleNewTicketChange('description', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newTicket.category}
                  onChange={(e) => handleNewTicketChange('category', e.target.value)}
                  label="Category"
                >
                  <MenuItem value="hardware">Hardware</MenuItem>
                  <MenuItem value="software">Software</MenuItem>
                  <MenuItem value="network">Network</MenuItem>
                  <MenuItem value="security">Security</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newTicket.priority}
                  onChange={(e) => handleNewTicketChange('priority', e.target.value)}
                  label="Priority"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)} color="default">
            Cancel
          </Button>
          <Button 
            onClick={handleCreateTicket} 
            color="primary" 
            variant="contained"
            disabled={!newTicket.title || !newTicket.description}
          >
            Create Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
