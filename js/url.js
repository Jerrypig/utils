class urlFn {

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

}
