import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ContentUploadForm } from "./Studio.components";

export function Studio() {
    const location = useLocation();
    const [contentUploadData, setContentUploadData] =
        useState<ContentUploadData>({
            title: "",
            description: "",
            genres: [],
            categories: [],
            content_file: location.state.video,
            thumbnail_file: location.state.thumbnail,
        });

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <h2>Last step: Insert information for your video</h2>
            <ContentUploadForm
                contentUploadData={contentUploadData}
                setContentUploadData={setContentUploadData}
            />
        </div>
    );
}
