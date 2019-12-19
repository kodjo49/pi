var Splash = function (style = {}) {
    this.body = document.body;
    this.display = this.body.style.display;
    this.indeterminate = false;

    this.splash = document.createElement("div");
    this.splash.className = "js-splash";

    if (style != null) {
        Object.keys(style).map(function (key, index) {
            STYLE[key] = style[key];
        });
    }

    Object.assign(this.splash.style, STYLE);

    this.__init = function (element, animation_time = 3000, option = {}) {
        let self = this;

        self.body.style.display = 'none';

        if (option != null) {
            Object.keys(option).map(function (key, index) {
                DEFAULT[key] = option[key];
            });
        }

        Object.assign(element.style, DEFAULT);
        this.splash.appendChild(element);

        this.body.appendChild(this.splash);
        self.body.style.display = self.display;

        setTimeout(function () {

            if (!self.indeterminate) {
                self.splash.addEventListener("transitionend", function () {
                    self.splash.style.display = "none";
                }, true);
                // Kick off the CSS transition
                self.splash.style.opacity = 0.0;
                document.body.removeChild(self.splash);
            }

        }, animation_time);
    }
};

Splash.prototype.indeterminateLoad = function (splash, callback) {
    let self = this;
    self.indeterminate = true;
    setTimeout(function () {
        splash();
        console.log("start indeterminate");
    }, 200);

    function stop() {
        self.indeterminate = false;
        self.splash.addEventListener("transitionend", function () {
            self.splash.style.display = "none";
        }, true);
        // Kick off the CSS transition
        self.splash.style.opacity = 0.0;
        document.body.removeChild(self.splash);
    }

    return callback(stop);
};

/*

var indeterminate = () => {
        //splash.fromText("<h3 style='color: #e0a800'>CUSTOM SPLASH</h3>")
        splash.fromText(
            '<div id="loader-wrapper">\n' +
            '     <div id="loader"></div>\n' +
            '</div>'
        )
    };

    splash.indeterminateLoad(indeterminate, function (callback) {
        var stop = callback;
        console.log(self);
        setTimeout(function () {
            console.log("stop execute");
            stop();
        }, 12000);
    })
    
*/
