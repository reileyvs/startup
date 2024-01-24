# Principles learned from CS260
## Amazon EC2
`ssh -i [key pair file] ubuntu@[ip address]` is for access\
To use the same IP address, never stop your server or assign an elastic IP address to the server (which costs money :P)

## HTTPS, TLS, and Web certificates
By shelling into my web domain, I can edit the Caddyfile with my domain's name to make it a secure `https` website
