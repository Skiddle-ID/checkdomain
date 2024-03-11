addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const CACHE_TTL = 3600;
const CACHE_KEY = 'https://raw.githubusercontent.com/Skiddle-ID/blocklist/main/domains';

async function getDomainList() {
  const response = await fetch(CACHE_KEY);
  if (!response.ok) {
    throw new Error(`Failed to fetch domain list: ${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  return text.split('\n');
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const refreshCache = url.searchParams.get('refresh');

  if (request.method === 'OPTIONS') {
    return handleOptionsRequest(request);
  }

  if (refreshCache === 'true') {
    await cacheDomainList();
    return new Response('Cache Refreshed!');
  }

  const domainList = await getCachedDomainList() || await getDomainList();

  const domainsParam = url.searchParams.get('domains');
  const domainParam = url.searchParams.get('domain');

  if (domainsParam && domainParam) {
    return new Response('Both domains and domain parameters cannot be provided simultaneously.', { status: 400 });
  }

  const responseObj = {};

  if (domainsParam) {
    const domainArray = domainsParam.split(',');
    domainArray.forEach(domain => {
      const isBlocked = domainList.includes(domain.trim());
      responseObj[domain.trim()] = { blocked: isBlocked };
    });
  } else if (domainParam) {
    const isBlocked = domainList.includes(domainParam.trim());
    responseObj[domainParam.trim()] = { blocked: isBlocked };
  } else {
    return new Response('No valid parameters provided.', { status: 400 });
  }

  const jsonResponse = url.searchParams.get('json') === 'true';
  const responseBody = jsonResponse ? JSON.stringify(responseObj) : generatePlainTextResponse(responseObj);

  const headers = {
    'Content-Type': jsonResponse ? 'application/json' : 'text/plain',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  return new Response(responseBody, { headers });
}

async function handleOptionsRequest(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  return new Response(null, { headers });
}

function generatePlainTextResponse(responseObj) {
  let plaintextResponse = '';
  for (const domain in responseObj) {
    plaintextResponse += `${domain}: ${responseObj[domain].blocked ? 'Blocked' : 'Not Blocked'}!\n`;
  }
  return plaintextResponse;
}

async function getCachedDomainList() {
  const cache = caches.default;
  const response = await cache.match(CACHE_KEY);
  if (response) {
    try {
      const data = await response.json();
      return data.domainList;
    } catch (error) {
      console.error('Error parsing cached domain list:', error);
    }
  }
  return null;
}

async function cacheDomainList() {
  const domainList = await getDomainList();
  const cache = caches.default;
  try {
    await cache.put(CACHE_KEY, new Response(JSON.stringify({ domainList }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `max-age=${CACHE_TTL}`
      }
    }));
  } catch (error) {
    console.error('Error caching domain list:', error);
  }
}
