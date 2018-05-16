'use strict';
function ppContextSearch() {
    var intf = document.createElement('div'), //Reflect.construct(HTMLElement, [], new.target),
        events = {},
        basePath,
        items,
        input = document.createElement('input'),
        listBox = document.createElement('div'),
        list = document.createElement('ul'),
        selectionControls = document.createElement('div'),
        okCancelControls = document.createElement('div'),
        selectAllButton = document.createElement('div'),
        deselectButton = document.createElement('div'),
        okButton = document.createElement('button'),
        cancelButton = document.createElement('button');
    intf.dispatchEvent = function (evt, e) {
        if (events[evt]) {
            e = e || {};
            var x, stopPropagation, defaultPrevented;
            e.preventDefault = function () { defaultPrevented = true; };
            e.stopPropagation = function () { stopPropagation = true; };
            for (x = 0; events[evt].length > x; x += 1) {
                events[evt][x].call(intf, e);
                if (stopPropagation) { break; }
            };
            if (defaultPrevented) { return true; }
        }
    };
    intf.removeEventListener = function (ev, fn) {
        (events[ev] || []).forEach(function removeEachListener(sfn, idx) {
            if (fn === sfn) {
                events[ev].splice(idx, 1);
            }
        });
    };
    intf.addEventListener = function (evt, proc) {
        events[evt] = events[evt] || [];
        events[evt].push(proc);
    };
    Object.defineProperty(intf, 'basePath', {
        get () {
            return basePath;
        },
        set (val) {
            intf.dispatchEvent('basepathchange');
            if (!val) { basePath = ''; return; }
            if (!/\/$/.test(val)) {
                val += '/';
            }
            basePath = val;
        }
    });
    Object.defineProperty(intf, 'items', {
        get: function () {
            return items;
        },
        set: function (val) {
            if (typeof val === 'string') {
                try {
                    val = JSON.parse(val);
                } catch (e) {
                    throw new Error('Cannot parse JSON in items attribute/property. ' + e.message);
                }
            }
            if (intf.dispatchEvent('beforechange', {newItems: val})) { return; }
            items = val;
            intf.dispatchEvent('change');
            intf.render();
        }
    });
    function search(e) {
        // this refers to this.input in this context
        var value = this.value;
        intf.render(items.filter(function (item) {
            return new RegExp(value).test(item.value);
        }));
    };
    function checkSelectHighlight(i) {
        // if the number of items selected === the number of items
        if (i.filter(function (t) { return t.selected; }).length === i.length) {
            selectAllButton.className = 'pp-context-selection-controls-highlight';
            deselectButton.className = '';
        } else {
            selectAllButton.className = '';
            deselectButton.className = 'pp-context-selection-controls-highlight';
        }
    }
    intf.render = function (i) {
        if (intf.dispatchEvent('beforerender', {})) { return; }
        list.innerHTML = '';
        i = (i || items || []);
        i.forEach(function (item, index) {
            var li = document.createElement('li'),
                checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'pp-context-search-item-checkbox pp-context-search-item-checkbox-' + index;
            li.className = 'pp-context-search-item-container pp-context-search-item-container-' + index;
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(item.value));
            checkbox.checked = item.selected;
            checkbox.addEventListener('change', function () {
                item.selected = this.checked;
                checkSelectHighlight(i);
                intf.dispatchEvent('change');
            });
            if (intf.dispatchEvent('renderitem', {
                item: item,
                itemContainer: li,
                itemCheckbox: checkbox
            })) { return; }
            list.appendChild(li);
        });
        checkSelectHighlight(i);
        intf.dispatchEvent('afterrender');
    };
    function changeSelection(select) {
        (items || []).forEach(function (item) {
            item.selected = select;
        });
        intf.render();
        intf.dispatchEvent('change');
    }
    intf.selectAll = function () {
        if (intf.dispatchEvent('selectall')) { return; }
        changeSelection(true);
    };
    intf.deselect = function () {
        if (intf.dispatchEvent('deselect')) { return; }
        changeSelection(false);
    };
    intf.close = function () {
        if (intf.dispatchEvent('closing')) { return; }
        if (intf.parentNode) {
            intf.parentNode.removeChild(intf);
        }
        intf.dispatchEvent('closed');
    };
    intf.ok = function () {
        if (intf.dispatchEvent('okpressed')) { return; }
        intf.close();
    };
    intf.cancel = function () {
        if (intf.dispatchEvent('cancelpressed')) { return; }
        intf.close();
    };
    intf.attributeChangedCallback = function(name, old, value) {
        if (intf.dispatchEvent('attributechanged', {name: name, old: old, value: value})) { return; }
        intf[name] = value;
    };
    function init() {
        input.type = 'text';
        input.setAttribute('placeholder', 'Search Locations')
        intf.dispatchEvent('created');
        listBox.appendChild(list);
        selectionControls.appendChild(selectAllButton);
        selectionControls.appendChild(document.createTextNode('\u2022'));
        selectionControls.appendChild(deselectButton);
        okCancelControls.appendChild(okButton);
        okCancelControls.appendChild(cancelButton);
        input.addEventListener('keyup', search);
        selectAllButton.addEventListener('click', intf.selectAll);
        deselectButton.addEventListener('click', intf.deselect);
        okButton.addEventListener('click', intf.ok);
        cancelButton.addEventListener('click', intf.cancel);
        intf.dispatchEvent('attached');
        intf.basePath = intf.basePath || '';
        listBox.className = 'pp-context-search-list-box';
        selectionControls.className = 'pp-context-selection-controls';
        okCancelControls.className = 'pp-context-okcancel-controls';
        okButton.className = 'pp-context-ok-button';
        cancelButton.className = 'pp-context-cancel-button';
        selectAllButton.innerHTML = 'Select All';
        deselectButton.innerHTML = 'Deselect';
        okButton.innerHTML = 'OK';
        cancelButton.innerHTML = 'Cancel';
        if (intf.hasAttribute('basePath')) {
            intf.basePath = intf.getAttribute('basePath');
        }
        intf.className = 'pp-context-search';
        intf.innerHTML = '<link rel="stylesheet" href="' + basePath + 'css/main.css">';
        intf.appendChild(input);
        intf.appendChild(listBox);
        intf.appendChild(selectionControls);
        intf.appendChild(okCancelControls);
        intf.dispatchEvent('afterattached');
    };
    init();
    return intf;
}
