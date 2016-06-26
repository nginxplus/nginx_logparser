# NGINX_LOGPARSER

## Plan:

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
