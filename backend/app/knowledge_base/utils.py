from flask import url_for
from config import Config

def paginate(query, page):
    resources = query.paginate(page=page, per_page=Config.ARTICLES_PER_PAGE)
    data = {
        'items': [item.to_dict() for item in resources.items],
        '_meta': {
            'page': page,
            'per_page': Config.ARTICLES_PER_PAGE,
            'total_pages': resources.pages,
            'total_items': resources.total
        },
        '_links': {
            'self': url_for('knowledge_base.get_all_articles', page=page),
            'next': url_for('knowledge_base.get_all_articles', page=page + 1) if resources.has_next else None,
            'prev': url_for('knowledge_base.get_all_articles', page=page - 1) if resources.has_prev else None
        }
    }
    return data
