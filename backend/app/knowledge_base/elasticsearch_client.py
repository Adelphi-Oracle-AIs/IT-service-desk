from app import es
from config import Config

def index_article(article):
    doc = article.to_dict()
    res = es.index(index="knowledge_base", id=article.id, body=doc)
    return res['result']

def search_articles(query):
    body = {
        "query": {
            "multi_match": {
                "query": query,
                "fields": ["title", "content"]
            }
        }
    }
    res = es.search(index="knowledge_base", body=body, size=Config.ARTICLES_PER_PAGE)
    return [hit['_source'] for hit in res['hits']['hits']]
