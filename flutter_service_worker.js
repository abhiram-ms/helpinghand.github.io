'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "a95807de5351a714342f5e34797e6c69",
"assets/assets/markericon.png": "0c016e5732ea23d171b5c86b6c8652f8",
"assets/assets/markericon96.png": "0fe00cb43a1453066c7735e9a47554a8",
"assets/assets/markericon968.png": "05936ffa06d8b97b9783db47c1247603",
"assets/assets/undraw/animals.png": "fc9054e07d561ecc1522eae491b1cb6a",
"assets/assets/undraw/appreciation.png": "c6d6febb61ab2929dc364f1f661fbc7c",
"assets/assets/undraw/construction.png": "3a842ccba766b53923e31e00ad1bf203",
"assets/assets/undraw/detailinfo.png": "5c4b05bb37d5c9c5435d2cd38e0a8581",
"assets/assets/undraw/doctors.png": "c51c81161eac946a2cfddc8ad9b26478",
"assets/assets/undraw/donations.png": "20c25b21443049dfe3a649ef3651c1a6",
"assets/assets/undraw/electionday.png": "95e0b8ef31a6e8771573952baacbcffe",
"assets/assets/undraw/firstaid.png": "57965aad8ff838a5e9b5451e6913b3cb",
"assets/assets/undraw/heatlthline.png": "9212bbd601d9336e7b829289702e936b",
"assets/assets/undraw/helpsearch.png": "7fd57398a37a979a012a319506c8876b",
"assets/assets/undraw/iconwarning.png": "3084bb916421b207ff056a7e850ef2bf",
"assets/assets/undraw/iconwarning_.png": "a3afcf783eaaae46ac344f0c57d82830",
"assets/assets/undraw/noted.png": "84669be4c0aade5cbad8fdd58a04a382",
"assets/assets/undraw/peoples.png": "c3d5f5ac5cad20597d2fefea20c340eb",
"assets/assets/undraw/peoplesconnected.png": "d6e63bacbf95c4c7cd9a74c98ac686d5",
"assets/assets/undraw/profilepicture.png": "d96ef93b234d54fa084af541581a8bcd",
"assets/assets/undraw/questions.png": "2570fa42eb41e59e2123702ddacb8eb9",
"assets/assets/undraw/servicesneeded.png": "8a8dafc5c23baf8b43cbec0082831dae",
"assets/assets/undraw/shelter.png": "eeb9265eafdeb4dd3763b2c78fd98c66",
"assets/assets/undraw/transportation.png": "57866a4bf44f2df2c553e61143841aa1",
"assets/assets/undraw/upvote.png": "39f77d67511bcc14f265cb99c25415cf",
"assets/assets/undraw/vehicleissue.png": "1c729125626cd7b38f24e488af60f9ff",
"assets/assets/undraw/voting.png": "65ca66bddabdbed141c2b3dfb023d13b",
"assets/assets/undraw/warning.png": "412d9635804548c51c19880e4dedf186",
"assets/assets/undraw/wellnesscheck.png": "4e6845b29444e20f10a94b685346589c",
"assets/assets/undraw/worker.png": "d6892dabd8216703a872982ae189370e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "39829beb49e19deb780bdef9e248989d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "e8ea6f1a4b3343e3682f9c196bea612c",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "bd96d8b653473044d0d3b8f8b3e169f5",
"/": "bd96d8b653473044d0d3b8f8b3e169f5",
"main.dart.js": "a50ddeb4c8d8467ab2a2133c99b6d1d3",
"manifest.json": "5c0497b438093278de7d24e1bfd78321",
"version.json": "8dc5a179e940e3c480c4ef6754af544b"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
