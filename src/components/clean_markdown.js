import { marked } from 'marked'
import DOMPurify from 'dompurify';

const parseSanitizeModifyLinks = str => {
    if (str) {
        const innerHTML = new DOMParser().parseFromString(DOMPurify.sanitize(marked.parse(str)), 'text/html');
        innerHTML.querySelectorAll("a").forEach(a => a.target = "_blank");
        return innerHTML.body.innerHTML;
    } else {
        return str;
    }
}

export default parseSanitizeModifyLinks