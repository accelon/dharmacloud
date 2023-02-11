copy ..\accelon22\dist\index.html \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\index.js \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\index.css \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\global.css \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\favicon.ico \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\accelon22.manifest \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\sw.js \github.io\dharmacloud.github.io\accelon22\
copy ..\accelon22\dist\html5-qrcode.min.js \github.io\dharmacloud.github.io\accelon22\

del/q \github.io\dharmacloud.github.io\accelon22\dc\
copy dist\dc\*.* \github.io\dharmacloud.github.io\accelon22\dc
echo window.accelon22={preload:"yinshun,dc"} > \github.io\dharmacloud.github.io\accelon22\config.js