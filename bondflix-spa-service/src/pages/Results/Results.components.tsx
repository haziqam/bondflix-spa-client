import { Card } from "primereact/card";
import { TabMenu } from "primereact/tabmenu";
import { Dispatch, SetStateAction, useState } from "react";
import contentThumbnail from "../../assets/thumbnail1.jpg";
import channelProfilePic from "../../temp-video/profile.png";

export function ResultsContent() {
    const [tabActiveIndex, setTabActiveIndex] = useState(0);
    return (
        <div style={{ marginBottom: "32px" }}>
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
            style={{ backgroundColor: "#ececec", height: "250px" }}
        >
            <div style={{ display: "flex", gap: "20px" }}>
                <img
                    src={contentThumbnail}
                    alt="Content Thumbnail"
                    style={{
                        objectFit: "cover",
                        borderRadius: "10px",
                        width: "360px",
                        height: "210px",
                    }}
                />
                <section>
                    <h2 style={{ margin: "0" }}>Content Title</h2>
                    <div>11 November, 2023</div>
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                            margin: "16px auto 16px auto",
                        }}
                    >
                        <img
                            src={channelProfilePic}
                            alt="Channel profile picture"
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                            }}
                        />
                        <div>Channel name</div>
                    </div>
                    <p
                        style={{
                            margin: "0",
                            display: "-webkit-box",
                            WebkitLineClamp: "4",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aspernatur deserunt tempora ipsam adipisci repellendus
                        dolore, ipsum excepturi molestias est aperiam labore
                        nemo quasi praesentium at illo facilis? Corporis,
                        commodi vero? Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Reiciendis deserunt doloribus sapiente
                        quasi. Iste fugit nulla nesciunt tempora ipsum magnam
                        rem sequi? Adipisci dolorem nulla facere, maiores neque
                        sapiente at.
                    </p>
                </section>
            </div>
        </Card>
    );
}
