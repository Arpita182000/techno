export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();

    return `${day}-${month}-${year}`;
}

export const isNullOrEmptyObject = (obj: Record<string, any>) => {
    return (Boolean(obj) && Object.keys(obj).length > 0) ? false : true;
}