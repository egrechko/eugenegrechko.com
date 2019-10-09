---
title: How to Setup Bind9 DNS Server on Ubuntu 18.04
description: Bind9 is a DNS Server for Linux. In this guide I show you how to install and configure Bind9 DNS Server in Ubuntu 18.04
date: 2019-05-22
---

### Table of Contents

## Install BIND9

~~~bash
sudo apt install bind9 bind9utils
~~~


## Set BIND to IPv4 Mode

~~~bash
sudo vi /etc/default/bind9
~~~

## Configuring BIND9 Server

### Setting Up DNS Forwarding

Open `/etc/bind/named.conf.options`. First will want to setup DNS forwarders for requests that our DNS server does not have.
~~~bash
# Inside /etc/bind/named.conf.options

forwarders {
    8.8.8.8;
    8.8.4.4;
};
~~~

Save and Exit

### Setting Up DNS Zones (Domain Names)

Now open `/etc/bind/named.conf.local`. Add the following to create a zone. Change the zone name from `example.com` to whatever your domain is. In the file section put
`db.{yourdomain}'`.

~~~bash
zone "example.com" {
    type master;
    file "/etc/bind/zones/db.example.com";
};
~~~

Now create the `/etc/bind/zones/` directory. 
~~~bash
sudo mkdir /etc/bind/zones
~~~

To make things easier on ourselves we will create our new zone file by copying an existing template file.
~~~bash
cd /etc/bind/zones
sudo cp ../db.local ./db.example.com
~~~

Now exit your newly copied zone file. You should see the following.
~~~bash
;
; BIND data file for local loopback interface
;
$TTL    604800
@       IN      SOA     localhost. root.localhost. (
                              2         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
@       IN      NS      localhost.
@       IN      A       127.0.0.1
@       IN      AAAA    ::1
~~~

The first line we will be editing is `@       IN      SOA     localhost. root.localhost. (`.
Change `localhost.` to `example.com.`.  
Chage `root.localhost` to `webmaster.example.com`. This section is referring to which email should be contacted regarding this zone file. `root.localhost` translates to
`root@localhost`.  

Now let's edit our actual DNS records. First, change the NS record.

~~~bash
# Change from this
@       IN      NS      localhost.
  
# To This
@       IN      NS      ns1.example.com
~~~

Now create A records for your name server & A Records for whatever else you need.

~~~bash
; Name server A records
ns1     IN      A      192.168.56.50 ; replace the IP with the IP of your server

; Apache Web Server A Record
@       IN      A      192.168.56.10 ; replace the IP with the IP of your server
~~~

At the end your file should look like this.

~~~bash
;
; BIND data file for local loopback interface
;
$TTL    604800
@       IN      SOA     example.com. webmaster.example.com. (
                              2         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
        IN      NS      ns1.example.com.
ns1     IN      A      192.168.56.50 ; replace the IP with the IP of your server
@       IN      A      192.168.56.10 ; replace the IP with the IP of your server
~~~

Save and exit this file.

### Types of BIND Records
**NS**
`@      IN      NS      ns1.example.com`

**A Records**
`@      IN      A       192.168.56.50`

**MX Records**
`1w     IN      MX      10 mail.example.com`


### Check BIND9 for Errors
Now we need to check our BIND config for errors.
~~~bash
sudo named-checkconf
~~~
If there are no syntax errors then continue.

We also want to check our newly created zone configuration. 
~~~bash
sudo named-checkzone example.com db.example.com
~~~

## Restart BIND
To apply your newly created changes you will need to restart BIND.
~~~bash
sudo systemctl restart bind9
~~~

Now add your server IP as the DNS server to a client on the same network and you should be all set.
