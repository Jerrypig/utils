class Animator {

    constructor(duration, progress) {
        this.duration = duration;
        this.progress = progress;
    }

    start(finished) {
        var startTime = new Date().getTime();
        var duration = this.duration,
            self = this,
            timeOut = 0;
        var vendors = ['webkit', 'moz'];
        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
            window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback, element) {
                var start = 0,
                    finish = 0;
                window.setTimeout(function () {
                    start = +new Date();
                    callback(start);
                    finish = +new Date();
                    timeOut = 1000 / 300 - (finish - start);
                }, timeOut);
            };
        }

        window.requestAnimationFrame(function step() {
            var p = (new Date().getTime() - startTime) / duration;
            var next = true;
            self.progress(p, p);
            if (p >= 1.0) {
                self.progress(1.0, 1.0);
                next = false;
                finished();
            }

            if (next) {
                window.requestAnimationFrame(step);
            }

        });
    }
}
