copy ..\accelon22\dist\index.html \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\index.js \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\index.css \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\global.css \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\favicon.ico \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\accelon22.manifest \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\sw.js \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\html5-qrcode.min.js \github.io\dharmacloud.github.io\accelon22\

del/q \github.io\dharmacloud.github.io\accelon22\dc\
copy dc\*.* \github.io\dharmacloud.github.io\accelon22\dc

del/q \github.io\dharmacloud.github.io\accelon22\dc_zh\
copy dc_zh\*.* \github.io\dharmacloud.github.io\accelon22\dc_zh

del/q \github.io\dharmacloud.github.io\accelon22\dc_sanskrit\
copy dc_sanskrit\*.* \github.io\dharmacloud.github.io\accelon22\dc_sanskrit

del/q \github.io\dharmacloud.github.io\accelon22\yinshun\
copy ..\yinshun\yinshun\*.* \github.io\dharmacloud.github.io\accelon22\yinshun

echo window.accelon22={preload:"dc,dc_sanskrit,dc_zh,yinshun"} > \github.io\dharmacloud.github.io\accelon22\config.js
cd \github.io\dharmacloud.github.io\
