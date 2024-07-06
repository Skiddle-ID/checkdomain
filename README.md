# checkdomain internet positif
It's just a Cloudflare worker
This worker fetches from [Skiddle-ID/blocklist](https://github.com/Skiddle-ID/blocklist), and make it easy to used and search to massive domains

New API /w Real-time Update : https://api.skiddle.id/block/

**Ready to used** : https://nawalacheck.skiddle.id/ (There is no limit for now, it can only process 1000 list per request)
Email me if you need the access, since my system will auto block IP if spam request detected.

### Make a Simple request
**cURL**
```
curl -X GET 'https://api.skiddle.id/block/?domain=example.com'
```

Expected output:
```
example.com: Not Blocked!
```

### Batch Search domains
You can use the *domains* parameter to batch search domains, **PLEASE ONLY SEARCH UPTO 30 DOMAINS AT A TIME, ~~THE CF WORKER CURRENTLY CAN BARELY PROCESS MORE THAN 30 DOMAINS AT ONCE~~** *Used New API Links above for more Robust Batch Search*

**cURL**
```
curl -X GET 'https://api.skiddle.id/block/?domains=example.com,reddit.com'
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
curl -X GET 'https://api.skiddle.id/block/?domain=example.com&json=true'
```

Expected output:
```
{"example.com":{"blocked":false}}
```

### For batch, the output is abit different

**cURL**
```
curl -X GET 'https://api.skiddle.id/block/?domains=example.com,reddit.com&json=true'
```

Expected output:
```
{"example.com":{"blocked":false},"reddit.com":{"blocked":true}}
```

# Credits
Thanks to [LepasID](https://github.com/lepasid) by [BebasID](https://github.com/bebasid)
