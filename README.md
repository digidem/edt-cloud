# Setting up your own Earth Defenders Toolkit Cloud

[![Test Cloud docker-compose Stack](https://github.com/digidem/edt-cloud/actions/workflows/cloud-test.yml/badge.svg)](https://github.com/digidem/edt-cloud/actions/workflows/cloud-test.yml)

1. **A cloud provider or a computer**: we recommend [Digital Ocean](https://digitalocean.com) or any computer your organization can provide
2. **Docker and docker-compose**: Some cloud providers (such as Digital Ocean) have a marketplace with [single-click Docker deployment](https://cloud.digitalocean.com/droplets/new?onboarding_origin=marketplace&appId=87786318&image=docker-20-04&activation_redirect=%2Fdroplets%2Fnew%3FappId%3D87786318%26image%3Ddocker-20-04). You can also install Docker and docker-compose on your machine using a single command:
```
curl -fsSL https://raw.githubusercontent.com/jinweijie/install-docker-and-compose/master/install.sh | sh
```
3. Clone repository
4. cd into server
5. cp and edit .env.example
6. `docker-compose up -d`
7. `docker-compose logs -f`

## Usage

1. Setup a stronger password for FileBrowser
2. Using the FileBrowser application create folders for your content

## Actions

To automate updates to the cloud you can fork the official repository and add your own Github Action secrets.

Check the [ssh-action](https://github.com/appleboy/ssh-action) repository to understand the different variables.
