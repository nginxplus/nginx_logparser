# NGINX_LOGPARSER

<<<<<<< HEAD
Plan:
***
1. Statistic (format - json, sqlite)
1.1. IP; DateTime; HTTP Method; URI; Domain; Answer code; OS.***
{"id":{"ip":"46.216.14.248", "date":"25/Jun/2016:11:18:00", "method":"GET", "domain":"example.com", "uri":"/contacts/style.css", "code":"200", "platform":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/51.0.2704.79 Chrome/51.0.2704.79 Safari/537.36"}}
2. Service managnment***
Start/Stop/Restart/Reload/Force-reload Buttons
3. Configuring service***
Fields/Plain text
4. Perfect backup
=======
## Plan:
>>>>>>> ad1d6dafaf43a41c39c5212b2848c92f80450172

1. Statistics using following format:

        {
            "id":123,                       // id
            "ip":"46.216.14.248",           // client's ip
            "date":"25/Jun/2016:11:18:00",  // access date time
            "method":"GET",                 // http request method
            "domain":"pv-photo.by",         // domain
            "uri":"/contacts/style.css",    // relative path from project's root
            "code":"200",                   // http response code
            "os":"Windows NT 6.1"           // client's info
        }

2. Service managnment ("Start/Stop/Restart/Reload/Force-reload Buttons").

3. Configuring service using web-forms or plain text.

4. Perfect backup (writing needful data to db and doing backups daily).
