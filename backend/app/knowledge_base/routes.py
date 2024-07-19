from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db, es
from app.models import KnowledgeArticle, User
from app.knowledge_base import bp
from app.knowledge_base.elasticsearch_client import index_article, search_articles
from app.knowledge_base.utils import paginate

@bp.route('/', methods=['POST'])
@jwt_required()
def create_article():
    data = request.json
    current_user = User.query.get(get_jwt_identity())
    new_article = KnowledgeArticle(title=data['title'], content=data['content'], category=data['category'], author=current_user)
    db.session.add(new_article)
    db.session.commit()
    index_article(new_article)
    return jsonify(new_article.to_dict()), 201

@bp.route('/<int:id>', methods=['GET'])
def get_article(id):
    article = KnowledgeArticle.query.get_or_404(id)
    return jsonify(article.to_dict())

@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_article(id):
    article = KnowledgeArticle.query.get_or_404(id)
    current_user = User.query.get(get_jwt_identity())
    if article.author != current_user:
        return jsonify({"msg": "Unauthorized"}), 403
    data = request.json
    article.title = data.get('title', article.title)
    article.content = data.get('content', article.content)
    article.category = data.get('category', article.category)
    db.session.commit()
    index_article(article)
    return jsonify(article.to_dict())

@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_article(id):
    article = KnowledgeArticle.query.get_or_404(id)
    current_user = User.query.get(get_jwt_identity())
    if article.author != current_user:
        return jsonify({"msg": "Unauthorized"}), 403
    db.session.delete(article)
    db.session.commit()
    es.delete(index="knowledge_base", id=id)
    return '', 204

@bp.route('/search', methods=['GET'])
def search_kb():
    query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    results = search_articles(query)
    return jsonify(paginate(results, page))

@bp.route('/', methods=['GET'])
def get_all_articles():
    page = request.args.get('page', 1, type=int)
    articles = KnowledgeArticle.query.order_by(KnowledgeArticle.created_at.desc())
    return jsonify(paginate(articles, page))
