


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}




$('#submit').click(function () {
    var text = ($("#pic").val());
    if(!text){
        alert("请输入字符画");
        return;
    }
    var screen_width = ($("#width").val());
    var screen_height = ($("#height").val());
    if(!screen_width || !screen_height){
        alert("请输入屏幕尺寸");
        return;
    }
    if(isNaN(screen_width) || isNaN(screen_height)){
        alert("请输入合法的屏幕尺寸");
        return;
    }
    var linetext = text.split("\n");
    var height = linetext.length;
    var width = 0;
    for (var i=0;i<height;i++){
        width = Math.max(width,linetext[i].length);
    }
    if(width > screen_width || height > screen_height){
        alert("字符画尺寸大于屏幕尺寸，转换失败");
        return;
    }
    var up_blank = Math.floor((screen_height-height)/2);
    var left_blank = Math.floor((screen_width-width)/2);
    var output = "WIDTH=8;\nDEPTH=" +  screen_width*screen_height +";\n\nADDRESS_RADIX=HEX;\nDATA_RADIX=HEX;\n\nCONTENT BEGIN\n";
    for (i=0;i < up_blank*screen_width;i++){
        output += i.toString(16)+": 00;\n";
    }
    for (i=0;i<height;i++){
        for (var j = 0;j < left_blank;j++){
            output += (screen_width*(i+up_blank)+j).toString(16)+": 00;\n";
        }
        for (j = left_blank;j < left_blank+linetext[i].length;j++){
            output += (screen_width*(i+up_blank)+j).toString(16) + ": " + linetext[i][j-left_blank].charCodeAt().toString(16) + ";\n";
        }
        for (j = left_blank+linetext[i].length;j < screen_width;j++){
            output += (screen_width*(i+up_blank)+j).toString(16)+": 00;\n";
        }
    }
    for(i = screen_width*(up_blank+height);i < screen_width*screen_height;i++){
        output += i.toString(16)+": 00;\n";
    }
    output += "END\n";
    download("output.mif",output);
});
