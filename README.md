## Checkdomain Internet Positif Worker
This document describes the Checkdomain Internet Positif Cloudflare worker, a tool designed to fetch domain blocking status from the [Skiddle-ID/blocklist](https://github.com/Skiddle-ID/blocklist). It facilitates easy usage and domain searches, even for large batches.

### Current Situation
The free API will remain supported until **December 31, 2023**. Starting **January 1, 2024**, a Private API option will be available.

**Ready to used** : https://nawalacheck.skiddle.id/ (Rate-limit is On)
---

### Making a Simple Request
You can check the blocking status of a single domain with the following cURL command:

**cURL Command:**
```bash
curl -X GET 'https://check.skiddle.id/?domain=example.com'
```

**Expected Output:**
```
example.com: Not Blocked!
```

---

### Batch Search for Domains
Batch search functionality allows you to query multiple domains simultaneously. Note the following restrictions:
- **Maximum Domains:** Only search up to **30 domains** at a time. 
- **API Update:** Use new API links for more robust batch searches.

**cURL Command:**
```bash
curl -X GET 'https://check.skiddle.id/?domains=example.com,reddit.com'
```

**Expected Output:**
```
example.com: Not Blocked!
reddit.com: Blocked!
```

---

### JSON Output
This worker also supports JSON output for easier integration with other tools and scripts.

#### Single Domain
For a single domain, append the `json=true` parameter to the request.

**cURL Command:**
```bash
curl -X GET 'https://check.skiddle.id/?domain=example.com&json=true'
```

**Expected Output:**
```json
{"example.com":{"blocked":false}}
```

#### Batch Domains
For multiple domains, the JSON output structure is slightly different. Use the `domains` parameter along with `json=true`.

**cURL Command:**
```bash
curl -X GET 'https://check.skiddle.id/?domains=example.com,reddit.com&json=true'
```

**Expected Output:**
```json
{"example.com":{"blocked":false},"reddit.com":{"blocked":true}}
```

---

### Credits
Special thanks to [LepasID](https://github.com/lepasid) and [BebasID](https://github.com/bebasid) for their contributions to this project.

