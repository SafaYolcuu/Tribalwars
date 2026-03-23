# Troop Templates Manager (fork)

Tribal Wars Account Manager şablon ekranı için şablon kutuları; **basım süresi özeti** (kışla / ahır / atölye, darboğaz) eklenmiş sürüm.

Kaynak: [RedAlert — Troop Templates Manager](https://forum.tribalwars.net/index.php?threads/troops-template-manager.285658/).

## GitHub Pages (github.io)

1. GitHub’da yeni bir repository oluşturun (ör. `troop-templates-manager` veya mevcut `yyeni` reposunu kullanın).
2. Bu projeyi push edin; **`docs/`** klasörü sitede yayınlanacak.
3. Repo **Settings → Pages**:
   - **Build and deployment**: *Deploy from a branch*
   - **Branch**: `main` (veya `master`), klasör: **`/docs`**
   - Kaydedin; birkaç dakika içinde site hazır olur.

**Site adresi** (örnek):

`https://KULLANICI_ADI.github.io/REPO_ADI/`

Önizleme sayfası:

`https://KULLANICI_ADI.github.io/REPO_ADI/`  
(Sayfa açılışında `?screen=am_troops&mode=template` otomatik eklenir.)

### Tampermonkey’e ham script URL’si

GitHub Pages yayında iken:

`https://KULLANICI_ADI.github.io/REPO_ADI/troop-templates-manager.user.js`

Tampermonkey’de *“Add script from URL”* ile bu adresi kullanabilirsiniz (güncellemeler için uygun).

> **Not:** Oyunda kullanırken `UNIT_RECRUIT_SECONDS` değerlerini kendi dünyanıza göre `troop-templates-manager.user.js` içinde düzenleyin.

## Yerel dosyalar

- `troop-templates-manager.user.js` — userscript (kök ve `docs/` içinde kopya)
- `docs/index.html` — tarayıcıda oyun dışı önizleme
- `troop-templates-manager-demo.html` — yerel açılış için eski demo (isteğe bağlı)

## Lisans

Orijinal script RedAlert telifine tabidir; forum sayfasındaki koşullara uyun.
