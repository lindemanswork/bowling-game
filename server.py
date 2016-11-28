from pymongo import MongoClient

def get_db():
    client = MongoClient('mongodb://heroku_hxb7k9t8:4plphtk310q4t1f6cdbagftega@ds033106.mlab.com:33106/heroku_hxb7k9t8')
    db = client.heroku_hxb7k9t8
    return db