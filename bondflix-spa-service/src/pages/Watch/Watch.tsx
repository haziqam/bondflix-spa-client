import { VideoContainer, VideoInformationContainer } from "./Watch.components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContent } from "../../services/content.service";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export function Watch() {
    const navigate = useNavigate();
    const [URLSearchParams] = useSearchParams();
    const contentId = URLSearchParams.get("id");
    const [content, setContent] = useState<Content | null>(null);
    const [subscriptionDialogVisible, setSubscriptionDialogVisible] =
        useState(false);

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
                    setSubscriptionDialogVisible(true);
                } else {
                    console.log(content.data);
                    setContent(content.data as Content);
                }
            });
        }
    }, [contentId, navigate]);

    const subscriptionDialogFooter = (
        <div>
            <Button
                label="Go back to dashbaord"
                icon="pi pi-arrow-left"
                onClick={() => {
                    navigate("/dashboard");
                }}
                // className="p-button-text"
            />
            {/* <Button
                label="Subscribe"
                icon="pi pi-check"
                onClick={() => setSubscriptionDialogVisible(false)}
                autoFocus
            /> */}
        </div>
    );

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Dialog
                header="Subscribe"
                footer={subscriptionDialogFooter}
                visible={subscriptionDialogVisible}
                onHide={() => {
                    setSubscriptionDialogVisible(false);
                }}
                closable={false}
                draggable={false}
            >
                <p>{`You haven't subscribed to this channel`}</p>
            </Dialog>
            <div>
                <VideoContainer contentId={parseInt(contentId!)} />
                <VideoInformationContainer
                    title={content?.title!}
                    channelName={content?.user.name!}
                    channelUsername={content?.user.username!}
                    channelId={content?.user.id!}
                    uploadedAt={content?.uploaded_at!}
                    genres={content?.genres!}
                    categories={content?.categories!}
                    sponsors={content?.sponsors!}
                    description={content?.description!}
                />
            </div>
        </div>
    );
}
