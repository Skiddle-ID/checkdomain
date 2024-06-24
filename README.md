# checkdomain internet positif
It's just a Cloudflare worker
This worker fetches from [Skiddle-ID/blocklist](https://github.com/Skiddle-ID/blocklist), and make it easy to used and search to massive domains

Alt API /w Real-time Update : https://nawalacheck.skiddle.id/
*NEW API* All API Request is same as below

### Make a Simple request
**cURL**
```
curl -X GET 'https://check.skiddle.id?domain=example.com'
```

Expected output:
```
example.com: Not Blocked!
```

### Batch Search domains
You can use the *domains* parameter to batch search domains, **PLEASE ONLY SEARCH UPTO 30 DOMAINS AT A TIME, THE CF WORKER CURRENTLY CAN BARELY PROCESS MORE THAN 30 DOMAINS AT ONCE**
**cURL**
```
curl -X GET 'https://check.skiddle.id?domains=example.com,reddit.com'
```

Expected output:
```
example.com: Not Blocked!
reddit.com: Blocked!
```

## Json Output
for people who want to use this "API", you can use the json parameter

**cURL**
```
curl -X GET 'https://check.skiddle.id?domain=example.com&json=true'
```

Expected output:
```
{"example.com":{"blocked":false}}
```

### For batch, the output is abit different

**cURL**
```
curl -X GET 'https://check.skiddle.id?domains=example.com,reddit.com&json=true'
```

Expected output:
```
{"example.com":{"blocked":false},"reddit.com":{"blocked":true}}
```

## Force Refresh
this is NOT needed at all since it terminates cache if its not used for an hour or so; i honestly dont know!. this is here if you see it not picking up a new blocked domain

**cURL**
```
curl -X GET 'https://check.skiddle.id?refresh=true'
```

Expected output:
```
Cache Refreshed!
```

# Credits
Thanks to [LepasID](https://github.com/lepasid) by [BebasID](https://github.com/bebasid)
