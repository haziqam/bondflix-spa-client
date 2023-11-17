type Content = {
    content_file_path: string;
    creator_id: number;
    description: string;
    id: number;
    // release_date: string;
    thumbnail_file_path: string;
    title: string;
    uploaded_at: string;
    user: {
        id: number;
        username: string;
        pp_url: string;
        name: string;
        email: string;
        isAdmin: boolean;
    };
    genres: Genre[];
    categories: Categories[];
    sponsors: Sponsor[];
};
