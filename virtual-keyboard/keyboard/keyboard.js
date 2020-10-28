class Keyboard {
    inputElement = null;

    elements = {
        main: null,
        keysContainer: null,
        keys: []
    };

    properties = {
        value: "",
        capsLock: false,
        capsDown: false,
        shift: false,
        shiftDown: false,
        sound: false,
        voice: false,
        lang: "en",
    };

    keys = {
        en: {
            Keyboard: {value: "keyboard", shift: null},
            Voice: {value: "keyboard_voice", shift: null}, 
            Sound: {value: "music_off", shift: null},
            Hide: {value: "keyboard_hide", shift: null},
            Lang: {value: "language", shift: null},
            Backquote: {value: "`", shift: "~"},
            Digit1: {value: "1", shift: "!"},
            Digit2: {value: "2", shift: "@"},
            Digit3: {value: "3", shift: "#"},
            Digit4: {value: "4", shift: "$"},
            Digit5: {value: "5", shift: "%"},
            Digit6: {value: "6", shift: "^"},
            Digit7: {value: "7", shift: "&"},
            Digit8: {value: "8", shift: "*"},
            Digit9: {value: "9", shift: "("},
            Digit0: {value: "0", shift: ")"},
            Minus:  {value: "-", shift: "_"},
            Equal:  {value: "=", shift: "+"},
            Delete: {value: "Del", shift: null},
            Tab:    {value: "keyboard_tab", shift: null},
            KeyQ:   {value: "q", shift: null},
            KeyW:   {value: "w", shift: null},
            KeyE:   {value: "e", shift: null},
            KeyR:   {value: "r", shift: null},
            KeyT:   {value: "t", shift: null},
            KeyY:   {value: "y", shift: null},
            KeyU:   {value: "u", shift: null},
            KeyI:   {value: "i", shift: null},
            KeyO:   {value: "o", shift: null},
            KeyP:   {value: "p", shift: null},
            BracketLeft:  {value: "[", shift: '{'},
            BracketRight: {value: "]", shift: '}'},
            Backspace:  {value: "backspace", shift: null},
            CapsLock:   {value: "keyboard_capslock", shift: null},
            KeyA:   {value: "a", shift: null},
            KeyS:   {value: "s", shift: null},
            KeyD:   {value: "d", shift: null},
            KeyF:   {value: "f", shift: null},
            KeyG:   {value: "g", shift: null},
            KeyH:   {value: "h", shift: null},
            KeyJ:   {value: "j", shift: null},
            KeyK:   {value: "k", shift: null},
            KeyL:   {value: "l", shift: null},
            Semicolon: {value: ";", shift: ':'},
            Quote:     {value: "'", shift: '"'},
            Backslash: {value: "\\", shift: '|'},
            Enter:     {value: "keyboard_return", shift: null},
            ShiftLeft: {value: "Shift", shift: null}, 
            ShiftRight: {value: "Shift", shift: null}, 
            IntlBackslash: {value: "\\", shift: "|"},
            KeyZ:   {value: "z", shift: null},
            KeyX:   {value: "x", shift: null},
            KeyC:   {value: "c", shift: null},
            KeyV:   {value: "v", shift: null},
            KeyB:   {value: "b", shift: null},
            KeyN:   {value: "n", shift: null},
            KeyM:   {value: "m", shift: null},
            Comma:   {value: ",", shift: '<'},
            Period:  {value: ".", shift: '>'},
            Slash:   {value: "/", shift: '?'}, 
            Space:   {value: " ", shift: null},  
            ArrowLeft: {value: "&larr;", shift: null},
            ArrowRight: {value: "&rarr;", shift: null},
            ArrowUp: {value: "&uarr;", shift: null},
            ArrowDown: {value: "&darr;", shift: null},
        },
        ru: {
            Keyboard: {value: "keyboard", shift: null},
            Voice: {value: "keyboard_voice", shift: null}, 
            Sound: {value: "music_off", shift: null},
            Hide: {value: "keyboard_hide", shift: null},
            Lang: {value: "language", shift: null},
            Backquote: {value: "ё", shift: null},
            Digit1: {value: "1", shift: "!"},
            Digit2: {value: "2", shift: "\""},
            Digit3: {value: "3", shift: "№"},
            Digit4: {value: "4", shift: ";"},
            Digit5: {value: "5", shift: "%"},
            Digit6: {value: "6", shift: ":"},
            Digit7: {value: "7", shift: "?"},
            Digit8: {value: "8", shift: "*"},
            Digit9: {value: "9", shift: "("},
            Digit0: {value: "0", shift: ")"},
            Minus:  {value: "-", shift: "_"},
            Equal:  {value: "=", shift: "+"},
            Delete: {value: "Del", shift: null},
            Tab:    {value: "keyboard_tab", shift: null},
            KeyQ:   {value: "й", shift: null},
            KeyW:   {value: "ц", shift: null},
            KeyE:   {value: "у", shift: null},
            KeyR:   {value: "к", shift: null},
            KeyT:   {value: "е", shift: null},
            KeyY:   {value: "н", shift: null},
            KeyU:   {value: "г", shift: null},
            KeyI:   {value: "ш", shift: null},
            KeyO:   {value: "щ", shift: null},
            KeyP:   {value: "з", shift: null},
            BracketLeft:  {value: "х", shift: null},
            BracketRight: {value: "ъ", shift: null},
            Backspace:  {value: "backspace", shift: null},
            CapsLock:   {value: "keyboard_capslock", shift: null},
            KeyA:   {value: "ф", shift: null},
            KeyS:   {value: "ы", shift: null},
            KeyD:   {value: "в", shift: null},
            KeyF:   {value: "а", shift: null},
            KeyG:   {value: "п", shift: null},
            KeyH:   {value: "р", shift: null},
            KeyJ:   {value: "о", shift: null},
            KeyK:   {value: "л", shift: null},
            KeyL:   {value: "д", shift: null},
            Semicolon: {value: "ж", shift: null},
            Quote:     {value: "э", shift: null},
            Backslash: {value: "\\", shift: '|'},
            Enter:     {value: "keyboard_return", shift: null},
            ShiftLeft: {value: "Shift", shift: null}, 
            ShiftRight: {value: "Shift", shift: null}, 
            IntlBackslash: {value: "\\", shift: "/"},
            KeyZ:   {value: "я", shift: null},
            KeyX:   {value: "ч", shift: null},
            KeyC:   {value: "с", shift: null},
            KeyV:   {value: "м", shift: null},
            KeyB:   {value: "и", shift: null},
            KeyN:   {value: "т", shift: null},
            KeyM:   {value: "ь", shift: null},
            Comma:   {value: "б", shift: null},
            Period:  {value: "ю", shift: null},
            Slash:   {value: ".", shift: ','}, 
            Space:   {value: " ", shift: null},  
            ArrowLeft: {value: "&larr;", shift: null},
            ArrowRight: {value: "&rarr;", shift: null},
            ArrowUp: {value: "&uarr;", shift: null},
            ArrowDown: {value: "&darr;", shift: null},
        },
    };

    mouseEvent = e => {
        if (this.inputElement) this.inputElement.focus();
        let key = e.target.closest('.keyboard__key');
        if (key == null) return;
        if (e.type === 'mousedown') {
            key.classList.add('pressed');
            e.stopImmediatePropagation();
        }
        if (e.type === 'mouseup') {
            key.classList.remove('pressed');
            return;
        }
        // console.log(key);
        switch (key.id) {
            case 'keyboard-on':
                this.show();
                break; 
            case 'Hide': 
                this.hide();
                break;
            case 'Lang':
                this.switchLang()
                break;
            case 'keyboard-lang':
                this.switchLang()
                break;
            case 'CapsLock':
                this.switchCaps();
                break;
            case 'ShiftLeft':
                this.switchShift();
                break;    
            case 'ShiftRight':
                this.switchShift();
                break;    
            case 'Sound':
                this.switchSound();
                break;
            case 'Voice':
                this.switchVoice();
                break;
            case 'Enter':
                this.inputSpec("\n");
                break;
            case 'Tab':
                this.inputSpec("\t");
                break;
            case 'Backspace':
                this.deleteBack();
                break;
            case 'Delete':
                this.delete();
                break;
            case 'ArrowLeft':
                this.moveCursor('left');
                break;
            case 'ArrowRight':
                this.moveCursor('right');
                break;
            case 'ArrowUp':
                this.moveCursor('up');
                break;
            case 'ArrowDown':
                this.moveCursor('down');
                break;
            default:
                this.input(key);
                break;

        }
    }
    
    handleEvent = e => {
        let key = document.querySelector(`#${e.code}`);
        if (e.type === 'keydown') {
            if (key) {
                key.classList.add('pressed');
                if (this.inputElement) this.inputElement.focus();
                if (e.code === 'CapsLock' && !this.properties.capsDown) {
                    this.properties.capsDown = true;
                    this.switchCaps();
                }
                if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && !this.properties.shiftDown) {
                    this.properties.shiftDown = true;
                    this.switchShift();
                }
                if (e.code === 'Tab' && this.inputElement) {
                    this.inputSpec("\t");
                    e.preventDefault();
                    return;
                }
                if (!this.isFn(key)) {
                    this.input(key);
                    e.preventDefault();    
                }
            }
        }
        if (e.type === 'keyup') {
            if (key) key.classList.remove('pressed');
            if (e.code === 'CapsLock') this.properties.capsDown = false;
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
                this.switchShift();
                this.properties.shiftDown = false;
            }
            //return;
        }
        
        
    }

    constructor () {
        this.getProperties();
        this.init();
        // document.addEventListener('keydown', this.handleEvent);
        // document.addEventListener('keyup', this.handleEvent);
    }

    init() {
        let lang = this.properties.lang;
        let keyboardOn = document.createElement('div');
        keyboardOn.classList.add('keyboard-on', 'hidden');
        let keyboardButton = this.createKey('Keyboard', lang); 
        keyboardButton.id = 'keyboard-on';
        let keyboardLang = this.createKey('Lang', lang);
        keyboardLang.id = 'keyboard-lang';
        keyboardOn.appendChild(keyboardButton);
        keyboardOn.appendChild(keyboardLang);
        document.body.appendChild(keyboardOn);

        this.elements.main = document.createElement("div");
        // this.elements.main.classList.add('keyboard','keyboard-hidden');
        this.elements.main.classList.add('keyboard');
        this.elements.main.setAttribute("id", "virtual_keyboard");
        this.elements.keysContainer = document.createElement("div");
        this.elements.keysContainer.classList.add('keyboard__keys');

        this.elements.keysContainer.appendChild(this.createKeys(this.properties.lang));
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    }

    createKey(key, lang) {
        let keyButton = document.createElement('div');
        keyButton.classList.add('keyboard__key');
        keyButton.id = key;
        let sub = document.createElement('span');
        sub.classList.add('sub');
        if (this.keys[lang][key].shift) {
            sub.innerHTML = this.keys[lang][key].shift;
            sub.classList.add('active');
        } 
        if (key === 'Lang') sub.innerHTML = lang;
        keyButton.appendChild(sub);
        let basic =  document.createElement('span');
        basic.classList.add('basic');
        
        if (key.match(/Keyboard|Hide|Voice|Sound|Lang|Tab|CapsLock|Backspace|Enter/)) {
            basic.innerHTML = `<i class="material-icons">${this.keys[lang][key].value}</i>`;
        } else basic.innerHTML = this.keys[lang][key].value;
        if (key.match(/ArrowLeft|ArrowRight|ArrowDown|ArrowUp|Del|Shift|Keyboard|Hide|Voice|Sound|Lang|Tab|CapsLock|Backspace|Enter/)) {
            keyButton.classList.add('Fn');
        }
        
        keyButton.appendChild(basic);
        keyButton.addEventListener('mousedown', this.mouseEvent);
        keyButton.addEventListener('mouseup', this.mouseEvent);
        // keyButton.addEventListener('click', this.mouseEvent);
        return keyButton;
    }

    createKeys(lang) {
        const keyboardLayout = [
            ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Delete'],
            ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backspace'],
            ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
            ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp','ShiftRight'],
            ['Hide', 'Lang', 'Voice', 'Space', 'Sound', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
        ];
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < keyboardLayout.length; i++) {
            let row = keyboardLayout[i];
            let grid = document.createElement('div');

            grid.classList.add('grid-row');
            grid.style.gridTemplateColumns = `repeat(${row.length}, auto)`;
            row.forEach(key => {
                grid.appendChild(this.createKey(key, lang));
            });
            fragment.appendChild(grid);
        }

        return fragment;
    }

    hide() {
        this.elements.main.classList.add('keyboard-hidden');     
        document.querySelector('.keyboard-on').classList.toggle('hidden');
    }

    show() {
        this.elements.main.classList.remove('keyboard-hidden');
        document.querySelector('.keyboard-on').classList.toggle('hidden');
    }

    isFn(element) {
        return element.classList.contains('Fn');
    }

    switchShift() {
        document.querySelector('#ShiftLeft').classList.toggle('active');
        document.querySelector('#ShiftRight').classList.toggle('active');
        this.properties.shift = !this.properties.shift;
        this.updateKeys();
    }

    switchCaps() {
        document.querySelector('#CapsLock').classList.toggle('active');
        this.properties.capsLock = !this.properties.capsLock;
        this.updateKeys();
    }

    updateKeys() {
        this.elements.keys.forEach(key => {
            if (!this.isFn(key)) {
                let newSub =  this.keys[this.properties.lang][key.id].shift;
                let newValue = this.keys[this.properties.lang][key.id].value;
                if (this.properties.shift && (newSub !== null)) key.classList.add('shift-on')
                else key.classList.remove('shift-on');
                if ((this.properties.capsLock && !this.properties.shift) || (this.properties.shift && !this.properties.capsLock)) {
                    newValue = newValue.toUpperCase();
                };
                if (newSub == null) {
                    key.querySelector('.sub').innerHTML = "";
                } else key.querySelector('.sub').innerHTML = newSub;
                key.querySelector('.basic').innerHTML = newValue;
            }
        });
    }
    
    switchLang() {
        if (this.properties.lang === 'en') this.properties.lang = 'ru'
            else this.properties.lang = 'en';
        this.updateKeys();
        this.saveProperties();
        document.querySelector('#Lang > .sub').innerHTML = this.properties.lang;
        document.querySelector('#keyboard-lang > .sub').innerHTML = this.properties.lang;
    }

    switchSound() {
        this.properties.sound = !this.properties.sound;
        let soundKey = document.querySelector('#Sound > .basic > i');
        soundKey.parentElement.parentElement.classList.toggle('active');
        if (this.properties.sound) {
            soundKey.innerHTML = 'music_note';
        } else {
            soundKey.innerHTML = 'music_off';
        }

    }

    switchVoice() {
        this.properties.voice = !this.properties.voice;
        document.querySelector('#Voice').classList.toggle('active');
    }

    saveProperties() {
        localStorage.setItem('vkbd-lang', this.properties.lang);
    }

    getProperties() {
        let prop = localStorage.getItem('vkbd-lang');
        if (prop != null) this.properties.lang = prop;
    }

    insert(insertSymbol) {
        let cursorStart = this.inputElement.selectionStart; 
        let cursorEnd = this.inputElement.selectionEnd; 
        this.inputElement.value = this.inputElement.value.slice(0, cursorStart) + 
            insertSymbol + this.inputElement.value.slice(cursorEnd);
        this.inputElement.selectionStart = cursorStart + 1;
        this.inputElement.selectionEnd = this.inputElement.selectionStart;    
    }

    input(key) {
        if (this.inputElement == null || this.isFn(key)) {
            if (this.inputElement) this.inputElement.focus();
            return;
        }
        this.inputElement.focus();
        // let sub = key.querySelector('.sub').innerHTML;
        // let basic = key.querySelector('.basic').innerHTML;
        let sub = this.keys[this.properties.lang][key.id].shift;
        let basic = this.keys[this.properties.lang][key.id].value;

        if ((this.properties.capsLock && !this.properties.shift) || (this.properties.shift && !this.properties.capsLock)) {
            basic = basic.toUpperCase();
        };
        if (sub == null) {
            sub = "";
        };

        let insertSymbol = "";
        
        if (this.properties.shift && sub.length > 0) insertSymbol = sub
            else insertSymbol = basic;
        
        this.insert(insertSymbol);
    }

    inputSpec(specialSymbol) {
        if (this.inputElement == null) return;
        this.inputElement.focus();
        this.insert(specialSymbol);
    }

    deleteBack() {
        if (this.inputElement == null) return;
        this.inputElement.focus();
        let cursorStart = this.inputElement.selectionStart; 
        let cursorEnd = this.inputElement.selectionEnd; 
        if (cursorStart === 0 && cursorEnd === 0) return;
        if (cursorStart === cursorEnd) {
            this.inputElement.value = this.inputElement.value.slice(0, cursorStart - 1) +
            this.inputElement.value.slice(cursorStart);
            this.inputElement.selectionStart = cursorStart - 1;
        } else {
            this.inputElement.value = this.inputElement.value.slice(0, cursorStart) +
            this.inputElement.value.slice(cursorEnd);
            this.inputElement.selectionStart = cursorStart;
        }
        this.inputElement.selectionEnd = this.inputElement.selectionStart;
    }

    delete() {
        if (this.inputElement == null) return;
        this.inputElement.focus();
        let cursorStart = this.inputElement.selectionStart; 
        let cursorEnd = this.inputElement.selectionEnd; 
        if (cursorStart === this.inputElement.value.length  &&
             cursorEnd === this.inputElement.value.length) return;
        if (cursorStart === cursorEnd) {
            this.inputElement.value = this.inputElement.value.slice(0, cursorStart) +
            this.inputElement.value.slice(cursorStart + 1);
            this.inputElement.selectionStart = cursorStart;
        } else {
            this.inputElement.value = this.inputElement.value.slice(0, cursorStart) +
            this.inputElement.value.slice(cursorEnd);
            this.inputElement.selectionStart = cursorStart;
        }
        this.inputElement.selectionEnd = this.inputElement.selectionStart;
    }

    moveCursor(direction) {
        if (this.inputElement == null) return;
        this.inputElement.focus();
        let cursorStart = this.inputElement.selectionStart; 
        let cursorEnd = this.inputElement.selectionEnd; 
        // if pressed ArrowUp
        if (direction === 'up') {
            let newPos = this.inputElement.value.slice(0, cursorStart).lastIndexOf("\n");
            if (newPos == -1) newPos = cursorStart - 1;
            if (newPos < 0) newPos = 0;
            this.inputElement.selectionStart = newPos;
            this.inputElement.selectionEnd = this.inputElement.selectionStart; 
            return;
        };
        // if pressed ArrowDown
        if (direction === 'down') {
            let newPos = this.inputElement.value.slice(cursorStart).indexOf("\n") ;
            if (newPos == -1) newPos = 0;
            cursorStart += newPos + 1;
            this.inputElement.selectionStart = cursorStart;
            this.inputElement.selectionEnd = this.inputElement.selectionStart; 
            return;
        };

        if (cursorStart !== cursorEnd) {
            this.inputElement.selectionEnd = cursorStart;
            return;
        }
        switch (direction) {
            case 'left':
                    cursorStart--;
                    if (cursorStart < 0) cursorStart = 0;
                    this.inputElement.selectionStart = cursorStart; 
                    this.inputElement.selectionEnd = cursorStart; 
                break;
            case 'right':
                    cursorStart++;
                    if (cursorStart > this.inputElement.value.length) cursorStart = this.inputElement.value.length;
                    this.inputElement.selectionStart = cursorStart; 
                    this.inputElement.selectionEnd = cursorStart; 
                break;
        }
    }
}

window.addEventListener("DOMContentLoaded", function () {
    let keyboard = new Keyboard();
    document.querySelectorAll('.use-virtual-keyboard').forEach((element) => {
        element.addEventListener('click', (e) => {
            keyboard.inputElement = element;
        });
         element.addEventListener('focus', (e) => {
            keyboard.inputElement = element;
        });
    });
    document.addEventListener('keydown', keyboard.handleEvent);
    document.addEventListener('keyup', keyboard.handleEvent);
    document.addEventListener('mouseup', () => {
        document.querySelectorAll('.keyboard__key').forEach((element) => element.classList.remove('pressed'));      
    });
    document.addEventListener('blur', () => {
        document.querySelectorAll('.keyboard__key').forEach((element) => element.classList.remove('pressed'));
    });
});