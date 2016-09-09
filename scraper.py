import urllib
from urllib import urlopen
import threading
import csv
import time

url = 'https://cah-bowling-game.herokuapp.com/data'
interval = 60.0 #number of seconds


#returns an array of the lines
def scrape_and_get_text():
	threading.Timer(interval, scrape_and_get_text).start()
	return urlopen(url).read().splitlines()

#returns true if the data already exists in the CSV file, false if it does not
def check_data_exists(filename, new_unique_id):
	with open(filename,'rb') as f:
		reader = csv.reader(f,delimiter=',')
		for row in reader:
			if row:
				unique_id=row[2]
				if unique_id==new_unique_id:
					return True
	return False

def writeToFile(bowling_info, filename):
	with open(filename,'ab') as f:
		writer = csv.writer(f)
		for line in bowling_info:
			new_array = line.split(";")
			unique_id=new_array[2]
			if not (check_data_exists(filename, unique_id)):
				print "write new row"
				writer.writerow(new_array) 

while True:
	print "loop"
	bowling_info = scrape_and_get_text()
	writeToFile(bowling_info,'bowling.csv')
	time.sleep(60)


