import { VideoContainer, VideoInformationContainer } from "./Watch.components";
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
                if (content.status === 401) {
                    console.log("tidak boleh akses");
                    // TODO: tampilin dialog
                } else {
                    setContent(content.data as Content);
                }
            });
        }
    }, [contentId, navigate]);

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
