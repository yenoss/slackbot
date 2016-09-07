exports.msToTime = function(duration){
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
exports.similarStr = function(a,b){
    var lengthA = a.length;
    var lengthB = b.length;
    var equivalency = 0;
    var minLength = (a.length > b.length) ? b.length : a.length;    
    var maxLength = (a.length < b.length) ? b.length : a.length;    
    for(var i = 0; i < minLength; i++) {
        if(a[i] == b[i]) {
            equivalency++;
        }
    }
    //절대 maxLength가0 이면안된다.
    var weight = equivalency / maxLength;
    return (weight * 100);
}