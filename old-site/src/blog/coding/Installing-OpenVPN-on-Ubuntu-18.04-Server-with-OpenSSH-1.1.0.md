---
title: Installing OpenVPN on Ubuntu 18.04 Server with OpenSSH 1.1.0
description: OpenVPN is a free open source VPN that allows you to encrypt your web traffic to protect yourself while using public Wi-Fi in hotels or coffee shops
date: 2019-05-08
---

### Table of Contents

## Commands to use

* Generate Certificate Authority
  * `./easyrsa build-ca nopass`
* Fulling generating and signing a server certificate and key
  * `./easyrsa build-server-full <server-name> nopass`
* Fully generate and sign a client certificate and key
  * `./easyrsa build-client-full <client-name> nopass`
* Generate a Diffie-Hellman based on parameters found in ./vars file
  * `./easyrsa gen-dh`
* Create a pki (Public Key Infrastructure) directory and delete anything in previous directory
  * `./easyrsa init-pki`
* Generate a HMAC (Hash-based Message Authentication Code)
  * `openvpn --genkey --secret ~/easyrsa/pki/ta.key`





## Install OpenVPN & EasyRSA

First things first, make sure your system is up to date and then install OpenVPN. After that we will download the latest version of EasyRSA, version 3.0.6 at the time of writing, from GitHub.

~~~bash
sudo apt update && sudo apt upgrade -y
sudo apt install openvpn
~~~

Now download EasyRSA

Here is a link to the [EashRSA github](https://github.com/OpenVPN/easy-rsa)

Here is the latest release at the time of writing. [easy-rsa-v3.0.6](https://github.com/OpenVPN/easy-rsa/releases/download/v3.0.6/EasyRSA-unix-v3.0.6.tgz)

~~~bash
cd ~
wget https://github.com/OpenVPN/easy-rsa/releases/download/v3.0.6/EasyRSA-unix-v3.0.6.tgz
tar xvf EasyRSA-unix-v3.0.6.tgz
~~~

## Configuring EasyRSA Variables, Generating Certificates & Encryption Files

### Configuring EasyRSA Variables

Now we will need to configure EasyRSA to use the correct company/organization information when it sets up your certificates. In order to do this we will have to copy and edit the sample vars file.

~~~bash
cd EasyRSA-v3.0.6/
cp vars.example vars
# use you can use nano if you're not comfortable using vim
vim vars
~~~

Now we will have to change the vars file to include the relevant information about where were creating our certificates from. 

Look for the block of text that looks like the following...

~~~bash
...

#set_var EASYRSA_REQ_COUNTRY    "US"
#set_var EASYRSA_REQ_PROVINCE   "California"
#set_var EASYRSA_REQ_CITY       "San Francisco"
#set_var EASYRSA_REQ_ORG        "Copyleft Certificate Co"
#set_var EASYRSA_REQ_EMAIL      "me@example.net"
#set_var EASYRSA_REQ_OU         "My Organizational Unit"

...
~~~

Uncomment each of the lines and fill in the relevant information about your location, organization, etc. If you are not apart of an organization maybe use your name. 

~~~bash
...

set_var EASYRSA_REQ_COUNTRY    "US"
set_var EASYRSA_REQ_PROVINCE   "Oregon"
set_var EASYRSA_REQ_CITY       "Portland"
set_var EASYRSA_REQ_ORG        "Awesome Company"
set_var EASYRSA_REQ_EMAIL      "info@awesome.website"
set_var EASYRSA_REQ_OU         "Privacy"

...
~~~

Save and exit the file.



### Generating Certificate Authority (CA)

The Certificate Authority (CA) is the certificate that allows you to sign all other certificates that you generate on this server for OpenVPN. When it comes to generating certificates with EasyRSA there are a few steps. 

1. You generate the certificate request `.req` file and certificate key `.key` file.
2. After that you have to sign that certificate request to make it a legitimate certificate. After signing you will have a `.crt` file
3. After signing you transfer your newly created certificate to where it belongs. For the server certificate you would transfer it to `/etc/openvpn` for client certificates you would transfer it to `~/client-configs/keys`, We'll get into generating client `.ovpn` files later. 



Now you are ready to start creating certificates. We will need to generate a directory called `pki/` (Private Key Infrastructure), which is where all the certificates that EasyRSA generates will go initially.

~~~bash
# This command is run inside the EasyRSA folder that we extracted
./easyrsa init-pki
~~~

Now we need to generate the CA for the server to be able to start signing certificates. Use nopass to avoid having to create a password.

~~~bash
./easyrsa build-ca nopass
~~~

The script will ask you to verify the *Common Name* for your CA. You can just press ENTER and move on.



### Generating the Server Certificate

Now let's generate the server certificate and key & sign it. Fortunelty if you are doing both the certificate generating and signing on the same machine then you can use a handy command that generates the certificate and key and then signs that certificate for you. The command is `./easyrsa build-server-full`

Let's generate the server certificate and sign it all in one command
~~~bash
./easyrsa build-server-full server nopass
~~~

Now your newly generated certificate will be located in the `pki/` directory

Your key will be in `pki/private/server.key`
Your signed certificate will be in `pki/issued/server.crt`

Let's move on to generating our client certificates.



### Generating Client Certificates and Keys

The `./easyrsa build-server-full` command was pretty useful when it came to generating & signing the server certificate. There is another command for generating and signing client certificates all in one go. `./easyrsa build-client-full` is that command.

Let's generate and sign the client certificates and key. 
~~~bash
./easyrsa build-client-full client1 nopass
~~~

Your key will be in `pki/private/client1.key`
Your signed certificate will be in `pki/issued/client1.crt`

Now that we're done with the client certificate let's move on to generating the encryption files.

### Generating Encryption Files


#### Generate Diffie Hellman Key

The Diffie Hellman key is used by OpenVPN during key exchange. We can generate it using the following command.
~~~bash
./easyrsa gen-dh
~~~
This command will take a little bit of time to complete, just be patient with it. 

Once the command is finished you will have a file `dh.pem` in your `pki/` directory.



#### Generate HMAC Signature

The HMAC signature is used to strengthen the OpenVPN servers TLS integrity capabilities.

Run the following command to generate an HMAC signature into your `pki/` directory.
~~~bash
openvpn --genkey --secret pki/ta.key
~~~

With that we are done generating all of the required keys for our OpenVPN server. Let's move on to configuring network and firewall setting on our server.



## Configure Server Settings

In order to have OpenVPN function correctly on our Ubuntu server we will need to modify some settings.



### Configure IP Forwarding 

First we will allow *IP Forwarding*. 

Edit `/etc/sysctl.conf`

~~~bash
sudo nano /etc/sysctl.conf
~~~

Inside the file file the line that looks like this. `#net.ipv4.ip_forward=1`. Remove the "#" to uncomment this line and activate the setting.

~~~
before
...
#net.ipv4.ip_forward=1
...

after
...
net.ipv4.ip_forward=1
...
~~~



### Configure Firewall (UFW) Settings

Now we will configure all of the settings relating to the firewall.



#### Setup Masquerading for VPN Traffic

First we will need to figure out our public network interface. To do this run the following command

~~~bash
ip route | grep default
~~~

Your output will look similar to this.

~~~bash
Output
default via 123.456.1.789 dev wlp11s0 proto static
~~~

What you're looking for is the 5th item in the list. The name of the interface matters. It can be a few different interfaces like eth0, wlp11s0, ... 

It doesn't matter if your name is different from mine. What matters is that you take not of that name. We will be referencing it in the next step.

Edit `/etc/ufw/before.rules`. We will now setup masquerading.

~~~bash
sudo nano /etc/ufw/before.rules
~~~

Now right after the first block of comments add your settings to masquerade all traffic going through the VPN.

~~~
#
# rules.before
#
# Rules that should be run before the ufw command line added rules. Custom
# rules should be added to one of these chains:
#   ufw-before-input
#   ufw-before-output
#   ufw-before-forward
#

# ADD THIS STUFF
*nat
:POSTROUTING ACCEPT [0:0] 
-A POSTROUTING -s 10.8.0.0/8 -o wlp11s0 -j MASQUERADE
COMMIT

...

~~~



#### Allow Packet Forwarding

Now let's change the default packet forwarding settings in UFW to allow packet forwarding in the `/etc/default/ufw`

~~~bash
sudo nano /etc/default/ufw
~~~

Look for the option `DEFAULT_FORWARD_POLICY` and change the value from "DROP" to "ACCEPT"

~~~
...
DEFAULT_FORWARD_POLICY="ACCEPT"
...
~~~



#### Allow OpenVPN through Firewall

Now let's setup our firewall rules to allow OpenVPN connections. I will also be setting up rules to allow SSH connections too just in case you don't have those setup.

~~~bash
sudo ufw allow 1194/udp
sudo ufw allow OpenSSH
~~~

In the next section we will be setting up our OpenVPN settings. If you are planning on using a different port for OpenVPN like port `443` then use that port down instead. 

Let's start and enable the firewall

~~~bash
sudo ufw enable
~~~

We're all done with the network and firewall settings now let's configure the OpenVPN settings.



## Configuring OpenVPN

### Copying Required Server Certificates

Earlier in this guide we generated all of the required certificates for OpenVPN. Now is the time for us to copy the required certificates for OpenVPN into our `/etc/openvpn/` directory.

~~~bash
sudo cp ~/easyrsa/pki/dh.pem /etc/openvpn
sudo cp ~/easyrsa/pki/ta.key /etc/openvpn
sudo cp ~/easyrsa/pki/ca.crt /etc/openvpn
sudo cp ~/easyrsa/pki/issued/server.crt /etc/openvpn
sudo cp ~/easyrsa/pki/private/server.key /etc/openvpn
sudo cp ~/easyrsa/pki/private/ca.key /etc/openvpn
~~~

Let's move on to setting up our OpenVPN server settings



### Setting up OpenVPN Server Settings

Creating config files from scratch is a huge pain, fortunetly OpenVPN comes with some sample configs for us to use and modify. 

Let's start by copying one of those configs and extracting it into our `/etc/openvpn` directory.

~~~bash
sudo cp /usr/share/doc/openvpn/examples/sample-config-files/server.conf.gz /etc/openvpn/

sudo gzip -d /etc/openvpn/server.conf
~~~

Open the newly extracted server.conf file in a text editor

~~~bash
sudo nano /etc/openvpn/server.conf
~~~

Find `dh dh2048.pem`, change it to `dh dh.pem` to match the name of the dh.pem file we moved into our `/etc/openvpn` directory.

~~~bash
# Old
dh dh2048.pem

# New
dh dh.pem
~~~

Find `tls-auth`, make sure it's not commented and the value is set to 0. Under it add a new line with the following text

~~~
key-direction 0
~~~

Now find the `cipher AES-256-CBC` line, make sure it's not commented. Add the following on a new line below it.

~~~
auth SHA256
~~~


Find `user` & `group` setting lines. Uncomment both lines.

~~~bash
# Old
;user nobody
;group nogroup

# New
user nobody
group nogroup
~~~

Don't close the file just yet and continue on to the next section.



### Redirect All DNS Traffic Through VPN & Push New DNS

Now let's have our OpenVPN server push some settings over to our clients that tell the client to send all traffic through our VPN including Domain name lookups.

Inside the `/etc/openvpn/server.conf` file uncomment the line `push "redirect-gateway def1 bypass-dhcp"`

~~~bash
# Old
;push "redirect-gateway def1 bypass-dhcp"

# New
push "redirect-gateway def1 bypass-dhcp"
~~~

Next, just a little bit lower you'll see `push "dhcp-option DNS 208.67.222.222"`, uncomment both lines to push those DNS servers to the client. Feel free to change the DNS servers to whichever ones you prefer. 

~~~bash
# Old
;push "dhcp-option DNS 208.67.222.222"
;push "dhcp-option DNS 208.67.220.220"

# New
push "dhcp-option DNS 208.67.222.222"
push "dhcp-option DNS 208.67.220.220"
~~~

Now you're all done setting up the OpenVPN server settings. Time to Start & Enable our OpenVPN Server



### Starting & Enabling OpenVPN

First let's start our OpenVPN server and pass to it which config file we want OpenVPN to use. 

~~~bash
sudo systemctl start openvpn@server
~~~

To check if everything is working run the following command

~~~bash
sudo systemctl status openvpn@server
~~~

The output should look something like this

~~~bash
...
~~~

If you see `Active: active (runnning)` then everything is setup correctly and you can enable OpenVPN to start automatically when the server starts up.

~~~bash
sudo systemctl enable openvpn@server
~~~

Now that OpenVPN is running and enabled let's move on to creating our client config files to allow users to connect to our VPN.



## Generating Client .ovpn files

When it comes to connecting to your OpenVPN server you will need to create .ovpn files. The files are actually really easy to create, basically all you do is use a client config template and then add the contents of your `ca.crt`, `client.crt, client.key`, and `ta.key` file in the appropriate bracket. I'm not going to show you how to manually create this files but what I will do is show you how to create a little script that allows you automate the generation process a bit.

I am using the exact same method that Mark Drake is using in his guide on [How to Setup OpenVPN on Ubuntu 18.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-openvpn-server-on-ubuntu-18-04).

First create a `client-configs/` directory with another directory called `keys` inside of it. This can be done in one command. 

~~~bash
mkdir -p ~/client-configs/keys
~~~

Now create a files directory. This will be where the generated `.ovpn` files will be outputted. 

~~~bash
mkdir ~/client-configs/files
~~~

Now let's lock down the permissions for our newly created `client-configs/` directory

~~~bash
chmod -R 700 ~/client-configs
~~~

Now let's copy over all of the necessary files required to generate our client `.ovpn` file.

~~~bash
cp ~/easyrsa/pki/ca.crt ~/client-configs/keys
cp ~/easyrsa/pki/ta.key ~/client-configs/keys
cp ~/easyrsa/pki/issued/client1.crt ~/client-configs/keys
cp ~/easyrsa/pki/private/client1.key ~/client-configs/keys
~~~

We will need to setup a base line config for our client `.ovpn` files. This will make your life much easier since you won't have to copy and edit a config file every time you want to create a new client file.

~~~bash
cp /usr/share/doc/openvpn/examples/sample-config-files/client.conf ~/client-configs/base.conf
~~~

Now let's edit this file and change some settings

~~~bash
nano ~/client-configs/base.conf
~~~

Find the `remote your_server_ip 1194` line and replace `your_server_ip` with your public server IP address. If your server is at home you can use a site call [IP Chicken](https://www.ipchicken.com/) to find your public IP address and use that one. Otherwise use the ip address that is displayed when running `ip route | grep default`

~~~bash
Output
default via 123.456.1.789 dev wlp11s0 proto static
~~~

Change `your_server_ip` to the correct IP

~~~bash
# Old
. . .
# The hostname/IP and port of the server.
# You can have multiple remote entries
# to load balance between the servers.
remote your_server_ip 1194
. . .

# new
remote 123.456.1.789 1194
~~~

Find `proto udp` make sure it matches up with the one in the server config. If you didn't change the protocol to `tcp` then you don't have to worry about changing this. 

~~~bash
proto udp
~~~

Find the `user` and `group` settings and uncomment them by removing the ";"

~~~bash
# Before
...
# Downgrade privileges after initialization (non-Windows only)
;user nobody
;group nogroup

# After
user nobody
group nogroup
~~~

Now find the section where `ca`, `cert` and `key`. Make sure to comment out these lines since we will be adding all of those key directly into the file itself. 

~~~bash
# Before
...
# SSL/TLS parms.
# See the server config file for more
# description.  It's best to use
# a separate .crt/.key file pair
# for each client.  A single ca
# file can be used for all clients.
ca ca.crt
cert client.crt
key client.key

# After
...
#ca ca.crt
#cert client.crt
#key client.key
~~~

Find `tls-auth` line and comment out that setting.

~~~bash
# Before
tls-auth ta.key 1

# After
#tls-auth ta.key 1
~~~

Find `cipher AES-256-CBC` & make sure it matches it up with the server config file

~~~bash
cipher AES-256-CBC
auth SHA256
~~~

At the bottom of your file add the `key-direction` setting

~~~
...
key-direction 1
~~~

Save and exit the file. 

Let's write the script that will allow us to combine our new baseline config and the correct keys to create a `.ovpn` file to give to our clients.

### Writing the Script
Time to write a simple script that will create our `.ovpn` files. This script simple copy's our base config, and then adds the contents of our certificates and keys to the end of the file inside the appropriate tags.

Let's write the script. In your favorite text editor create a new file, `make_config.sh` in `~/client-configs/`.
~~~bash
nano ~/client-configs/make_config.sh
~~~

Paste the following code inside the file
~~~sh
#!/bin/bash

# First argument: Client identifier

KEY_DIR=~/client-configs/keys
OUTPUT_DIR=~/client-configs/files
BASE_CONFIG=~/client-configs/base.conf

cat ${BASE_CONFIG} \
    <(echo -e '<ca>') \
    ${KEY_DIR}/ca.crt \
    <(echo -e '</ca>\n<cert>') \
    ${KEY_DIR}/${1}.crt \
    <(echo -e '</cert>\n<key>') \
    ${KEY_DIR}/${1}.key \
    <(echo -e '</key>\n<tls-auth>') \
    ${KEY_DIR}/ta.key \
    <(echo -e '</tls-auth>') \
    > ${OUTPUT_DIR}/${1}.ovpn
~~~
Save and exit the file. 

Let's make sure the file is executable.
~~~bash
chmod 700 ~/client-configs/make_config.sh
~~~

### Generating .ovpn files

Now it's time to generate the client configs. We already copied over our client certificate & key,  our ca certificate and our HMAC key. 

To generate the certificate all you will have to do is cd into the `~/client-configs` directory & run the `./make_config.sh` command as root while passing it what config you want to create. Sounds confusing, it's easier just to show you.

~~~bash
cd ~/client-configs
sudo ./make_config.sh client1
~~~

Your generated `.ovpn` file will be located in `~/client-configs/files`

Now all you have to do is transfer that config from your server to your client device and you are all set. You would want to use a secure way to transfer that files. If the server is local you can use a usb drive, however I find it easier to just use `sftp`

## How to transfer your files with SFTP

Here is a guide on [how to use sftp](https://www.digitalocean.com/community/tutorials/how-to-use-sftp-to-securely-transfer-files-with-a-remote-server). I will be giving a quick run down but if you want more information just read the guide. 

SFTP in a nutshell works just like SSH but with less commands and slightly different commands. Think of SFTP as SSH but with only the ability to move around and see where you are.

Once you SFTP into a machine you can move around on that machine with `cd`, list the contents of the current directory `ls`. But what about moving around on your local machine? Well it's pretty simple. You want to `ls` on your local computer? Just use `lls`, the way I imagine it is like this Local list segments. What about changing directories? `lcd` or in other words local change directory. Rule of thumb just add a "L" to whatever command you want to run in order to run it on your local machine instead of the remote server.

Okay so you navigated around and found the file you want to transfer to your local machine now how do you get that file onto your local machine? Simple use `get`. If you want to put a file onto the remote machine use `put`. 

Simple right? 

Ex. Transferring hello.txt from local machine to remote machine 

`put hello.txt`

Ex. Transferring remote.txt from remote machine to local machine 

`get remote.txt`



In order to transfer our newly created `client1.ovpn` file from the remote server to our local computer we will `sftp` into the server and `get` it on our machine.

~~~bash
sftp user@open-vpn-server

> cd ~/client-configs/files

> get client1.ovpn

> exit
~~~

That's it now you should have the file on your local computer. 

Install OpenVPN on your computer and import the `.ovpn` file.

