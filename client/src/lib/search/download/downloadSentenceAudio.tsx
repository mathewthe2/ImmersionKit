import downloadFile from "lib/common/downloadFile";
import sentence from 'interfaces/search/download';

function downloadSentenceAudio(example: sentence) {
    downloadFile(`${process.env.HOST}/download_sentence_audio?id=${example.id}&category=${example.category}`);
}

export default downloadSentenceAudio
