from flask import Blueprint, jsonify, request
from app.models import Ticket
from app import db

main = Blueprint('main', __name__)

@main.route('/api/tickets', methods=['GET'])
def get_tickets():
    tickets = Ticket.query.all()
    return jsonify([ticket.to_dict() for ticket in tickets])

@main.route('/api/tickets', methods=['POST'])
def create_ticket():
    data = request.json
    new_ticket = Ticket(title=data['title'], description=data['description'])
    db.session.add(new_ticket)
    db.session.commit()
    return jsonify(new_ticket.to_dict()), 201

@main.route('/api/tickets/<int:id>', methods=['GET'])
def get_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    return jsonify(ticket.to_dict())

@main.route('/api/tickets/<int:id>', methods=['PUT'])
def update_ticket(id):
    ticket = Ticket.query.get_or_404(id)
    data = request.json
    ticket.title = data.get('title', ticket.title)
    ticket.description = data.get('description', ticket.description)
    ticket.status = data.get('status', ticket.status)
    db.session.commit()
    return jsonify(ticket.to_dict())
