function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function blockUser() {
    setCookie('userBlocked', 'true', 365); 
    alert('На этот сайт вы больше не попадете');
    window.location.href = 'https://www.google.com';
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
function checkBlock() {
    if (getCookie('userBlocked') === 'true') {
        window.location.href = 'https://www.google.com'; 
    }
}
window.onload = checkBlock;