import { VideoContainer, VideoInformationContainer } from "./Watch.components";
import videoSample from "../../temp-video/video2.mp4";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContent } from "../../services/content.service";

export function Watch() {
    const navigate = useNavigate();
    const [URLSearchParams] = useSearchParams();
    const contentId = URLSearchParams.get("id");
    const [content, setContent] = useState<Content | null>(null);
    useEffect(() => {
        if (!contentId) {
            navigate("/dashboard");
        } else {
            getContent(parseInt(contentId)).then((content) => {
                if (!content.data) {
                    navigate("/dashboard");
                }
                setContent(content.data);
            });
        }
    }, [contentId, navigate]);

    // STUB
    const title = "This is a title";
    const channelName = "Channel Name";
    // const channelSubscribers = 100;
    const channelUsername = "heloworld";

    const uploadedAt = "11 November, 2023";
    const genres = [
        "Horror",
        "Comedy",
        "Sci-fi",
        "Horror",
        "Comedy",
        "Sci-fi",
        "Horror",
        "Comedy",
        "Sci-fi",
        "Horror",
        "Comedy",
        "Sci-fi",
    ];
    const categories = ["Cartoon", "Reality Show", "Documentary"];
    const description =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima blanditiis vero quod odit tempore, repellat assumenda perspiciatis corrupti esse modi, expedita sapiente. Nulla reiciendis atque corporis necessitatibus error quaerat dolore?";

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div>
                <VideoContainer contentId={parseInt(contentId!)} />
                <VideoInformationContainer
                    title={content?.title!}
                    channelName={content?.user.name!}
                    channelUsername={content?.user.username!}
                    uploadedAt={content?.uploaded_at!}
                    genres={content?.genres!}
                    categories={content?.categories!}
                    description={content?.description!}
                />
            </div>
        </div>
    );
}
