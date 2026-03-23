# Troop Templates Manager (fork)

Tribal Wars Account Manager şablon ekranı için şablon kutuları; **basım süresi özeti** (kışla / ahır / atölye, darboğaz) eklenmiş sürüm.

Kaynak: [RedAlert — Troop Templates Manager](https://forum.tribalwars.net/index.php?threads/troops-template-manager.285658/).

## GitHub Pages (github.io)

1. Bu repo GitHub’da: **https://github.com/SafaYolcuu/Tribalwars** — güncel kod **`yyeni-push`** dalında.
2. Repo **Settings → Pages**:
   - **Build and deployment**: *Deploy from a branch*
   - **Branch**: **`yyeni-push`** (veya bu dalı `main` ile birleştirdikten sonra `main`), klasör: **`/docs`**
   - Kaydedin; birkaç dakika içinde site hazır olur.

**Site adresi** (repo adı `Tribalwars` olduğu için yol `/Tribalwars/` olur):

`https://safayolcuu.github.io/Tribalwars/`

Önizleme (`index.html`):

`https://safayolcuu.github.io/Tribalwars/`  
(Sayfa açılışında `?screen=am_troops&mode=template` otomatik eklenir.)

### Tampermonkey’e ham script URL’si

GitHub Pages yayında iken:

`https://safayolcuu.github.io/Tribalwars/troop-templates-manager.user.js`

Tampermonkey’de *“Add script from URL”* ile bu adresi kullanabilirsiniz (güncellemeler için uygun).

> **Not:** Oyunda kullanırken `UNIT_RECRUIT_SECONDS` değerlerini kendi dünyanıza göre `troop-templates-manager.user.js` içinde düzenleyin.

## Yerel dosyalar

- `troop-templates-manager.user.js` — userscript (kök ve `docs/` içinde kopya)
- `docs/index.html` — tarayıcıda oyun dışı önizleme
- `troop-templates-manager-demo.html` — yerel açılış için eski demo (isteğe bağlı)

## Lisans

Orijinal script RedAlert telifine tabidir; forum sayfasındaki koşullara uyun.
