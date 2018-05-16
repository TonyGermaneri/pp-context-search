/*jslint browser: true, es6: true*/
// symbols represent private members of the class
// this.myProperty == public this[myProperty] == private
'use strict';
const container = Symbol();
const basePath = Symbol();
const items = Symbol();
const input = Symbol();
const listBox = Symbol();
const list = Symbol();
const selectionControls = Symbol();
const okCancelControls = Symbol();
const selectAllButton = Symbol();
const deselectButton = Symbol();
const okButton = Symbol();
const cancelButton = Symbol();
const dispatch = Symbol();
class PPContextSearch extends HTMLElement {
    constructor() {
        // always call super first
        super();
        this[dispatch] = (eventName, detail, cancelable = true, bubbles = true) => {
            var e = new CustomEvent(eventName, {cancelable, bubbles, detail})
            this.dispatchEvent(e);
            return e.defaultPrevented;
        };
        this[dispatch]('created');
        this.attachShadow({mode: 'open'});
        this[input] = document.createElement('input');
        this[container] = document.createElement('div');
        this[listBox] = document.createElement('div');
        this[list] = document.createElement('ul');
        this[selectionControls] = document.createElement('div');
        this[okCancelControls] = document.createElement('div');
        this[selectAllButton] = document.createElement('div');
        this[deselectButton] = document.createElement('div');
        this[okButton] = document.createElement('button');
        this[cancelButton] = document.createElement('button');
    }
    get basePath() {
        return this[basePath];
    }
    set basePath(val) {
        this[dispatch]('basepathchange');
        if (!val) { this[basePath] = ''; return; }
        if (!/\/$/.test(val)) {
            val += '/';
        }
        this[basePath] = val;
    }
    get items() {
        return this[items];
    }
    set items(val) {
        if (typeof val === 'string') {
            try {
                val = JSON.parse(val);
            } catch (e) {
                throw new Error('Cannot parse JSON in items attribute/property. ' + e.message);
            }
        }
        if (this[dispatch]('beforechange')) { return; }
        this[items] = val;
        this[dispatch]('change');
        this.render();
    }
    render(i) {
        if (this[dispatch]('beforerender')) { return; }
        this[list].innerHTML = '';
        i = (i || this[items] || []);
        var checkSelectHighlight = () => {
            if (i.filter(function (t) { return t.selected; }).length === i.length) {
                this[selectAllButton].className = 'pp-context-selection-controls-highlight';
                this[deselectButton].className = '';
            } else {
                this[selectAllButton].className = '';
                this[deselectButton].className = 'pp-context-selection-controls-highlight';
            }
        }
        i.forEach((item, index) => {
            var li = document.createElement('li'),
                checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'pp-context-search-item-checkbox';
            li.className = 'pp-context-search-item-container';
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(item.value));
            checkbox.checked = item.selected;
            checkbox.addEventListener('change', () => {
                item.selected = checkbox.checked;
                checkSelectHighlight(i);
                this[dispatch]('change');
            });
            if (this[dispatch]('renderitem', {
                item: item,
                itemContainer: li,
                itemCheckbox: checkbox
            })) { return; }
            this[list].appendChild(li);
        });
        checkSelectHighlight();
        this[dispatch]('afterrender');
    }
    changeSelection(select) {
        (this[items] || []).forEach(function (item) {
            item.selected = select;
        });
        this.render();
        this[dispatch]('change');
    }
    selectAll() {
        if (this[dispatch]('selectall')) { return; }
        this.changeSelection(true);
    }
    deselect() {
        if (this[dispatch]('deselect')) { return; }
        this.changeSelection(false);
    }
    close() {
        if (this[dispatch]('closing')) { return; }
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
        this[dispatch]('closed');
    }
    ok() {
        if (this[dispatch]('okpressed')) { return; }
        this.close();
    }
    cancel() {
        if (this[dispatch]('cancelpressed')) { return; }
        this.close();
    }
    attributeChangedCallback(name, old, value) {
        if (this[dispatch]('attributechanged', {name: name, old: old, value: value})) { return; }
        if (name in this) {
            this[name] = value;
        }
    }
    connectedCallback() {
        this[input].addEventListener('keyup', (e) => {
            this.render(this[items].filter(function (item) {
                return new RegExp(this[input].value, 'ig').test(item.value);
            }));
        });
        this[input].type = 'text';
        this[input].setAttribute('placeholder', 'Search Locations')
        this[listBox].appendChild(this[list]);
        this[selectionControls].appendChild(this[selectAllButton]);
        this[selectionControls].appendChild(document.createTextNode('\u2022'));
        this[selectionControls].appendChild(this[deselectButton]);
        this[okCancelControls].appendChild(this[okButton]);
        this[okCancelControls].appendChild(this[cancelButton]);
        this[selectAllButton].addEventListener('click', () => { this.selectAll(); });
        this[deselectButton].addEventListener('click',  () => { this.deselect(); });
        this[okButton].addEventListener('click',  () => { this.ok(); });
        this[cancelButton].addEventListener('click',  () => { this.cancel(); });
        this[dispatch]('attached');
        this[basePath] = this[basePath] || '';
        this[listBox].className = 'pp-context-search-list-box';
        this[selectionControls].className = 'pp-context-selection-controls';
        this[okCancelControls].className = 'pp-context-okcancel-controls';
        this[okButton].className = 'pp-context-ok-button';
        this[cancelButton].className = 'pp-context-cancel-button';
        this[selectAllButton].innerHTML = 'Select All';
        this[deselectButton].innerHTML = 'Deselect';
        this[okButton].innerHTML = 'OK';
        this[cancelButton].innerHTML = 'Cancel';
        if (this.hasAttribute('basePath')) {
            this.basePath = this.getAttribute('basePath');
        }
        this.shadowRoot.innerHTML = `<style>@import "${this[basePath]}css/main.css";</style>`;
        this[container].className = 'pp-context-search';
        this.shadowRoot.appendChild(this[container]);
        this[container].appendChild(this[input]);
        this[container].appendChild(this[listBox]);
        this[container].appendChild(this[selectionControls]);
        this[container].appendChild(this[okCancelControls]);
        this[dispatch]('afterattached');
    }
}
customElements.define('pp-context-search', PPContextSearch);
window.PPContextSearch = PPContextSearch;
if (window.define) {
    define([], function () {
        return PPContextSearch;
    });
}
