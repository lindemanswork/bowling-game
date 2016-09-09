from bs4 import BeautifulSoup
import bs4, requests
import urllib
from urllib import urlopen
import threading

url = 'http://localhost:3000/data' #https://cah-bowling-game.herokuapp.com/data
interval = 5.0 #number of seconds
'''
html = urlopen(url).read()
print html
'''

def scrape():
	print "SCRAPE EVERY INTERVAL"
	threading.Timer(interval, scrape).start()
	return urlopen(url).read()

#print scrape()