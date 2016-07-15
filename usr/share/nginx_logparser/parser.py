#!/usr/bin/env python

import re
import sqlite3
import time
import datetime


def push_sqlite(data):

	conn = sqlite3.connect('/usr/share/nginx_logparser/nginx_logs.db')
	conn.isolation_level = None
	cur = conn.cursor()
	req = 'INSERT INTO access(ip, date, method, uri, code, domain, platform) VALUES (\'' + data["ip"] + '\', \'' + data["date"] + '\', \'' + data["method"] + '\', \'' + data["uri"] + '\', \'' + data["code"] + '\', \'' + data["domain"] + '\', \'' + data["platform"] + '\');'
	#print data
	conn.close()


def to_unixtime(timestamp):

	replace = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"}
	timestamp = timestamp[:3] + replace[timestamp[3:6]] + timestamp[6:]
	unixtime = time.mktime(datetime.datetime.strptime(timestamp, "%d/%m/%Y:%H:%M:%S").timetuple())
	return (unixtime)


def main():
	log_path = "/var/log/nginx/"
	log_file = open(log_path + "access.log.1", "r")
	line = log_file.readline()

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
			domain = re.search(r'\"http\:\/\/[^\/]*\/', line)

			if type(domain) is type(None):
				domain = "-"
			else:
				domain = domain.group(0)[1:]

			connection_table["ip"] = ip
			connection_table["date"] = to_unixtime(date)
			connection_table["method"] = method
			connection_table["uri"] = uri
			connection_table["code"] = code
			connection_table["domain"] = domain
			connection_table["platform"] = client_platform

		except Exception as e:
			print "Something is wrong here: ", e

		if len(connection_table) is not 0:
			push_sqlite(connection_table)

		line = log_file.readline()


if __name__ == "__main__":
	main()
