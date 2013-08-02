/**
 * @preserve WebSocket.js v0.3.0 (c) 2013 knowledgecode | MIT licensed
 */
/*jslint browser: true */
(function () {
    'use strict';

    var identifier = 0,
        socks = [],
        WebSocket = function (uri, protocol, origin) {
            var that = this;

            if (this === window) {
                return;
            }
            this.getId = (function (id) {
                return function () {
                    return id;
                };
            }(identifier));

            this.onopen = function () {
            };
            this.onmessage = function () {
            };
            this.onerror = function () {
            };
            this.onclose = function () {
            };
            this.send = function (data) {
                window.cordova.exec(
                    null,
                    null,
                    'WebSocket',
                    'send',
                    [this.getId(), data]
                );
            };
            this.close = function () {
                window.cordova.exec(
                    null,
                    null,
                    'WebSocket',
                    'close',
                    [this.getId()]
                );
            };
            socks[identifier] = this;

            /*jslint plusplus: true */
            window.cordova.exec(
                function (data) {
                    
                    setTimeout(function () {
                     //   console.log(data); 
                        switch (data.event) {
                        
                        case 'onopen':
                            that.onopen();
                            break;
                        case 'onmessage':
                            data.data = data.value;
                            that.onmessage(data);
                            break;
                        case 'onclose':
                            data.data = data.value;
                            that.onclose(data);
                            delete socks[that.getId()];
                            break;
                        }
                    }, 0);
                },
                function (err) {
                    that.onerror(err);
                },
                'WebSocket',
                'create',
                [identifier++, uri, protocol || '', origin || '']
            );
        };

    if (!window.plugins) {
        window.plugins = {};
    }
    window.WebSocket = window.WebSocket || WebSocket;

}());
