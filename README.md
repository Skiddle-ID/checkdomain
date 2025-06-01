## Checkdomain Internet Positif Worker
This document describes the Checkdomain Internet Positif Cloudflare worker, a tool designed to fetch domain blocking status from the [Skiddle-ID/blocklist](https://github.com/Skiddle-ID/blocklist). It facilitates easy usage and domain searches, even for large batches.

### Current Situation
The previous version of the API used Cloudflare Workers to load the blocklist, but its large size made it unsuitable for free hosting plans. While modifications have been made, they remain closed source. The Domain Checker frontend is open source and publicly available.

The free API will be hosted on a Raspberry Pi to reduce costs, with uptime subject to home internet reliability. Private and Dedicated API options are planned for **Q1 2025**.

**Ready to use** : https://skiddle.link/checkdomain ([Github Repo](https://github.com/Skiddle-ID/domainchecker))

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
Special thanks to [LepasID](https://github.com/lepasid), [BebasID](https://github.com/bebasid), and my biggest supporter [Cindy](https://mastodon.online/@JCPatravee) for their contributions and support to this project.

---
<!-- License + Copyright -->
<p  align="center">
  <i>© <a href="https://skiddle.id">Skiddle ID</a> 2025</i><br>
  <i>Licensed under <a href="https://gist.github.com/arcestia/dc2bef037daf25773cb972b69d22be09">MIT</a></i>
</p>
