/*
 * Script Name: Troop Templates Manager
 * Version: v1.2.5
 * Last Updated: 2025-08-15
 * Author: RedAlert (fork: yerel basım süresi özeti)
 * Author URL: https://twscripts.dev/
 *
 * Basım modeli: kışla (mızrak,kılıç,okçu,baltacı) | ahır (casus,hafif,atlı okçu,ağır) | atölye (koç,mancınık)
 * Paralel 3 hat; aynı binada birimler sırayla. ideal_süre = max(üç hat).
 * Süreleri köyünüze göre UNIT_RECRUIT_SECONDS içinde güncelleyin.
 */

// Globals
var TROOP_TEMPLATES = {
    'Offense #1': {
        spear: 0,
        sword: 0,
        axe: 6500,
        archer: 0,
        spy: 50,
        light: 2300,
        marcher: 300,
        heavy: 0,
        ram: 300,
        catapult: 100,
        archerOnly: true,
        buildType: 'offense',
    },
    'Offense #2': {
        spear: 0,
        sword: 0,
        axe: 8000,
        archer: 0,
        spy: 50,
        light: 2500,
        marcher: 0,
        heavy: 0,
        ram: 300,
        catapult: 0,
        archerOnly: false,
        buildType: 'offense',
    },
    'Offense #3': {
        spear: 0,
        sword: 0,
        axe: 7000,
        archer: 0,
        spy: 200,
        light: 2500,
        marcher: 0,
        heavy: 0,
        ram: 250,
        catapult: 50,
        archerOnly: false,
        buildType: 'offense',
    },
    'Offense #4': {
        spear: 0,
        sword: 0,
        axe: 6000,
        archer: 0,
        spy: 50,
        light: 2100,
        marcher: 0,
        heavy: 0,
        ram: 1000,
        catapult: 0,
        archerOnly: false,
        buildType: 'offense',
    },
    'Offense #5': {
        spear: 0,
        sword: 0,
        axe: 5800,
        archer: 0,
        spy: 50,
        light: 2800,
        marcher: 0,
        heavy: 0,
        ram: 275,
        catapult: 165,
        archerOnly: false,
        buildType: 'offense',
    },
    'Offense #6': {
        spear: 0,
        sword: 0,
        axe: 6300,
        archer: 0,
        spy: 50,
        light: 2750,
        marcher: 0,
        heavy: 50,
        ram: 300,
        catapult: 50,
        archerOnly: false,
        buildType: 'offense',
    },
    'Offense #7': {
        spear: 0,
        sword: 0,
        axe: 7000,
        archer: 0,
        spy: 50,
        light: 3000,
        marcher: 0,
        heavy: 50,
        ram: 300,
        catapult: 0,
        archerOnly: false,
        buildType: 'offense',
    },
    'Defense #1': {
        spear: 8000,
        sword: 0,
        axe: 0,
        archer: 4000,
        spy: 500,
        light: 0,
        marcher: 0,
        heavy: 1500,
        ram: 0,
        catapult: 0,
        archerOnly: true,
        buildType: 'defense',
    },
    'Defense #2': {
        spear: 0,
        sword: 4000,
        axe: 0,
        archer: 0,
        spy: 1000,
        light: 0,
        marcher: 0,
        heavy: 2000,
        ram: 0,
        catapult: 0,
        archerOnly: false,
        buildType: 'defense',
    },
    'Defense #3': {
        spear: 8000,
        sword: 2000,
        axe: 0,
        archer: 0,
        spy: 0,
        light: 0,
        marcher: 0,
        heavy: 1600,
        ram: 0,
        catapult: 0,
        archerOnly: false,
        buildType: 'defense',
    },
    'Defense #4': {
        spear: 5500,
        sword: 0,
        axe: 0,
        archer: 5500,
        spy: 500,
        light: 0,
        marcher: 0,
        heavy: 1200,
        ram: 0,
        catapult: 50,
        archerOnly: true,
        buildType: 'defense',
    },
    'Defense #5': {
        spear: 7000,
        sword: 0,
        axe: 0,
        archer: 0,
        spy: 500,
        light: 0,
        marcher: 0,
        heavy: 1800,
        ram: 0,
        catapult: 100,
        archerOnly: false,
        buildType: 'defense',
    },
};

/** Bir birimin basım süresi (saniye). Köyünüze göre güncelleyin. */
var UNIT_RECRUIT_SECONDS = {
    spear: 91,
    sword: 134,
    archer: 160,
    axe: 118,
    spy: 107,
    light: 214,
    marcher: 321,
    heavy: 428,
    ram: 763,
    catapult: 1144,
};

function formatGunSaatDakika(totalSec) {
    var sec = Math.floor(totalSec);
    var gun = Math.floor(sec / 86400);
    sec %= 86400;
    var saat = Math.floor(sec / 3600);
    sec %= 3600;
    var dakika = Math.floor(sec / 60);
    return gun + ' gün ' + saat + ' saat ' + dakika + ' dakika';
}

/** Kışla / ahır / atölye süreleri ve darboğaz (oyundaki bina eşlemenize göre). */
function calculateTemplateRecruitSummary(d) {
    var tKisla =
        (d.spear || 0) * UNIT_RECRUIT_SECONDS.spear +
        (d.sword || 0) * UNIT_RECRUIT_SECONDS.sword +
        (d.archer || 0) * UNIT_RECRUIT_SECONDS.archer +
        (d.axe || 0) * UNIT_RECRUIT_SECONDS.axe;
    var tAhir =
        (d.spy || 0) * UNIT_RECRUIT_SECONDS.spy +
        (d.light || 0) * UNIT_RECRUIT_SECONDS.light +
        (d.marcher || 0) * UNIT_RECRUIT_SECONDS.marcher +
        (d.heavy || 0) * UNIT_RECRUIT_SECONDS.heavy;
    var tAtolye =
        (d.ram || 0) * UNIT_RECRUIT_SECONDS.ram +
        (d.catapult || 0) * UNIT_RECRUIT_SECONDS.catapult;
    var ideal = Math.max(tKisla, tAhir, tAtolye);
    var darbogaz =
        ideal === tKisla ? 'kışla' : ideal === tAhir ? 'ahır' : 'atölye';
    return {
        tKisla: tKisla,
        tAhir: tAhir,
        tAtolye: tAtolye,
        ideal: ideal,
        darbogaz: darbogaz,
        idealLabel: formatGunSaatDakika(ideal),
    };
}

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;
if (typeof DISABLE_DEFAULT_TEMPLATES !== 'boolean')
    DISABLE_DEFAULT_TEMPLATES = false;
if (typeof USER_TROOPS_TEMPLATES !== 'undefined')
    DISABLE_DEFAULT_TEMPLATES === false
        ? (TROOP_TEMPLATES = { ...TROOP_TEMPLATES, ...USER_TROOPS_TEMPLATES })
        : (TROOP_TEMPLATES = { ...USER_TROOPS_TEMPLATES });

// Script Config
var scriptConfig = {
    scriptData: {
        prefix: 'troopTemplatesManager',
        name: 'Troop Templates Manager',
        version: 'v1.2.5',
        author: 'RedAlert',
        authorUrl: 'https://twscripts.dev/',
        helpLink:
            'https://forum.tribalwars.net/index.php?threads/troops-template-manager.285658/',
    },
    translations: {
        en_DK: {
            'Troop Templates Manager': 'Troop Templates Manager',
            Help: 'Help',
            'Redirecting...': 'Redirecting...',
            'There was an error!': 'There was an error!',
            'Account Manager and Premium Account are needed for this script to work!':
                'Account Manager and Premium Account are needed for this script to work!',
            'Archer templates are now hidden!':
                'Archer templates are now hidden!',
            'Spear fighters': 'Spear fighters',
            Swordsmen: 'Swordsmen',
            Axemen: 'Axemen',
            Archers: 'Archers',
            Scouts: 'Scouts',
            'Light cavalry': 'Light cavalry',
            'Mounted archers': 'Mounted archers',
            'Heavy cavalry': 'Heavy cavalry',
            Rams: 'Rams',
            Catapults: 'Catapults',
            'You chose the template: ': 'You chose the template: ',
        },
        fr_FR: {
            'Troop Templates Manager': 'Gestionnaire de modèle de troupe',
            Help: 'Aide',
            'Redirecting...': 'Redirection...',
            'There was an error!': 'Une erreur est survenue !',
            'Account Manager and Premium Account are needed for this script to work!':
                'Gestionnaire de compte et Compte premium sont nécessaire pour que ce script fonctionne !',
            'Archer templates are now hidden!':
                'Modèles archers sont maintenant cachés!',
            'Spear fighters': 'Lanciers',
            Swordsmen: 'P.E',
            Axemen: 'Guerriers à la hache',
            Archers: 'Archers',
            Scouts: 'Scouts',
            'Light cavalry': 'Cavaliers légers',
            'Mounted archers': 'Archers montés',
            'Heavy cavalry': 'Cavaliers lourds',
            Rams: 'Béliers',
            Catapults: 'Catapultes',
            'You chose the template: ': 'Tu as choisi le template: ',
        },
        pt_BR: {
            'Troop Templates Manager': 'Gerenciador de Modelos de Tropa',
            Help: 'Ajuda',
            'Redirecting...': 'Redirecionando...',
            'There was an error!': 'Houve Um Erro!',
            'Account Manager and Premium Account are needed for this script to work!':
                'Conta Premiu e Gerente de conta são nescessario pata que este script funciona!',
            'Archer templates are now hidden!':
                ' Os aquivos do Archer agora estão ocultos!',
            'Spear fighters': 'Lanceiros',
            Swordsmen: 'Espadachins',
            Axemen: 'Barbaros',
            Archers: 'Arqueiros',
            Scouts: 'Exploradores',
            'Light cavalry': 'Cavalaria Leve',
            'Mounted archers': 'Arqueiro a Cavalo',
            'Heavy cavalry': 'Cavalaria Pesada',
            Rams: 'Arietes',
            Catapults: 'Catapultas',
            'You chose the template: ': 'Você escolheu o Modelo',
        },
    },
    allowedMarkets: [],
    allowedScreens: ['am_troops'],
    allowedModes: ['template'],
    isDebug: DEBUG,
    enableCountApi: true,
};

window.twSDK = {
    scriptData: {},
    translations: {},
    allowedMarkets: [],
    allowedScreens: [],
    allowedModes: [],
    enableCountApi: true,
    isDebug: false,
    isMobile: jQuery('#mobileHeader').length > 0,
    delayBetweenRequests: 200,
    market: game_data.market,
    units: game_data.units,
    village: game_data.village,

    _initDebug: function () {
        const scriptInfo = this.scriptInfo();
        console.debug(`${scriptInfo} It works!`);
        console.debug(`${scriptInfo} HELP:`, this.scriptData.helpLink);
        if (this.isDebug) {
            console.debug(`${scriptInfo} Market:`, game_data.market);
            console.debug(`${scriptInfo} Screen:`, game_data.screen);
        }
    },

    addGlobalStyle: function () {
        return `
            .ra-table-container { overflow-y: auto; overflow-x: hidden; height: auto; max-height: 400px; }
            .ra-table th { font-size: 14px; }
            .ra-table th label { margin: 0; padding: 0; }
            .ra-table th,
            .ra-table td { padding: 5px; text-align: center; }
            .ra-table td a { word-break: break-all; }
            .ra-table tr:nth-of-type(2n) td { background-color: #f0e2be }
            .ra-table tr:nth-of-type(2n+1) td { background-color: #fff5da; }
            .ra-table-v2 th,
            .ra-table-v2 td { text-align: left; }
            .ra-textarea { width: 100%; height: 80px; resize: none; }
            .ra-pa5 { padding: 5px !important; }
            .ra-mt15 { margin-top: 15px !important; }
            .ra-mb10 { margin-bottom: 10px !important; }
            .ra-mb15 { margin-bottom: 15px !important; }
            .ra-tal { text-align: left !important; }
            .ra-tac { text-align: center !important; }
        `;
    },

    getParameterByName: function (name, url) {
        return new URL(url || window.location.href).searchParams.get(name);
    },

    checkValidLocation: function (type) {
        switch (type) {
            case 'screen':
                return this.allowedScreens.includes(
                    this.getParameterByName('screen')
                );
            case 'mode':
                return this.allowedModes.includes(
                    this.getParameterByName('mode')
                );
            default:
                return false;
        }
    },

    checkValidMarket: function () {
        if (this.market === 'yy') return true;
        return this.allowedMarkets.includes(this.market);
    },

    getGameFeatures: function () {
        const { Premium, FarmAssistent, AccountManager } = game_data.features;
        return {
            isPA: Premium.active,
            isLA: FarmAssistent.active,
            isAM: AccountManager.active,
        };
    },

    redirectTo: function (location) {
        window.location.assign(game_data.link_base_pure + location);
    },

    formatAsNumber: function (number) {
        return parseInt(number, 10).toLocaleString('de');
    },

    scriptInfo: function (scriptData) {
        scriptData = scriptData || this.scriptData;
        return `[${scriptData.name} ${scriptData.version}]`;
    },

    tt: function (string) {
        if (this.translations[game_data.locale] !== undefined) {
            return this.translations[game_data.locale][string];
        }
        return this.translations['en_DK'][string];
    },

    isArcherWorld: function () {
        return this.units.includes('archer');
    },

    unitsFarmSpace: {
        spear: 1,
        sword: 1,
        axe: 1,
        archer: 1,
        spy: 2,
        light: 4,
        marcher: 5,
        heavy: 6,
        ram: 5,
        catapult: 8,
        knight: 10,
        snob: 100,
    },

    renderBoxWidget: function (body, id, mainClass, customStyle) {
        const globalStyle = this.addGlobalStyle();
        const content = `
            <div class="${mainClass} ra-box-widget" id="${id}">
                <div class="${mainClass}-header">
                    <h3>${this.tt(this.scriptData.name)}</h3>
                </div>
                <div class="${mainClass}-body">
                    ${body}
                </div>
                <div class="${mainClass}-footer">
                    <small>
                        <strong>
                            ${this.tt(this.scriptData.name)} ${this.scriptData.version}
                        </strong> -
                        <a href="${this.scriptData.authorUrl}" target="_blank" rel="noreferrer noopener">${this.scriptData.author}</a> -
                        <a href="${this.scriptData.helpLink}" target="_blank" rel="noreferrer noopener">${this.tt('Help')}</a>
                    </small>
                </div>
            </div>
            <style>
                .${mainClass} { position: relative; display: block; width: 100%; height: auto; clear: both; margin: 10px 0 15px; border: 1px solid #603000; box-sizing: border-box; background: #f4e4bc; }
                .${mainClass} * { box-sizing: border-box; }
                .${mainClass} > div { padding: 10px; }
                .${mainClass}-header { display: flex; align-items: center; justify-content: space-between; background-color: #c1a264 !important; background-image: url(/graphic/screen/tableheader_bg3.png); background-repeat: repeat-x; }
                .${mainClass}-header h3 { margin: 0; padding: 0; line-height: 1; }
                .${mainClass}-body p { font-size: 14px; }
                ${globalStyle}
                ${customStyle || ''}
            </style>
        `;
        if (jQuery(`#${id}`).length < 1) {
            jQuery('#contentContainer').prepend(content);
            jQuery('#mobileContent').prepend(content);
        } else {
            jQuery(`.${mainClass}-body`).html(body);
        }
    },

    init: async function (scriptConfig) {
        const {
            scriptData,
            translations,
            allowedMarkets,
            allowedScreens,
            allowedModes,
            isDebug,
            enableCountApi,
        } = scriptConfig;
        this.scriptData = scriptData;
        this.translations = translations;
        this.allowedMarkets = allowedMarkets;
        this.allowedScreens = allowedScreens;
        this.allowedModes = allowedModes;
        this.enableCountApi = enableCountApi;
        this.isDebug = isDebug;
        twSDK._initDebug();
    },
};

(async function () {
    await twSDK.init(scriptConfig);
    const scriptInfo = twSDK.scriptInfo();
    const { isPA, isAM } = twSDK.getGameFeatures();
    const isValidScreen = twSDK.checkValidLocation('screen');
    const isValidMode = twSDK.checkValidLocation('mode');

    const color1 = '#ff0019';
    const color2 = '#1409e8';

    (function () {
        try {
            if (isPA && isAM) {
                if (isValidScreen && isValidMode) {
                    initTroopsTemplateManager();
                } else {
                    UI.InfoMessage(twSDK.tt('Redirecting...'));
                    twSDK.redirectTo('am_troops&mode=template');
                }
            } else {
                UI.ErrorMessage(
                    twSDK.tt(
                        'Account Manager and Premium Account are needed for this script to work!'
                    )
                );
            }
        } catch (error) {
            UI.ErrorMessage(twSDK.tt('There was an error!'));
            console.error(`${scriptInfo} Error:`, error);
        }
    })();

    function initTroopsTemplateManager() {
        const templates = renderTemplates();
        const content = `<div class="rattm-flex">${templates}</div>`;

        const customStyle = `
                .rattm-flex {
                    position: relative;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                    grid-gap: 15px;
                    margin-bottom: 15px;
                }
                .rattm-box .title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    font-weight: bold;
                    background-color: rgb(195,177,136);
                    background-image: linear-gradient(to right, rgb(136,122,90), rgb(195,177,136), rgb(136,122,90));
                    border: 1px solid rgb(106,96,74);
                    height: 28px;
                    line-height: 28px;
                    padding: 2px 3px;
                }
                .rattm-box {
                    position: relative;
                    cursor: pointer;
                }
                .rattm-box .ra-table-container {
                    margin-bottom: 40px;
                }
                .rattm-box .ra-table td {
                    text-align: left;
                }
                .rattm-box .template-farm-space {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                }
                .rattm-box.active-box .title {
                    background-color: #21881e !important;
                    background-image: none;
                    color: #fff;
                }
                .troops-build-icon {
                    display: inline-block;
                    margin-right: 10px;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                }
                .troops-build-offense { background-color: ${color1}; }
                .troops-build-defense { background-color: ${color2}; }
                .template-recruit-block {
                    font-size: 11px;
                    line-height: 1.35;
                    color: #3a2a12;
                    background: rgba(255,255,255,0.35);
                    border-top: 1px solid rgb(106,96,74);
                    padding: 6px 5px 32px 5px;
                    text-align: left;
                }
                .template-recruit-block strong { color: #1a1206; }
                .template-recruit-lines { margin-top: 4px; opacity: 0.92; }
        `;

        twSDK.renderBoxWidget(
            content,
            'raTroopTemplatesManager',
            'ra-troops-templates-manager',
            customStyle
        );

        setTimeout(function () {
            if (!twSDK.isArcherWorld()) {
                jQuery('.rattm-box[data-archer="true"]').css('display', 'none');
                UI.SuccessMessage(
                    twSDK.tt('Archer templates are now hidden!'),
                    2000
                );
            }
        }, 100);

        fillTemplate();
    }

    function fillTemplate() {
        jQuery('.btn-set-troops-template').on('click', function () {
            const chosenTroopsTemplate = jQuery(this).attr('data-template');
            const templateName = jQuery(this).attr('data-name');
            const [
                spear,
                sword,
                axe,
                archer,
                spy,
                light,
                marcher,
                heavy,
                ram,
                catapult,
            ] = chosenTroopsTemplate.split(',');

            jQuery('.rattm-box').removeClass('active-box');
            jQuery(`.rattm-box[data-name="${templateName}"]`).addClass(
                'active-box'
            );
            UI.SuccessMessage(
                twSDK.tt('You chose the template: ') + `<b>${templateName}</b>`,
                500
            );

            jQuery('#spear').val(spear);
            jQuery('#sword').val(sword);
            jQuery('#axe').val(axe);
            jQuery('#spy').val(spy);
            jQuery('#light').val(light);
            jQuery('#heavy').val(heavy);
            jQuery('#ram').val(ram);
            jQuery('#catapult').val(catapult);
            jQuery('#template_name').val(templateName);

            if (twSDK.isArcherWorld()) {
                jQuery('#archer').val(archer);
                jQuery('#marcher').val(marcher);
            }

            Accountmanager.calcPop();
        });
    }

    function renderTemplates() {
        let template = '';

        for (const [templateName, templateData] of Object.entries(
            TROOP_TEMPLATES
        )) {
            const {
                spear,
                sword,
                axe,
                archer,
                spy,
                light,
                marcher,
                heavy,
                ram,
                catapult,
                archerOnly,
                buildType,
            } = templateData;

            const recruit = calculateTemplateRecruitSummary(templateData);
            const recruitHtml = `
                <div class="template-recruit-block">
                    <strong>~${recruit.idealLabel}</strong>
                    <span> (toplam)</span>
                    <div class="template-recruit-lines">
                        Darboğaz: <strong>${recruit.darbogaz}</strong><br>
                        Kışla: ${formatGunSaatDakika(recruit.tKisla)}<br>
                        Ahır: ${formatGunSaatDakika(recruit.tAhir)}<br>
                        Atölye: ${formatGunSaatDakika(recruit.tAtolye)}
                    </div>
                </div>`;

            const renderTroops = renderBoxTroops(
                spear,
                sword,
                axe,
                archer,
                spy,
                light,
                marcher,
                heavy,
                ram,
                catapult
            );
            const farmSpace = calculateFarmSpace(
                spear,
                sword,
                axe,
                archer,
                spy,
                light,
                marcher,
                heavy,
                ram,
                catapult
            );

            template += `
                    <div class="rattm-box border-frame-gold-red btn-set-troops-template" data-template="${spear}, ${sword}, ${axe}, ${archer}, ${spy}, ${light}, ${marcher}, ${heavy}, ${ram}, ${catapult}" data-archer="${archerOnly}" data-type="${buildType}" data-name="${templateName}">
                        <div class="title">
                            <span class="troops-build-icon troops-build-${buildType}"></span> ${templateName}
                        </div>
                        <div class="status-specific">
                            ${recruitHtml}
                            <div class="ra-table-container">
                                <table class="ra-table" width="100%">
                                    ${renderTroops}
                                </table>
                            </div>
                            <div class="template-farm-space title">
                                ${twSDK.formatAsNumber(farmSpace)}
                            </div>
                        </div>
                    </div>
                `;
        }

        return template;
    }

    function calculateFarmSpace(
        spear,
        sword,
        axe,
        archer,
        spy,
        light,
        marcher,
        heavy,
        ram,
        catapult
    ) {
        let totalFarmSpace = 0;
        totalFarmSpace += spear * twSDK.unitsFarmSpace.spear;
        totalFarmSpace += sword * twSDK.unitsFarmSpace.sword;
        totalFarmSpace += axe * twSDK.unitsFarmSpace.axe;
        totalFarmSpace += archer * twSDK.unitsFarmSpace.archer;
        totalFarmSpace += spy * twSDK.unitsFarmSpace.spy;
        totalFarmSpace += light * twSDK.unitsFarmSpace.light;
        totalFarmSpace += marcher * twSDK.unitsFarmSpace.marcher;
        totalFarmSpace += heavy * twSDK.unitsFarmSpace.heavy;
        totalFarmSpace += ram * twSDK.unitsFarmSpace.ram;
        totalFarmSpace += catapult * twSDK.unitsFarmSpace.catapult;
        return totalFarmSpace;
    }

    function renderBoxTroops(
        spear,
        sword,
        axe,
        archer,
        spy,
        light,
        marcher,
        heavy,
        ram,
        catapult
    ) {
        let boxTroops = '';

        if (spear !== 0) {
            boxTroops += `
                    <tr>
                        <td>
                            <img src="/graphic/unit/unit_spear.webp">
                            <strong>${spear}</strong> ${twSDK.tt('Spear fighters')}
                        </td>
                    </tr>
                `;
        }
        if (sword !== 0) {
            boxTroops += `
                    <tr>
                        <td>
                            <img src="/graphic/unit/unit_sword.webp">
                            <strong>${sword}</strong> ${twSDK.tt('Swordsmen')}
                        </td>
                    </tr>
                `;
        }
        if (axe !== 0) {
            boxTroops += `
                    <tr>
                        <td>
                            <img src="/graphic/unit/unit_axe.webp">
                            <strong>${axe}</strong> ${twSDK.tt('Axemen')}
                        </td>
                    </tr>
                `;
        }
        if (archer !== 0) {
            boxTroops += `
                    <tr>
                        <td>
                            <img src="/graphic/unit/unit_archer.webp">
                            <strong>${archer}</strong> ${twSDK.tt('Archers')}
                        </td>
                    </tr>
                `;
        }
        if (spy !== 0) {
            boxTroops += `
                    <tr>
                        <td>
                            <img src="/graphic/unit/unit_spy.webp">
                            <strong>${spy}</strong> ${twSDK.tt('Scouts')}
                        </td>
                    </tr>
                `;
        }
        if (light !== 0) {
            boxTroops += `
                    <tr>
                        <td>
                            <img src="/graphic/unit/unit_light.webp">
                            <strong>${light}</strong> ${twSDK.tt('Light cavalry')}
                        </td>
                    </tr>
                `;
        }
        if (marcher !== 0) {
            boxTroops += `
                    <tr>
                        <td>
                            <img src="/graphic/unit/unit_marcher.webp">
                            <strong>${marcher}</strong> ${twSDK.tt('Mounted archers')}
                        </td>
                    </tr>
                `;
        }
        if (heavy !== 0) {
            boxTroops += `
                    <tr>
                        <td>
                            <img src="/graphic/unit/unit_heavy.webp">
                            <strong>${heavy}</strong> ${twSDK.tt('Heavy cavalry')}
                        </td>
                    </tr>
                `;
        }
        if (ram !== 0) {
            boxTroops += `
                    <tr>
                        <td>
                            <img src="/graphic/unit/unit_ram.webp">
                            <strong>${ram}</strong> ${twSDK.tt('Rams')}
                        </td>
                    </tr>
                `;
        }
        if (catapult !== 0) {
            boxTroops += `
                    <tr>
                        <td>
                            <img src="/graphic/unit/unit_catapult.webp">
                            <strong>${catapult}</strong> ${twSDK.tt('Catapults')}
                        </td>
                    </tr>
                `;
        }

        return boxTroops;
    }
})();
