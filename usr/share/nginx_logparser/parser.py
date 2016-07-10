#!/usr/bin/python
import re
import sqlite3


def push_data(data):

#	conn = sqlite3.connect('nginx.db')
#	cur = conn.cursor()
	req = 'INSERT INTO access(ip, date, method) VALUES (\'' + data["ip"] + '\', \'' + data["date"] + '\', \'' + data["method"] + '\');'
	print(req)
	cur.execute(req)


log_path = "/var/log/nginx/"
log_file = open(log_path + "access.log.1", "r")
line = log_file.readline()
valid_pages = ["/", "/portfolio" ,"/contacts", "/about"]
conn = sqlite3.connect('nginx.db')
conn.isolation_level = None
cur = conn.cursor()


while line != "":

	connection_table = {}
	try:
		page = re.search(r" /[^ /]*", line).group(0)[1:]
		ip = re.search(r"^[^ ]*", line).group(0)
		date = re.search(r"[0-9]*/[A-Za-z]{3}/[^ ]+", line).group(0)
		client_req = re.search(r'\"[A-Z]{3,}[^\"]*', line).group(0)[1:]
		uri = client_req[(client_req.find(" "))+1:(client_req.rfind(" "))]
		method = client_req[:(client_req.find(" "))] 
		client_platform = re.search(r'\"[^\"]*\"$', line).group(0)[1:-1]
		#domain = re.search(r"", line).group(0)
		#code = re.search(r"", line).group(0)
		#os = re.search(r"", line).group(0)

		if valid_pages.count(page) is not 0:

			connection_table["ip"] = ip
			connection_table["date"] = date
			connection_table["method"] = method
			#connection_table["uri"] = uri
			#connection_table["platform"] = client_platform
			#connection_table["domain"] = domain
			#connection_table["code"] = code
			#connection_table["os"] = os

	except Exception as e:
		pass

	if len(connection_table) is not 0:
		push_data(connection_table)

	line = log_file.readline()

conn.close()
