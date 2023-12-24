import fs from 'fs';
import config from "./config.js";
import prompt from 'prompt';
import replace from 'replace-in-file'
prompt.start();

prompt.get(['packagename'], function (err, result) {
    if (err) { return onErr(err); }
    // console.log('Command-line input received:');
    console.log('Копируем пакет в папку ../' + result.packagename);
    fs.cpSync(".", "../" + result.packagename, { recursive: true });
    console.log('Удаляем ../' + result.packagename + '/.git');
    fs.rmSync('../' + result.packagename + '/.git', { recursive: true, force: true });
    const re = new RegExp("\\w+\\s", "g");
    const options = {    
        //Glob(s) 
        files: [
            '../' + result.packagename + '/_build/configs/*',
            '../' + result.packagename + '/_build/docs/*',
            '../' + result.packagename + '/_build/config.js',
            '../' + result.packagename + '/src/main.js',
            '../' + result.packagename + '/public/checkdebug.txt',
            '../' + result.packagename + '/.env',
            '../' + result.packagename + '/.json',
        ],
      
        //Replacement to make (string or regex) 
        from: [new RegExp(config.name, "g"),new RegExp(config.name_lower, "g")],
        to: [result.packagename,result.packagename.toLowerCase()],
    };
    console.log('Заменяем имя пакета в ../' + result.packagename + '/.git');
    try {
        let changedFiles = replace.sync(options);
        console.log('Modified files:', changedFiles);
    }
        catch (error) {
        console.error('Error occurred:', error);
    }

});

function onErr(err) {
    console.log(err);
    return 1;
}
