/*!
 * curtain.js 0.0.1 - https://github.com/yckart/Curtain.js
 * Scrolls up your curtain!
 *
 * Copyright (c) 2013 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/09/11
 **/

(function ($, window, document) {

    window.Curtain = function(sections, gap, onChange) {
        gap = gap || 0;
		onChange = onChange || function(){};

        var body = document.body;
        var html = document.documentElement;
        var offsets = [0];
		window.activeSection = 0;

        var resize = function (e) {

            for (var i = 0, item; (item = sections[i++]);) {
                offsets[i] = item.offsetHeight + offsets[i - 1];
                if (!e) {
                    item.style.position = 'fixed';
                    item.style.zIndex = sections.length - i;
                }
            }

            html.style.height =
            body.style.height = offsets.slice(-1) + 'px';

        };

        var scroll = function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var i = offsets.length;
            var cur = 0;

            // get the current section index
            while (i--) {
                if (scrollTop >= offsets[i] && scrollTop <= offsets[i + 1]) {
					if (window.activeSection != i) {
						window.activeSection = i;
						onChange(sections[i]);
					}

                    cur = i;
                    break;
                }
            }

            // current section
            sections[cur].style.top = (-scrollTop + offsets[cur]) + 'px';

            // next section
            var next = sections[cur + 1];
            if (next) next.style.top = 0;

            // all next sections
            i = cur;
            while (i--) {
                sections[i].style.top = -(offsets[i + 1] - offsets[i] + gap) + 'px';
            }
        };

        resize();
        scroll();

        if (window.addEventListener) {
            window.addEventListener('resize', resize);
            window.addEventListener('scroll', scroll);
        }

        if (window.attachEvent) {
            window.attachEvent('onresize', resize);
            window.attachEvent('onscroll', scroll);
        }

        return offsets;
    };

    if ($) $.fn.curtain = function (gap, onChange) {
        Curtain(this, gap, onChange);
        return this;
    };

}(this.jQuery || this.Zepto, window, document));