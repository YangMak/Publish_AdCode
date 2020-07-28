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

    /// ========== [ Start Publish_AdCode_DFP main ] ========== ///
    let popInTasks = [];
    let isContain = (node, checkNodes) => {
        let isExit = false;
        for (let i = 0, iz = checkNodes.length; i < iz; i++) {
            if (node === checkNodes[i]) {
                isExit = true;
                break;
            }
        }
        return isExit;
    };
    let setAdBody = (divId, divClass, styCss, id) => {

        /* ---------- create Outer divDom ---------- */
        let AdBody = document.createElement('DIV');
        AdBody.id = `DFP-${divId}`;
        AdBody.className = divClass;
        AdBody.style = styCss;

        /* ---------- create Inner divDom ---------- */
        let AdBodyInnerDiv = document.createElement('DIV');
        AdBodyInnerDiv.id = id;

        /* ---------- create Inner script ---------- */
        let AdBodyInnerScript = document.createElement('SCRIPT');
        AdBodyInnerScript.text = `googletag.cmd.push(function() {googletag.display('${id}');});`

        /* ---------- append Inner Dom & script ---------- */
        AdBodyInnerDiv.appendChild(AdBodyInnerScript);
        AdBody.appendChild(AdBodyInnerDiv);

        return AdBody;
    };
    /* ---------- [ Create init function ] ---------- */

    let initDFP = (AdDom, AdBody, place) => {
        switch (place) {
            case 'before':
                AdDom.parentNode.insertBefore(AdBody, AdDom);
                break;
            case 'after':
                AdDom.parentNode.insertBefore(AdBody, AdDom.nextSibling);
                break;
            case 'html':
                while (AdDom.firstChild) AdDom.removeChild(AdDom.firstChild);
                AdDom.appendChild(AdBody);
                break;
            case 'append':
                AdDom.appendChild(AdBody);
                break;
            case 'prepend':
                AdDom.insertBefore(AdBody, AdDom.firstChild);
                break;
        }
    };

    for (let [index, B] of adsBlock.entries()) {
        class popInGroup {
            constructor() {
                this.containers = [];
            }
            checkDev() {
                let IntervalID = window.setInterval(() => {
                    let nodes = document.querySelectorAll(B.dom);
                    for (let i = 0, iz = nodes.length; i < iz; i++) {
                        let node = nodes[i];
                        if (!isContain(node, this.containers)) {
                            this.containers.push(node);
                            let AdBody = setAdBody(B.divid, B.divclass, B.stycss, B.id);
                            initDFP(node, AdBody, B.place);
                        }
                    }
                }, 500);
            }
        };
        popInTasks[index] = new popInGroup();
        popInTasks[index].checkDev();
    };
    window.popInTasks = popInTasks;
};

/**
 * function MainInit
 * js start
 */

const MainInit = (() => {
    /// ========== [ Initialization & Check format of adsBlock_DFP ] ========== ///    
    let standKey = ['defslot', 'divclass', 'divid', 'dom', 'id', 'mapping', 'note', 'place', 'size', 'stycss'];
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