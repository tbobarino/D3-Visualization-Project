import bs4
import requests
import csv
import re

url = 'https://en.wikipedia.org/wiki/List_of_countries_by_incarceration_rate'
data = requests.get(url)
soup = bs4.BeautifulSoup(data.text, "html.parser")

table = soup.select(".wikitable")[1].select("tr")[2:]



with open('data.csv', 'w') as file:
	writer = csv.writer(file)
	writer.writerow(('country', 'incarceration'))
	for row in table:
			country = row.findNext('a').contents[0]
			amount = re.sub('[^0-9]','',row.findNext('td').findNext('td').contents[0])
			writer.writerow([country,amount])    
