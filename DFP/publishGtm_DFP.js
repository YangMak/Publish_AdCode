/*
 * @function CreateDFP_AdSlot
 * @param {*} w 
 * @param {*} adsBlock 
 */
const CreateDFP_AdSlot = (w, adsBlock) => {
    /// ========== [ Create DFP head defineSlot Lib ] ========== ///

    /*---------- create DFP lib gpt.js ----------*/
    let s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.async = true;
    s1.src = "https://www.googletagservices.com/tag/js/gpt.js";
    document.head.appendChild(s1);

    /*---------- create googletag.cmd ----------*/
    let s2 = document.createElement("script");
    s2.innerHTML = 'var googletag = googletag || {};googletag.cmd = googletag.cmd || [];';
    document.head.appendChild(s2);

    /// ========== [ create googletag.cmd.push] ========== ///
    googletag.cmd.push(function() {
        for (let B of adsBlock) {
            let adsMainDef = googletag.defineSlot(B.defslot, B.size, B.id);
            let adsUnMapping = adsMainDef.addService(googletag.pubads());
            let adsMapping = adsMainDef.defineSizeMapping(B.mapping).addService(googletag.pubads());
            B.mapping == '' ? adsUnMapping : adsMapping;
        }
        /// ========== [ DFP event ] ========== ///
        /*googletag.pubads().addEventListener('slotRenderEnded', function(event) {
            //console.log('DFP Event:' + event.slot.getSlotElementId());
            if (event.slot.getSlotElementId() == 'div-gpt-ad-1513767903209-4') {
                if (!event.isEmpty) { //如果 DFP 版位 不為 空版
                    console.log('adUnit not Empty');
                }else{
                    console.log('adUnit is Empty');
                }
            }
        }); */
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
    });

    /// ========== [ Create init function ] ========== ///

    let initDfp = (AdDom, AdBody, place, times) => {
        times ? times : 0;
        let CheckAdDom = () => {
            if (AdDom) {
                switch (place) {
                    case 'before':
                        AdDom.parentNode.insertBefore(AdBody, AdDom);
                        break;
                    case 'after':
                        AdDom.parentNode.insertBefore(AdBody, AdDom.nextSibling);
                        break;
                    case 'html':
                        AdDom.innerHTML = '';
                        AdDom.appendChild(AdBody);
                        break;
                    case 'append':
                        AdDom.appendChild(AdBody);
                        break;
                    case 'prepend':
                        AdDom.insertBefore(AdBody, AdDom.firstChild);
                        break;
                }
            } else {
                if (times > 0) {
                    times--;
                    setTimeout(CheckAdDom, 500);
                }
            }
        }
        CheckAdDom();
    }

    /// ========== [ Create DFP Body DOM ] ========== ///

    for (let B of adsBlock) {
        /* ---------- create Outer divDom ---------- */
        let AdDom = document.querySelector(B.dom);
        let AdBody = document.createElement('div');
        AdBody.id = `DFP-${B.divid}`;
        AdBody.className = B.divclass;
        AdBody.style = B.stycss

        /* ---------- create Inner divDom ---------- */
        let AdBodyInnerDiv = document.createElement('div');
        AdBodyInnerDiv.id = B.id;

        /* ---------- create Inner script ---------- */
        let AdBodyInnerScript = document.createElement('script');
        AdBodyInnerScript.text = `googletag.cmd.push(function() {googletag.display('${B.id}');});`

        /* ---------- append Inner Dom & script ---------- */
        AdBodyInnerDiv.appendChild(AdBodyInnerScript);
        AdBody.appendChild(AdBodyInnerDiv);

        /* ---------- Call initDfp Function ----------*/
        initDfp(AdDom, AdBody, B.place, B.wait);
    }
};

/**
 * function MainInit
 * js start
 */

const MainInit = (() => {
    /// ========== [ Initialization & Check format of adsBlock_DFP ] ========== ///    
    let standKey = ['defslot', 'divclass', 'divid', 'dom', 'id', 'mapping', 'note', 'place', 'size', 'stycss', 'wait'];
    if (typeof(adsBlock_DFP) === 'undefined') {
        let error_msg = 'Not Main Object [adsBlock_DFP]!'
        console.log(error_msg);
        return error_msg;
    } else {
        let error_msg_key = '[adsBlock_DFP] The key of the child-object is incorrect!'
        for (let B of adsBlock_DFP) {
            let childObj = Object.keys(B).sort();
            if (!(standKey.every(e => childObj.includes(e)))) {
                console.log(error_msg_key);
                return error_msg_key;
            }
        }
        CreateDFP_AdSlot(window, adsBlock_DFP);
    }
})();