#!/bin/sh

DB='/usr/share/nginx_logparser/nginx_logs.db'


# Sqlite create db & table request:
sqlite3 $DB "CREATE TABLE access(id INTEGER PRIMARY KEY AUTOINCREMENT, ip TEXT NOT NULL, date INT NOT NULL , method TEXT NOT NULL, uri TEXT NOT NULL, code TEXT NOT NULL, domain TEXT NOT NULL, platform TEXT NOT NULL, location TEXT);"
