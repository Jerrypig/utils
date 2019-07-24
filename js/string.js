class StringFn {

    /**
     * 去除空格
     * @param  {str}
     * @param  {type} 
     *       type:  1-所有空格  2-前后空格  3-前空格 4-后空格
     * @return {String}
     */
    trim(str, type) {
        type = type || 1;
        switch (type) {
            case 1:
                return str.replace(/\s+/g, '');
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, '');
            case 3:
                return str.replace(/(^\s*)/g, '');
            case 4:
                return str.replace(/(\s*$)/g, '');
            default:
                return str;
        }
    }

    /**
     * @param  {str} 
     * @param  {type}
     *       type:  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
     * @return {String}
     */
    changeCase(str, type) {
        type = type || 4;
        switch (type) {
            case 1:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

                });
            case 2:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
                });
            case 3:
                return str.split('').map(function (word) {
                    if (/[a-z]/.test(word)) {
                        return word.toUpperCase();
                    }
                    else {
                        return word.toLowerCase();
                    }
                }).join('');
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    }

    /*
        检测密码强度
    */
    checkPwd(str) {
        var Lv = 0;
        if (str.length < 6) {
            return Lv;
        }

        if (/[0-9]/.test(str)) {
            Lv++;
        }

        if (/[a-z]/.test(str)) {
            Lv++;
        }

        if (/[A-Z]/.test(str)) {
            Lv++;
        }

        if (/[\.|-|_]/.test(str)) {
            Lv++;
        }

        return Lv;
    }

    /*过滤html代码(把<>转换)*/
    filterTag(str) {
        str = str.replace(/&/ig, '&amp;');
        str = str.replace(/</ig, '&lt;');
        str = str.replace(/>/ig, '&gt;');
        str = str.replace(' ', '&nbsp;');
        return str;
    }

    /**
 * 中文和英文长度不一致，故需要重新计算长度
 * @param {string} str 字符串
 * @return {number} length 字符串长度
 *
 */
    length(str) {
        if (str == null) {
            return 0;
        }

        if (typeof str !== 'string') {
            str += '';
        }

        // 把双字节的换成单字节的，然后在计算长度
        return parseInt(str.replace(/[^\x00-\xff]/g, '01').length / 2, 10);
    }

    /**
     * 返回文本的Unicode计数
     * @param {string} str 字符串
     * @return {number} charCount 字符串Unicode计数字符个数
     *
     */
    getUnicodeLength(str) {
        if (!str) {
            return 0;
        }

        var chars = str.split('');
        var charCount = 0;
        for (var i = 0, max = chars.length; i < max; ++i) {
            if (chars[i].charCodeAt(0) < 256) {
                charCount += 0.5;
            }
            else {
                charCount += 1;
            }
        }
        return charCount;
    }

    /**
     * 将utf-16的字符转换成UTF-8
     * @param {string} str 待转换编码
     * @return {string} out 转换后的编码
     */
    utf16to8(str) {
        // 字符
        var c;
        // 输出
        var out = '';
        // 长度
        var len = str.length;
        for (var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            }
            else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
            else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    }

    /**
     * 字符串转驼峰格式
     *     示例一：$.toHump('get_param','_')，返回getParam
     *     示例二：$.toHump('font-size', '-')，返回fontSize
     *
     * @param {string} str 原始字符串
     * @param {number} flag 转换类型
     * @return {string} 转换后的字符串
     *
     */
    toHump(str, flag) {
        return str.replace(new RegExp(flag + '(\\w)', 'g'), function (m, $1, idx, str) {
            return $1.toUpperCase();
        });
    }

    /**
     * 驼峰转下划线
     * @param {string} str 驼峰字符串
     * @return {string} 转换后的字符串
     */
    toLowerLine(str) {
        var temp = str.replace(/[A-Z]/g, function (match) {
            return '_' + match.toLowerCase();
        });
        if (temp.slice(0, 1) === '_') { // 如果首字母是大写，执行replace时会多一个_，这里需要去掉
            temp = temp.slice(1);
        }

        return temp;
    }
	/**
	 *获取随机颜色
	 */
	getRandomColor () {
		let rgb = []
		for (let i = 0 ; i < 3; ++i){
			let color = Math.floor(Math.random() * 256).toString(16)
			color = color.length == 1 ? '0' + color : color
			rgb.push(color)
		}
		return '#' + rgb.join('')
	}
}
