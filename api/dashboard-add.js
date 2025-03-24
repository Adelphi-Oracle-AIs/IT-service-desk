import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  ArrowForward as ArrowForwardIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { getTickets } from '../../services/tickets';

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

// Dashboard stats component
const DashboardStats = ({ stats }) => {
  const theme = useTheme();
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper 
          elevation={3}
          sx={{ 
            p: 3,
            borderRadius: 2,
            height: '100%',
            borderTop: `4px solid ${theme.palette.primary.main}`,
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {stats.totalTickets}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Total Tickets
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Paper 
          elevation={3}
          sx={{ 
            p: 3,
            borderRadius: 2,
            height: '100%',
            borderTop: `4px solid ${statusColors['open']}`,
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {stats.openTickets}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Open Tickets
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Paper 
          elevation={3}
          sx={{ 
            p: 3,
            borderRadius: 2,
            height: '100%',
            borderTop: `4px solid ${priorityColors['high']}`,
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {stats.highPriorityTickets}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            High Priority
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Paper 
          elevation={3}
          sx={{ 
            p: 3,
            borderRadius: 2,
            height: '100%',
            borderTop: `4px solid ${statusColors['resolved']}`,
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {stats.resolvedTickets}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Resolved This Week
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

// Ticket List Preview component
const TicketListPreview = ({ tickets, title, emptyMessage, seeAllLink }) => {
  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ 
        px: 3, 
        py: 2,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6">{title}</Typography>
        <Button 
          component={RouterLink} 
          to={seeAllLink} 
          color="inherit" 
          endIcon={<ArrowForwardIcon />}
          size="small"
        >
          See All
        </Button>
      </Box>
      
      <Divider />
      
      <List sx={{ bgcolor: 'background.paper', p: 0 }}>
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <React.Fragment key={ticket._id}>
              <ListItem
                button
                component={RouterLink}
                to={`/tickets/${ticket._id}`}
                sx={{ py: 2 }}
              >
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <Typography variant="subtitle1" fontWeight="medium">
                        {ticket.title}
                      </Typography>
                      <Chip
                        label={ticket.status}
                        size="small"
                        sx={{
                          ml: 2,
                          bgcolor: statusColors[ticket.status],
                          color: 'white',
                        }}
                      />
                      <Chip
                        label={ticket.priority}
                        size="small"
                        sx={{
                          ml: 1,
                          bgcolor: priorityColors[ticket.priority],
                          color: ticket.priority === 'medium' || ticket.priority === 'low' ? 'black' : 'white',
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      {ticket.category} • Created {new Date(ticket.createdAt).toLocaleDateString()}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <ListItem sx={{ py: 4 }}>
            <ListItemText
              primary={
                <Typography variant="body1" align="center" color="textSecondary">
                  {emptyMessage}
                </Typography>
              }
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    highPriorityTickets: 0,
    resolvedTickets: 0
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const fetchedTickets = await getTickets();
      setTickets(fetchedTickets);
      
      // Calculate stats
      const open = fetchedTickets.filter(ticket => ticket.status === 'open').length;
      const highPriority = fetchedTickets.filter(ticket => 
        ticket.priority === 'high' || ticket.priority === 'critical'
      ).length;
      
      // Calculate tickets resolved in the last 7 days
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const resolvedThisWeek = fetchedTickets.filter(ticket => 
        ticket.status === 'resolved' && 
        new Date(ticket.updatedAt) > oneWeekAgo
      ).length;
      
      setStats({
        totalTickets: fetchedTickets.length,
        openTickets: open,
        highPriorityTickets: highPriority,
        resolvedTickets: resolvedThisWeek
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get recent tickets (last 5)
  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  
  // Get my tickets (if user is logged in)
  const myTickets = currentUser ? tickets.filter(
    ticket => ticket.createdBy._id === currentUser._id
  ).slice(0, 5) : [];
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Dashboard
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={fetchTickets}
            sx={{ mr: 2 }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/tickets/new"
          >
            New Ticket
          </Button>
        </Box>
      </Box>
      
      {loading ? (
        <Box sx={{ width: '100%', mt: 4 }}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <DashboardStats stats={stats} />
          
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TicketListPreview
                tickets={recentTickets}
                title="Recent Tickets"
                emptyMessage="No tickets found"
                seeAllLink="/tickets"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TicketListPreview
                tickets={myTickets}
                title="My Tickets"
                emptyMessage="You haven't created any tickets yet"
                seeAllLink="/tickets?createdByMe=true"
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4 }}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Support Options
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Need help or have questions? Choose one of the options below:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      component={RouterLink}
                      to="/faq"
                    >
                      Browse FAQ
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      component={RouterLink}
                      to="/knowledge-base"
                    >
                      Knowledge Base
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      component={RouterLink}
                      to="/contact"
                    >
                      Contact Support
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
