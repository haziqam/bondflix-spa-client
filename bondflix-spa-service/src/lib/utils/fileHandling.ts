export function getFileExtension(file: File): string | null {
    const fileName = file.name;
    const dotIndex = fileName.lastIndexOf(".");

    if (dotIndex === -1) {
        return null;
    }

    const extension = fileName.substring(dotIndex + 1).toLowerCase();
    return extension;
}
