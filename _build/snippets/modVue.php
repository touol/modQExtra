<?php
/** @var modX $modx */
/** @var array $scriptProperties */
$name_lower = strtolower($app);
$debug = false;
$dev_path = 'http://'.$modx->getOption('http_host')
    . ':'
    . '3000/';
if($pf = @fsockopen($modx->getOption('http_host'),3000, $err, $err_string, 1))
{
    // $debug = true;
    fclose($pf);
    $checkdebug = file_get_contents('http://'.$modx->getOption('http_host').':3000/public/checkdebug.txt');
    if($checkdebug == $name_lower) $debug = true;
}
if(!$debug){
    $assets_url = $modx->getOption('assets_url').'components/'
        .$name_lower.'/';
    $modx->regClientCSS($assets_url.'web/css/main.css');
    $modx->regClientHTMLBlock(
        '<script type="module" src="'.$assets_url.'web/js/main.js"></script>'
    );
}else{
    $modx->regClientHTMLBlock(
        '<script type="module" src="'.$dev_path.'@vite/client"></script>'
    );
    $modx->regClientHTMLBlock(
        '<script type="module" src="'.$dev_path.'src/main.js"></script>'
    );
}
return '<div id="'.$name_lower.'"></div>';