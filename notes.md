# Principles learned from CS260
## Amazon EC2
`ssh -i [key pair file] ubuntu@[ip address]` is for access\
To use the same IP address, never stop your server or assign an elastic IP address to the server (which costs money :P)

## HTTPS, TLS, and Web certificates
By shelling into my web domain, I can edit the Caddyfile with my domain's name to make it a secure `https` website

## Deploying my website
Using a `deployFiles.sh` -- `./debloyFiles.sh -k <mypemkey> -h <mydomain> -s <service>` Service is defined as the part before domain name

## React Stuff

### React Components

The ` render ` function sends whatever it is as an HTML element.
` useState ` returns a variable of the current state and a function to change it. Yeah, weird stuff
