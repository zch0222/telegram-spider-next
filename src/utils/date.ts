
export const formatToLocalTime = (dateStr: string | undefined | null): string => {
    if (!dateStr) return '-';
    try {
        // The user stated that the API returns UTC time.
        // We ensure it is treated as UTC by appending 'Z' if not present.
        // We also replace space with T if necessary to ensure ISO format compatibility, 
        // although new Date() often handles space, strict ISO is T.
        // However, simple appending Z is usually enough for "YYYY-MM-DD HH:mm:ss" in most browsers.
        let formattedDateStr = dateStr;
        if (!formattedDateStr.endsWith("Z")) {
            formattedDateStr += "Z";
        }
        
        // Handle "YYYY-MM-DD HH:mm:ssZ" -> "YYYY-MM-DDTHH:mm:ssZ" if needed?
        // Chrome handles "2023-01-01 10:00:00Z" fine. Safari might be pickier.
        // Let's try to be safer by replacing the first space with T if it looks like "date time"
        if (formattedDateStr.includes(" ") && !formattedDateStr.includes("T")) {
             formattedDateStr = formattedDateStr.replace(" ", "T");
        }

        const date = new Date(formattedDateStr);
        
        // Check if date is valid
        if (isNaN(date.getTime())) {
            return dateStr;
        }
        
        return date.toLocaleString();
    } catch (e) {
        return dateStr;
    }
};
