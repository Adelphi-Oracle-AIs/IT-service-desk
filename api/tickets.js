// api/tickets.js - Backend API for IT Service Desk Ticket Management

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/auth');

// Define Ticket Schema
const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['open', 'in-progress', 'pending', 'resolved', 'closed'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['hardware', 'software', 'network', 'security', 'other'],
    required: true
  },
  createdBy: {
    id: { type: String, required: true },
    username: { type: String, required: true },
    avatarUrl: String
  },
  assignedTo: {
    id: String,
    username: String,
    avatarUrl: String
  },
  comments: [{
    text: String,
    createdBy: {
      id: String,
      username: String,
      avatarUrl: String
    },
    createdAt: { type: Date, default: Date.now }
  }],
  attachments: [{
    fileName: String,
    fileUrl: String,
    uploadedBy: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create model from schema
const Ticket = mongoose.model('Ticket', ticketSchema);

// Get all tickets
router.get('/', isAuthenticated, async (req, res) => {
  try {
    let query = {};
    
    // Filter by status if provided
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Filter by priority if provided
    if (req.query.priority) {
      query.priority = req.query.priority;
    }
    
    // Filter by category if provided
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Filter by created by user
    if (req.query.createdByMe === 'true') {
      query['createdBy.id'] = req.user.id;
    }
    
    // Filter by assigned to user
    if (req.query.assignedToMe === 'true') {
      query['assignedTo.id'] = req.user.id;
    }
    
    const tickets = await Ticket.find(query).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Failed to fetch tickets' });
  }
});

// Get a specific ticket
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    res.json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ message: 'Failed to fetch ticket' });
  }
});

// Create a new ticket
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;
    
    // Validate required fields
    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Title, description, and category are required' });
    }
    
    const newTicket = new Ticket({
      title,
      description,
      category,
      priority: priority || 'medium',
      createdBy: {
        id: req.user.id,
        username: req.user.login,
        avatarUrl: req.user.avatar_url
      }
    });
    
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Failed to create ticket' });
  }
});

// Update a ticket
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { title, description, status, priority, category, assignedTo } = req.body;
    
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    // Update ticket fields if provided
    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    if (category) ticket.category = category;
    if (assignedTo) ticket.assignedTo = assignedTo;
    
    ticket.updatedAt = Date.now();
    
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ message: 'Failed to update ticket' });
  }
});

// Add a comment to a ticket
router.post('/:id/comments', isAuthenticated, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    const newComment = {
      text,
      createdBy: {
        id: req.user.id,
        username: req.user.login,
        avatarUrl: req.user.avatar_url
      },
      createdAt: Date.now()
    };
    
    ticket.comments.push(newComment);
    ticket.updatedAt = Date.now();
    
    await ticket.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// Delete a ticket
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    // Check if the user is the creator of the ticket
    if (ticket.createdBy.id !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this ticket' });
    }
    
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ message: 'Failed to delete ticket' });
  }
});

module.exports = router;
