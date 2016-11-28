from flask import Flask, render_template, request
import os
from server import *

app = Flask(__name__)

@app.route('/walk_first')
def hwalk():
    return render_template('walkFirst_condition.html')

@app.route('/spend')
def spend():
    return render_template('spend.html')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/sendDataToBackend')
def senddata():
	print 'senddatatobackend called'
	query_string = request.args
	data = dict(query_string).keys()[0]
	print data
	target = open('flaskdatatest.txt','w')
	target.write(data)



if __name__ == "__main__":
	#print_stuff()
	port = int(os.environ.get("PORT", 5000))
	app.run(host='0.0.0.0', port=port)