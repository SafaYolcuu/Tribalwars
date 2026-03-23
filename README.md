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

### Bookmarklet (Tampermonkey yok)

1. GitHub Pages açıldıktan sonra şu sayfayı açın:  
   **`https://safayolcuu.github.io/Tribalwars/bookmark.html`**
2. Sayfadaki **“TW: Troop Templates”** bağlantısını **yer imleri çubuğuna sürükleyin** (veya sağ tıklayıp yer imi ekleyin).
3. Tribal Wars’ta Account Manager **şablon (template)** ekranındayken bu yer imine **bir kez tıklayın**; script uzaktan yüklenir.

Script dosyası (bookmarklet’in çağırdığı adres):

`https://safayolcuu.github.io/Tribalwars/troop-templates-manager.user.js`

> **Not:** Bazı dünyalar harici script enjekte etmeyi kısıtlarsa bookmarklet çalışmayabilir; o durumda eklenti (Tampermonkey vb.) gerekir.  
> **Not:** `UNIT_RECRUIT_SECONDS` değerlerini kendi dünyanıza göre repodaki `troop-templates-manager.user.js` içinde düzenleyip yeniden push edin.

## Yerel dosyalar

- `troop-templates-manager.user.js` — userscript (kök ve `docs/` içinde kopya)
- `docs/index.html` — tarayıcıda oyun dışı önizleme
- `docs/bookmark.html` — bookmarklet kurulumu (sürükle-bırak)
- `troop-templates-manager-demo.html` — yerel açılış için eski demo (isteğe bağlı)

## Lisans

Orijinal script RedAlert telifine tabidir; forum sayfasındaki koşullara uyun.
