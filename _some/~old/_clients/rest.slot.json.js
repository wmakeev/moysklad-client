/**
 * Rest /mutualSettlement/xml client
 * Date: 11.01.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

exports.createClient = function () {
    var me = {};
    var baseUrl = 'https://online.moysklad.ru/exchange/rest/slot/json';
    var baseOptions = {
        contentType: 'application/json',
        headers: {}
    };
    var baseClient = Moysklad.Providers.getDefaultHttpRequestClient();

    var fetchCallbackHandler = function(result, callback){
        if(_.isEmpty(result.error)){
            result.type = 'slotStateReportTO';
            result.obj = JSON.parse(result.response.contentText);
        } else {
            throw new Error(result.error);
        }
        if(callback) callback(result);
        else return result;
    };

    me.basicAuth = function (login, password) {
        this.auth = {
            login: login,
            password: password
        };
        baseOptions.headers.Authorization = Tools.getBasicAuthHttpHeader(this.auth.login, this.auth.password);
    };

    me.getSlotStateReport = function(param, callback) {
        //storeId, goodIdList;
        //TODO Проверить param на корректность
        var path = '/?storeId=' + param.storeId;
        if (param.goodIdList && param.goodIdList.length > 0) {
            if (param.goodIdList.length > 50) throw new Error('Не реализовано получение остатков по списку goodIdList более 50');
            path += '&' + _.map(param.goodIdList, function (value) {
                return 'goodId=' + encodeURIComponent(value);
            }).join('&');
        }
        var resultList;
        baseOptions.method = 'GET';
        baseClient.fetch(baseUrl + path, baseOptions,
            function (result) {
                if (callback) {
                    fetchCallbackHandler(result, callback);
                } else {
                    resultList = fetchCallbackHandler(result);
                }
            }
        );
        if (!callback) return resultList;
    };

    return me;
};