---
title: Install LetsEncrypt SSL Certificate on AWS Lightsail WordPress
description: LetsEncrypt is a free opensource project that allows you to safely secure the traffic on your website. I'm going to show you how to install it step by step on your AWS Lightsail WordPress website.
date: April 25, 2019
---

If you have a newer version of a Bitnami WordPress  then you might already have the letsencrypt scripts installed. You can skip this first section if this file exists.

```bash
/opt/bitnami/letsencrypt/scripts/generate-certificate.sh
```

## Download letsencrypt scripts

To download letsencrypt on your Bitnami instance you will need to download this [tar file](https://downloads.bitnami.com/files/letsencrypt/letsencrypt-20181008.tar.gz), extract it and then move it to the */opt/bitnami/* directory.

```bash
wget https://downloads.bitnami.com/files/letsencrypt/letsencrypt-20181008.tar.gz

tar -xzvf letsencrypt-20181008.tar.gz

sudo cp -r letsencrypt /opt/bitnami
```

## Install letsencrypt certificate

Now that you have the letsencrypt scripts on your server it is time to install your SSL certificate.  

Run the following code to install your certificate. **Make sure to replace 'YOUREMAIL' & 'YOURDOMAIN' with your actual email and domain** before running the command or you'll get nowhere. If you have more domains then add them with *-d domain.com*. 

```bash
sudo /opt/bitnami/letsencrypt/scripts/generate-certificate.sh -m YOURMAIL -d YOURDOMAIN.com -d www.YOURDOMAIN.com
```

## Setup crontab jobs to auto renew your letsencrypt certificate

The script will ask you if you want have it automatically setup a crontab that will renew the SSL certificate every month. I always say yes since I see no reason why not. If you want to pass on this and add the cronjob manually you can do so like this.

- Open your crontab file

  ```bash
  sudo crontab -e
  ```

- Add the following line & make sure to change 'YOUREMAIL' & 'YOURDOMAIN' to the same values as when you initially installed the certificate.

  ```bash
  0 0 1 * * /opt/bitnami/letsencrypt/lego --tls --email="YOURMAIL" --domains="YOURDOMAIN" --domains="www.YOURDOMAIN" renew && /opt/bitnami/apache2/bin/httpd -f /opt/bitnami/apache2/conf/httpd.conf -k graceful
  ```



## Closing words

That's it you are all finished 👍. You can now visit your website  with *https://* and see that snazzy 🔒 on the left side of the url bar. 

If you are running WordPress I would suggest installing [Really Simple SSL](https://wordpress.org/plugins/really-simple-ssl/) on your site to redirect http:// traffic to https://.