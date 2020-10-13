location / { gzip on; gzip_proxied no-cache no-store private expired auth;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript
application/javascript application/xml font/eot font/ttf font/woff font/woff2
image/svg image/x-icon image/png; limit_req zone=flood burst=100 nodelay;
proxy_pass http://ui:3000; proxy_redirect off; proxy_cache off; proxy_set_header
Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header
X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Host
$server_name; proxy_set_header X-Forwarded-Proto $scheme; }
