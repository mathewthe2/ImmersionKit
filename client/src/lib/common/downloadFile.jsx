export default function downloadFile (filePath) {
    var a = document.createElement('A');
    a.href = filePath;
    a.download = filePath.substr(filePath.lastIndexOf('/') + 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}