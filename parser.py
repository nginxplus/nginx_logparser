#!/usr/bin/python
import re

def idgen(ip):

	id = ""
	while ip != "":
		if ip.find(".") == 3 or len(ip) == 3:
			id += ip[:3]
			ip = ip[4:]
		elif ip.find(".") == 2 or len(ip) == 2:
			id += ("0" + ip[:2])
			ip = ip[3:]
		elif ip.find(".") == 1 or len(ip) == 1:
			id += ("00" + ip[:1])
			ip = ip[2:]
	return(id)


log_path = "/var/log/nginx/"
log_file = open(log_path + "access.log.1", "r")
ac_line = log_file.readline()
connection_table = {}
statistic_table = {"start":" ", "end":" ", "all_conn":0 , "days":{}}
valid_pages = ["/", "/portfolio" ,"/contacts", "/about"]

while ac_line != "":
	try:
		page = re.search(r" /[^ /]*", ac_line).group(0)[1:]
		ip = re.search(r"^[^ ]*", ac_line).group(0)
		date = re.search(r"[0-9]*/[A-Za-z]{3}/[^ ]+", ac_line).group(0)
		id = idgen(ip)

		if statistic_table["start"] == " ":
			statistic_table["start"] = date[0:11]

		if valid_pages.count(page) != 0:

			if type(connection_table.get(id)) == type(None):
				connection_table[id] = {}
				connection_table[id]["ip"] = ip
				connection_table[id]["date"] = date
				connection_table[id]["connections"] = 1
			else:
				connection_table[id]["connections"] += 1
	except Exception as e:
		pass

	ac_line = log_file.readline()


if statistic_table["end"] == " ":
	statistic_table["end"] = date[0:11]

for i in connection_table.keys():
	if type(statistic_table["days"].get(connection_table[i]["date"][0:11])) == type(None):
		statistic_table["days"][connection_table[i]["date"][0:11]] = {}
		statistic_table["days"][connection_table[i]["date"][0:11]]["conn"] = connection_table[i]["connections"]

	elif type(statistic_table["days"].get(connection_table[i]["date"][0:11])) != type(None):
		statistic_table["days"][connection_table[i]["date"][0:11]]["conn"] += connection_table[i]["connections"]

	statistic_table["all_conn"] += connection_table[i]["connections"]

print statistic_table
