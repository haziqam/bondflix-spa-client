import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "primereact/button";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";
import profilePicSrc from "../../temp-video/profile.png";
import { Dialog } from "primereact/dialog";

type Channel = {
    id: number;
    username: string;
    name: string;
    profilePicSrc: string;
};

export function SubscriptionTable() {
    const [channels, setChannels] = useState<Channel[]>([
        {
            id: 111,
            username: "wkwkwkw",
            name: "hellooo",
            profilePicSrc: profilePicSrc,
        },
        {
            id: 111,
            username: "wkwkwkw",
            name: "hellooo",
            profilePicSrc: profilePicSrc,
        },
        {
            id: 111,
            username: "wkwkwkw",
            name: "hellooo",
            profilePicSrc: profilePicSrc,
        },
        {
            id: 111,
            username: "wkwkwkw",
            name: "hellooo",
            profilePicSrc: profilePicSrc,
        },
        {
            id: 111,
            username: "wkwkwkw",
            name: "hellooo",
            profilePicSrc: profilePicSrc,
        },
    ]);

    return (
        <div style={{ minWidth: "700px" }}>
            <DataTable
                value={channels}
                dataKey="id"
                // loading={loading}
                emptyMessage="No Subscriptions."
                showGridlines
            >
                <Column header="Channels" body={ChannelInfoTemplate} />
                <Column header="Action" body={ChannelActionTemplate} />
            </DataTable>
        </div>
    );
}

function ChannelInfoTemplate(channel: Channel) {
    const { username, name, profilePicSrc } = channel;

    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <img
                src={profilePicSrc}
                alt="Channel profile picture"
                style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "20px",
                }}
            />

            <div>
                <div
                    style={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                    }}
                >
                    {name}
                </div>
                <div
                    style={{
                        fontSize: "0.8rem",
                    }}
                >
                    {`@${username}`}
                </div>
            </div>
        </div>
    );
}

function ChannelActionTemplate(channel: Channel) {
    const [dialogVisible, setDialogVisible] = useState(false);

    const handleUnscubscribe = () => {
        setDialogVisible(true);
    };

    return (
        <>
            <UnsubscribeConfirmDialog
                dialogVisible={dialogVisible}
                setDialogVisible={setDialogVisible}
                channel={channel}
            />
            <Button severity="danger" onClick={handleUnscubscribe}>
                Unsubscribe
            </Button>
        </>
    );
}

function UnsubscribeConfirmDialog(props: {
    dialogVisible: boolean;
    setDialogVisible: Dispatch<SetStateAction<boolean>>;
    channel: Channel;
}) {
    const { toastRef, showSuccess } = useToast();
    const { dialogVisible, setDialogVisible, channel } = props;
    const { id, username, name } = channel;

    const handleUnscubscribe = () => {
        // unsubscribe API call
        showSuccess(`Unsubscribed @${username} successfully`);
        setDialogVisible(false);
    };

    const dialogFooter = () => {
        return (
            <div>
                <Button
                    severity="info"
                    text
                    onClick={() => {
                        setDialogVisible(false);
                    }}
                >
                    Cancel
                </Button>
                <Button severity="danger" onClick={handleUnscubscribe}>
                    Unsubscribe
                </Button>
            </div>
        );
    };

    return (
        <>
            <Toast ref={toastRef} position="bottom-right" />
            <Dialog
                visible={dialogVisible}
                header={`Unsubscribe @${username}`}
                onHide={() => setDialogVisible(false)}
                footer={dialogFooter}
            >
                <p style={{ margin: 0 }}>
                    {`Are you sure you want to unsubscribe from ${name} (@${username})? `}
                </p>
            </Dialog>
        </>
    );
}
