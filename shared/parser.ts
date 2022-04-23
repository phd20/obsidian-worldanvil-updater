export const parseMarkdown = (markdownText: string) => {
    const fm = findFrontmatter(markdownText);
	const htmlText = markdownText // do something to this markdown text
        .replace("---", '')
        .replace("---", '')
        .replace(fm, '')
        .replace(/^#### (.*$)/gim, '[h4]$1[/h4]')
        .replace(/^### (.*$)/gim, '[h3]$1[/h3]')
        .replace(/^## (.*$)/gim, '[h2]$1[/h2]')
        .replace(/^# (.*$)/gim, '[h1]$1[/h1]')
        .replace(/^\> (.*$)/gim, '[quote]$1[/quote]')
        .replace(/\*\*(.*)\*\*/gim, '[b]$1[/b]')
        .replace(/\!\[\[(.*)\]\]/gim, '')
        .replace(/\[\[(.*)\]\]/gim, '$1')
        .replace(/\*(.*)\*/gim, '[i]$1[/i]')
        // .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
        // .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
        .replace(/\n$/gim, '[br][br]')
	return htmlText
}

const findFrontmatter = (body: string) => {
    const yaml = "---";
    const startPosition = body.search(yaml)+yaml.length;
    const endPosition = body.slice(startPosition).search(yaml)+startPosition;
    body = body.slice(startPosition,endPosition);
    return body;
}