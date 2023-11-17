import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useToast } from "../../hooks/useToast";
import { Toast } from "primereact/toast";
import profilePicSrc from "../../temp-video/profile.png";
import { Dialog } from "primereact/dialog";
import { getSubscribers } from "../../services/subscription.service";
import Cookies from "js-cookie";

type Channel = {
    id: number;
    username: string;
    name: string;
    profilePicSrc: string;
};

export function SubscriptionTable() {
    const [subscribers, setSubscribers] = useState<Channel[]>();
    useEffect(()=>{
        const userId = parseInt(Cookies.get("userId")!);
        getSubscribers(userId).then((response) => {
            setSubscribers(response.data as Channel[])
        })
    }, [])

    const { toastRef, showSuccess } = useToast();
    // const removeSubscribedChannel = (id: number) => {
    //     const unsubscribedChannelUsername = subscribers.find(
    //         (el) => el.id === id
    //     )?.username;
    //     setSubscribers((prev) => prev.filter((el) => el.id !== id));
    //     showSuccess(
    //         `Unsubscribed @${unsubscribedChannelUsername} successfully`
    //     );
    // };

    return (
        <div style={{ width: "500px" }}>
            <Toast ref={toastRef} position="bottom-right" />
            <DataTable
                value={subscribers}
                dataKey="id"
                // loading={loading}
                emptyMessage="No Subscriptions."
                showGridlines
            >
                <Column header="Subscribers" body={ChannelInfoTemplate} />
                {/* <Column
                    header="Action"
                    body={(channel) => (
                        <ChannelActionTemplate
                            channel={channel}
                            onUnsubscribe={removeSubscribedChannel}
                        />
                    )}
                /> */}
            </DataTable>
        </div>
    );
}

function ChannelInfoTemplate(channel: Channel) {
    const { username, name, id } = channel;

    return (
        <div
            style={{
                display: "flex",
            }}
        >
            <img
                src={`http://localhost:3000/static/pictures?id=${id}`}
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

function ChannelActionTemplate(props: {
    channel: Channel;
    onUnsubscribe: (id: number) => void;
}) {
    const [dialogVisible, setDialogVisible] = useState(false);
    const { channel, onUnsubscribe } = props;

    const handleUnscubscribe = () => {
        setDialogVisible(true);
    };

    return (
        <>
            <UnsubscribeConfirmDialog
                dialogVisible={dialogVisible}
                setDialogVisible={setDialogVisible}
                channel={channel}
                onUnsubscribe={onUnsubscribe}
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
    onUnsubscribe: (id: number) => void;
}) {
    const { dialogVisible, setDialogVisible, channel, onUnsubscribe } = props;
    const { id, username, name } = channel;

    const handleUnscubscribe = () => {
        // unsubscribe API call
        // if succeeded:
        setDialogVisible(false);
        onUnsubscribe(id);
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
