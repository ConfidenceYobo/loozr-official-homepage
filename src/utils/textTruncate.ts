export function textTruncate(text: string, maxLength: number): string {
    if (text?.length <= maxLength) {
        return text;
    }
    
    const truncatedText = text?.slice(0, maxLength);
    return truncatedText + "...";
}