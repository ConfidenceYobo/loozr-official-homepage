export function textTruncate(text: string, maxLength: number): string {
    if (text?.length <= maxLength) {
        return text;
    }
    
    const truncatedText = text?.slice(0, maxLength);
    return truncatedText + "...";
}

export function truncateAddress(address: string) {
    if (address.length <= 10) return address;

    const start = address.slice(0, 6);
    const end = address.slice(-6);

    return `${start}...${end}`;
  }