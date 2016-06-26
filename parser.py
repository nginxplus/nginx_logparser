#!/usr/bin/python
import re
import sqlite3


def push_data(data):

	req = 'INSERT INTO access(ip, date, method, uri, code) VALUES (\'' + data["ip"] + '\', \'' + data["date"] + '\', \'' + data["method"] + '\', \'' + data["uri"] + '\', \'' + data["code"] + '\');'
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
		code = re.search(r"[ ][0-9]{3}[ ]", line).group(0)[1:-1]
		client_platform = re.search(r'\"[^\"]*\"$', line).group(0)[1:-1]
		#platform = re.search(r"", line).group(0)
		#domain = re.search(r"", line).group(0)
		#os = re.search(r"", line).group(0)

		if valid_pages.count(page) is not 0:

			connection_table["ip"] = ip
			connection_table["date"] = date
			connection_table["method"] = method
			connection_table["uri"] = uri
			connection_table["code"] = code
			#connection_table["platform"] = platform
			#connection_table["domain"] = domain
			#connection_table["os"] = os

	except Exception as e:
		pass

	if len(connection_table) is not 0:
		push_data(connection_table)

	line = log_file.readline()

conn.close()
