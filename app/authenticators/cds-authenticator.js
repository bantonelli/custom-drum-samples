/**
 * Created by brandonantonelli on 1/22/15.
 */
import Ember from 'ember';
import Authenticator from 'simple-auth-oauth2/authenticators/oauth2';

export default Authenticator.extend({
    makeRequest: function(url, data) {
        data.client_id = "0f4d3a53f1db12be80cd";
        data.grant_type = "password";
        return this._super(url, data);
    },
    invalidate: function (data){
        return this._super(data);
    }
});

// curl 'http://127.0.0.1:8000/oauth2/access_token/' -H 'Host: 127.0.0.1:8000' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:35.0) Gecko/20100101 Firefox/35.0' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'DNT: 1' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'Referer: http://127.0.0.1:4200/login' -H 'Origin: http://127.0.0.1:4200' -H 'Connection: keep-alive' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' --data 'grant_type=password&username=brandonantonelli&password=123456&client_id=21bc3b3e5b430572e41a'