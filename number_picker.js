Colors = {};
Colors.names = {
    black: "#000000",
    blue: "#0000ff",
    brown: "#a52a2a",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkviolet: "#9400d3",
    fuchsia: "#ff00ff",
    gold: "#ffd700",
    green: "#008000",
    indigo: "#4b0082",
    lime: "#00ff00",
    magenta: "#ff00ff",
    maroon: "#800000",
    navy: "#000080",
    olive: "#808000",
    orange: "#ffa500",
    purple: "#800080",
    red: "#ff0000"
};
Colors.random = function () {
    var result;
    var count = 0;
    for (var prop in this.names)
        if (Math.random() < 1 / ++count)
            result = prop;
    return result;
};

NBPopup = {};
NBPopup.element = [];
NBPopup.title = function (name) {
    let title = document.createElement("h2");
    title.innerHTML = name;
    return title;
};

NBPopup.body = function (item) {
    let body = document.createElement("div");
    body.appendChild(item);
    return body;
};

NBPopup.build = function (title, body) {

    let popup = document.createElement("div");
    popup.id = "number_picker_popup";

    Object.assign(popup.style, {
        background: 'rgba(100, 100, 100, 0.5)',
        position: 'fixed',
        display: 'none',
        'z-index': 5000,
        height: '80%',
        width: '80%',
        left: 0,
        top: 0,
        overflowX: 'hidden',
        overflowY: 'auto'
    });

    Object.assign(popup.style, {
        position: 'fixed',
        '-webkit-transform': 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%',

        padding: '40px',
        'z-index': 5001,
        'text-align': 'center',
        border: '5px solid black',
        'border-radius': '10px',
        'box-shadow': '0px 0px 15px 0px rgba(0, 0, 0, 0.4)'
    });

    let close = document.createElement("div");
    close.innerHTML = "X";

    Object.assign(close.style, {
        position: 'absolute',
        bottom: '1%',
        right: '2%',
        float: 'right',
        width: '30px',
        height: '30px',
        background: 'red',
        color: "white",
        'text-align': 'center',
        'font-size': '25px',
        'font-family': 'fantasy',
        'border-radius': '20%'
    });

    /*close.addEventListener('click', function () {
        NBPopup.hide();
    }, false);*/

    popup.appendChild(this.title(title));
    popup.appendChild(this.body(body));
    //popup.appendChild(close);

    return popup;
};

NBPopup.show = function (id) {
    let dom = document.getElementById('number_picker_popup');
    dom.style.display = 'block';

    let element = document.getElementById(id);
    console.log(id);
    NBPopup.element.push(element);

    let box = document.getElementById('nb_box');
    let li = box.querySelectorAll('li');

    for (let b = 0; b < li.length; b++) {
        li[b].addEventListener('click', function () {
            Object.assign(element.style, {
                color: this.style.color,
                background: this.style.background
            });
            element.innerHTML = this.innerHTML;
            element = null;
            NBPopup.hide();
        }, false);
    }

};

NBPopup.hide = function () {
    document.getElementById('number_picker_popup').style.display = 'none';
};

const NumberPicker = function (max = 90, limit = 5) {
    this.max = max;
    this.limit = limit;
    this.dom = null;
};

NumberPicker.prototype.render = function (domElement) {
    this.dom = domElement;
    let self = this;
    let number_list = document.createElement("div");
    number_list.id = "nb_limit_list";
    let number_box = document.createElement("ul");
    number_box.id = "nb_box";

    Object.assign(number_box.style, {
        margin: 0,
        padding: 0,
        'list-style-type': 'none',
        'margin-bottom': '40px',
        'text-align': 'justify',
        'font-size': '0.1px'
    });

    Object.assign(number_list.style, {
        display: 'flex',
        'justify-content': 'space-between',
        width: '100%',
        'max-width': '200px',
        height: 'auto',
        'margin': '0 auto',
        padding: '4px 0'
    });

    for (let ii = 0; ii < self.max; ii++) {
        let item = document.createElement("li");
        item.id = ii + 1;
        item.innerHTML = ii + 1;
        Object.assign(item.style, {
            display: 'inline-block',
            width: '32px',
            'padding-top': '32px', /* Used instead of height to give elements fluid, width-based height */
            'margin-bottom': '2.5%',

            margin: 0,
            padding: 0,
            'list-style-type': 'none',

            height: '32px',
            border: '2px solid black',
            'border-radius': '15%',
            cursor: 'pointer',
            color: '#fff',
            'text-align': 'center',
            'font-size': '25px',
            'font-family': 'fantasy',
            background: Colors.random()
        });

        number_box.appendChild(item);
    }

    for (let i = 0; i < self.limit; i++) {
        let item = document.createElement("p");
        item.id = "nb_l" + i + 1;
        item.innerHTML = 0;
        Object.assign(item.style, {
            width: '30px',
            height: '30px',
            border: '2px solid black',
            'border-radius': '15%',
            cursor: 'pointer',
            color: 'black',
            'text-align': 'center',
            'font-size': '25px',
            'font-family': 'fantasy',
        });

        item.addEventListener('click', function () {
            NBPopup.show(this.id);
        });

        number_list.appendChild(item);
    }

    setTimeout(function () {
        document.body.appendChild(NBPopup.build("Pick Number", number_box));
        setTimeout(function () {
            domElement.appendChild(number_list);
        }, 100);
    }, 100);

};

NumberPicker.prototype.getSelections = function () {
    let limi_list = document.getElementById('nb_limit_list');
    let alls = limi_list.querySelectorAll("p");
    let selections = [];

    for (let i = 0; i < alls.length; i++) {
        let num = parseInt(alls[i].innerHTML);
        selections.push(num);
    }

    return selections;
};

NumberPicker.prototype.reset = function () {
    if (this.dom !== null) {
        this.dom.innerHTML = "";
        this.render(this.dom);
    }
};

/*NumberPicker.prototype.clear = function () {
    if (this.dom !== null) {
        this.dom.innerHTML = "";
    }
};*/