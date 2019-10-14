---
title: Setup Roots Trellis for WordPress Development on Windows 10
description: Roots Trellis is a wonderful tool for setting up a development environment for WordPress and then allowing you to easily provision a production server and push your updates to that server with zero downtime. In this guide I'll show you how to setup your Windows 10 computer for the latest version of Trellis.
date: 2019-10-14
---



### Table of Contents



## Steps

1. Install VirtualBox
2. Install Vagrant 2.2.4 on both windows and WSL side.
3. Install Ansible version 2.7.12.



## Install VirtualBox 

Go to the VirtualBox website, download version 6.0 and the guest extensions for version 6.0. Install VirtualBox with all of the default settings.

Also make sure you have Virtualization enabled on your computer! I always forget this when I'm setting up my dev environment on a new computer. 😅

[VirtualBox Downloads](https://www.virtualbox.org/wiki/Downloads)



## Install Vagrant on WSL & Windows 10

You must install the exact same version on both windows 10 and WSL.

Make sure to install vagrant version 2.2.4 not 2.2.5 which is the latest version. I haven't been able to get trellis to work properly with vagrant 2.2.5. I always run into a vagrant-bindfs dependency error which I haven't been able to solve even by manually installing the correct plugin version. The safe bet is just skip 2.2.5.

Download links 

[Vagrant 2.2.4 deb](https://releases.hashicorp.com/vagrant/2.2.4/vagrant_2.2.4_x86_64.deb)

[Vagrant 2.2.4 MSI](https://releases.hashicorp.com/vagrant/2.2.4/vagrant_2.2.4_x86_64.msi)

[Vagrant 2.2.4 Download Page](https://releases.hashicorp.com/vagrant/2.2.4/)



### Installing Vagrant on Ubuntu in WSL

To install vagrant on ubuntu you will first need to navigate to where you downloaded the file and then install it using dpkg.

~~~bash
cd ~/Downloads
sudo dpkg -i vagrant_2.2.4_x86_64.deb
~~~

If you run into any errors or are missing any dependences then run `sudo apt-get install -f` to fix those dependency issues.



### Installing Vagrant on Windows

This is pretty straight forwards. Just navigate to where you downloaded the msi file, run it, follow all of the steps, the defaults will work and then restart your computer.



### Linking Vagrant on WSL with Vagrant on Windows

Now that you have vagrant installed on both WSL & Windows you will have to link them together. This is because vagrant on WSL cannot actually create VMs on windows it needs to communicate with vagrant on windows which will do all of the creation, updating and managing of VMs.

To link WSL vagrant and Windows vagrant you will need to edit your `~/.bashrc` file or `~/.zshrc`

~~~bash
vim ~/.bashrc
or 
vim ~/.zshrc

# Add the following two lines
export VAGRANT_WSL_ENABLE_WINDOWS_ACCESS="1"
export PATH="$PATH:/mnt/c/Program Files/Oracle/VirtualBox"
~~~

If you installed VirtualBox to a different directory instead of the default then replace `/mnt/c/Program Files/Oracle/VirtualBox` with the path to where you installed VirtualBox.



### Installing vagrant-winnfsd

In order to get better vagrant performance on windows you will need to install vagrant-winnfsd.

Install it by running the following command

~~~bash
vagrant plugin install vagrant-winnfsd
~~~



## Install Ansible 2.7.12 with Pip

Installing Ansible is pretty straight forward. You will just need python installed with pip.

Ubuntu in WSL already has python and pip installed by default so all you have to do is run the following command. Trellis has the best support for ansible version 2.7.12 so that's the version we will install.

~~~bash
pip install ansible==2.7.12
~~~

This will install ansible. Now let's make sure you can actually access ansible from your path.

Run

~~~bash
which ansible
~~~

if you get a path then you have ansible installed correctly. On the other hand if you run into a program not found then you will have to add pip packages to your path. Add the following line to your `~/.bashrc` or `~/.yarnrc`.

Make sure to replace {username} with your username

~~~bash
vim ~/.bashrc
or
vim ~/.zshrc

export PATH="/home/{username}/.local/bin:$PATH"
~~~

After saving run a `source ~/.bashrc` and you should be able to see ansible in your path with `which anisble`.



## Finished

Now your Windows 10 dev environment is fully setup and ready for trellis. 

Give your computer a restart before git cloning trellis and starting your project. I noticed an issue where I couldn't change permissions on WSL but after a restart the issue went away.

Follow the roots.io documentation on setting up your project, vagrant up and you should be all set.

You will most likely run into an issue where your vagrant ssh key permissions are too open simply run `chmod 600 .vagrant/machines/default/virtualbox/private_key` inside your trellis folder. This will fix the permissions issue.

If you have any issues or ran into an issue send me a message through my contact page.

Happy coding 👨‍💻☕

