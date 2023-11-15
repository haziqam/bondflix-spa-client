import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ContentUploadForm } from "./Studio.components";

export function Studio() {
    const location = useLocation();
    const [contentUploadData, setContentUploadData] =
        useState<ContentUploadData>({
            title: "",
            description: "",
            visibility: "",
            genres: [],
            categories: [],
            video: location.state.video,
            thumbnail: location.state.thumbnail,
        });

    useEffect(() => {
        console.log(contentUploadData.video);
        console.log(contentUploadData.thumbnail);
    }, []);
    return (
        <div>
            <ContentUploadForm
                contentUploadData={contentUploadData}
                setContentUploadData={setContentUploadData}
            />
        </div>
    );
}

function uploadButtonDisabled(contentUploadData: ContentUploadData) {
    return (
        contentUploadData.title === "" ||
        contentUploadData.description === "" ||
        contentUploadData.genres.length === 0 ||
        contentUploadData.categories.length === 0 ||
        !contentUploadData.video ||
        !contentUploadData.thumbnail
    );
}
