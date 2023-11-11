import { VideoContainer, VideoInformationContainer } from "./Watch.components";
import videoSample from "../../temp-video/video2.mp4";
import { useSearchParams } from "react-router-dom";

export function Watch() {
    // const [URLSearchParams] = useSearchParams();
    // const contentId = URLSearchParams.get("id");
    // const {
    //     videoSrc
    //     title,
    //     channelName,
    //     channelSubscribers,
    //     uploadedAt,
    //     genres,
    //     categories,
    //     description,
    // } = fetchContentData(contentId);

    // STUB
    const title = "This is a title";
    const channelName = "Channel Name";
    const channelSubscribers = 100;

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
                <VideoContainer videoSrc={videoSample} />
                <VideoInformationContainer
                    title={title}
                    channelName={channelName}
                    channelSubscribers={channelSubscribers}
                    uploadedAt={uploadedAt}
                    genres={genres}
                    categories={categories}
                    description={description}
                />
            </div>
        </div>
    );
}
