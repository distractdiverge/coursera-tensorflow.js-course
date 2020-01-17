const logging = (function(){

    const log = (message, label) => {

        const now = new Date();
        const timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        const formattedMessage = `${timestamp}${label?` [${label}]`:''}: ${message}`;

        const target = document.getElementById('log');
        const code = document.createElement('code');
        const pre = document.createElement('pre');
        code.innerHTML = formattedMessage;
        pre.appendChild(code);
        target.appendChild(pre);
        console.log(formattedMessage);
    };

    return {
        log,
    };

})(document);