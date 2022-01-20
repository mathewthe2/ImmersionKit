import downloadFile from "lib/common/downloadFile";
import sentence from 'interfaces/search/download';

export default function exportToAnki(example: sentence) {
    downloadFile(`${process.env.HOST}/download_sentence?id=${example.id}&category=${example.category}`);
  }