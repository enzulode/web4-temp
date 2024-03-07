#!/bin/bash

# Upgrade the system
sudo apt update
sudo apt upgrade -y

# Add Docker's official GPG key:
sudo apt install ca-certificates curl -y \
&& sudo install -m 0755 -d /etc/apt/keyrings \
&& sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc \
&& sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update

# Install docker-related stuff
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose -y

# Install git
sudo apt install git -y

echo -e "\n\nRepository to be cloned: https://github.com/enzulode/web4-temp.git\n\n"
