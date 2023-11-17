import { Button } from "primereact/button";
import { ThumbnailUploader, VideoUploader } from "./Upload.components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Upload() {
    const navigate = useNavigate();
    const [video, setVideo] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const videoAndThumbnailUploaded = !!video && !!thumbnail;

    const handleContinueButtonClick = () => {
        navigate("/studio", { state: { video, thumbnail } });
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "20px",
                marginBottom: "32px",
            }}
        >
            {" "}
            <section>
                <h2 style={{ marginBottom: "0" }}>Step 1: Upload your video</h2>
                <p
                    style={{
                        marginTop: "0",
                        fontSize: "0.75rem",
                        color: "#8f8e8e",
                    }}
                >
                    Accepted extensions are mpeg, mp4, quicktime, or x-msvideo
                </p>
                <VideoUploader setVideo={setVideo} />
            </section>
            <section>
                <h2 style={{ marginBottom: "0" }}>
                    Step 2: Upload your thumbnail
                </h2>
                <p
                    style={{
                        marginTop: "0",
                        fontSize: "0.75rem",
                        color: "#8f8e8e",
                    }}
                >
                    Accepted extensions are jpeg, png, gif, or jpg
                </p>
                <ThumbnailUploader setThumbnail={setThumbnail} />
            </section>
            <div
                style={{
                    width: "600px",
                    display: "flex",
                    justifyContent: "end",
                }}
            >
                <Button
                    disabled={!videoAndThumbnailUploaded}
                    onClick={handleContinueButtonClick}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
