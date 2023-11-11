import { Card } from "primereact/card";
import { TabMenu } from "primereact/tabmenu";
import { Dispatch, SetStateAction, useState } from "react";
import contentThumbnail from "../../assets/thumbnail1.jpg";

export function ResultsContent() {
    const [tabActiveIndex, setTabActiveIndex] = useState(0);
    return (
        <div>
            <ResultsMenuTab
                tabActiveIndex={tabActiveIndex}
                setTabActiveIndex={setTabActiveIndex}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
                {tabActiveIndex === 0 ? (
                    <ContentSearchResults />
                ) : (
                    <ChannelSearchResults />
                )}
            </div>
        </div>
    );
}

function ResultsMenuTab(props: {
    tabActiveIndex: number;
    setTabActiveIndex: Dispatch<SetStateAction<number>>;
}) {
    const { tabActiveIndex, setTabActiveIndex } = props;
    const tabItems = [
        { label: "Content", icon: "pi pi-fw pi-video" },
        { label: "Channel", icon: "pi pi-fw pi-user" },
    ];

    return (
        <TabMenu
            model={tabItems}
            activeIndex={tabActiveIndex}
            onTabChange={(e) => setTabActiveIndex(e.index)}
        />
    );
}

function ContentSearchResults() {
    return (
        <div
            style={{
                width: "80%",
                marginTop: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}
        >
            <ContentResultsCard />
            <ContentResultsCard />
            <ContentResultsCard />
            <ContentResultsCard />
        </div>
    );
}

function ChannelSearchResults() {
    return <h1>Ini channel</h1>;
}

function ContentResultsCard() {
    return (
        <Card
            pt={{
                content: {
                    style: {
                        padding: "0",
                    },
                },
            }}
            style={{ backgroundColor: "#ececec" }}
        >
            <div style={{ display: "flex", gap: "20px" }}>
                <img
                    src={contentThumbnail}
                    alt="Content Thumbnail"
                    style={{ objectFit: "cover", borderRadius: "10px" }}
                />
                <section>
                    <h2 style={{ marginTop: "0" }}>Content Title</h2>
                    <p>Channel name</p>
                    <p>Date uploaded</p>
                    <p>Description</p>
                </section>
            </div>
        </Card>
    );
}
