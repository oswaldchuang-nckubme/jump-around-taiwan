# Hop Around Taiwan

Hold your phone and jump to walk from Tainan up the west coast to Taipei, then home along the east coast. The higher you jump, the faster you go. Play alone, or race up to 5 friends live on their own phones.

This is an installable web app (PWA) with no build step.

## Publish on GitHub Pages

1. Create a public repository, for example `hop-around-taiwan`.
2. Choose **Add file > Upload files**, drag in everything from this folder, including `icons`, and select **Commit changes**.
3. Go to **Settings > Pages**. Set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, then select **Save**.
4. After a minute or two, the game is at `https://YOUR-NAME.github.io/hop-around-taiwan/`.

Keep `index.html` at the top level of the repository.

Already published the earlier version? Upload these files over the old ones. `README.md`, `index.html`, `sw.js` and `manifest.webmanifest` will be replaced.

## Race friends

1. One player selects **Race friends > Create a race** and shares the 4-letter code or invite link.
2. Everyone else opens the game and joins with the code or link.
3. The host selects **Start race**. The first player back in Tainan wins.

Good to know:

- Racing needs an internet connection. Solo play works offline after the first visit.
- The host's phone runs the race, so it must stay online with the game open.
- If the host leaves, everyone else can finish alone.
- Players using finger controls are marked with ✋ on the results screen.

## How racing connects

Static hosting like GitHub Pages cannot relay game data, so phones connect directly with WebRTC. [PeerJS](https://peerjs.com/) and its free public cloud service help them find each other. That service has no uptime guarantee, and some mobile networks may need its relay server. For a large event, run your own [PeerServer](https://github.com/peers/peerjs-server) and pass its address to `new Peer()` in `index.html`.

## Install on a phone

- **iPhone:** open the game in Safari, tap Share, then choose Add to Home Screen.
- **Android:** open the game in Chrome and select **Install on this phone**, or use the browser menu.

## Update the game

After changing `index.html`, raise `VERSION` near the top of `sw.js` (for example `v2` to `v3`) and upload both files. Phones get the new version the next time they open the game online, which can take one extra reopen.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The game |
| `manifest.webmanifest` | App name, icons and display settings |
| `sw.js` | Offline support |
| `icons/` | App icons |
