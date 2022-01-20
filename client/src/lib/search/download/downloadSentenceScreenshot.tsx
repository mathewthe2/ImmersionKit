import downloadFile from "lib/common/downloadFile";
import sentence from 'interfaces/search/download';

function downloadSentenceScreenshot(example: sentence) {
    downloadFile(`${process.env.HOST}/download_sentence_image?id=${example.id}&category=${example.category}`);
}

export default downloadSentenceScreenshot
