class UrlFn {

    /**
     * 从URL中获取某个参数值
     * @param {string} name 参数名称
     * @param {string} defaultValue 默认值
     * @return {string} result 返回结果
     *
     */
    getParam(name, defaultValue) {
        defaultValue = defaultValue === undefined ? '' : defaultValue;
        var result = new RegExp('(\\?|&)' + name + '=(.*?)(&|$)', 'g').exec(location.search);
        return result ? result[2] : defaultValue;
    }

    /**
     * 从URL中获取某个整型参数值
     * @param {string} name 参数名称
     * @param {number} defaultValue 默认值
     * @return {number} paramInt 返回整型值
     *
     */
    getParamInt(name, defaultValue) {
        defaultValue = defaultValue === undefined ? 0 : defaultValue;
        return parseInt(this.getParam(name, defaultValue), 10);
    }

    /**
     * 从URL中获取某个布尔型参数值
     * @param {string} name 参数名称
     * @param {string} defaultValue 默认值
     * @return {boolean} 传入参数为true时返回true，否则返回false
     *
     */
    getParamBoolean(name, defaultValue) {
        let temp = this.getParam(name, '');
        if (typeof temp === 'undefined' || temp == null || temp === '') {
            defaultValue = defaultValue === undefined ? false : defaultValue;
        }
        else {
            defaultValue = this.getParam(name, '');
        }
        if (typeof defaultValue === 'string') {
            return defaultValue === 'true';
        }
        else {
            return defaultValue;
        }
    }

    /*获取全部url参数,并转换成json对象*/
    getAllParams(url) {
        var url = url ? url : window.location.href;
        var _pa = url.substring(url.indexOf('?') + 1),
            _arrS = _pa.split('&'),
            _rs = {};
        for (var i = 0, _len = _arrS.length; i < _len; i++) {
            var pos = _arrS[i].indexOf('=');
            if (pos == -1) {
                continue;
            }

            var name = _arrS[i].substring(0, pos),
                value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
            _rs[name] = value;
        }
        return _rs;
    }

    /*删除url指定参数，返回url*/
    delParams(url, name) {
        var baseUrl = url.split('?')[0] + '?';
        var query = url.split('?')[1];
        if (query.indexOf(name) > -1) {
            var obj = {};
            var arr = query.split('&');
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split('=');
                obj[arr[i][0]] = arr[i][1];
            }
            delete obj[name];
            var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, '').replace(/\:/g, '=').replace(/\,/g, '&');
            return url;
        }
        else {
            return url;
        }
    }

}
