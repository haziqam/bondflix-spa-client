type ContentUploadData = {
    title: string;
    description: string;
    genres: number[];
    categories: number[];
    sponsors: number[];
    visibility: boolean;
    content_file: File;
    thumbnail_file: File;
};
